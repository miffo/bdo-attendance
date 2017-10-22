<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Event
 * @package App
 */
class Event extends Model
{
    protected $table = "events";

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function SignUps()
    {
        return $this->hasMany(SignUp::class, 'event_id', 'id');
    }

    public function Attendees()
    {
        return $this->belongsToMany(
            User::class,
            'attendees',
            'event_id',
            'user_id',
            'id',
            'id',
            'Attendees'
        )->as("Attendees")->withTimestamps();
    }
}
