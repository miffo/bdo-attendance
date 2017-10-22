<?php

use Illuminate\Database\Seeder;

/**
 * Class EventsTableSeeder
 */
class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $eventDate = new DateTime('now');
        $eventDate->sub(new DateInterval("P1D"));
        $lastSignUpDate = clone($eventDate);
        $lastSignUpDate->sub(new DateInterval("P1D"));
        Factory(App\Event::class)->create([
            'event_date' => $eventDate,
            'last_sign_up_date' => $lastSignUpDate,
        ]);
        Factory(App\Event::class, 5)->create();
    }
}