<?php
require_once __DIR__ . '/auth.php';
$pdo = require __DIR__ . '/db.php';

if (current_user()) {
    header('Location: index.php');
    exit;
}

$error = '';
$redirect = $_GET['redirect'] ?? 'index.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = (string)($_POST['password'] ?? '');

    if ($email === '' || $password === '') {
        $error = 'Please enter both email and password.';
    } else {
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE email = :email LIMIT 1");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['admin_user'] = [
                'id' => (int)$user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role'],
            ];
            // Prevent session fixation
            session_regenerate_id(true);

            $target = !empty($_POST['redirect']) && strpos($_POST['redirect'], 'logout.php') === false ? $_POST['redirect'] : 'index.php';
            header("Location: {$target}");
            exit;
        } else {
            $error = 'Invalid email or password.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oakleaf Admin - Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    </style>
</head>
<body class="min-h-screen bg-[#0b1320] flex items-center justify-center p-4">
    <div class="w-full max-w-md">
        <!-- Logo / Brand Header -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center gap-3">
                <div class="h-11 w-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30">
                    O
                </div>
                <div class="text-left">
                    <h1 class="text-white text-xl font-bold tracking-tight">OAKLEAF ADMIN</h1>
                    <div class="flex items-center gap-1.5 mt-0.5">
                        <span class="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span class="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Superadmin Portal</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Login Card -->
        <div class="bg-white rounded-2xl p-8 shadow-2xl border border-slate-100">
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-slate-800">Sign in</h2>
                <p class="text-sm text-slate-500 mt-1">Access the Oakleaf admin dashboard and RBAC controls.</p>
            </div>

            <?php if (!empty($error)): ?>
                <div class="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-center gap-2">
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    <span><?= htmlspecialchars($error) ?></span>
                </div>
            <?php endif; ?>

            <form method="POST" action="login.php" class="space-y-4">
                <input type="hidden" name="redirect" value="<?= htmlspecialchars($redirect) ?>">

                <div>
                    <label class="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        required 
                        autofocus
                        value="<?= htmlspecialchars($_POST['email'] ?? '') ?>"
                        placeholder="yourname@oakleafafrica.com"
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 transition"
                    >
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        placeholder="••••••••••••"
                        class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 transition"
                    >
                </div>

                <button 
                    type="submit" 
                    class="w-full mt-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-lg shadow-emerald-600/30 active:scale-[0.99]"
                >
                    Sign In to Admin
                </button>
            </form>
        </div>

        <div class="text-center mt-6 text-xs text-slate-500">
            <a href="/" class="hover:text-emerald-400 transition">&larr; Return to Oakleaf Website</a>
        </div>
    </div>
</body>
</html>
