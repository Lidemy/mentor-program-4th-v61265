<?php
    session_start();
    require_once('./conn.php');
    require_once('./utils.php');

    $id = $_GET['id'];

    if (!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $role = getFromUsrname($username)['role'];
    } else {
        header('Location: index.php');
        exit();
    }

    $sql = "SELECT * FROM v61265_board_comments WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $id);
    $result = $stmt->execute();
    if (!$result) {
        die('資料連線錯誤' . $conn->query);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // 驗證身分
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
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>生菜的留言板</title>
        <link rel='stylesheet' href='./normalize.css'>
        <link rel='stylesheet' href='./style.css'>
    </head>
    <body>
        <header>
            <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
        </header>
        <div class='wrapper'>
            <div class='wrapper__title'>
                <div>
                    <h1>COMMENTS</h1>
                </div>
                <div class='user__info'>
                <input class='update_user' type ="button" onclick="history.back()" value="回到上一頁"></input>
                <a href='./logout.php'>登出</a>
                </div>
            </div>
            <div class='remind'>
                <?php 
                $errCode = $_GET['errCode'];
                if ($errCode === '1') {
                    echo '不能輸入空的ㄛ';
                }
                ?>
            </div>
            <form class='add__coment' method='POST' action='./handle_update_comment.php'>
                <textarea name='content' rows='5'><?php echo $row['content'] ?></textarea>
                <input type='hidden' name='id' value='<?php echo $id ?>' />
                <input type='submit' value='送出'/>
            </form>
    </body>
    <script src='index.js'></script>
</html>
