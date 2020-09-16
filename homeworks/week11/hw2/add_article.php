<?php
  session_start();
  require_once('./conn.php');
  require_once('check_admin.php');
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
      <div class="edit-post">
        <form action="handle_add_article.php" method="POST">
          <div class="edit-post__title">
            發表文章：
            <?php if ($_GET['errCode'] === '1') { ?>
              <b>有東西漏填囉~</b>
            <?php } ?> 
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入文章標題" name='title'>
          </div>
          <select class='selector_category' name='category'>
            <?php
              $sql = "SELECT * FROM v61265_blog_categories";
              $stmt = $conn->prepare($sql);
              $result = $stmt->execute();
              if (!$result) {
                die($conn->error);
              }
              $result = $stmt->get_result();
              while ($row = $result->fetch_assoc()) {
                echo sprintf("<option value=%s>%s</option>", $row['name'], $row['name']);
              }
            ?>
          </select>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name='content'></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
              <input type='submit' class="edit-post__btn" value='送出'>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>