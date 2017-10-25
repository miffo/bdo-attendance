<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Afk extends Model
{
    protected $table = "afk";

    public function user()
    {
        $this->belongsTo(User::class, 'user_id', 'id', "user");
    }
}
