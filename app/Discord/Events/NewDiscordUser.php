<?php

namespace App\Discord\Events;

/**
 * Class NewDiscordUser
 * @package App\Discord\Events
 */
class NewDiscordUser
{
    /** @var array */
    private $userData;

    public function __construct(array $userData)
    {
        $this->userData = $userData;
    }

    /**
     * @return mixed
     */
    public function getUserData()
    {
        return $this->userData;
    }
}