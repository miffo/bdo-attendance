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
        $guild = \App\Guild::all()->first();
        Factory(App\Event::class)->create([
            'guild_id' => $guild->id,
            'event_date' => $eventDate,
            'last_sign_up_date' => $lastSignUpDate,
        ]);
        Factory(App\Event::class, 5)->create(['guild_id' => $guild->id]);
    }
}