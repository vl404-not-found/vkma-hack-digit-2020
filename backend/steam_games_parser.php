<?php
require_once 'vendor/autoload.php';
require_once 'simple_html_dom.php';
use DigitalStars\DataBase\DB;
$games = json_decode(file_get_contents('http://api.steampowered.com/ISteamApps/GetAppList/v2'), true);
$arr = [];
foreach ($games['applist']['apps'] as $value) {
    $arr[] = [$value['appid'], $value['name']];
}
$db_type = 'mysql';
$db_name = 'cyber_mini_apps';
$login = 'cyber_mini_apps';
$pass = 'XXXXXX';
$ip = 'localhost';

$db = new DB("mysql:host=localhost;dbname=$db_name", $login, $pass, [
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8mb4'",
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]
);

$db->query("INSERT INTO steam_games(`id`, `name`) VALUES ?v[?i, ?s]", [

        $arr

]);