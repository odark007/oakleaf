<?php
require_once __DIR__ . '/auth.php';

function render_admin_header($pageTitle, $activeNav = 'overview') {
    $user = current_user();
    $roleName = strtoupper($user['role'] ?? 'ADMIN');
    $badgeColor = ($user['role'] ?? '') === 'superadmin' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-blue-400 bg-blue-500/10 border-blue-500/20';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle) ?> - Oakleaf Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    </style>
</head>
<body class="bg-[#f8fafc] text-slate-800 antialiased min-h-screen flex">

    <!-- Sidebar -->
    <aside class="w-64 bg-[#0b1320] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800/80">
        <!-- Brand Header -->
        <div class="p-6 border-b border-slate-800/60">
            <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-500/30">
                    O
                </div>
                <div>
                    <h1 class="text-white font-bold text-base tracking-wider uppercase">HUB ADMIN</h1>
                    <div class="flex items-center gap-1.5 mt-0.5">
                        <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span class="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold"><?= $roleName ?> PORTAL</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex-1 px-4 py-6 space-y-1.5">
            <!-- Overview -->
            <a href="index.php" class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition <?= $activeNav === 'overview' ? 'bg-slate-800/90 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/40' ?>">
                <svg class="w-5 h-5 <?= $activeNav === 'overview' ? 'text-emerald-400' : 'text-slate-400' ?>" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
                <span>Overview</span>
            </a>

            <!-- Contact Form -->
            <a href="contacts.php" class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition <?= $activeNav === 'contacts' ? 'bg-slate-800/90 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/40' ?>">
                <svg class="w-5 h-5 <?= $activeNav === 'contacts' ? 'text-emerald-400' : 'text-slate-400' ?>" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>Contact Form</span>
            </a>

            <!-- Users / RBAC -->
            <a href="users.php" class="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition <?= $activeNav === 'users' ? 'bg-slate-800/90 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/40' ?>">
                <svg class="w-5 h-5 <?= $activeNav === 'users' ? 'text-emerald-400' : 'text-slate-400' ?>" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <span>Users</span>
            </a>
        </nav>

        <!-- Sidebar Footer / User Profile & Logout -->
        <div class="p-4 border-t border-slate-800/60 space-y-3">
            <div class="px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800/60">
                <div class="text-xs font-semibold text-white truncate"><?= htmlspecialchars($user['name'] ?? 'Admin') ?></div>
                <div class="text-[11px] text-slate-400 truncate"><?= htmlspecialchars($user['email'] ?? '') ?></div>
                <div class="mt-1.5 inline-block text-[10px] px-2 py-0.5 rounded-full border font-semibold <?= $badgeColor ?>">
                    <?= htmlspecialchars($user['role'] ?? 'admin') ?>
                </div>
            </div>

            <a href="logout.php" class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span>Sign Out</span>
            </a>
        </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <!-- Top App Bar -->
        <header class="bg-white border-b border-slate-200/80 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
                <h2 class="text-xl font-bold text-slate-800"><?= htmlspecialchars($pageTitle) ?></h2>
            </div>
            <div class="flex items-center gap-4">
                <a href="/" target="_blank" class="text-xs font-medium text-slate-500 hover:text-emerald-600 transition flex items-center gap-1">
                    <span>View Public Website</span>
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
                <div class="h-4 w-px bg-slate-200"></div>
                <div class="text-xs text-slate-400 font-mono">
                    <?= date('M d, Y') ?>
                </div>
            </div>
        </header>

        <!-- Body Content -->
        <div class="p-8">
<?php
}

function render_admin_footer() {
?>
        </div>
    </main>

</body>
</html>
<?php
}
