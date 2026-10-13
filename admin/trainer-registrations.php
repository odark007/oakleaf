<?php
require_once __DIR__ . '/auth.php';
$pdo = require __DIR__ . '/db.php';
$user = require_auth();

$alert = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
    if (!has_role('superadmin', 'admin')) {
        $alert = 'You do not have permission to delete registrations.';
    } elseif (!verify_csrf($_POST['csrf_token'] ?? '')) {
        $alert = 'Invalid security token.';
    } else {
        $id = (int)($_POST['id'] ?? 0);
        $stmt = $pdo->prepare("DELETE FROM trainer_registrations WHERE id = :id");
        $stmt->execute([':id' => $id]);
        header("Location: trainer-registrations.php?deleted=1");
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_status') {
    if (!has_role('superadmin', 'admin')) {
        $alert = 'You do not have permission to update status.';
    } elseif (!verify_csrf($_POST['csrf_token'] ?? '')) {
        $alert = 'Invalid security token.';
    } else {
        $id = (int)($_POST['id'] ?? 0);
        $status = $_POST['status'] ?? 'new';
        $stmt = $pdo->prepare("UPDATE trainer_registrations SET status = :status WHERE id = :id");
        $stmt->execute([':status' => $status, ':id' => $id]);
        header("Location: trainer-registrations.php?updated=1");
        exit;
    }
}

$search = trim($_GET['search'] ?? '');
$sql = "SELECT * FROM trainer_registrations WHERE 1=1";
$params = [];
if ($search !== '') {
    $sql .= " AND (first_name LIKE :s1 OR last_name LIKE :s2 OR email LIKE :s3 OR phone LIKE :s4 OR organization LIKE :s5)";
    $term = "%{$search}%";
    $params[':s1'] = $term;
    $params[':s2'] = $term;
    $params[':s3'] = $term;
    $params[':s4'] = $term;
    $params[':s5'] = $term;
}
$sql .= " ORDER BY submitted_at DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$registrations = $stmt->fetchAll();

$csrf_token = generate_csrf();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trainer Registrations - Oakleaf Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <?php include 'layout.php'; ?>
    <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Trainer Registrations</h2>
        </div>

        <?php if ($alert): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($alert) ?></div>
        <?php endif; ?>
        <?php if (isset($_GET['deleted'])): ?>
            <div class="alert alert-success">Registration deleted.</div>
        <?php endif; ?>
        <?php if (isset($_GET['updated'])): ?>
            <div class="alert alert-success">Status updated.</div>
        <?php endif; ?>

        <div class="card mb-4">
            <div class="card-body">
                <form method="GET" class="row g-3">
                    <div class="col-md-6">
                        <input type="text" name="search" class="form-control" placeholder="Search by name, email, phone, organization..." value="<?= htmlspecialchars($search) ?>">
                    </div>
                    <div class="col-md-3">
                        <button type="submit" class="btn btn-primary">Search</button>
                        <a href="trainer-registrations.php" class="btn btn-secondary">Clear</a>
                    </div>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>WhatsApp</th>
                                <th>Organization</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($registrations as $r): ?>
                                <tr>
                                    <td><?= htmlspecialchars($r['id']) ?></td>
                                    <td><?= htmlspecialchars($r['submitted_at']) ?></td>
                                    <td><?= htmlspecialchars($r['first_name'] . ' ' . $r['last_name']) ?></td>
                                    <td><?= htmlspecialchars($r['email']) ?></td>
                                    <td><?= htmlspecialchars($r['phone']) ?></td>
                                    <td><?= htmlspecialchars($r['whatsapp'] ?? '') ?></td>
                                    <td><?= htmlspecialchars($r['organization'] ?? '') ?></td>
                                    <td><?= htmlspecialchars($r['position'] ?? '') ?></td>
                                    <td><?= htmlspecialchars($r['status']) ?></td>
                                    <td>
                                        <div class="d-flex gap-2">
                                            <form method="POST" style="display:inline;" onsubmit="return confirm('Update status?')">
                                                <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">
                                                <input type="hidden" name="action" value="update_status">
                                                <input type="hidden" name="id" value="<?= $r['id'] ?>">
                                                <select name="status" class="form-select form-select-sm" onchange="this.form.submit()">
                                                    <option value="new" <?= $r['status'] === 'new' ? 'selected' : '' ?>>New</option>
                                                    <option value="contacted" <?= $r['status'] === 'contacted' ? 'selected' : '' ?>>Contacted</option>
                                                    <option value="confirmed" <?= $r['status'] === 'confirmed' ? 'selected' : '' ?>>Confirmed</option>
                                                    <option value="cancelled" <?= $r['status'] === 'cancelled' ? 'selected' : '' ?>>Cancelled</option>
                                                </select>
                                            </form>
                                            <?php if (has_role('superadmin', 'admin')): ?>
                                                <form method="POST" style="display:inline;" onsubmit="return confirm('Delete this registration?')">
                                                    <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">
                                                    <input type="hidden" name="action" value="delete">
                                                    <input type="hidden" name="id" value="<?= $r['id'] ?>">
                                                    <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                                                </form>
                                            <?php endif; ?>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
