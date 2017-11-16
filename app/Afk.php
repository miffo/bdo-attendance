<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Afk extends Model
{
    protected $table = "afk";

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id', 'id', "member");
    }
}
