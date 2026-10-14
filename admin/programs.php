<?php
require_once __DIR__ . '/auth.php';
$pdo = require __DIR__ . '/db.php';
$user = require_auth();

$alert = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
    if (!has_role('superadmin', 'admin')) {
        $alert = 'You do not have permission to delete registrations.';
    } elseif (!verify_csrf($_POST['csrf_token'] ?? '')) {
        $alert = 'Invalid security token.';
    } else {
        $id = (int)($_POST['id'] ?? 0);
        $stmt = $pdo->prepare("DELETE FROM trainer_registrations WHERE id = :id");
        $stmt->execute([':id' => $id]);
        header("Location: programs.php?deleted=1");
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_status') {
    if (!has_role('superadmin', 'admin')) {
        $alert = 'You do not have permission to update status.';
    } elseif (!verify_csrf($_POST['csrf_token'] ?? '')) {
        $alert = 'Invalid security token.';
    } else {
        $id = (int)($_POST['id'] ?? 0);
        $status = $_POST['status'] ?? 'new';
        $stmt = $pdo->prepare("UPDATE trainer_registrations SET status = :status WHERE id = :id");
        $stmt->execute([':status' => $status, ':id' => $id]);
        header("Location: programs.php?updated=1");
        exit;
    }
}

$programLabels = [
    'certified-trainer' => 'Certified Trainer',
    'managing-people' => 'Managing People',
];

$hasProgramCol = false;
try {
    $colCheck = $pdo->query("SHOW COLUMNS FROM trainer_registrations LIKE 'program'")->fetchAll();
    $hasProgramCol = count($colCheck) > 0;
} catch (Exception $e) {
    $hasProgramCol = false;
}

if (isset($_GET['action']) && $_GET['action'] === 'export_csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=oakleaf_trainer_registrations_' . date('Y-m-d') . '.csv');
    $output = fopen('php://output', 'w');
    fputcsv($output, ['ID', 'Date', 'Program', 'First Name', 'Last Name', 'Email', 'Phone', 'WhatsApp', 'Organization', 'Position', 'Status']);

    $stmt = $pdo->query("SELECT * FROM trainer_registrations ORDER BY submitted_at DESC");
    while ($row = $stmt->fetch()) {
        $prog = $row['program'] ?? 'certified-trainer';
        fputcsv($output, [
            $row['id'],
            $row['submitted_at'],
            $programLabels[$prog] ?? $prog,
            $row['first_name'],
            $row['last_name'],
            $row['email'],
            $row['phone'],
            $row['whatsapp'],
            $row['organization'],
            $row['position'],
            $row['status'],
        ]);
    }
    fclose($output);
    exit;
}

$search = trim($_GET['search'] ?? '');
$programFilter = trim($_GET['program'] ?? '');
$sql = "SELECT * FROM trainer_registrations WHERE 1=1";
$params = [];
if ($search !== '') {
    $sql .= " AND (first_name LIKE :s1 OR last_name LIKE :s2 OR email LIKE :s3 OR phone LIKE :s4 OR organization LIKE :s5)";
    $term = "%{$search}%";
    $params[':s1'] = $term;
    $params[':s2'] = $term;
    $params[':s3'] = $term;
    $params[':s4'] = $term;
    $params[':s5'] = $term;
}
if ($programFilter !== '' && $hasProgramCol) {
    $sql .= " AND program = :program";
    $params[':program'] = $programFilter;
}
$sql .= " ORDER BY submitted_at DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$registrations = $stmt->fetchAll();

$csrf_token = csrf_token();

require_once __DIR__ . '/layout.php';
render_admin_header('Programs Registration', 'programs');
?>

<div class="max-w-7xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Programs Registration</h1>
            <p class="text-sm text-slate-500 mt-1">Review all registrations received across Oakleaf programs.</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="programs.php?action=export_csv" class="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl shadow-sm transition">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Export CSV</span>
            </a>
        </div>
    </div>

    <?php if (isset($_GET['deleted'])): ?>
        <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
            Registration successfully deleted.
        </div>
    <?php endif; ?>

    <?php if (isset($_GET['updated'])): ?>
        <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
            Status updated successfully.
        </div>
    <?php endif; ?>

    <?php if (!empty($alert)): ?>
        <div class="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-medium">
            <?= htmlspecialchars($alert) ?>
        </div>
    <?php endif; ?>

    <div class="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <form method="GET" class="flex-1 w-full flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
                <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input
                    type="text"
                    name="search"
                    value="<?= htmlspecialchars($search) ?>"
                    placeholder="Search by name, email, phone, organization..."
                    class="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                >
            </div>

            <select
                name="program"
                class="px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 bg-white font-semibold"
            >
                <option value="">All programs</option>
                <?php foreach ($programLabels as $slug => $label): ?>
                    <option value="<?= $slug ?>" <?= $programFilter === $slug ? 'selected' : '' ?>><?= htmlspecialchars($label) ?></option>
                <?php endforeach; ?>
            </select>

            <button type="submit" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition">
                Filter
            </button>

            <?php if ($search !== ''): ?>
                <a href="programs.php" class="px-3 py-2.5 text-xs text-slate-500 hover:text-slate-800 self-center">
                    Clear
                </a>
            <?php endif; ?>
        </form>
    </div>

    <div class="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <?php if (empty($registrations)): ?>
            <div class="p-16 text-center">
                <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                </div>
                <h3 class="text-sm font-bold text-slate-800">No registrations found</h3>
                <p class="text-xs text-slate-500 mt-1">There are no program registrations matching your query.</p>
            </div>
        <?php else: ?>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                        <tr>
                            <th class="py-3.5 px-4">Date</th>
                            <th class="py-3.5 px-4">Program</th>
                            <th class="py-3.5 px-4">Name</th>
                            <th class="py-3.5 px-4">Contact</th>
                            <th class="py-3.5 px-4">Organization</th>
                            <th class="py-3.5 px-4">Position</th>
                            <th class="py-3.5 px-4">Status</th>
                            <th class="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-slate-700">
                        <?php foreach ($registrations as $row): ?>
                            <tr class="hover:bg-slate-50/70 transition">
                                <td class="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                                    <?= date('M d, Y H:i', strtotime($row['submitted_at'])) ?>
                                </td>
                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <?php $prog = $row['program'] ?? 'certified-trainer'; ?>
                                    <span class="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold <?= $prog === 'managing-people' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700' ?>">
                                        <?= htmlspecialchars($programLabels[$prog] ?? $prog) ?>
                                    </span>
                                </td>
                                <td class="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                                    <?= htmlspecialchars($row['first_name'] . ' ' . $row['last_name']) ?>
                                </td>
                                <td class="py-3.5 px-4 whitespace-nowrap space-y-0.5">
                                    <div><a href="mailto:<?= htmlspecialchars($row['email']) ?>" class="text-emerald-600 hover:underline"><?= htmlspecialchars($row['email']) ?></a></div>
                                    <?php if (!empty($row['phone'])): ?>
                                        <div class="text-[11px] text-slate-400">
                                            <a href="tel:<?= htmlspecialchars($row['phone']) ?>" class="hover:text-slate-600"><?= htmlspecialchars($row['phone']) ?></a>
                                        </div>
                                    <?php endif; ?>
                                </td>
                                <td class="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                                    <?= htmlspecialchars($row['organization'] ?: '—') ?>
                                </td>
                                <td class="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                                    <?= htmlspecialchars($row['position'] ?: '—') ?>
                                </td>
                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold <?= $row['status'] === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : ($row['status'] === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700') ?>">
                                        <?= htmlspecialchars(ucfirst($row['status'])) ?>
                                    </span>
                                </td>
                                <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                                    <form method="POST" class="inline-block" onsubmit="return confirm('Update status?')">
                                        <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">
                                        <input type="hidden" name="action" value="update_status">
                                        <input type="hidden" name="id" value="<?= $row['id'] ?>">
                                        <select name="status" onchange="this.form.submit()" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                                            <option value="new" <?= $row['status'] === 'new' ? 'selected' : '' ?>>New</option>
                                            <option value="contacted" <?= $row['status'] === 'contacted' ? 'selected' : '' ?>>Contacted</option>
                                            <option value="confirmed" <?= $row['status'] === 'confirmed' ? 'selected' : '' ?>>Confirmed</option>
                                            <option value="cancelled" <?= $row['status'] === 'cancelled' ? 'selected' : '' ?>>Cancelled</option>
                                        </select>
                                    </form>
                                    <?php if (has_role('superadmin', 'admin')): ?>
                                        <form method="POST" class="inline-block" onsubmit="return confirm('Are you sure you want to delete this registration?');">
                                            <input type="hidden" name="action" value="delete">
                                            <input type="hidden" name="id" value="<?= $row['id'] ?>">
                                            <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">
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
            <div class="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>Showing <?= count($registrations) ?> record(s)</span>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php
render_admin_footer();
