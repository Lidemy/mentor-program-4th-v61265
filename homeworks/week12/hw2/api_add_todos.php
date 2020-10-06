<?php
    require_once('conn.php');
    require_once('utils.php');

    header('Content-type:application/json;charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    // 成功的話拿進來
    $contents = $_POST['contents'];
    $status_chosen = $_POST['status_chosen'];
    $token = generate_token();

    $sql = "INSERT INTO v61265_todos(token, contents, status_chosen) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $token, $contents, $status_chosen);
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

    // 成功的話把內容寫入 api
    $json = array(
        "ok" => true,
        "message" => "成功儲存，你的token是"  . $token,
        "token" => $token
    );
    $response = json_encode($json);
    echo $response;
?>