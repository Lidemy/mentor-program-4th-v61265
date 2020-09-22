<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');


    $username = 'v61265';
    $password = password_hash('v61265', PASSWORD_DEFAULT);

    $sql = "INSERT INTO v61265_blog_admin(username, password) VALUES(?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $username, $password);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }

    header('Location: index.php');

?>