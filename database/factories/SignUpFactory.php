<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(App\SignUp::class, function (Faker $faker) {
    $date = new DateTime('now');
    $date->add(new DateInterval('P'. $faker->numberBetween(2,4) . "D"));
    return [
        'attending' => $faker->boolean(70),
        'comment' => $faker->text(40),
        'created_at' => $date,
        'updated_at' => $date,
    ];
});