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
        Factory(\App\User::class, 5)->create()->each(function (\App\User $user) {
            $character = $user->defaultCharacter()->save(Factory(\App\Character::class)->make(['user_id' => $user->id]));
            $user->default_character_id = $character->id;
            $memberId = $user->id;
            if ($user->id === 1) {
                $memberId = 95564130404020224;
                $user->members()->save(Factory(\App\Member::class)->make(['id' => $memberId, 'guild_id' => 189127132255879168]));
            } else if ($user->id === 2) {
                $memberId = 194901979581906944;
                $user->members()->save(Factory(\App\Member::class)->make(['id' => $memberId, 'guild_id' => 189127132255879168]));
            }
            $user->members()->save(Factory(\App\Member::class)->make(['id' => $memberId, 'guild_id' => 376708185081249792]));

            /** @var \App\Member $member */
            foreach ($user->members as $member) {
                /** @var \App\Role $role */
                $role = \App\Role::where('name', 'user')->where('guild_id', $member->guild_id)->get()->first();
                $member->roles()->attach($role->id);
                if ($user->id === 1) {
                    /** @var \App\Role $role */
                    $role = \App\Role::where('name', 'mod')->where('guild_id', $member->guild_id)->get()->first();
                    $member->roles()->attach($role->id);
                    /** @var \App\Role $role */
                    $role = \App\Role::where('name', 'owner')->where('guild_id', $member->guild_id)->get()->first();
                    $member->roles()->attach($role->id);
                } else if ($user->id === 2) {
                    /** @var \App\Role $role */
                    $role = \App\Role::where('name', 'mod')->where('guild_id', $member->guild_id)->get()->first();
                    $member->roles()->attach($role->id);
                }
            }

            if ($user->id === 5) {
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