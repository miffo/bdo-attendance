<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CharacterClass
 * @package App
 */
class CharacterClass extends Model
{
    protected $table = "character_classes";

    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function characters()
    {
        return $this->hasMany(Character::class, 'class_id', 'id');
    }
}
