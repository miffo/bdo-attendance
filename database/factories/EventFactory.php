<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(App\Event::class, function (Faker $faker) {
    $signUpDate = new DateTime('now');
    $signUpDate->add(new DateInterval('P'.$faker->numberBetween(2, 7). 'D'));
    $signUpDate->setTime($faker->randomElement(['20','18']), $faker->randomElement(['0','30']), 0);
    $startDate = clone($signUpDate);
    $startDate->add(new DateInterval('P2D'));

    return [
        'name' => $faker->randomElement(["raid", "nodewar"]) . " " . $faker->dayOfWeek($startDate),
        'description' => $faker->text("50"),
        'event_date' => $startDate,
        'last_signup_date' => $signUpDate,
    ];
});