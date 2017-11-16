<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * @package App
 */
class User extends Model
{
    public $incrementing = false;
    protected $table = "users";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'email',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function members()
    {
        return $this->hasMany(Member::class, 'user_id', 'id');
    }
}
