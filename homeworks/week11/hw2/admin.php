<?php 
session_start();
require_once('./conn.php');
require_once('./utils.php');
require_once('check_admin.php');


$sql = "SELECT * FROM v61265_blog_articles WHERE is_deleted is null ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
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
    <div class="container">
      <div class="admin-posts">
          <?php while ($row = $result->fetch_assoc()) { ?>
            <div class="admin-post">
            <div class="admin-post__title">
              <?php echo htmlspecialchars($row['title']) ?>
            </div>
              <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo htmlspecialchars($row['created_at']) ?>
              </div>
              <a class="admin-post__btn" href="update_article.php?id=<?php echo htmlspecialchars($row['id']) ?>">
                編輯
              </a>
              <a class="admin-post__btn" href="handle_delete_article.php?id=<?php echo htmlspecialchars($row['id']) ?>">
                刪除
              </a>
            </div>
            </div>
          <?php } ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>