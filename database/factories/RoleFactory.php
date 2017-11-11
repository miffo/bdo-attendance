<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(\App\Role::class, function (Faker $faker) {
    return [
        'id' => random_int(0,PHP_INT_MAX),
        'guild_id' => random_int(0,PHP_INT_MAX),
        'name' => $faker->name(),
        'color' => 12745742,
        'position' => random_int(0,5)
    ];
});