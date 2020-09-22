<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    if (empty($_POST['content'])) {
        header('Location: ./index.php?errCode=1');
        exit();
    }

    $username = $_SESSION['username'];
    $role = getFromUsrname($username)['role'];

    // 驗證身分
    $sql = "SELECT * FROM v61265_board_comments WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $id);
    $result = $stmt->execute();
    if (!$result) {
        die('資料連線錯誤' . $conn->query);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    switch ($role) {
        case 0:
            header('Location: index.php');
            exit();
            break;
        case 1:
            if ($row['username'] !== $username) {
                header('Location: index.php');
                exit();
            } 
            break;
        case 2:
            break;
    }

    $id = $_POST['id'];
    $content = $_POST['content'];

    $sql ="UPDATE v61265_board_comments SET content=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $content, $id);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }

    header('Location: index.php');
?>