<?php
    require_once('conn.php');
    require_once('utils.php');

    header('Content-type:application/json;charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    if (empty($_GET['token'])) {
        $json = array(
            "ok" => true,
            "exit" => false
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    $sql = "SELECT * FROM v61265_todos WHERE token=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $_GET['token']);
    $result = $stmt->execute();

    // 再取出一次錯誤
    if (!$result) {
        $json = array(
            "ok" => false,
            "message" => $conn->error
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    // 沒有的話就回傳 false
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        $json = array(
            "ok" => true,
            "exit" => false
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    // 有的話就把資料抓下來
    $row = $result->fetch_assoc();
    $json = array(
        "ok" => true,
        "exit" => true,
        "contents" => $row['contents'], 
        "status_chosen" => $row['status_chosen']
    );
    $response = json_encode($json);
    echo $response;
?>