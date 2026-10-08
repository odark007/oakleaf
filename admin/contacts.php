<?php
require_once __DIR__ . '/auth.php';
$pdo = require __DIR__ . '/db.php';
$user = require_auth();

// Handle CSV Export
if (isset($_GET['action']) && $_GET['action'] === 'export_csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=oakleaf_contact_submissions_' . date('Y-m-d') . '.csv');
    $output = fopen('php://output', 'w');
    fputcsv($output, ['ID', 'Date', 'Name', 'Email', 'Phone', 'Organization', 'Service', 'Message']);

    $stmt = $pdo->query("SELECT id, submitted_at, name, email, phone, organization, service, message FROM contact_submissions ORDER BY submitted_at DESC");
    while ($row = $stmt->fetch()) {
        fputcsv($output, [
            $row['id'],
            $row['submitted_at'],
            $row['name'],
            $row['email'],
            $row['phone'],
            $row['organization'],
            $row['service'],
            $row['message']
        ]);
    }
    fclose($output);
    exit;
}

// Handle Delete (superadmin or admin only)
$alert = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
    if (!has_role('superadmin', 'admin')) {
        $alert = 'You do not have permission to delete inquiries.';
    } elseif (!verify_csrf($_POST['csrf_token'] ?? '')) {
        $alert = 'Invalid security token.';
    } else {
        $id = (int)($_POST['id'] ?? 0);
        $stmt = $pdo->prepare("DELETE FROM contact_submissions WHERE id = :id");
        $stmt->execute([':id' => $id]);
        header("Location: contacts.php?deleted=1");
        exit;
    }
}

// Search & Filter
$search = trim($_GET['search'] ?? '');
$serviceFilter = trim($_GET['service'] ?? '');

$sql = "SELECT * FROM contact_submissions WHERE 1=1";
$params = [];

if ($search !== '') {
    $sql .= " AND (name LIKE :s1 OR email LIKE :s2 OR phone LIKE :s3 OR organization LIKE :s4 OR message LIKE :s5)";
    $term = "%{$search}%";
    $params[':s1'] = $term;
    $params[':s2'] = $term;
    $params[':s3'] = $term;
    $params[':s4'] = $term;
    $params[':s5'] = $term;
}

if ($serviceFilter !== '') {
    $sql .= " AND service = :svc";
    $params[':svc'] = $serviceFilter;
}

$sql .= " ORDER BY submitted_at DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$submissions = $stmt->fetchAll();

// Get unique services for filter dropdown
$servicesList = $pdo->query("SELECT DISTINCT service FROM contact_submissions WHERE service IS NOT NULL AND service != ''")->fetchAll(PDO::FETCH_COLUMN);

require_once __DIR__ . '/layout.php';
render_admin_header('Contact Form Submissions', 'contacts');
?>

<div class="max-w-7xl mx-auto space-y-6">
    <!-- Header with Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Contact Submissions</h1>
            <p class="text-sm text-slate-500 mt-1">Review all contact inquiries received through the website contact form.</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="contacts.php?action=export_csv" class="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl shadow-sm transition">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Export CSV</span>
            </a>
        </div>
    </div>

    <?php if (isset($_GET['deleted'])): ?>
        <div class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
            Contact submission successfully deleted.
        </div>
    <?php endif; ?>

    <?php if (!empty($alert)): ?>
        <div class="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-medium">
            <?= htmlspecialchars($alert) ?>
        </div>
    <?php endif; ?>

    <!-- Search & Filters Bar -->
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

            <?php if (!empty($servicesList)): ?>
                <select 
                    name="service" 
                    class="px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700 bg-white"
                >
                    <option value="">All Services</option>
                    <?php foreach ($servicesList as $svc): ?>
                        <option value="<?= htmlspecialchars($svc) ?>" <?= $serviceFilter === $svc ? 'selected' : '' ?>>
                            <?= htmlspecialchars(ucwords(str_replace('-', ' ', $svc))) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            <?php endif; ?>

            <button type="submit" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition">
                Filter
            </button>

            <?php if ($search !== '' || $serviceFilter !== ''): ?>
                <a href="contacts.php" class="px-3 py-2.5 text-xs text-slate-500 hover:text-slate-800 self-center">
                    Clear
                </a>
            <?php endif; ?>
        </form>
    </div>

    <!-- Table Container -->
    <div class="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <?php if (empty($submissions)): ?>
            <div class="p-16 text-center">
                <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                </div>
                <h3 class="text-sm font-bold text-slate-800">No contact submissions found</h3>
                <p class="text-xs text-slate-500 mt-1">There are no records matching your query.</p>
            </div>
        <?php else: ?>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead class="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                        <tr>
                            <th class="py-3.5 px-4">Date</th>
                            <th class="py-3.5 px-4">Name</th>
                            <th class="py-3.5 px-4">Contact</th>
                            <th class="py-3.5 px-4">Organization</th>
                            <th class="py-3.5 px-4">Service</th>
                            <th class="py-3.5 px-4">Message</th>
                            <th class="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 text-slate-700">
                        <?php foreach ($submissions as $row): ?>
                            <tr class="hover:bg-slate-50/70 transition">
                                <td class="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                                    <?= date('M d, Y H:i', strtotime($row['submitted_at'])) ?>
                                </td>
                                <td class="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                                    <?= htmlspecialchars($row['name']) ?>
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
                                <td class="py-3.5 px-4 whitespace-nowrap">
                                    <span class="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                                        <?= htmlspecialchars(ucwords(str_replace('-', ' ', $row['service'] ?: 'General'))) ?>
                                    </span>
                                </td>
                                <td class="py-3.5 px-4 max-w-xs truncate text-slate-500">
                                    <?= htmlspecialchars($row['message']) ?>
                                </td>
                                <td class="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                                    <button 
                                        type="button" 
                                        onclick="openMessageModal(<?= htmlspecialchars(json_encode($row), ENT_QUOTES, 'UTF-8') ?>)"
                                        class="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition"
                                    >
                                        View
                                    </button>
                                    <?php if (has_role('superadmin', 'admin')): ?>
                                        <form method="POST" class="inline-block" onsubmit="return confirm('Are you sure you want to delete this submission?');">
                                            <input type="hidden" name="action" value="delete">
                                            <input type="hidden" name="id" value="<?= $row['id'] ?>">
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
            <div class="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>Showing <?= count($submissions) ?> record(s)</span>
            </div>
        <?php endif; ?>
    </div>
</div>

<!-- Modal for viewing full message details -->
<div id="messageModal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
                <h3 id="modalName" class="text-lg font-bold text-slate-900"></h3>
                <p id="modalDate" class="text-xs text-slate-400 font-mono mt-0.5"></p>
            </div>
            <button onclick="closeMessageModal()" class="text-slate-400 hover:text-slate-600 text-xl font-bold p-1">&times;</button>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>
                <span class="text-slate-400 block font-semibold uppercase text-[10px]">Email</span>
                <a id="modalEmail" href="#" class="font-medium text-emerald-600 hover:underline"></a>
            </div>
            <div>
                <span class="text-slate-400 block font-semibold uppercase text-[10px]">Phone</span>
                <span id="modalPhone" class="font-medium text-slate-800"></span>
            </div>
            <div>
                <span class="text-slate-400 block font-semibold uppercase text-[10px]">Organization</span>
                <span id="modalOrg" class="font-medium text-slate-800"></span>
            </div>
            <div>
                <span class="text-slate-400 block font-semibold uppercase text-[10px]">Service</span>
                <span id="modalService" class="font-medium text-slate-800"></span>
            </div>
        </div>

        <div>
            <span class="text-slate-400 block font-semibold uppercase text-[10px] mb-1.5">Message</span>
            <div id="modalBody" class="text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed"></div>
        </div>

        <div class="pt-2 flex justify-between items-center">
            <a id="modalReplyBtn" href="#" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition">
                Reply via Email
            </a>
            <button onclick="closeMessageModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition">
                Close
            </button>
        </div>
    </div>
</div>

<script>
function openMessageModal(data) {
    document.getElementById('modalName').textContent = data.name;
    document.getElementById('modalDate').textContent = 'Submitted on: ' + data.submitted_at;
    
    const emailLink = document.getElementById('modalEmail');
    emailLink.textContent = data.email;
    emailLink.href = 'mailto:' + encodeURIComponent(data.email);
    
    document.getElementById('modalPhone').textContent = data.phone || '—';
    document.getElementById('modalOrg').textContent = data.organization || '—';
    document.getElementById('modalService').textContent = data.service || 'General Inquiry';
    document.getElementById('modalBody').textContent = data.message;
    
    document.getElementById('modalReplyBtn').href = 'mailto:' + encodeURIComponent(data.email) + '?subject=' + encodeURIComponent('RE: Oakleaf Inquiry from ' + data.name);
    
    document.getElementById('messageModal').classList.remove('hidden');
}

function closeMessageModal() {
    document.getElementById('messageModal').classList.add('hidden');
}

document.getElementById('messageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMessageModal();
    }
});
</script>

<?php
render_admin_footer();
?>
