<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');
    require_once('check_admin.php');

    if ($_POST['id'] || empty($_POST['title']) || empty($_POST['category']) || empty($_POST['content'])) {
        header("Location:" . $_SERVER['HTTP_REFERER'] . "&errCode=1");
        exit();
    }

    $id = $_POST['id'];
    $title = $_POST['title'];
    $category = $_POST['category'];
    $content = $_POST['content'];

    $sql = "UPDATE v61265_blog_articles SET title=?, category=?, content=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssss', $title, $category, $content, $id);
    $result = $stmt->execute();

    if (!$result) {
        die($conn->error);
    }

    header('Location: index.php');

?>