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

    $registrationId = $pdo->lastInsertId();

    $envPath = __DIR__ . '/../.env';
    $envVars = [];
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
                list($key, $value) = explode('=', $line, 2);
                $envVars[trim($key)] = trim($value);
            }
        }
    }

    $serviceId = $envVars['EMAILJS_SERVICE_ID'] ?? '';
    $templateId = $envVars['EMAILJS_TEMPLATE_ID'] ?? '';
    $publicKey = $envVars['EMAILJS_PUBLIC_KEY'] ?? '';

    if ($serviceId && $templateId && $publicKey) {
        $emailData = [
            'service_id' => $serviceId,
            'template_id' => $templateId,
            'user_id' => $publicKey,
            'template_params' => [
                'to_email' => 'entrevahub@gmail.com',
                'program_name' => 'Certified Trainer Program',
                'first_name' => $first_name,
                'last_name' => $last_name,
                'email' => $email,
                'phone' => $phone,
                'whatsapp' => $whatsapp ?: 'N/A',
                'organization' => $organization ?: 'N/A',
                'position' => $position ?: 'N/A',
                'registration_id' => $registrationId,
                'submitted_at' => date('Y-m-d H:i:s'),
            ],
        ];

        $ch = curl_init('https://api.emailjs.com/api/v1.0/email/send');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_exec($ch);
        curl_close($ch);
    } else {
        $to = 'entrevahub@gmail.com';
        $subject = 'You have received a registration - Certified Trainer Program';
        $plainMessage = "New Registration - Certified Trainer Program\n\n";
        $plainMessage .= "Name: {$first_name} {$last_name}\n";
        $plainMessage .= "Email: {$email}\n";
        $plainMessage .= "Phone: {$phone}\n";
        $plainMessage .= "WhatsApp: {$whatsapp}\n";
        $plainMessage .= "Organization: {$organization}\n";
        $plainMessage .= "Position: {$position}\n";
        $plainMessage .= "Registration ID: #{$registrationId}\n";
        $plainMessage .= "Submitted: " . date('Y-m-d H:i:s') . "\n";

        $headers = "From: Oakleaf Training & Consulting <noreply@oakleafafrica.com>\r\n";
        @mail($to, $subject, $plainMessage, $headers);
    }

    echo json_encode(['success' => true, 'id' => $registrationId]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error. Please try again later.']);
}
