<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['content'])) {
        header('Location: index.php?errCode=1');
        die('');
    }

    $username = $_SESSION['username'];
    $nickname = getNicknameFromUsrname($username);
    $content = $_POST['content'];

    $sql = sprintf(
        "INSERT INTO v61265_board_comments(nickname, content) VALUES ('%s', '%s')",
        $nickname, $content
    );
    $result = $conn->query($sql);
    if (!$result) {
        die($conn->error);
    }

    header('Location: index.php');

?>