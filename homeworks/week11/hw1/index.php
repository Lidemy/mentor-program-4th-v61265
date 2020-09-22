<?php
    session_start();
    require_once('./conn.php');
    require_once('./utils.php');

    $nickname = NULL;
    if (!empty($_SESSION['username'])) {
        $username = $_SESSION['username'];
        $role = getFromUsrname($username)['role'];
        $nickname = getFromUsrname($username)['nickname'];
    }
/* 無法字串拼接，求救！
    $sql = 
        "SELECT ". 
        "* ". 
        "FROM v61265_board_comments AS C ".
        "LEFT JOIN v61265_board_users AS U ".
        "ON C.username = U.username ".
        "ORDER BY C.created_at DESC";
*/

    $page = 1;
    if (!empty($_GET['page'])) {
        $page = intval($_GET['page']);
    }
    $items_per_page = 10;
    $offset = ($page - 1) * $items_per_page;

    $sql = "SELECT U.role as role, C.id as id, U.username as username, C.content as content, C.created_at as created_at, U.nickname as nickname FROM v61265_board_comments AS C LEFT JOIN v61265_board_users AS U ON C.username = U.username WHERE C.is_deleted is null and U.is_deleted is null ORDER BY C.created_at DESC limit ? offset ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $items_per_page, $offset);
    $result = $stmt->execute();
    if (!$result) {
        die('資料連線錯誤' . $conn->query);
    }
    $result = $stmt->get_result();
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
                    <?php if (!empty($nickname)) { ?>
                        <div class='user__management'>
                            <?php echo sprintf("<span class='hello'> hi, %s </span>", htmlspecialchars($nickname)) ?>
                            <?php if ($role === 2) {
                                echo "<a href='./admin.php'>管理使用者</a>";
                            } ?>
                            <span class='update_user'>更改暱稱</span>
                            <a href='./logout.php'>登出</a>
                        </div>
                            <form class='hidden' method='POST' action='./handle_update_nickname.php'>
                                <div class='update_nickname'>新ㄉ暱稱：<input name='nickname' value="<?php echo htmlspecialchars($nickname); ?>">  <input type='submit' value='送出'/></div> 
                            </form>
                    <?php } else { ?>
                            <a href='./login.php'>登入</a>
                            <a href='./register.php'>註冊</a>
                    <?php } ?>
                </div>
            </div>
            <div class='remind'>
                <?php 
                $errCode = $_GET['errCode'];
                if ($errCode === '1') {
                    echo '資料有缺漏，請再試一次';
                }
                if ($role === 0) {
                    echo '您已被停權無法留言，請洽管理員';
                }
                ?>
            </div>
            <form class='add__coment' method='POST' action='./handle_add_comments.php'>
                <?php 
                    if (!empty($nickname) && $role !== 0) {
                        echo "<textarea name='content' rows='5'>生菜好可愛！</textarea>";
                        echo "<input type='submit' value='送出'/>";
                    } else {
                        echo "<textarea rows='5'>還無法留言ㄛ，請先確認登入狀態正常</textarea>";
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
                            <span class='comment__author'><?php echo htmlspecialchars($row['nickname']) ?></span>
                            <span class='comment__author'>(@<?php echo htmlspecialchars($row['username']) ?>)</span>
                            <span class='comment__time'>‧<?php echo htmlspecialchars($row['created_at']) ?></span>
                            <?php
                                switch ($role) {
                                    case 0:
                                        break;
                                    case 1:
                                        if ($row['username'] === $username) {
                                            echo sprintf("<a href='update_comment.php?id=%s'>編輯</a> ", $row['id']);
                                            echo sprintf("<a href='handle_delete_comment.php?id=%s'>刪除</a>", $row['id']);
                                        } 
                                        break;
                                    case 2:
                                        echo sprintf("<a href='update_comment.php?id=%s'>編輯</a> ", $row['id']);
                                        echo sprintf("<a href='handle_delete_comment.php?id=%s'>刪除</a>", $row['id']);
                                        break;
                                } 
                            ?>
                        </div>
                        <div class='comment__content'><?php echo htmlspecialchars($row['content']) ?></div>
                    </div>
                </div>
                <?php } ?>
            </div>
            <div class='hr'></div>
            <?php
                $sql = "SELECT count(id) as count FROM v61265_board_comments WHERE is_deleted is null";
                $stmt = $conn->prepare($sql);
                $result = $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $count = $row['count'];
                $total_page = ceil($count / $items_per_page);
            ?>
            <div class='page_info'>
                <span>總共有 <?php echo $count; ?> 筆，頁數：<?php echo $page;?> / <?php echo $total_page?>
            </div>
            <div class="paginitor">
                <?php 
                    if ($page !== 1) {
                        echo sprintf("<a class='paginator_btn' href='./index.php?page=%s'>上一頁</a>", $page-1);
                    }
                    for ($i = 1; $i<=$total_page ; $i += 1) {
                        echo sprintf("<a class='paginator_btn' href='./index.php?page=%s'>%s</a>", $i, $i);
                    } 
                    if ($page != $total_page) {
                        echo sprintf("<a class='paginator_btn' href='./index.php?page=%s'>下一頁</a>", $page+1);
                    }
                ?>
            </div>
        </div>
    </body>
    <script src='index.js'></script>
</html>
