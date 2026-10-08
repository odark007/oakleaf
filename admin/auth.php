<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function current_user() {
    if (!isset($_SESSION['admin_user'])) {
        return null;
    }
    return $_SESSION['admin_user'];
}

function require_auth() {
    $user = current_user();
    if (!$user) {
        $returnUrl = urlencode($_SERVER['REQUEST_URI']);
        header("Location: login.php?redirect={$returnUrl}");
        exit;
    }
    return $user;
}

function require_superadmin() {
    $user = require_auth();
    if ($user['role'] !== 'superadmin') {
        http_response_code(403);
        die("<h1>403 Forbidden</h1><p>You need Superadmin privileges to access this page.</p><p><a href='index.php'>Return to Dashboard</a></p>");
    }
    return $user;
}

function has_role(...$roles) {
    $user = current_user();
    if (!$user) return false;
    return in_array($user['role'], $roles, true);
}

function csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], (string)$token);
}
