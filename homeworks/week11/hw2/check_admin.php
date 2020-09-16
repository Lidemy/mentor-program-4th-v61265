<?php
    session_start();
    require_once('conn.php');

    $username = $_SESSION['username'];

    $sql = "SELECT * FROM v61265_blog_admin WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }

    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        header('Location: login.php');
        exit;
    }
?>