<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Member
 * @package App
 */
class Member extends Model
{
    protected $table = 'members';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function characters()
    {
        return $this->hasMany(Character::class, 'member_id', "id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function defaultCharacter()
    {
        return $this->hasOne(Character::class, 'id', "default_character_id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function signUps()
    {
        return $this->hasMany(SignUp::class, "member_id", "id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function afk()
    {
        return $this->hasMany(Afk::class, 'member_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function attendedEvents()
    {
        return $this->belongsToMany(
            Event::class,
            'attendees',
            'member_id',
            'event_id',
            'id',
            'id',
            'Attended'
        )->as("Attended")->withTimestamps();
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function guild()
    {
        return $this->belongsTo(
            Guild::class,
            'guild_id',
            'id',
            'guild'
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(
            Role::class,
            'member_roles',
            'member_id',
            'role_id',
            'id',
            'id',
            'member_roles'
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function hasPermission(String $permission): bool
    {
        /** @var Role $role */
        foreach ($this->roles as $role) {
            if ($role->hasPermission($permission))
                return true;
        }
        return false;
    }
}
