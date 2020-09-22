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

    if ($role !== 2) {
        header('Location: ./index.php');
        exit();
    }

    $page = 1;
    if (!empty($_GET['page'])) {
        $page = intval($_GET['page']);
    }
    $items_per_page = 10;
    $offset = ($page - 1) * $items_per_page;
    
    $sql = "SELECT * FROM v61265_board_users WHERE is_deleted is null ORDER BY created_at DESC limit ? offset ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $items_per_page, $offest);
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
                    <h1>ADMIN</h1>
                </div>
                <div class='user__info'>
                    <div class='user__management'>
                        <?php echo sprintf("<span class='hello'> hi, %s </span>", htmlspecialchars($nickname)) ?>
                        <a href='./index.php'>回留言板</a>
                    </div>
                </div>
            </div>
            <div class='comments'>
                <?php while ($row = $result->fetch_assoc()) { ?>
                    <div class='users_card'>
                        <div class='avatar'>
                        </div>
                        <div class='comment__main'>
                            <div class='comment__info'>
                                <span class='comment__author'><?php echo htmlspecialchars($row['nickname']) ?></span>
                                <span class='comment__author'>(@<?php echo htmlspecialchars($row['username']) ?>)</span>
                                <span class='comment__time'>‧<?php echo htmlspecialchars($row['created_at']) ?></span>
                                <span class='all-comments'>顯示所有留言</span>
                            </div>
                            <div class='user_manage'>
                                <form method='POST' action='handle_update_role.php'>
                                    身分：<select name='role'>
                                        <?php
                                            $numToname = ['停權中', '一般使用者', '管理員'];
                                            for ($i = 0; $i <= 2; $i++) {
                                                $is_selected = ($row['role'] === $i)? 'selected': '';
                                                echo sprintf("<option value=%d %s>%s</option>", $i, $is_selected, $numToname[$i]);
                                            } 
                                        ?>
                                    </select>
                                    <input type='hidden' name='id' value=<?php echo $row['id'] ?>/>
                                    <input class='role__btn' type='submit' value='更改'/>
                                </form>
                                <a class='all-comments' href='handle_delete_users.php?id=<?php echo $row['id'] ?>'>刪除</a>
                            </div>
                            <div class='user_comments hidden'>
                                <?php 
                                    $sql = "SELECT * FROM v61265_board_comments WHERE username=? and is_deleted is null ORDER BY created_at DESC";
                                    $stmt = $conn->prepare($sql);
                                    $stmt->bind_param('s', $row['username']);
                                    $comments_result = $stmt->execute();
                                    if (!$comments_result) {
                                        die('資料連線錯誤' . $conn->query);
                                    }
                                    $comments_result = $stmt->get_result();
                                    if ($com_row = $comments_result->fetch_assoc()) { ?>
                                        <div class='comment__item'>
                                            <div class='comment__time'><?php echo htmlspecialchars($com_row['created_at']) ?> </div>
                                            <div class='comment__comment'> <?php echo htmlspecialchars($com_row['content']) ?> </div>
                                        </div>
                                        <?php while ($com_row = $comments_result->fetch_assoc()) { ?>
                                            <div class='comment__item'>
                                                <div class='comment__time'><?php echo htmlspecialchars($com_row['created_at']) ?> </div>
                                                <div class='comment__comment'> <?php echo htmlspecialchars($com_row['content']) ?> </div>
                                            </div>
                                    <?php }
                                    } else {
                                        echo "<div>還沒有任何留言~</div>";
                                    }?>
                            </div>
                        </div>
                    </div>
                <?php } ?>
            </div>
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
                        echo sprintf("<a class='paginator_btn' href='./admin.php?page=%s'>上一頁</a>", $page-1);
                    }
                    for ($i = 1; $i<=$total_page ; $i += 1) {
                        echo sprintf("<a class='paginator_btn' href='./admin.php?page=%s'>%s</a>", $i, $i);
                    } 
                    if ($page != $total_page) {
                        echo sprintf("<a class='paginator_btn' href='./admin.php?page=%s'>下一頁</a>", $page+1);
                    }
                ?>
            </div>
        </div>
    </body>
    <script src='admin.js'></script>
</html>