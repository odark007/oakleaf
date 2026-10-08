<?php
$config = require __DIR__ . '/config.php';

try {
    $pdo = new PDO(
        "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4",
        $config['username'],
        $config['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die("Database connection failed: " . htmlspecialchars($e->getMessage()));
}

// Auto-migrate tables
try {
    // 1. Ensure contact_submissions table exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) DEFAULT NULL,
        organization VARCHAR(255) DEFAULT NULL,
        service VARCHAR(255) DEFAULT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 2. Ensure admin_users table exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('superadmin', 'admin', 'viewer') NOT NULL DEFAULT 'admin',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 3. Ensure superadmin user exists
    $superadminEmail = 'gofrance01@gmail.com';
    $stmt = $pdo->prepare("SELECT id FROM admin_users WHERE email = :email LIMIT 1");
    $stmt->execute([':email' => $superadminEmail]);
    $superadmin = $stmt->fetch();

    if (!$superadmin) {
        $defaultPassword = password_hash('OakleafAdmin2026!', PASSWORD_BCRYPT);
        $insert = $pdo->prepare("INSERT INTO admin_users (name, email, password, role) VALUES (:name, :email, :password, :role)");
        $insert->execute([
            ':name' => 'Godwin France',
            ':email' => $superadminEmail,
            ':password' => $defaultPassword,
            ':role' => 'superadmin',
        ]);
    }
} catch (PDOException $e) {
    // Log or continue if already created
}

return $pdo;
