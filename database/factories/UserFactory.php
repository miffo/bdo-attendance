<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(App\User::class, function (Faker $faker) {
    static $password;

    return [
        'name' => $faker->firstName(),
        'family_name' => $faker->lastName,
        'default_character_id' => null,
        'email' => $faker->unique()->safeEmail,
    ];
});