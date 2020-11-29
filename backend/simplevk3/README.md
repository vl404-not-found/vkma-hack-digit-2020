<p align="center">
  <img alt="SimpleVK logo" title="SimpleVK это PHP библиотека быстрой разработки ботов для VK.COM" src="http://images.vfl.ru/ii/1563283715/1c6a23fb/27226348.png"/>
</p>

<p align="center">
<img src="https://img.shields.io/badge/PHP-%3E=%207.0-8992bb.svg" alt="php version">
<img src="https://img.shields.io/badge/VK_API-%205.103_--_5.120-8992bb.svg" alt="VK api version">
<img src="https://img.shields.io/badge/realise-%203.0.0--beta-8992bb.svg" alt="VK api version">
<img src="https://img.shields.io/packagist/l/digitalstars/simplevk" alt="License">
</p> 


> ВАЖНО: Эта ветка находится в ранней бете, предназначена для тестирования. Использование в реальных проектах - на ваш страх и риск

> Документация находится в процессе создания.

[Документация на русском](https://simplevk.scripthub.ru/v3/install/who_simplevk.html)
--- |  

[Беседа VK](https://vk.me/join/AJQ1dzQRUQxtfd7zSm4STOmt) | [Telegram](https://t.me/vk_api_chat) | [Discord](https://discord.gg/RFqAWRj)
--- | --- | --- |

[Блог со статьями](https://scripthub.ru)
--- |

# Почему SimpleVK?
SimpleVK - это фреймворк для создания ботов. Вам потребуется минимум кода и времени для создания бота, за счет встроенного конструктора и реализации многих готовых модулей и функций для работы с VK API.  

## Функционал
* Модуль рассылки по сообщениям и беседам
* Модуль конструктора ботов
* Модуль обработки команд с помощью регулярок и placeholder'ов
* Работа с кнопками
* Установка прокси
* placeholder'ы для создания упоминаний
* Удобный debug модуль
* Встроенное хранилище данных
* Куча всего остального!

## Поддержка
* `Callback API`
* `User Long Poll API`
* `Bots Long Poll API`
* `Streaming API`
* Карусели
* Все виды кнопок, в том числе и новые callback кнопки
* Работа с голосовыми сообщениями и документами

# Подключение
> UPD: Пока 3.0 находится в ветке testing, через composer ее установить нельзя.
### Используя composer
1\. Установить
```
composer require digitalstars/simplevk
```
2\. Подключить `autoload.php` внутри бота
```php
require_once "vendor/autoload.php";
```
### Вручную
1. Скачать последний релиз c [github](https://github.com/digitalstars/simplevk/tree/testing)
2. Подключить `autoload.php`.  
> Вот так будет происходить подключение, если ваш бот находится в той же папке, что и папка `simplevk-testing`
```php
require_once "simplevk-testing/autoload.php";
```

## Примеры ботов
### Минимальный Callback  
> Бот отвечает на любое сообщение
```php
<?php
require_once "vendor/autoload.php";
use DigitalStars\SimpleVK\SimpleVK as vk;
$vk = vk::create(ТОКЕН, '5.120')->setConfirm(STR); //STR - строка подтверждения сервера
$vk->msg('Привет, ~_fn~')->send();
```
### Простой Callback  
```php
<?php
require_once "vendor/autoload.php";
use DigitalStars\SimpleVK\SimpleVK as vk;
$vk = vk::create(ТОКЕН, '5.120')->setConfirm(STR); //STR - строка подтверждения сервера
$vk->setUserLogError(ID); //ID - это id vk, кому бот будет отправлять все ошибки, возникние в скрипте
$data = $vk->initVars($peer_id, $user_id, $type, $message); //инициализация переменных из события
if($type == 'message_new') {
    if($message == 'Привет') {
        $vk->msg('Привет, ~_fn~')->send();
    }
}
```
### Простой LongPoll / User LongPoll
> Если указать токен группы - будет LongPoll.  
> Если указать токен пользователя - User LongPoll.  
> А еще можно указать логин и пароль от аккаунта:  
> `new LongPoll(ЛОГИН, ПАРОЛЬ, '5.120');`  
> Но советую создать токен вот по этому [гайду](https://vkhost.github.io/)
```php
<?php
require_once "vendor/autoload.php";
use DigitalStars\SimpleVK\LongPoll;
$vk = LongPoll::create(ТОКЕН, '5.120');
$vk->setUserLogError(ID); //ID - это id vk, кому бот будет отправлять все ошибки, возникние в скрипте
$vk->listen(function () use ($vk) {
    $data = $vk->initVars($peer_id, $user_id, $type, $message); //инициализация переменных из события
    if($type == 'message_new') {
        if($message == 'Привет') {
            $vk->msg('Привет, ~_fn~')->send();
        }
    }
});
```
### Минимальный Бот на конструкторе (Callback)
```php
<?php
require_once "vendor/autoload.php";
use DigitalStars\SimpleVK\Bot;
$bot = Bot::create(ТОКЕН, '5.120');
$bot->cmd('img', '!картинка')->img('cat.jpg')->text('Вот твой кот');
$bot->run(); //запускаем обработку события
```
### Минимальный Бот на конструкторе (LongPoll)
```php
<?php
require_once "vendor/autoload.php";
use DigitalStars\SimpleVK\{Bot, LongPoll};
$vk = LongPoll::create(ТОКЕН, '5.120');
$bot = Bot::create($vk);
$bot->cmd('img', '!картинка')->img('cat.jpg')->text('Вот твой кот');
$vk->listen(function () use ($bot) {
    $bot->run(); //запускаем обработку события
});
```
### Бот с обработкой Команд на конструкторе (Callback)
```php
<?php
require_once "vendor/autoload.php";
use DigitalStars\SimpleVK\{Bot, SimpleVK as vk};
$vk = vk::create(ТОКЕН, '5.120');
$vk->setUserLogError(ID); //ID - это id vk, кому бот будет отправлять все ошибки, возникние в скрипте
$bot = Bot::create($vk);
//отправит картинку с текстом
$bot->cmd('img', '!картинка')->img('cat.jpg')->text('Вот твой кот');
//обработка команды с параметрами
$bot->cmd('sum', '!посчитай %n + %n')->func(function ($msg, $params) {
    $msg->text($params[0] + $params[1]);
});
//обработка команды по регулярке
$bot->preg_cmd('more_word', "!\!напиши (.*)!")->func(function ($msg, $params) {
    $msg->text("Ваше предложение: $params[1]");
});
$bot->run();
```
### Бот с обработкой Кнопок на конструкторе (Callback)
```php
<?php
require_once "vendor/autoload.php";
use DigitalStars\SimpleVK\{Bot, SimpleVK as vk};
$vk = vk::create(ТОКЕН, '5.120');
$vk->setUserLogError(ID); //ID - это id vk, кому бот будет отправлять все ошибки, возникние в скрипте
$bot = Bot::create($vk);
$bot->redirect('other', 'first'); //если пришла неизвестная кнопка/текст, то выполняем first
$bot->cmd('first')->kbd([['fish', 'cat']])->text('Выберите животное:'); //срабатывает при нажатии кнопки Начать
$bot->btn('fish', 'Рыбка')->text('Вы выбрали Рыбку!')->img('fish.jpg');
$bot->btn('cat', 'Котик')->text('Вы выбрали Котика!')->img('cat.jpg');
$bot->run();
```
### Бот на конструкторе, с использованием хранилища (Callback)
```php
<?php
require_once "vendor/autoload.php";
use DigitalStars\SimpleVK\{Bot, Store, SimpleVK as vk};
$vk = vk::create(ТОКЕН, '5.120');
$bot = Bot::create($vk);
$bot->cmd('cmd1', '!запомни %s')->text('Запомнил!')->func(function ($msg, $params) use ($vk) {
    $vk->initVars($id, $user_id, $payload, $user_id);
    $store = Store::load($user_id); //загружаем хранилище пользователя
    $store->sset('str', $params[0]); //записываем в ключ str его слово
});
$bot->cmd('cmd2', '!напомни')->func(function ($msg, $params) use ($vk) {
    $vk->initVars($id, $user_id, $payload, $user_id);
    $store = Store::load($user_id); //загружаем хранилище пользователя
    $str = $store->get('str'); //выгружаем из его хранилища строку
    $msg->text($str); //устанавливаем текст в экземпляре сообщения
});
$bot->run();
```
## Больше примеров
В папке [examples](https://github.com/digitalstars/simplevk/tree/testing/examples) лежат прокомментированные примеры более сложных ботов и функций, а так же можете изучить функции в документации.