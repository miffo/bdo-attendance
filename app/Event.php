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
    public function signUps()
    {
        return $this->hasMany(SignUp::class, 'event_id', 'id');
    }

    public function attendees()
    {
        return $this->belongsToMany(
            Member::class,
            'attendees',
            'event_id',
            'member_id',
            'id',
            'id',
            'Attendees'
        )->as("Attendees")->withTimestamps();
    }
}
