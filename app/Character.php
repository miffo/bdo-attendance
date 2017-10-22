<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Character
 * @package App
 */
class Character extends Model
{
    protected $table = "characters";

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function User()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function CharacterClass()
    {
        return $this->hasOne(CharacterClass::class, 'id', 'class_id');
    }
}
