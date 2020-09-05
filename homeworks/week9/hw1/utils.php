<?php
    require_once('./conn.php');

    function getNicknameFromUsrname($username) {
        global $conn;
        $sql = sprintf("SELECT * FROM v61265_board_users WHERE username='%s'", $username);
        $result = $conn->query($sql);
        if (!$result) {
            return '資料錯誤，請再試一次';
        }
        $row = $result->fetch_assoc();
        $nickname = $row['nickname'];
        return $nickname;
    }

?>