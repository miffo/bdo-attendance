<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Afk extends Model
{
    protected $table = "afkers";

    public function User()
    {
        $this->belongsTo(User::class, 'user_id', 'id', "user");
    }
}
