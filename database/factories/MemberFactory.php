<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(\App\Member::class, function (Faker $faker) {
    return [
        'id' => random_int(0,PHP_INT_MAX),
        'guild_id' => random_int(0,PHP_INT_MAX),
        'user_id' => random_int(0, 5),
        'avatar' => $faker->md5,
    ];
});