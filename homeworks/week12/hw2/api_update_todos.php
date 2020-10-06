<?php
    require_once('conn.php');
    require_once('utils.php');

    header('Content-type:application/json;charset=utf-8');
    header('Access-Control-Allow-Origin: *');

    if (empty($_POST['contents']) || empty($_POST['status_chosen'])) {
        $json = array(
            "ok" => false,
            "message" => '似乎有東西漏填掉了！'
        );
        $response = json_encode($json);
        echo $response;
        die();
    }

    $token = $_GET['token'];
    $contents = $_POST['contents'];
    $status_chosen = $_POST['status_chosen'];

    // 送出 SQL
    $sql = "UPDATE `v61265_todos` SET `contents`=?,`status_chosen`=? WHERE `token`=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss', $contents, $status_chosen, $token);
    $result = $stmt->execute();

    // 再取出一次錯誤
    if (!$result) {
        $json = array(
            "ok" => false,
            "message" => $conn->error
        );
        $response = json_encode($json);
        die();
    }

    // 成功的話把內容寫入 api
    $json = array(
        "ok" => true,
        "message" => "更新成功！",
        "token" => $token
    );
    $response = json_encode($json);
    echo $response;
?>