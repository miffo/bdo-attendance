<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(App\Character::class, function (Faker $faker) {
    return [
        'name' => $faker->firstName(),
        'level' => $faker->numberBetween(60, 62),
        'class_id' => $faker->randomElement(array_map(function ($element) {
            return $element['id'];
        }, \App\CharacterClass::all()->toArray())),
    ];
});