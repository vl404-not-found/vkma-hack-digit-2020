<?php
require('SteamAuthentication/steamauth/steamauth.php');
require_once 'vendor/autoload.php';
require_once 'simplevk3/autoload.php';

header('Access-Control-Expose-Headers: Access-Control-Allow-Origin', false);
header('Access-Control-Allow-Origin: *', false);
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept', false);
header('Access-Control-Allow-Credentials: true');

if (!isset($_SESSION)) {
    session_start([
        'cookie_lifetime' => 300400,
        'use_only_cookies' => false
    ]);
}