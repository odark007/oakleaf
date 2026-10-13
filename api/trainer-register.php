<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$config = require __DIR__ . '/config.php';
$host = $config['host'];
$dbname = $config['dbname'];
$username = $config['username'];
$password = $config['password'];

$first_name = trim($_POST['first_name'] ?? '');
$last_name = trim($_POST['last_name'] ?? '');
$organization = trim($_POST['organization'] ?? '');
$position = trim($_POST['position'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$whatsapp = trim($_POST['whatsapp'] ?? '');
$email = trim($_POST['email'] ?? '');

if ($first_name === '' || $last_name === '' || $email === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'First name, last name, email, and phone are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
    exit;
}

if (!preg_match('/^\+?\d{7,15}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid phone number.']);
    exit;
}

if ($whatsapp !== '' && !preg_match('/^\+?\d{7,15}$/', $whatsapp)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid WhatsApp number.']);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    $pdo->exec("CREATE TABLE IF NOT EXISTS trainer_registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        organization VARCHAR(255) DEFAULT NULL,
        position VARCHAR(255) DEFAULT NULL,
        phone VARCHAR(20) NOT NULL,
        whatsapp VARCHAR(20) DEFAULT NULL,
        email VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    $stmt = $pdo->prepare(
        'INSERT INTO trainer_registrations (first_name, last_name, organization, position, phone, whatsapp, email, submitted_at)
         VALUES (:first_name, :last_name, :organization, :position, :phone, :whatsapp, :email, NOW())'
    );

    $stmt->execute([
        ':first_name' => $first_name,
        ':last_name' => $last_name,
        ':organization' => $organization,
        ':position' => $position,
        ':phone' => $phone,
        ':whatsapp' => $whatsapp,
        ':email' => $email,
    ]);

    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error. Please try again later.']);
}
