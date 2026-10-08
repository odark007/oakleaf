<?php
// Prevent direct access from browser
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'config.php') {
    http_response_code(403);
    exit('Direct access forbidden.');
}

return [
    'host' => 'localhost',
    'dbname' => 'your_database_name',
    'username' => 'your_database_user',
    'password' => 'your_database_password',
];
