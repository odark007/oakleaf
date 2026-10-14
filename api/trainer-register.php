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

$full_name = trim($_POST['full_name'] ?? '');
if ($full_name !== '') {
    $parts = preg_split('/\s+/', $full_name, 2);
    $first_name = $parts[0];
    $last_name = $parts[1] ?? '';
} else {
    $first_name = trim($_POST['first_name'] ?? '');
    $last_name = trim($_POST['last_name'] ?? '');
    $full_name = trim($first_name . ' ' . $last_name);
}
$organization = trim($_POST['organization'] ?? '');
$position = trim($_POST['position'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$whatsapp = trim($_POST['whatsapp'] ?? '');
$email = trim($_POST['email'] ?? '');

$knownPrograms = [
    'certified-trainer' => 'Certified Trainer Program',
    'managing-people' => 'Managing People Effectively',
];
$program = trim($_POST['program'] ?? 'certified-trainer');
if (!isset($knownPrograms[$program])) {
    $program = 'certified-trainer';
}
$programName = $knownPrograms[$program];

if ($first_name === '' || $email === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Full name, email, and phone are required.']);
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
        program VARCHAR(100) NOT NULL DEFAULT 'certified-trainer',
        status VARCHAR(50) DEFAULT 'new',
        submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    $programCol = $pdo->query("SHOW COLUMNS FROM trainer_registrations LIKE 'program'")->fetchAll();
    if (count($programCol) === 0) {
        $pdo->exec("ALTER TABLE trainer_registrations ADD COLUMN program VARCHAR(100) NOT NULL DEFAULT 'certified-trainer' AFTER email");
    }

    $stmt = $pdo->prepare(
        'INSERT INTO trainer_registrations (first_name, last_name, organization, position, phone, whatsapp, email, program, submitted_at)
         VALUES (:first_name, :last_name, :organization, :position, :phone, :whatsapp, :email, :program, NOW())'
    );

    $stmt->execute([
        ':first_name' => $first_name,
        ':last_name' => $last_name,
        ':organization' => $organization,
        ':position' => $position,
        ':phone' => $phone,
        ':whatsapp' => $whatsapp,
        ':email' => $email,
        ':program' => $program,
    ]);

    $registrationId = $pdo->lastInsertId();

    $envPath = __DIR__ . '/../.env';
    $envVars = [];
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || strpos($line, '#') === 0) {
                continue;
            }
            if (strpos($line, '=') !== false) {
                list($key, $value) = explode('=', $line, 2);
                $envVars[trim($key)] = trim($value, " \t\r\n\"'");
            }
        }
    }

    $serviceId = $envVars['EMAILJS_SERVICE_ID'] ?? '';
    $templateId = $envVars['EMAILJS_TEMPLATE_ID'] ?? '';
    $publicKey = $envVars['EMAILJS_PUBLIC_KEY'] ?? '';
    $privateKey = $envVars['EMAILJS_PRIVATE_KEY'] ?? '';

    $emailSent = false;

    if ($serviceId && $templateId && $publicKey) {
        $emailData = [
            'service_id' => $serviceId,
            'template_id' => $templateId,
            'user_id' => $publicKey,
            'accessToken' => $privateKey,
            'template_params' => [
                'to_email' => 'entrevahub@gmail.com',
                'program_name' => $programName,
                'subject' => 'You have received a registration - ' . $programName,
                'name' => $full_name,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'email' => $email,
                'phone' => $phone,
                'whatsapp' => $whatsapp ?: 'N/A',
                'organization' => $organization ?: 'N/A',
                'position' => $position ?: 'N/A',
                'registration_id' => $registrationId,
                'submitted_at' => date('Y-m-d H:i:s'),
                'service' => 'N/A',
                'message' => 'N/A',
            ],
        ];

        $ch = curl_init('https://api.emailjs.com/api/v1.0/email/send');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36');
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200) {
            $emailSent = true;
        }
    }

    if (!$emailSent) {
        $to = 'entrevahub@gmail.com';
        $subject = 'You have received a registration - ' . $programName;
        $plainMessage = "New Registration - {$programName}\n\n";
        $plainMessage .= "Program: {$programName}\n";
        $plainMessage .= "Name: {$first_name} {$last_name}\n";
        $plainMessage .= "Email: {$email}\n";
        $plainMessage .= "Phone: {$phone}\n";
        $plainMessage .= "WhatsApp: {$whatsapp}\n";
        $plainMessage .= "Organization: {$organization}\n";
        $plainMessage .= "Position: {$position}\n";
        $plainMessage .= "Registration ID: #{$registrationId}\n";
        $plainMessage .= "Submitted: " . date('Y-m-d H:i:s') . "\n";

        $headers = "From: Oakleaf Training & Consulting <noreply@oakleafafrica.com>\r\n";
        $headers .= "Reply-To: {$email}\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        @mail($to, $subject, $plainMessage, $headers);
    }

    echo json_encode(['success' => true, 'id' => $registrationId]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error. Please try again later.']);
}
