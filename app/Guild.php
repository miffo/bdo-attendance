<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Guild
 * @package App
 */
class Guild extends Model
{
    protected $table = 'guilds';
    public $incrementing = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function members()
    {
        return $this->hasMany(User::class,'guild_id','id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function roles()
    {
        return $this->hasMany(Role::class, 'guild_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function events()
    {
        return $this->hasMany(Event::class, 'guild_id', 'id');
    }
}