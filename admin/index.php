<?php
require_once __DIR__ . '/auth.php';
$pdo = require __DIR__ . '/db.php';
$user = require_auth();

// Fetch statistics
$totalSubmissions = 0;
$monthSubmissions = 0;
$totalUsers = 0;
$recentSubmissions = [];
$serviceBreakdown = [];

try {
    $stmt = $pdo->query("SELECT COUNT(*) FROM contact_submissions");
    $totalSubmissions = (int)$stmt->fetchColumn();

    $stmt = $pdo->query("SELECT COUNT(*) FROM contact_submissions WHERE submitted_at >= DATE_FORMAT(NOW() ,'%Y-%m-01')");
    $monthSubmissions = (int)$stmt->fetchColumn();

    $stmt = $pdo->query("SELECT COUNT(*) FROM admin_users");
    $totalUsers = (int)$stmt->fetchColumn();

    $stmt = $pdo->query("SELECT * FROM contact_submissions ORDER BY submitted_at DESC LIMIT 6");
    $recentSubmissions = $stmt->fetchAll();

    $stmt = $pdo->query("SELECT COALESCE(NULLIF(service, ''), 'General Inquiry') as service_name, COUNT(*) as cnt FROM contact_submissions GROUP BY service_name ORDER BY cnt DESC LIMIT 5");
    $serviceBreakdown = $stmt->fetchAll();
} catch (PDOException $e) {
    // Graceful fallback
}

require_once __DIR__ . '/layout.php';
render_admin_header('Overview', 'overview');
?>

<div class="max-w-7xl mx-auto space-y-8">
    <!-- Header Hero -->
    <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">System Overview</h1>
        <p class="text-sm text-slate-500 mt-1">Live performance and contact activity for Oakleaf Training & Consulting.</p>
    </div>

    <!-- 4 Stats Cards matching screenshot -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Stat 1 -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm hover:shadow transition">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
            </div>
            <div class="text-xs uppercase font-bold tracking-wider text-slate-400">Total Inquiries</div>
            <div class="text-3xl font-extrabold text-slate-900 mt-1.5"><?= number_format($totalSubmissions) ?></div>
        </div>

        <!-- Stat 2 -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm hover:shadow transition">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
            </div>
            <div class="text-xs uppercase font-bold tracking-wider text-slate-400">This Month</div>
            <div class="text-3xl font-extrabold text-slate-900 mt-1.5"><?= number_format($monthSubmissions) ?></div>
        </div>

        <!-- Stat 3 -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm hover:shadow transition">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
            </div>
            <div class="text-xs uppercase font-bold tracking-wider text-slate-400">Services Active</div>
            <div class="text-3xl font-extrabold text-slate-900 mt-1.5"><?= count($serviceBreakdown) ?></div>
        </div>

        <!-- Stat 4 -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm hover:shadow transition">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
            </div>
            <div class="text-xs uppercase font-bold tracking-wider text-slate-400">Admin Staff</div>
            <div class="text-3xl font-extrabold text-slate-900 mt-1.5"><?= number_format($totalUsers) ?></div>
        </div>
    </div>

    <!-- Two Columns Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Activity (2 cols) -->
        <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-slate-800 font-bold text-lg">
                    <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>Recent Inquiries</span>
                </div>
                <a href="contacts.php" class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition">
                    View All &rarr;
                </a>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200/70 shadow-sm divide-y divide-slate-100 overflow-hidden">
                <?php if (empty($recentSubmissions)): ?>
                    <div class="p-12 text-center">
                        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                        </div>
                        <p class="text-sm font-medium text-slate-700">No contact inquiries yet</p>
                        <p class="text-xs text-slate-400 mt-1">Form submissions from the website will appear here in real time.</p>
                    </div>
                <?php else: ?>
                    <?php foreach ($recentSubmissions as $row): ?>
                        <div class="p-4 sm:p-5 flex items-start gap-4 hover:bg-slate-50/60 transition">
                            <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-baseline justify-between gap-2">
                                    <h4 class="text-sm font-bold text-slate-800 truncate"><?= htmlspecialchars($row['name']) ?></h4>
                                    <span class="text-xs text-slate-400 font-mono shrink-0"><?= date('M d, Y', strtotime($row['submitted_at'])) ?></span>
                                </div>
                                <div class="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                                    <span><?= htmlspecialchars($row['email']) ?></span>
                                    <?php if (!empty($row['phone'])): ?>
                                        <span class="text-slate-300">•</span>
                                        <span><?= htmlspecialchars($row['phone']) ?></span>
                                    <?php endif; ?>
                                    <?php if (!empty($row['organization'])): ?>
                                        <span class="text-slate-300">•</span>
                                        <span class="font-medium text-slate-700"><?= htmlspecialchars($row['organization']) ?></span>
                                    <?php endif; ?>
                                </div>
                                <p class="text-xs text-slate-600 mt-2 line-clamp-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    <?= htmlspecialchars($row['message']) ?>
                                </p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>

        <!-- Right Side: Top Services & Quick Action (1 col) -->
        <div class="space-y-6">
            <!-- Services Breakdown -->
            <div class="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm space-y-4">
                <div class="flex items-center gap-2 text-slate-800 font-bold text-base">
                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    <span>Interest by Service</span>
                </div>

                <?php if (empty($serviceBreakdown)): ?>
                    <p class="text-xs text-slate-400 py-4 text-center">No service data available yet.</p>
                <?php else: ?>
                    <div class="space-y-3 pt-2">
                        <?php foreach ($serviceBreakdown as $svc): 
                            $pct = $totalSubmissions > 0 ? round(($svc['cnt'] / $totalSubmissions) * 100) : 0;
                        ?>
                            <div>
                                <div class="flex justify-between text-xs font-medium text-slate-700 mb-1">
                                    <span class="truncate"><?= htmlspecialchars(ucwords(str_replace('-', ' ', $svc['service_name']))) ?></span>
                                    <span class="font-bold text-slate-900"><?= $svc['cnt'] ?> (<?= $pct ?>%)</span>
                                </div>
                                <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                    <div class="bg-emerald-500 h-2 rounded-full" style="width: <?= $pct ?>%"></div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Quick Info Card -->
            <div class="bg-[#0b1320] text-white rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
                <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <h3 class="font-bold text-sm text-emerald-400 tracking-wide uppercase">Admin Access</h3>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                    Signed in as <strong><?= htmlspecialchars($user['email']) ?></strong> with <strong><?= strtoupper($user['role']) ?></strong> role privileges.
                </p>
                <div class="pt-2 flex flex-col gap-2">
                    <a href="contacts.php" class="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl text-center transition">
                        View All Submissions
                    </a>
                    <?php if ($user['role'] === 'superadmin'): ?>
                        <a href="users.php" class="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl text-center transition shadow-lg shadow-emerald-600/30">
                            Manage Users & RBAC
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
render_admin_footer();
?>
