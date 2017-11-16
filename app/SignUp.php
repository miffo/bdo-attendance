<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class SignSp
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
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id', 'id', "user");
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
