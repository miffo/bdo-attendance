<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(\App\Guild::class, function (Faker $faker) {
    return [
        'id' => random_int(0,PHP_INT_MAX),
        'name' => $faker->name(),
        'icon' => $faker->md5,
    ];
});