<?php 
session_start();
require_once('./conn.php');
require_once('./utils.php');

$page = 1;
if ($_GET['page']) {
    $page = intval($_GET['page']);
}
$items_per_page = 5;
$offset = ($page - 1) * $items_per_page;

$sql = "SELECT * FROM v61265_blog_articles WHERE is_deleted is null ORDER BY created_at DESC limit ? offset ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $items_per_page, $offset);
$result = $stmt->execute();
if (!$result) {
    die('資料連線錯誤'. $conn->error);
}
$result = $stmt->get_result();

?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
   <?php include_once('./header.php') ?>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="posts">
      <?php while ($row = $result->fetch_assoc()) { ?>
        <article class="post">
            <div class="post__header">
                <div><?php echo htmlspecialchars($row['title']); ?></div>
                <div class="post__actions">
                    <?php if (!empty($_SESSION['username'])) { ?>
                        <a class="post__action" href="update_article.php?id=<?php echo $row['id'] ?>">編輯</a>
                    <?php } ?>
                </div>
            </div>
            <div class="post__info">
                分類：<?php echo htmlspecialchars($row['category']); ?>
                <?php echo htmlspecialchars($row['created_at']); ?>
            </div>
            <div class="post__content"><?php echo htmlspecialchars($row['content']); ?></div>
            <a class="btn-read-more" href="article_item.php?id=<?php echo $row['id']?>">READ MORE</a>
        </article>
        <?php } ?>
    </div>
    <div class='page'>
        <?php
            $sql = "SELECT count(id) as count FROM v61265_blog_articles WHERE is_deleted is null";
            $stmt = $conn->prepare($sql);
            $result = $stmt->execute();
            if (!$result) {
                die($conn->error);
            }
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $count = $row['count'];
            $total_pages = ceil($count / $items_per_page);
        ?>
        <div class="pages_info">
            <?php echo sprintf("共有 %d 篇文章，頁數 %d / %d", $count, $page, $total_pages) ?>
        </div>
        <div class="pagintor">
            <?php 
                if ($page !== 1) {
                    echo sprintf("<a class='paginator_btn' href='./index.php?page=%s'>上一頁</a>", $page-1);
                }
                for ($i = 1; $i <= $total_pages ; $i += 1) {
                    echo sprintf("<a class='paginator_btn' href='./index.php?page=%s'>%s</a>", $i, $i);
                } 
                if ($page < $total_pages) {
                    echo sprintf("<a class='paginator_btn' href='./index.php?page=%s'>下一頁</a>", $page+1);
                }
            ?>
        </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>