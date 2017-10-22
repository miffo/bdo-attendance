<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class CharacterClassesTableSeeder
 */
class CharacterClassesTableSeeder extends Seeder
{
    /** @var string[] */
    const EXAMPLE_CLASSES = [
        "warrior",
        "witch",
        "tamer",
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (self::EXAMPLE_CLASSES as $class) {
            if (!\App\CharacterClass::all()->contains('name', '=', $class)) {
                DB::table('character_classes')->insert([
                    "name" => $class,
                ]);
            }
        }
    }
}
