<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 * @package App
 */
class User extends Authenticatable
{
    use Notifiable;

    protected $table = "users";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Characters()
    {
        return $this->hasMany(Character::class, 'user_id', "id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function DefaultCharacter()
    {
        return $this->hasOne(Character::class, 'id', "default_character");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function SignUps()
    {
        return $this->hasMany(SignUp::class, "user_id", "id");
    }

    public function Afkes()
    {
        return $this->hasMany(Afk::class, 'user_id', 'id');
    }

    public function Attended()
    {
        return $this->belongsToMany(
            Event::class,
            'attendees',
            'user_id',
            'event_id',
            'id',
            'id',
            'Attended'
        )->as("Attended")->withTimestamps();
    }
}
