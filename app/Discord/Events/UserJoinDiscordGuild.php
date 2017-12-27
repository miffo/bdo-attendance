<?php

namespace App\Discord\Events;

use App\User;

/**
 * Class UserJoinDiscordGuild
 * @package App\Discord\Events
 */
class UserJoinDiscordGuild
{
    /** @var User */
    private $user;

    /** @var string|int */
    private $guild;

    /**
     * UserJoinDiscordGuild constructor.
     * @param User $user
     * @param string|int $guild
     */
    public function __construct(User $user, $guild) {
        $this->user = $user;
        $this->guild = $guild;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @return string|int
     */
    public function getGuild()
    {
        return $this->guild;
    }
}