<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $username = $_SESSION['username'];
    $id = $_GET['id'];
    $role = getFromUsrname($username)['role'];

    // 檢查權限
    if ($role !== 2) {
        header("Location: ./index.php");
    }

    // 把目標的 is_deleted 改成 1
    $sql ="UPDATE v61265_board_users SET `is_deleted`=1 WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $id);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }

    // 取得該用戶 username
    $sql ="SELECT * FROM v61265_board_users WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $id);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $username = $row['username'];

    // 把該用戶的留言 is_deleted 改成 2
    $sql ="UPDATE v61265_board_comments SET `is_deleted`=2 WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }

    header('Location: admin.php');
?>