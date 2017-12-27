<?php

namespace App\Discord\Events;

use App\Guild;

/**
 * Class UpdateMembersRoles
 * @package App\Discord\Events
 */
class UpdateMembersRoles
{
    /** @var Guild */
    private $guild;
    /** @var bool */
    private $forced;

    /**
     * UpdateMembersRoles constructor.
     * @param Guild $guild
     * @param bool $forced
     */
    public function __construct(Guild $guild, bool $forced = false) {
        $this->guild = $guild;
        $this->forced = $forced;
    }

    /**
     * @return Guild
     */
    public function getGuild()
    {
        return $this->guild;
    }

    /**
     * @return bool
     */
    public function isForced()
    {
        return $this->forced;
    }
}