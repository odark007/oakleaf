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

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$organization = trim($_POST['organization'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name, email, and message are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
    exit;
}

if ($phone !== '' && !preg_match('/^\+?\d{7,15}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid phone number.']);
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

    $stmt = $pdo->prepare(
        'INSERT INTO contact_submissions (name, email, phone, organization, service, message, submitted_at)
         VALUES (:name, :email, :phone, :organization, :service, :message, NOW())'
    );

    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':organization' => $organization,
        ':service' => $service,
        ':message' => $message,
    ]);

    $submissionId = $pdo->lastInsertId();

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
                'program_name' => 'Contact Form Submission',
                'subject' => 'New Contact Form Submission',
                'first_name' => $name,
                'last_name' => '',
                'email' => $email,
                'phone' => $phone ?: 'N/A',
                'whatsapp' => 'N/A',
                'organization' => $organization ?: 'N/A',
                'position' => 'N/A',
                'registration_id' => $submissionId,
                'submitted_at' => date('Y-m-d H:i:s'),
                'service' => $service ?: 'N/A',
                'message' => $message,
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
        $subject = 'New Contact Form Submission';
        $plainMessage = "New Contact Form Submission\n\n";
        $plainMessage .= "Name: {$name}\n";
        $plainMessage .= "Email: {$email}\n";
        $plainMessage .= "Phone: {$phone}\n";
        $plainMessage .= "Organization: {$organization}\n";
        $plainMessage .= "Service: {$service}\n";
        $plainMessage .= "Message: {$message}\n";
        $plainMessage .= "Submission ID: #{$submissionId}\n";
        $plainMessage .= "Submitted: " . date('Y-m-d H:i:s') . "\n";

        $headers = "From: noreply@oakleafafrica.com\r\n";
        $headers .= "Reply-To: {$email}\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        @mail($to, $subject, $plainMessage, $headers);
    }

    echo json_encode(['success' => true, 'id' => $submissionId]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error. Please try again later.']);
}
