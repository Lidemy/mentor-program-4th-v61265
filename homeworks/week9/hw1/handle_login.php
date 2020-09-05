<?php
    // 被遺忘的邏輯：找出帳號密碼都符合的那條，並用 num_rows 檢查是否存在
    session_start();
    require_once('conn.php');

    if (empty($_POST['username']) || empty($_POST['password'])) {
        header('Location: login.php?errCode=1');
        die('');
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = sprintf(
        "SELECT * FROM v61265_board_users WHERE username='%s' AND password='%s'",
        $username, $password
    );
    $result = $conn->query($sql);
    if (!$result) {
        die($conn->error);
    }

    if ($result->num_rows) {
        $_SESSION['username'] = $username;
        header('Location: index.php');
    } else {
        header('Location: login.php?errCode=4');
    }
?>