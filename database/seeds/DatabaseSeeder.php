<?php

use Illuminate\Database\Seeder;

/**
 * Class DatabaseSeeder
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CharacterClassesTableSeeder::class,
            GuildTableSeeder::class,
            EventsTableSeeder::class,
            MembersTableSeeder::class,
        ]);
    }
}