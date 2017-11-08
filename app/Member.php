<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Member
 * @package App
 */
class Member extends Model
{
    protected $table = 'members';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function guild()
    {
        return $this->belongsTo(
            Guild::class,
            'id',
            'guild_id',
            'guild'
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(
            Role::class,
            'member_roles',
            'member_id',
            'role_id',
            'id',
            'id',
            'member_roles'
        );
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
