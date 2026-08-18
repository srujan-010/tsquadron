<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db_file = __DIR__ . '/clients_db.json';
$seed_file = __DIR__ . '/../../data/clients.json';

function get_clients($db_file, $seed_file) {
    if (file_exists($db_file)) {
        $content = file_get_contents($db_file);
        $data = json_decode($content, true);
        if (is_array($data) && count($data) > 0) {
            return $data;
        }
    }
    if (file_exists($seed_file)) {
        $content = file_get_contents($seed_file);
        $data = json_decode($content, true);
        if (is_array($data) && count($data) > 0) {
            file_put_contents($db_file, json_encode($data, JSON_PRETTY_PRINT));
            return $data;
        }
    }
    return [];
}

function save_clients($db_file, $clients) {
    usort($clients, function($a, $b) {
        return ($a['displayOrder'] ?? 0) - ($b['displayOrder'] ?? 0);
    });
    file_put_contents($db_file, json_encode($clients, JSON_PRETTY_PRINT));
    return $clients;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$id_param = $_GET['id'] ?? null;
$input = json_decode(file_get_contents('php://input'), true);

$clients = get_clients($db_file, $seed_file);

if ($method === 'GET') {
    $active_only = isset($_GET['active']) && $_GET['active'] === 'true' && !isset($_GET['all']);
    $result = $clients;
    if ($active_only) {
        $result = array_values(array_filter($clients, function($c) {
            return ($c['isActive'] ?? true) !== false;
        }));
    }
    usort($result, function($a, $b) {
        return ($a['displayOrder'] ?? 0) - ($b['displayOrder'] ?? 0);
    });
    echo json_encode($result);
    exit;
}

if ($method === 'POST' && $action === 'reorder') {
    if (is_array($input)) {
        save_clients($db_file, $input);
        echo json_encode(['success' => true, 'clients' => $input]);
        exit;
    }
}

if ($method === 'POST') {
    if (!empty($input)) {
        $max_order = 0;
        foreach ($clients as $c) {
            if (isset($c['displayOrder']) && $c['displayOrder'] > $max_order) {
                $max_order = $c['displayOrder'];
            }
        }
        $new_client = [
            'id' => $input['id'] ?? round(microtime(true) * 1000),
            'name' => trim($input['name'] ?? ''),
            'logoUrl' => trim($input['logoUrl'] ?? ''),
            'displayOrder' => isset($input['displayOrder']) ? (int)$input['displayOrder'] : $max_order + 1,
            'isActive' => isset($input['isActive']) ? (bool)$input['isActive'] : true,
            'createdAt' => date('c'),
            'updatedAt' => date('c')
        ];
        $clients[] = $new_client;
        save_clients($db_file, $clients);
        http_response_code(201);
        echo json_encode(['success' => true, 'client' => $new_client]);
        exit;
    }
}

if ($method === 'PATCH' || $method === 'PUT') {
    $target_id = $id_param ?? ($input['id'] ?? null);
    if ($target_id !== null) {
        $found = false;
        foreach ($clients as &$c) {
            if ((string)$c['id'] === (string)$target_id) {
                if (isset($input['name'])) $c['name'] = trim($input['name']);
                if (isset($input['logoUrl'])) $c['logoUrl'] = trim($input['logoUrl']);
                if (isset($input['displayOrder'])) $c['displayOrder'] = (int)$input['displayOrder'];
                if (isset($input['isActive'])) $c['isActive'] = (bool)$input['isActive'];
                $c['updatedAt'] = date('c');
                $found = true;
                break;
            }
        }
        if ($found) {
            save_clients($db_file, $clients);
            echo json_encode(['success' => true]);
            exit;
        }
    }
    http_response_code(404);
    echo json_encode(['error' => 'Client not found']);
    exit;
}

if ($method === 'DELETE') {
    $target_id = $id_param ?? ($input['id'] ?? null);
    if ($target_id !== null) {
        $clients = array_values(array_filter($clients, function($c) use ($target_id) {
            return (string)$c['id'] !== (string)$target_id;
        }));
        save_clients($db_file, $clients);
        echo json_encode(['success' => true]);
        exit;
    }
    http_response_code(400);
    echo json_encode(['error' => 'Missing client id']);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
