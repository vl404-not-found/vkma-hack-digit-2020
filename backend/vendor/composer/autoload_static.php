<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd9069993fff057b0fa54c71400a21ce0
{
    public static $prefixLengthsPsr4 = array (
        'D' => 
        array (
            'DigitalStars\\DataBase\\' => 22,
            'DigitalStars\\Daemon\\' => 20,
            'DigitalStars\\' => 13,
            'DigitalStar\\vk_api\\' => 19,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'DigitalStars\\DataBase\\' => 
        array (
            0 => __DIR__ . '/..' . '/digitalstars/database/src',
        ),
        'DigitalStars\\Daemon\\' => 
        array (
            0 => __DIR__ . '/..' . '/digitalstars/daemon/src',
        ),
        'DigitalStars\\' => 
        array (
            0 => __DIR__ . '/..' . '/digitalstars/simple-api/src',
        ),
        'DigitalStar\\vk_api\\' => 
        array (
            0 => __DIR__ . '/..' . '/digitalstars/simplevk/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitd9069993fff057b0fa54c71400a21ce0::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitd9069993fff057b0fa54c71400a21ce0::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}