<?php
  session_start();
  require_once('./conn.php');
  require_once('./check_admin.php');

  $id = $_GET['id'];
  $sql = "SELECT * FROM v61265_blog_articles WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  $article = $result->fetch_assoc();

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
        <form action="handle_update_article.php" method="POST">
          <div class="edit-post__title">
            發表文章：
            <?php if ($_GET['errCode'] === '1') { ?>
              <b>有東西漏填囉~</b>
            <?php } ?> 
          </div>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入文章標題" name='title' value=<?php echo $article['title'];?>>
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
                $is_selecte = '';
                if ($row['name'] === $article['category']) {
                  $is_selected = 'selected';
                }
                echo sprintf("<option value=%s %s>%s</option>", $row['name'], $is_selected, $row['name']);
              }
            ?>
          </select>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name='content'><?php echo $article['content'];?></textarea>
            <input type='hidden' name='id' value=<?php echo $_GET['id'];?>>
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