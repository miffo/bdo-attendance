<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Signup
 * @package App
 */
class SignUp extends Model
{
    protected $table = "sign_ups";

    protected $casts = [
        'attending' => "boolean",
    ];
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id', "user");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function character()
    {
        return $this->belongsTo(Character::class, 'character_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function event()
    {
        return $this->belongsTo(Event::class, "event_id", 'id');
    }
}
