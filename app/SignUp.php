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
    public function Users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id', "user");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Character()
    {
        return $this->belongsTo(Character::class, 'character_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function Event()
    {
        return $this->belongsTo(Event::class, "event_id", 'id');
    }
}
