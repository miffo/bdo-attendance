<?php

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(App\Afk::class, function (Faker $faker) {
    $fromDate = new DateTime("now");
    $fromDate->add(new DateInterval("P4D"));
    $toDate = clone($fromDate);
    $toDate->add(neW DateInterval("P2D"));
    return [
        'reason' => $faker->text("50"),
        'from_date' => $fromDate,
        'to_date' => $toDate,
    ];
});