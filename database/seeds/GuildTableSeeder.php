<?php

use Illuminate\Database\Seeder;

class GuildTableSeeder extends Seeder
{
    public function run()
    {
        $rolesMap = [
            'owner' => [13],
            'mod' => [12,11,10,9,8,7,6],
            'user' => [1,2,3,4,5],
        ];
        $iter = 0;
        Factory(\App\Guild::class, 2)->create()->each(function (\App\Guild $guild) use ($rolesMap, &$iter) {
            if ($iter == 0) {
                $iter++;
                $guild->id = 376708185081249792;
                $guild->name = "Miffoslair";
                $guild->save();

                /** @var \App\Role $owner */
                $owner = $guild->roles()->save(Factory(\App\Role::class)->make(['guild_id' => $guild->id, 'name' => "owner", 'position' => 1]));
                $this->insertRolePermissions($owner, $rolesMap['owner']);
                /** @var \App\Role $mod */
                $mod = $guild->roles()->save(Factory(\App\Role::class)->make(['guild_id' => $guild->id, 'name' => "mod", 'position' => 2]));
                $this->insertRolePermissions($mod, $rolesMap['mod']);
                /** @var \App\Role $user */
                $user = $guild->roles()->save(Factory(\App\Role::class)->make(['guild_id' => $guild->id, 'name' => "user", 'position' => 3]));
                $this->insertRolePermissions($user, $rolesMap['user']);
            } else {
                $guild->id = 189127132255879168;
                $guild->name = "Soveregin";
                $guild->save();

                /** @var \App\Role $owner */
                $owner = $guild->roles()->save(Factory(\App\Role::class)->make(['guild_id' => $guild->id, 'name' => "owner", 'position' => 1]));
                $this->insertRolePermissions($owner, $rolesMap['owner']);
                /** @var \App\Role $mod */
                $mod = $guild->roles()->save(Factory(\App\Role::class)->make(['guild_id' => $guild->id, 'name' => "mod", 'position' => 2]));
                $this->insertRolePermissions($mod, $rolesMap['mod']);
                /** @var \App\Role $user */
                $user = $guild->roles()->save(Factory(\App\Role::class)->make(['guild_id' => $guild->id, 'name' => "user", 'position' => 3]));
                $this->insertRolePermissions($user, $rolesMap['user']);
            }
        });
    }

    /**
     * @param \App\Role $role
     * @param int[] $permissions
     */
    private function insertRolePermissions($role, $permissions)
    {
        /** @var int $permission */
        foreach ($permissions as $permission) {
            $role->permissions()->attach($permission);
        }
    }
}