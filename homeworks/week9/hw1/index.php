<?php
    session_start();
    require_once('./conn.php');
    require_once('./utils.php');


    $nickname = NULL;
    if (!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $nickname = getNicknameFromUsrname($username);
    }

    $sql = "SELECT * FROM v61265_board_comments ORDER BY created_at DESC";
    $result = $conn->query($sql);
    if (!$result) {
        die('資料連線錯誤' . $conn->query);
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
                <div><h1>COMMENTS</h1></div>
                <div class='user__info'>
                    <?php 
                        if (!empty($nickname)) {
                            echo "<span class='hello'> hi, $nickname</span>";
                            echo "<a href='./logout.php'>登出</a>";
                        } else {
                            echo "<a href='./login.php'>登入</a> ";
                            echo "<a href='./register.php'>註冊</a>";
                        }
                    ?>
                </div>
            </div>
            <div class='remind'>
                <?php 
                $errCode = $_GET['errCode'];
                if ($errCode === '1') {
                    echo '資料有缺漏，請再試一次';
                }
                ?>
            </div>
            <div class='hint'>不知道要留言什麼，你可以玩：
                1. 從上個人的問題中挑一個回答
                2. 出兩個問題給下個人回答
            </div>
            <form class='add__coment' method='POST' action='./handle_add_comments.php'>
                <?php 
                    if (!empty($nickname)) {
                        echo "<textarea name='content' rows='5'>生菜好可愛！</textarea>";
                        echo "<input type='submit' value='送出'/>";
                    } else {
                        echo "<textarea rows='5'>請先登入才能留言～</textarea>";
                    }
                ?> 
                
            </form>
            <div class='hr'></div>
            <div class='comments'>
                <?php while ($row = $result->fetch_assoc()) { ?>
                    <div class='card'>
                    <div class='avatar'></div>
                    <div class='comment__main'>
                        <div class='comment__info'>
                            <span class='comment__author'><?php echo $row['nickname'] ?></span>
                            <span class='comment__time'>‧<?php echo $row['created_at'] ?></span>
                        </div>
                        <div class='comment__content'><?php echo $row['content'] ?></div>
                    </div>
                </div>
                <?php } ?>
            </div>
        </div>
    </body>
</html>
