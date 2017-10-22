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
        Factory(App\Event::class, 5)->create();
    }
}