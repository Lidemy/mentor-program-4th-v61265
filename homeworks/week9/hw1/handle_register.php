<?php

// 自己做的時候忘記得地方：errCode 要用 query 帶回去

    require_once('conn.php');

    if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password']) || empty($_POST['password2'])) {
        header('Location: register.php?errCode=1');
        die('');
    } else if ($_POST['password'] !== $_POST['password2']) {
        header('Location: register.php?errCode=2');
        die('');
    }

    $nickname = $_POST['nickname'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = sprintf(
        "INSERT INTO v61265_board_users(username, password, nickname) VALUES ('%s', '%s', '%s')",
        $username, $password, $nickname
    );
    $result = $conn->query($sql);
    if (!$result) {
        $code = $conn->errno;
        if ($code === 1062) {
            header('Location: register.php?errCode=3');
            die('');
        }
        echo $conn->error;
    }

    header('Location: index.php');

?>