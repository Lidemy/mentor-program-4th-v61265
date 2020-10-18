<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $username = $_SESSION['username'];
    $id = $_GET['id'];
    $role = getFromUsrname($username)['role'];

    // 檢查權限
    $sql ="SELECT * FROM v61265_board_comments WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $id);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // 檢查權限
    checkRole($role);

    // 把目標留言的 is_deleted 改成 1
    $sql ="UPDATE v61265_board_comments SET is_deleted=1 WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $id);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }

    header('Location: index.php');
?>