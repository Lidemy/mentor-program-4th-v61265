<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    // 身分認證
    $username = $_SESSION['username'];
    $role = getFromUsrname($username)['role'];
    if ($role !== 'admin') {
        header('Location: ./index.php');
        exit();
    }

    // 拿 POST 資料
    $id = $_POST['id'];
    $role = $_POST['role'];

    $sql ="UPDATE v61265_board_users SET `role`=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $role, $id);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }

    header('Location: admin.php');

?>