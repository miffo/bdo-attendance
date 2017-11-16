<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(\App\Member::class, function (Faker $faker) {
    return [
        'guild_id' => random_int(0,PHP_INT_MAX),
        'name' => $faker->firstName(),
        'family_name' => $faker->lastName,
        'default_character_id' => null,
    ];
});