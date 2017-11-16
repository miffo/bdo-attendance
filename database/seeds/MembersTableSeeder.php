<?php

use Illuminate\Database\Seeder;

/**
 * Class UsersTableSeeder
 */
class MembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Factory(App\Member::class, 5)->create()->each(function (App\Member $member) {
            /** @var \App\Guild $guild */
            $guild = \App\Guild::where('id', 376708185081249792)->get()->first();
            $member->guild()->associate($guild);

            if ($member->id == 1) {
                /** @var \App\User $user */
                $user = Factory(\App\User::class)->make(['id' => 95564130404020224, 'name' => "miffo"]);
                $user->save();
                $user->members()->save($member);
                /** @var \App\Role $role */
                $role = \App\Role::where('name', 'mod')->where('guild_id', $member->guild_id)->get()->first();
                $member->roles()->attach($role->id);
                /** @var \App\Role $role */
                $role = \App\Role::where('name', 'owner')->where('guild_id', $member->guild_id)->get()->first();
                $member->roles()->attach($role->id);
                /** @var \App\Role $role */
                $role = \App\Role::where('name', 'user')->where('guild_id', $member->guild_id)->get()->first();
                $member->roles()->attach($role->id);
            } else if ($member->id == 2) {
                $user = Factory(\App\User::class)->make(['id' => 194901979581906944, 'name' => "rvn"]);
                $user->save();
                $user->members()->save($member);
                /** @var \App\Role $role */
                $role = \App\Role::where('name', 'mod')->where('guild_id', $member->guild_id)->get()->first();
                $member->roles()->attach($role->id);
                /** @var \App\Role $role */
                $role = \App\Role::where('name', 'user')->where('guild_id', $member->guild_id)->get()->first();
                $member->roles()->attach($role->id);
            } else {
                $user = Factory(\App\User::class)->make();
                $user->save();
                $user->members()->save($member);
                /** @var \App\Role $role */
                $role = \App\Role::where('name', 'user')->where('guild_id', $member->guild_id)->get()->first();
                $member->roles()->attach($role->id);
            }

            if ($member->id === 5) {
                $member->afk()->save(Factory(\App\Afk::class)->make(['member_id' => $member->id]))->save();
            }

            $character = $member->defaultCharacter()->save(Factory(\App\Character::class)->make(['member_id' => $member->id]));
            $member->default_character_id = $character->id;

            $now = new DateTime('now');
            foreach (\App\Event::all() as $event) {
                $afk = $member->afk()->first();
                if (is_null($afk) || ($event->event_date < $afk->from_date || $event->event_date > $afk->to_date)) {
                    $attending = [];
                    if ($member->id == 3) {
                        $attending['attending'] = false;
                    }
                    $signUp = $member->signUps()
                        ->save(Factory(\App\SignUp::class)
                            ->make(array_merge([
                                'member_id' => $member->id,
                                'event_id' => $event->id,
                                'character_id' => $member->defaultCharacter->id
                            ], $attending))
                        );

                    if ($now > new DateTime($event->event_date) && $signUp->attending) {
                        $member->attendedEvents()->save($event);
                    }
                }
            }
            $member->save();
        });
    }
}