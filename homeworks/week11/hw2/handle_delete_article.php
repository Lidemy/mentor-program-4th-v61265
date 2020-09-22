<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');
    require_once('check_admin.php');

    if (!$_GET['id']) {
        header("Location: admin.php");
        exit();
    }

    $id = $_GET['id'];

    $sql = "UPDATE v61265_blog_articles SET is_deleted=1 WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $id);
    $result = $stmt->execute();

    if (!$result) {
        die($conn->error);
    }

    header('Location: admin.php');

?>