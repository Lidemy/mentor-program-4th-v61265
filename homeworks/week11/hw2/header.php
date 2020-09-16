<?php session_start() ?>

<div class="wrapper navbar__wrapper">
    <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
    </div>
    <ul class="navbar__list">
        <div>
            <li><a href="./list_articles.php">文章列表</a></li>
            <li><a href="./list_categories.php">分類專區</a></li>
            <li><a href="#">關於我</a></li>
        </div>
        <div>
            <?php 
            $username = $_SESSION['username'];
            if (!empty($username)) {
                echo '<li><a href="add_article.php?id=new">新增文章</a></li>';
                echo '<li><a href="admin.php">管理後台</a></li>';
                echo '<li><a href="logout.php">登出</a></li>';
            } else {
                echo '<li><a href="login.php">登入</a></li>';   
            } ?>
        </div>
    </ul>
</div>