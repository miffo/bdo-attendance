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
            $character = $user->defaultCharacter()->save(Factory(\App\Character::class)->make(['user_id' => $user->id]));
            $user->default_character_id = $character->id;

            if ($user->id == 5) {
                $user->afk()->save(Factory(\App\Afk::class)->make(['user_id' => $user->id]))->save();
            }

            $now = new DateTime('now');
            foreach (\App\Event::all() as $event) {
                $afk = $user->afk()->first();
                if (is_null($afk) || ($event->event_date < $afk->from_date || $event->event_date > $afk->to_date)) {
                    $attending = [];
                    if ($user->id == 3) {
                        $attending['attending'] = false;
                    }
                    $signUp = $user->signUps()
                        ->save(Factory(\App\SignUp::class)
                            ->make(array_merge([
                                'user_id' => $user->id,
                                'event_id' => $event->id,
                                'character_id' => $user->defaultCharacter->id
                            ], $attending))
                        );

                    if ($now > new DateTime($event->event_date) && $signUp->attending) {
                        $user->attendedEvents()->save($event);
                    }
                }
            }
            $user->save();
        });
    }
}