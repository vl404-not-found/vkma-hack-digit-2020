<?php
unset($_GET['login']);
require_once 'vendor/autoload.php';
require_once 'simplevk3/autoload.php';

header('Access-Control-Expose-Headers: Access-Control-Allow-Origin', false);
header('Access-Control-Allow-Origin: *', false);
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept', false);
header('Access-Control-Allow-Credentials: true');

use DigitalStars\DataBase\DB;
use DigitalStars\SimpleVK\SimpleVK as vk;

vk::disableSendOK();
$vk = vk::create('d23972183650f2c6ace309a8bb2845bb5ab63592904b4ce95affc05effa4f74127023d0aeb9b98ab3f424', '5.123');
$vk->setUserLogError(89846036);

preg_match("#^https?://steamcommunity.com/openid/id/([0-9]{17,25})#", $_GET['openid_claimed_id'], $matches);
$steamID64 = is_numeric($matches[1]) ? $matches[1] : 0;
if ($steamID64) {
    $db_type = 'mysql';
    $db_name = 'hacaton4';
    $login = 'hacaton4';
    $pass = 'XXXXXXX';
    $ip = 'localhost';

    $db = new DB("mysql:host=localhost;dbname=$db_name", $login, $pass, [
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4'",
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );


    if(checkSecurity()) {
        $db->query("UPDATE users SET steam_id = ?i WHERE vk_id = ?i", [$steamID64,  $_GET['vk_user_id']]);
    }

    if($_GET['vk_platform'] == 'desktop_web') {
        header("Location: https://vk.com/app7679333#addGame/steam");
    } else {
        header("Location: vk://vk.com/app7679333#addGame/steam");
    }

}

function checkSecurity() {
    $client_secret = 'XXXXXXXxxX';

    $sign_params = [];
    foreach ($_GET as $name => $value) {
        if (strpos($name, 'vk_') !== 0) {
            continue;
        }
        $sign_params[$name] = $value;
    }

    ksort($sign_params);
    $sign_params_query = http_build_query($sign_params);
    $sign = rtrim(strtr(base64_encode(hash_hmac('sha256', $sign_params_query, $client_secret, true)), '+/', '-_'), '=');

    if (!isset($_GET['sign']))
        return 0;
    $status = ($sign === $_GET['sign']);
    if (!$status) {
        return 0;
    }
    return 1;
}
