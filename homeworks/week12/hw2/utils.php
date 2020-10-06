<?php

function generate_token() {
    $token = '';
    for ($i = 0; $i < 8; $i += 1) {
        $token .= chr(rand(97,122));
    }
    return $token;
}

?>