<?php
    require_once('./conn.php');

    function getFromUsrname($username) {
        global $conn;
        $sql = "SELECT * FROM v61265_board_users WHERE username=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $username);
        $result = $stmt->execute();
        if (!$result) {
            return '資料錯誤，請再試一次';
        }
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $nickname = $row['nickname'];
        $role = $row['role'];
        return ['nickname'=>$nickname, 'role'=>$role ];
    }
?>