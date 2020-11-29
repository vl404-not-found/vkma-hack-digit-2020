<?php
set_time_limit(1);
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
require_once 'vendor/autoload.php';
require_once 'simple_html_dom.php';
require_once 'simplevk3/autoload.php';

use DigitalStars\SimpleAPI;
use DigitalStars\DataBase\DB;
use DigitalStars\SimpleVK\SimpleVK as vk;
use DigitalStars\Daemon\Client;

session_start([
    'cookie_lifetime' => 300400,
    'use_only_cookies' => false
]);

const HEADERS = [
    'Host' => 'ru.dotabuff.com',
    'User-Agent' => 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0',
    'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language' => 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
    'Accept-Encoding' => 'gzip, deflate, br',
    'DNT' => '1',
    'Connection' => 'keep-alive',
    'Cookie' => '_hi=1605969353662; _tz=Europe%2FMoscow; _ga=GA1.2.1912644567.1605969354; _gid=GA1.2.331502660.1605969354; _gat=1',
    'Upgrade-Insecure-Requests' => '1',
    'Pragma' => 'no-cache',
    'Cache-Control' => 'no-cache',
    'TE' => 'Trailers'
];

header('Access-Control-Expose-Headers: Access-Control-Allow-Origin', false);
header('Access-Control-Allow-Origin: *', false);
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept', false);
header('Access-Control-Allow-Credentials: true');

$db_type = 'mysql';
$db_name = 'hacaton4';
$login = 'hacaton4';
$pass = 'XXXXXXXX';
$ip = 'localhost';

$db = new DB("mysql:host=localhost;dbname=$db_name", $login, $pass, [
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]
);


vk::disableSendOK();
$vk = vk::create('XXXXXXXXXXX', '5.123');
$vk->setUserLogError(89846036);

$api = new SimpleAPI();
if (!isset($_GET['none']))
    checkSecurity();

switch ($api->module) {
    case 'first_auth':
        $data = $api->params(['vk_user_id']);
        $_SESSION['vk_id'] = $data['vk_user_id'];
        $check = $db->row("SELECT * FROM users WHERE vk_id = ?i", [$data['vk_user_id']]);
        $info = $vk->userInfo($data['vk_user_id'], ['fields' => 'photo_100,last_seen']);
        $name = $info['first_name'] . " " . $info['last_name'];
        if (!$info['photo_100'])
            $info['photo_100'] = 'https://hacaton4.creativityprojectcenter.ru/cyber_mini_apps/noavatar2.jpg';
        if ($check) {
            $db->query("UPDATE users SET avatar_url = ?s, name = ?s WHERE vk_id = ?i", [$info['photo_100'], $name, $data['vk_user_id']]);
        } else {
            $db->query("INSERT INTO users SET avatar_url = ?s, name = ?s, vk_id = ?i", [$info['photo_100'], $name, $data['vk_user_id']]);
        }
        $api->answer['info']['name'] = $name;
        $api->answer['info']['avatar'] = $info['photo_100'];
        $time = time() - $info['last_seen']['time'];
        if($time < 3600) {
            $time = intdiv($time,60);
            $time_text = "Был в сети {$time}м. назад";
        } else if($time > 3600 && $time < 86400){
            $time = intdiv($time,3600);
            $time_text = "Был в сети {$time}ч. назад";
        } else {
            $time = intdiv($time,86400);
            $time_text = "Был в сети {$time}дн. назад";
        }
        $api->answer['info']['online'] = $time_text;
        break;
    case 'csgo_stat':
        $data = $api->params(['vk_user_id']);
        $steam_id = $db->row("SELECT steam_id FROM users WHERE vk_id = ?i", [$data['vk_user_id']])['steam_id'] ?? null;
        $api->answer = csgo($steam_id);
        break;
    case 'dota_stat':
        $data = $api->params(['vk_user_id']);
        $steam_id = $db->row("SELECT steam_id FROM users WHERE vk_id = ?i", [$data['vk_user_id']])['steam_id'] ?? null;
        $api->answer = dota2($steam_id);
        break;
    case 'add_request': //добавление заявки одиночной
        $data = $api->params(['text', 'game_id', 'vk_user_id']);
        $check = $db->row('SELECT * FROM request WHERE game_id = ?i AND vk_id = ?i AND is_team = 0', [$data['game_id'], $data['vk_user_id']]);
        if (!$check) {
            $db->query('INSERT INTO request SET text = ?s, game_id = ?i, vk_id = ?i, is_team = 0', [$data['text'], $data['game_id'], $data['vk_user_id']]);
            $api->answer['result'] = true;
        } else {
            $api->error('Заявка с такой игрой уже есть');
        }
        break;
    case 'add_team_request': //добавление заявки команды
        $data = $api->params(['text', 'game_id', 'vk_user_id', 'team_id']);
        $check = $db->row('SELECT * FROM request WHERE game_id = ?i AND vk_id = ?i AND is_team = 1', [$data['game_id'], $data['vk_user_id']]);
        if (!$check) {
            $db->query('INSERT INTO request SET text = ?s, game_id = ?i, vk_id = ?i, is_team = 1, team_id = ?i', [$data['text'], $data['game_id'], $data['vk_user_id'], $data['team_id']]);
            $api->answer['result'] = true;
        } else {
            $api->error('Заявка с такой игрой уже есть');
        }
        break;
    case 'delete_request': //удаление заявки любой
        $data = $api->params(['request_id', 'vk_user_id']);
        $db->query('DELETE FROM request WHERE request_id = ?i AND vk_id = ?i', [$data['request_id'], $data['vk_user_id']]);
        $api->answer['result'] = true;
        break;
    case 'get_admin_teams': //получение списка администрируемых команд
        $data = $api->params(['vk_user_id']);
        $api->answer = $db->rows("SELECT * FROM teams WHERE owner_id = ?i", [$data['vk_user_id']]);
        break;
    case 'get_my_teams': //получение списка администрируемых команд
        $data = $api->params(['vk_user_id']);
        $api->answer = $db->rows("SELECT teams.id, teams.name, teams.avatar
                                        FROM teams,
                                             teams_users
                                        WHERE teams.id = teams_users.team_id
                                          AND teams_users.vk_id = ?i", [$data['vk_user_id']]);
        break;
    case 'add_team': //добавление команды
        $data = $api->params(['vk_user_id', 'name', 'vk_ids', '?chat_url']);
        // TODO нужно узнавать, действительно ли эти пользователи у него в друзьях
        $check = $db->row("SELECT * FROM teams WHERE name = ?s AND owner_id = ?i", [$data['name'], $data['vk_user_id']]);
        if (!$check) {
            if (isset($data['chat_url'])) {
                $db->query("INSERT INTO teams SET name = ?s, owner_id = ?i, chat_url = ?s", [$data['name'], $data['vk_user_id'], $data['chat_url']]);
            } else {
                $db->query("INSERT INTO teams SET name = ?s, owner_id = ?i", [$data['name'], $data['vk_user_id']]);
            }
            $last_id = $db->lastInsertId();
            $vk_ids = explode(',', $data['vk_ids']);
            foreach ($vk_ids as $v_id) {
                $db->query("INSERT INTO not_confirm_for_team SET team_id = ?i, vk_id = ?i", [$last_id, $v_id]);
            }
            $api->answer['status'] = true;
        } else {
            $api->error('Такая команда уже существует');
        }
        break;
    case 'confirm_team': //подтверждение вступления в команду
        $data = $api->params(['team_id', 'vk_user_id']);
        $check = $db->row("SELECT * FROM not_confirm_for_team WHERE team_id = ?i AND vk_id = ?i", [$data['team_id'], $data['vk_user_id']]);
        if ($check) {
            $db->query("INSERT INTO teams_users SET team_id = ?i, vk_id = ?i", [$data['team_id'], $data['vk_user_id']]);
            $db->query("DELETE FROM not_confirm_for_team WHERE team_id = ?i AND vk_id = ?i", [$data['team_id'], $data['vk_user_id']]);
            $api->answer['status'] = true;
        } else {
            $api->error('У вас нет приглашения от этой команды');
        }
        break;
    case 'invite_for_team':
        $data = $api->params(['team_id', 'vk_ids', 'vk_user_id']);
        $check = $db->row("SELECT * FROM teams WHERE owner_id = ?i", [$data['vk_user_id']]);
        if ($check) {
            $vk_ids = explode(',', $data['vk_ids']);
            foreach ($vk_ids as $v_id) {
                $check2 = $db->row("SELECT * FROM not_confirm_for_team WHERE team_id = ?i AND vk_id = ?i", [$data['team_id'], $v_id]);
                if (!$check2) {
                    // TODO нужно узнавать, действительно ли эти пользователи у него в друзьях
                    $db->query("INSERT INTO not_confirm_for_team SET team_id = ?i, vk_id = ?i", [$data['team_id'], $v_id]);
                }
            }
            $api->answer['status'] = true;
        } else {
            $api->error('Попытка пригласить людей в чужую команду');
        }
        break;
    case
    'get_my_request': //мои заявки
        $data = $api->params(['vk_user_id']);
        $api->answer = $db->rows("SELECT request.request_id,
                                           request.game_id,
                                           request.text,
                                           request.vk_id,
                                           request.is_team,
                                           request.team_id,
                                           request.game_id,
                                           games.name as 'game_name',
                                           users.avatar_url,
                                           users.name
                                    FROM request,
                                         games,
                                         users
                                    WHERE request.game_id = games.game_id
                                      AND request.vk_id = users.vk_id
                                          AND request.vk_id = ?i", [$data['vk_user_id']]);
        break;
    case 'get_all_solo_request': //все соло заявки
        $data = $api->params(['vk_user_id']);
        $_SESSION['vk_id'] = $data['vk_user_id'];
        $api->answer = $db->rows("SELECT request.request_id,
                                           request.game_id,
                                           request.text,
                                           request.vk_id,
                                           request.is_team,
                                           request.team_id,
                                           request.game_id,
                                           games.name as 'game_name',
                                           users.avatar_url,
                                           users.name
                                    FROM request,
                                         games,
                                         users
                                    WHERE request.game_id = games.game_id
                                      AND request.vk_id = users.vk_id
                                      AND request.is_team = 0");
        break;
    case 'get_all_team_request': //все командные заявки
        $data = $api->params(['vk_user_id']);
        $_SESSION['vk_id'] = $data['vk_user_id'];
        $api->answer = $db->rows("SELECT request.request_id,
                                           request.text,
                                           request.team_id,
                                           request.game_id,
                                           games.name as 'game_name',
                                           teams.avatar as 'avatar_url',
                                           teams.name
                                    FROM request,
                                         teams,games
                                    
                                    WHERE request.vk_id = teams.owner_id
                                      AND request.team_id = teams.id
                                      AND request.game_id = games.game_id
                                      AND request.is_team = 1");
        break;
    case 'get_user_steam_games':
        $data = $api->params(['vk_user_id']);
        $steam_id = $db->row("SELECT steam_id FROM users WHERE vk_id = ?i", [$data['vk_user_id']])['steam_id'] ?? null;
        if(!$steam_id) {
            $api->error('steam не привязан');
        }

        [$ids, $times] = getUserSteamGames($steam_id);
        $ids_str = join(',', $ids);
        $data_db = $db->rows("SELECT name, game_id, image, steam_game_id
                                FROM games
                                WHERE steam_game_id IN ($ids_str)
                                  AND game_id NOT IN (SELECT game_id FROM users_games WHERE vk_id = ?i)", [$data['vk_user_id']]);
        $arr = [];
        foreach ($data_db as $value) {
            $arr[] = ['name' => $value['name'], 'playtime' => $times[$value['steam_game_id']], 'game_id' => $value['game_id'], 'image' => $value['image']];
        }
        usort($arr, function ($a, $b) {
            return $b['playtime'] <=> $a['playtime'];
        });
        $api->answer = $arr;
        break;
    case 'get_all_games':
        $data = $api->params(['vk_user_id']);
        $api->answer = $db->rows("SELECT * FROM games");
        break;
    case 'get_user_data':
        $data = $api->params(['vk_user_id']);
        $api->answer['requests'] = $db->rows("SELECT request.request_id,
                                           request.game_id,
                                           request.text,
                                           request.is_team,
                                           request.team_id,
                                           request.game_id,
                                           games.name as 'game_name',
                                           users.name
                                    FROM request,
                                         games,
                                         users
                                    WHERE request.game_id = games.game_id
                                      AND request.vk_id = users.vk_id
                                          AND request.vk_id = ?i", [$data['vk_user_id']]);

        $api->answer['games'] = $db->rows("SELECT games.game_id, 
                                                games.name, 
                                                games.image
                                    FROM users_games,
                                         games
                                    WHERE users_games.vk_id = ?i
                                      AND games.game_id = users_games.game_id", [$data['vk_user_id']]);;
        break;
    case 'get_member_team_data':
        $data = $api->params(['vk_user_id', 'team_id']);
        $check = $db->row("SELECT * FROM teams_users WHERE team_id = ?i AND vk_id = ?i", [$data['team_id'], $data['vk_user_id']]);
        if(!$check) {
            $api->error('У вас нет доступа к информации этой тимы');
        }
        $api->answer['requests'] = $db->rows("SELECT request.request_id,
                                                       request.game_id,
                                                       request.text,
                                                       request.is_team,
                                                       request.team_id,
                                                       request.game_id,
                                                       games.image,
                                                       games.name as 'game_name'
                                                FROM request,
                                                     games
                                                
                                                WHERE request.team_id = ?i
                                                  AND request.game_id = games.game_id", [$data['team_id']]);

        $api->answer['members'] = $db->rows("SELECT users.avatar_url, users.name, users.vk_id
                                                FROM teams_users,
                                                     users
                                                WHERE teams_users.team_id = ?i
                                                  AND teams_users.vk_id = users.vk_id", [$data['team_id']]);

        $api->answer['chat_url'] = $db->row("SELECT chat_url FROM teams WHERE id = ?i", [$data['team_id']])['chat_url'];
        break;
    case 'add_user_games':
        $data = $api->params(['vk_user_id', 'game_ids']);
        $ids = explode(',',$data['game_ids']);
        foreach ($ids as $id) {
            if($id) {
                $check = $db->row("SELECT * FROM users_games WHERE vk_id = ?i AND game_id = ?i", [$data['vk_user_id'], $id]);
                if (!$check) {
                    $db->query("INSERT INTO users_games SET vk_id = ?i, game_id = ?i", [$data['vk_user_id'], $id]);
                }
            }
        }
        $api->answer['status'] = true;
        break;
    case 'get_select_games':
        $data = $api->params(['vk_user_id']);
        $api->answer = $db->rows("SELECT games.game_id, games.name, games.image
                                    FROM users_games,
                                         games
                                    WHERE users_games.vk_id = ?i
                                      AND games.game_id = users_games.game_id", [$data['vk_user_id']]);
        break;
}

function getUserSteamGames($steam_id) {
    global $api;
    $key = 'XXXXXXXXX';
    $url = file_get_contents('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' . $key . '&steamid=' . $steam_id . '&format=json');
//    var_dump('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' . $key . '&steamid=' . $steam_id . '&format=json');
    $content = json_decode($url, true)['response'];
    if($content == []) {
        $api->error('Нет игр');
    }
    $ids = array_column($content['games'], 'appid');
    $playtime = array_column($content['games'], 'playtime_forever');
//    var_dump($content);
    $playtime = array_map(function ($n) {
        return round($n / 60, 2);
    }, $playtime);
    $times = array_combine($ids, $playtime);
    return [$ids, $times];
}

function checkSecurity() {
    global $api;
    $client_secret = 'XXXXXXXXX';

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
        $api->error('Ошибка безопасности');
    $status = ($sign === $_GET['sign']);
    if (!$status) {
        $api->error('Ошибка безопасности');
    }
}

function csgo($steam_id, $app_id = 730) {
    global $api;
    $temp_data = [];
    $return_data = [];
    $info = getGameInfo($steam_id, $app_id)['playerstats']['stats'];
    foreach ($info as $key => $value) {
        switch ($value['name']) {
            case 'total_kills': //всего убийств
                $temp_data['total_kills'] = $value['value'];
                break;
            case 'total_deaths': //всего смертей
                $temp_data['total_deaths'] = $value['value'];
                break;
            case 'total_wins': //всего побед
                $temp_data['total_wins'] = $value['value'];
                break;
            case 'total_shots_hit': //всего попаданий
                $temp_data['total_shots_hit'] = $value['value'];
                break;
            case 'total_shots_fired': //всего выстрелов
                $temp_data['total_shots_fired'] = $value['value'];
                break;
            case 'total_kills_headshot': //всего убито хедшотами
                $temp_data['total_kills_headshot'] = $value['value'];
                break;
            case 'total_mvps': //всего раз лучший игрок
                $temp_data['total_mvps'] = $value['value'];
                break;
            case 'total_matches_played': //всего матчей сыграно
                $temp_data['total_matches_played'] = $value['value'];
                break;
            case 'total_wins_pistolround': //выиграно пистолеток
                $temp_data['total_wins_pistolround'] = $value['value'];
                break;
        }
    }
    $info2 = getGameInfo2($steam_id, $app_id)['response']['games'] ?? null;
    if($info2) {
        foreach ($info2 as $key => $value) {
            if ($value['appid'] == $app_id) {
//            $return_data['playtime_2weeks'] = round($value['playtime_2weeks'] / 60, 2);
                $return_data['playtime_forever'] = round($value['playtime_forever'] / 60, 2);
                break;
            }
        }
    } else {
        $api->answer['status'] = 'Не удалось получить статистику';
    }

    $return_data['kdr'] = round($temp_data['total_kills'] / $temp_data['total_deaths'], 2);
    $return_data['accuracy'] = round($temp_data['total_shots_hit'] / $temp_data['total_shots_fired'], 2);
    $return_data['headshot'] = round($temp_data['total_kills_headshot'] / $temp_data['total_kills'], 2);
    $return_data['count_mvp_for_match'] = round($temp_data['total_mvps'] / $temp_data['total_matches_played'], 2);
    $return_data['wins_pistolround'] = round($temp_data['total_wins_pistolround'] / ($temp_data['total_matches_played'] * 2), 2);
    return $return_data;
}

function dota2($steam_id) {
    $return = [];
    $html = new simple_html_dom();
    $html->load(getDotaSite($steam_id));
    $bloc1 = $html->find('div.header-content-secondary', 0);
    $return['Всего матчей'] = array_sum(explode('-', strip_tags($html->find('span.game-record', 0)->innertext)));
    $return['дата последней игры'] = $bloc1->find('dl dd time', 0)->innertext;
//    $return['% побед'] = $bloc1->find('dl', 2)->children(0)->innertext;
    $return['звание'] = explode(" ", $bloc1->find('div', 0)->attr['title'], 2)[1];
    $return['последнее обновление информации'] = $html->find('p.footnote time', 0)->innertext;
    $основной_стиль = explode(" ", trim(strip_tags($html->find('div.label', 0)->innertext)));
    $return[$основной_стиль[1]]['процент от общих игр'] = $основной_стиль[0];
    $line1 = trim(strip_tags($html->find('div.sector div.label', 1)->innertext));
    $return[$основной_стиль[1]]['линии'][$line1] = (double)explode(' ', $html->find('div.sector', 0)->style)[1];
    $line2 = trim(strip_tags($html->find('div.sector div.label', 2)->innertext));
    $return[$основной_стиль[1]]['линии'][$line2] = (double)explode(' ', $html->find('div.sector', 1)->style)[1];

    $arr = [];
    $arr2 = [];
    $arr3 = [];
    foreach ($html->find('div.sector') as $key => $value) {
        switch ($key) {
            case 0:
                $arr['first'] = trim(strip_tags($value->find('div.label', 0)->innertext));
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                if ($value->find('div.segment-safelane')) {
                    $arr2['Легкая линия'] = (double)explode(' ', $value->style)[1];
                }
                if ($value->find('div.segment-offlane')) {
                    $arr2['Тяжелая линия'] = (double)explode(' ', $value->style)[1];
                }
                if ($value->find('div.segment-midlane')) {
                    $arr2['Мид'] = (double)explode(' ', $value->style)[1];
                }
                if ($value->find('div.segment-jungle')) {
                    $arr2['Лес'] = (double)explode(' ', $value->style)[1];
                }
                if ($value->find('div.segment-roaming')) {
                    $arr2['Роуминг'] = (double)explode(' ', $value->style)[1];
                }
                break;
            case 6:
                $arr['tho'] = trim(strip_tags($value->find('div.label', 0)->innertext));
                break;
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                if ($value->find('div.segment-safelane')) {
                    $arr3['Легкая линия'] = (double)explode(' ', $value->style)[1];
                }
                if ($value->find('div.segment-offlane')) {
                    $arr3['Тяжелая линия'] = (double)explode(' ', $value->style)[1];
                }
                if ($value->find('div.segment-midlane')) {
                    $arr3['Мид'] = (double)explode(' ', $value->style)[1];
                }
                if ($value->find('div.segment-jungle')) {
                    $arr3['Лес'] = (double)explode(' ', $value->style)[1];
                }
                if ($value->find('div.segment-roaming')) {
                    $arr3['Роуминг'] = (double)explode(' ', $value->style)[1];
                }
                break;

        }
    }
    arsort($arr2);
    arsort($arr3);
    $ex1 = explode(' ', $arr['first']);
    $ex2 = explode(' ', $arr['tho']);
    $arr2['% от игр'] = $ex1[0];
    $arr3['% от игр'] = $ex2[0];
    $return[$ex1[1]] = $arr2;
    $return[$ex2[1]] = $arr3;

    $arr_heroes = [];
    foreach ($html->find('div.heroes-overview div.r-row') as $key => $value) {
        $name = $value->find('div.r-none-mobile a', 0)->innertext;
        $arr_heroes[$name]['количество игр'] = trim(strip_tags($value->find('div.r-body', 1)->innertext));
        $arr_heroes[$name]['процент побед'] = trim(strip_tags($value->find('div.r-body', 2)->innertext));
        $arr_heroes[$name]['УСП'] = trim(strip_tags($value->find('div.r-body', 3)->innertext));
    }

    $return['топ героев'] = $arr_heroes;

//print $zvanie . PHP_EOL;
//print "Процент побед: " . $kda . PHP_EOL;
//print "Последняя игра: " . $date_last_game . PHP_EOL;
//print "Обновлено: $last_update" . PHP_EOL;
//print "Основной класс:" . $main_class . PHP_EOL;
//print $first_line_name . ": $first_line_proc" . PHP_EOL;
//print $tho_line_name . ": $tho_line_proc" . PHP_EOL;
//print "Остальные: " . (-(100 - $first_line_proc - $tho_line_proc)) . PHP_EOL;

    $html->clear();// подчищаем за собой
    unset($html);
    return $return;
}

function getDotaSite($steam_id) {
    $response = core("https://ru.dotabuff.com/players/76561198433327780", null, HEADERS);
    $response = core($response['header']['location'], null, HEADERS);

    if (isset($response['header']['content-encoding']) && $response['header']['content-encoding'] == 'gzip')
        $response['body'] = gzdecode($response['body']);

    return $response['body'];
}

function getGameInfo($steam_id, $app_id) {
    return json_decode(file_get_contents("http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=$app_id&key=847C30D273395155925FF2CED177A8D2&steamid=$steam_id&format=json"), true);
}

function getGameInfo2($steam_id, $app_id) {
    return json_decode(file_get_contents("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?appid=$app_id&key=847C30D273395155925FF2CED177A8D2&steamid=$steam_id&format=json"), true);
}

function core($url, $post_values = null, $user_headers = null, $method = null) {
    if ($curl = curl_init()) {
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        if (isset($post_values) and strlen($post_values) > 1) {
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $post_values);
        }

        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Expect:'));

        curl_setopt($curl, CURLOPT_HEADERFUNCTION,
            function ($curl, $header) use (&$headers) {
                $len = strlen($header);
                $header = explode(':', $header, 2);
                if (count($header) < 2) // ignore invalid headers
                    return $len;

                $name = strtolower(trim($header[0]));
                if (isset($headers) and !array_key_exists($name, $headers))
                    $headers[$name] = [trim($header[1])];
                else
                    $headers[$name][] = trim($header[1]);

                return $len;
            }
        );

        if (isset($method)) {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
        }

        if (isset($user_headers)) {

            if (isset($user_headers['User-Agent'])) {
                curl_setopt($curl, CURLOPT_USERAGENT, $user_headers['User-Agent']);
                unset($user_headers['User-Agent']);
            }

            if (isset($user_headers['Cookie'])) {
                curl_setopt($curl, CURLOPT_COOKIE, $user_headers['Cookie']);
                unset($user_headers['Cookie']);
            }

            if (isset($user_headers['Content-Length']))
                unset($user_headers['Content-Length']);

            $user_headers['Content-Length'] = strlen($post_values);

            if (isset($user_headers) and count($user_headers) > 0) {
                $user_headers_req = [];
                foreach ($user_headers as $key => $value)
                    $user_headers_req[] = $key . ": " . $value;
                curl_setopt($curl, CURLOPT_HTTPHEADER, $user_headers_req);
            }
        }

        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        $out = curl_exec($curl);
        $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        foreach ($headers as $key => $value)
            $headers[$key] = join("; ", $value);
        return ['header' => $headers, 'body' => $out, 'http_code' => $http_code];
    }
}