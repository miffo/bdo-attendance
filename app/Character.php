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
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function characterClass()
    {
        return $this->hasOne(CharacterClass::class, 'id', 'class_id');
    }
}
