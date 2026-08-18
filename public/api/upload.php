<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$cloud_name = getenv('CLOUDINARY_CLOUD_NAME') ?: 'dixbhnqnf';
$api_key = getenv('CLOUDINARY_API_KEY') ?: '913984349889251';
$api_secret = getenv('CLOUDINARY_API_SECRET') ?: 'pGPh6FyorqalsPQzKkTcgshrt-4';

$raw_input = file_get_contents('php://input');
$input = json_decode($raw_input, true);

$file = $input['file'] ?? null;
$folder = $input['folder'] ?? 'tsquadron/clients';

if (!$file) {
    http_response_code(400);
    echo json_encode(['error' => 'No file payload provided']);
    exit;
}

$timestamp = time();
$params_to_sign = "folder=" . $folder . "&timestamp=" . $timestamp . $api_secret;
$signature = sha1($params_to_sign);

$post_fields = [
    'file' => $file,
    'folder' => $folder,
    'api_key' => $api_key,
    'timestamp' => $timestamp,
    'signature' => $signature
];

$ch = curl_init("https://api.cloudinary.com/v1_1/{$cloud_name}/image/upload");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_fields));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($http_code);
echo $response;
