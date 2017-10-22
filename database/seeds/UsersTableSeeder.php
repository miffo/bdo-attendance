<?php

use Illuminate\Database\Seeder;

/**
 * Class UsersTableSeeder
 */
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Factory(App\User::class, 5)->create()->each(function (App\User $user) {
            $character = $user->DefaultCharacter()->save(Factory(\App\Character::class)->make(['user_id' => $user->id]));
            $user->default_character = $character->id;

            if ($user->id == 5) {
                $user->Afkes()->save(Factory(\App\Afk::class)->make(['user_id' => $user->id]))->save();
            }

            foreach (\App\Event::all() as $event) {
                $afk = $user->Afkes()->first();
                if (is_null($afk) || ($event->event_date < $afk->from_date || $event->event_date > $afk->to_date)
                ) {
                    $user->SignUps()
                        ->save(Factory(\App\SignUp::class)
                            ->make([
                                'user_id' => $user->id,
                                'event_id' => $event->id,
                                'character_id' => $user->default_character
                            ])
                        );
                }
            }
            $user->save();
        });
    }
}