<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['content'])) {
        header('Location: index.php?errCode=1');
        die('');
    }

    $username = $_SESSION['username'];
    $nickname = getFromUsrname($username)['nickname'];
    $content = $_POST['content'];
    $role = getFromUsrname($username)['role'];

    if ($role !== 1 && $role !== 2) {
        header('Location: index.php');
        exit();
    }

    $sql = "INSERT INTO v61265_board_comments(username, content) VALUES(?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $username, $content);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }

    header('Location: index.php');

?>