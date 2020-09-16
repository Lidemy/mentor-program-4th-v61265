<?php 
session_start();
require_once('./conn.php');
require_once('./utils.php');

if (empty($_GET['category'])) {
    die('這個類別不存在或刪除了ㄛ');
}

$category = $_GET['category'];


$sql = "SELECT * FROM v61265_blog_articles WHERE category=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $category);
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
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>