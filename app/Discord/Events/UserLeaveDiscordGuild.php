<?php

namespace App\Discord\Events;

use App\Guild;
use App\User;

/**
 * Class UserLeaveDiscordGuild
 * @package App\Discord\Events
 */
class UserLeaveDiscordGuild
{
    /** @var User */
    private $user;

    /** @var Guild */
    private $guild;

    /**
     * UserLeaveDiscordGuild constructor.
     * @param User $user
     */
    public function __construct(User $user, Guild $guild) {
        $this->user = $user;
        $this->guild = $guild;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return Guild
     */
    public function getGuild(): Guild
    {
        return $this->guild;
    }
}