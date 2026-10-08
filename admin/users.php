<?php
require_once __DIR__ . '/auth.php';
$pdo = require __DIR__ . '/db.php';
$currentUser = require_auth();

$alert = '';
$alertType = 'error';

// Handle POST actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if (!verify_csrf($_POST['csrf_token'] ?? '')) {
        $alert = 'Invalid security token.';
    } elseif ($action === 'create_user') {
        // Only superadmin can create new users
        if ($currentUser['role'] !== 'superadmin') {
            $alert = 'Only Superadmin can add new users.';
        } else {
            $name = trim($_POST['name'] ?? '');
            $email = trim($_POST['email'] ?? '');
            $password = (string)($_POST['password'] ?? '');
            $role = $_POST['role'] ?? 'admin';

            if (!in_array($role, ['superadmin', 'admin', 'viewer'], true)) {
                $role = 'admin';
            }

            if ($name === '' || $email === '' || $password === '') {
                $alert = 'Name, email, and temporary password are required.';
            } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $alert = 'Invalid email address.';
            } else {
                $check = $pdo->prepare("SELECT id FROM admin_users WHERE email = :email");
                $check->execute([':email' => $email]);
                if ($check->fetch()) {
                    $alert = 'A user with this email already exists.';
                } else {
                    $hash = password_hash($password, PASSWORD_BCRYPT);
                    $stmt = $pdo->prepare("INSERT INTO admin_users (name, email, password, role) VALUES (:name, :email, :password, :role)");
                    $stmt->execute([
                        ':name' => $name,
                        ':email' => $email,
                        ':password' => $hash,
                        ':role' => $role,
                    ]);
                    $alert = 'User created successfully.';
                    $alertType = 'success';
                }
            }
        }
    } elseif ($action === 'update_user') {
        $id = (int)($_POST['id'] ?? 0);
        $role = $_POST['role'] ?? '';
        $newPassword = (string)($_POST['new_password'] ?? '');

        // Only superadmin can edit other users; regular users can only change their own password
        if ($currentUser['role'] !== 'superadmin' && $currentUser['id'] !== $id) {
            $alert = 'Permission denied.';
        } else {
            if ($currentUser['role'] === 'superadmin' && in_array($role, ['superadmin', 'admin', 'viewer'], true)) {
                // Prevent removing last superadmin role
                if ($role !== 'superadmin') {
                    $countStmt = $pdo->query("SELECT COUNT(*) FROM admin_users WHERE role = 'superadmin'");
                    if ((int)$countStmt->fetchColumn() <= 1) {
                        $targetUser = $pdo->query("SELECT role FROM admin_users WHERE id = {$id}")->fetch();
                        if ($targetUser && $targetUser['role'] === 'superadmin') {
                            $alert = 'Cannot downgrade the only Superadmin in the system.';
                        }
                    }
                }

                if (empty($alert)) {
                    $stmt = $pdo->prepare("UPDATE admin_users SET role = :role WHERE id = :id");
                    $stmt->execute([':role' => $role, ':id' => $id]);
                }
            }

            if (!empty($newPassword) && empty($alert)) {
                $hash = password_hash($newPassword, PASSWORD_BCRYPT);
                $stmt = $pdo->prepare("UPDATE admin_users SET password = :password WHERE id = :id");
                $stmt->execute([':password' => $hash, ':id' => $id]);
            }

            if (empty($alert)) {
                $alert = 'User details updated successfully.';
                $alertType = 'success';
            }
        }
    } elseif ($action === 'delete_user') {
        if ($currentUser['role'] !== 'superadmin') {
            $alert = 'Only Superadmin can delete users.';
        } else {
            $id = (int)($_POST['id'] ?? 0);
            if ($id === $currentUser['id']) {
                $alert = 'You cannot delete your own account.';
            } else {
                $stmt = $pdo->prepare("DELETE FROM admin_users WHERE id = :id");
                $stmt->execute([':id' => $id]);
                $alert = 'User deleted.';
                $alertType = 'success';
            }
        }
    }
}

// Fetch all users
$stmt = $pdo->query("SELECT id, name, email, role, created_at, updated_at FROM admin_users ORDER BY role = 'superadmin' DESC, created_at ASC");
$allUsers = $stmt->fetchAll();

require_once __DIR__ . '/layout.php';
render_admin_header('Users & RBAC', 'users');
?>

<div class="max-w-7xl mx-auto space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">User Management &amp; RBAC</h1>
            <p class="text-sm text-slate-500 mt-1">Manage admin access, assign role-based permissions, and manage passwords.</p>
        </div>
        <?php if ($currentUser['role'] === 'superadmin'): ?>
            <button 
                type="button" 
                onclick="document.getElementById('addUserModal').classList.remove('hidden')"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition self-start sm:self-auto"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <span>Add New User</span>
            </button>
        <?php endif; ?>
    </div>

    <?php if (!empty($alert)): ?>
        <div class="p-4 rounded-xl text-xs font-medium <?= $alertType === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800' ?>">
            <?= htmlspecialchars($alert) ?>
        </div>
    <?php endif; ?>

    <!-- RBAC Roles Guide -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm space-y-1.5">
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800">Superadmin</h4>
            </div>
            <p class="text-xs text-slate-500">Full system authority. Can manage RBAC, create/edit/delete users, view/export/delete submissions, and configure system.</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm space-y-1.5">
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800">Admin</h4>
            </div>
            <p class="text-xs text-slate-500">Operational authority. Can view, export, and delete contact inquiries. Can view user list in read-only mode.</p>
        </div>
        <div class="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm space-y-1.5">
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-800">Viewer</h4>
            </div>
            <p class="text-xs text-slate-500">Read-only authority. Can view dashboard metrics and inquiries without delete or user management rights.</p>
        </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-800">Registered Users (<?= count($allUsers) ?>)</h3>
            <span class="text-xs text-slate-400 font-mono">Current role: <?= strtoupper($currentUser['role']) ?></span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                    <tr>
                        <th class="py-3.5 px-4">User</th>
                        <th class="py-3.5 px-4">Email</th>
                        <th class="py-3.5 px-4">Role</th>
                        <th class="py-3.5 px-4">Created Date</th>
                        <th class="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700">
                    <?php foreach ($allUsers as $u): 
                        $isSuper = $u['role'] === 'superadmin';
                        $badgeCls = $isSuper ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ($u['role'] === 'admin' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200');
                    ?>
                        <tr class="hover:bg-slate-50/70 transition">
                            <td class="py-3.5 px-4 whitespace-nowrap">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-600 flex items-center justify-center text-xs">
                                        <?= strtoupper(substr($u['name'] ?: 'U', 0, 1)) ?>
                                    </div>
                                    <div>
                                        <div class="font-bold text-slate-900"><?= htmlspecialchars($u['name']) ?></div>
                                        <?php if ($u['id'] === $currentUser['id']): ?>
                                            <span class="text-[10px] text-emerald-600 font-semibold">(You)</span>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] text-slate-600">
                                <?= htmlspecialchars($u['email']) ?>
                            </td>
                            <td class="py-3.5 px-4 whitespace-nowrap">
                                <span class="inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider <?= $badgeCls ?>">
                                    <?= htmlspecialchars($u['role']) ?>
                                </span>
                            </td>
                            <td class="py-3.5 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                                <?= date('M d, Y', strtotime($u['created_at'])) ?>
                            </td>
                            <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                                <?php if ($currentUser['role'] === 'superadmin' || $currentUser['id'] === $u['id']): ?>
                                    <button 
                                        type="button" 
                                        onclick="openEditUserModal(<?= htmlspecialchars(json_encode([
                                            'id' => $u['id'],
                                            'name' => $u['name'],
                                            'email' => $u['email'],
                                            'role' => $u['role'],
                                        ]), ENT_QUOTES, 'UTF-8') ?>)"
                                        class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                                    >
                                        Edit
                                    </button>
                                <?php endif; ?>

                                <?php if ($currentUser['role'] === 'superadmin' && $currentUser['id'] !== $u['id']): ?>
                                    <form method="POST" class="inline-block" onsubmit="return confirm('Are you sure you want to delete user <?= htmlspecialchars(addslashes($u['name'])) ?>?');">
                                        <input type="hidden" name="action" value="delete_user">
                                        <input type="hidden" name="id" value="<?= $u['id'] ?>">
                                        <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">
                                        <button type="submit" class="px-2 py-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-xs font-semibold transition">
                                            Delete
                                        </button>
                                    </form>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal: Add New User -->
<div id="addUserModal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-bold text-slate-900">Add New Admin User</h3>
            <button onclick="document.getElementById('addUserModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 text-xl font-bold p-1">&times;</button>
        </div>

        <form method="POST" class="space-y-3.5 text-xs">
            <input type="hidden" name="action" value="create_user">
            <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">

            <div>
                <label class="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input type="text" name="name" required placeholder="e.g. John Doe" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800">
            </div>

            <div>
                <label class="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input type="email" name="email" required placeholder="user@oakleafafrica.com" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800">
            </div>

            <div>
                <label class="block font-semibold text-slate-700 mb-1">Assigned Role (RBAC)</label>
                <select name="role" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 bg-white">
                    <option value="admin">Admin (Operational - View/Delete Inquiries)</option>
                    <option value="viewer">Viewer (Read-Only)</option>
                    <option value="superadmin">Superadmin (Full Control)</option>
                </select>
            </div>

            <div>
                <label class="block font-semibold text-slate-700 mb-1">Temporary Password</label>
                <input type="password" name="password" required placeholder="••••••••••••" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800">
            </div>

            <div class="pt-2 flex justify-end gap-2">
                <button type="button" onclick="document.getElementById('addUserModal').classList.add('hidden')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition">
                    Cancel
                </button>
                <button type="submit" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md shadow-emerald-600/20 transition">
                    Create User
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal: Edit User -->
<div id="editUserModal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-bold text-slate-900">Edit User &amp; Role</h3>
            <button onclick="document.getElementById('editUserModal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 text-xl font-bold p-1">&times;</button>
        </div>

        <form method="POST" class="space-y-3.5 text-xs">
            <input type="hidden" name="action" value="update_user">
            <input type="hidden" name="id" id="editUserId">
            <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">

            <div>
                <label class="block font-semibold text-slate-700 mb-1">User</label>
                <input type="text" id="editUserName" disabled class="w-full px-3 py-2 rounded-xl bg-slate-100 text-slate-500 border border-slate-200">
            </div>

            <div>
                <label class="block font-semibold text-slate-700 mb-1">Email</label>
                <input type="text" id="editUserEmail" disabled class="w-full px-3 py-2 rounded-xl bg-slate-100 text-slate-500 border border-slate-200">
            </div>

            <?php if ($currentUser['role'] === 'superadmin'): ?>
                <div>
                    <label class="block font-semibold text-slate-700 mb-1">Assigned Role</label>
                    <select name="role" id="editUserRole" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 bg-white">
                        <option value="viewer">Viewer (Read-Only)</option>
                        <option value="admin">Admin (Operational)</option>
                        <option value="superadmin">Superadmin (Full Control)</option>
                    </select>
                </div>
            <?php endif; ?>

            <div>
                <label class="block font-semibold text-slate-700 mb-1">Change Password (leave blank to keep current)</label>
                <input type="password" name="new_password" placeholder="New password" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800">
            </div>

            <div class="pt-2 flex justify-end gap-2">
                <button type="button" onclick="document.getElementById('editUserModal').classList.add('hidden')" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition">
                    Cancel
                </button>
                <button type="submit" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-md shadow-emerald-600/20 transition">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</div>

<script>
function openEditUserModal(user) {
    document.getElementById('editUserId').value = user.id;
    document.getElementById('editUserName').value = user.name;
    document.getElementById('editUserEmail').value = user.email;
    const roleSelect = document.getElementById('editUserRole');
    if (roleSelect) {
        roleSelect.value = user.role;
    }
    document.getElementById('editUserModal').classList.remove('hidden');
}
</script>

<?php
render_admin_footer();
?>
