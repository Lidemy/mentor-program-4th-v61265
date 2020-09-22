<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>生菜的留言板</title>
        <link rel='stylesheet' href='./style.css'>
        <link rel='stylesheet' href='./normalize.css'>
    </head>
    <body>
        <header>
            <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
        </header>
        <div class='wrapper'>
            <div class='wrapper__title'>
                <div><h1>LOGIN</h1></div>
                <div class='user__info'>
                    <a href='./index.php'>回留言板</a>
                    
                </div>
            </div>
            <div class='remind'>
                <?php 
                $errCode = $_GET['errCode'];
                if ($errCode === '1') {
                    echo '資料有缺漏，請再試一次';
                } else if ($errCode === '4') {
                    echo '帳號密碼輸入錯誤';
                }
                ?>
            </div>
            <form method='POST' action='./handle_login.php'>
                <div>帳號：<input name='username'/></div> 
                <div>密碼：<input type='password' name='password'/></div> 
                <div><input type='submit' value='送出'/><div>
            </form>
            <div>
                還沒有帳號？<a class='register__btn' href='./register.php'>註冊</a>
            </div>
        </div>
    </body>
</html>
