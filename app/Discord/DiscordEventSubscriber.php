<?php

namespace App\Discord;

use App\Discord\Events\NewDiscordUser;
use App\Discord\Events\UpdateMembersRoles;
use App\Discord\Events\UserJoinDiscordGuild;
use App\Discord\Events\UserLeaveDiscordGuild;
use App\Guild;
use App\Member;
use App\Role;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use RestCord\DiscordClient;

/**
 * Class DiscordEventSubscriber
 * @package App\Discord
 */
class DiscordEventSubscriber
{
    /** @var DiscordClient */
    private $discord;

    public function __construct()
    {
        $this->discord = new DiscordClient(['token' => env('DISCORD_BOT_TOKEN')]);
    }

    /**
     * @param UpdateMembersRoles $event
     */
    public function onUpdateMembersRoles(UpdateMembersRoles $event)
    {
        /** @var Guild $guild */
        $guild = $event->getGuild();
        /** @var Role[] $guildRoles */
        $guildRoles = $guild->roles;
        $memberListData = $this->discord->guild->listGuildMembers(['guild.id' => $guild->id]);
        //var_dump($memberListData);exit;
        foreach ($memberListData as $memberData) {
            $memberToUpdate = $guild->members()->where('id', '=', $memberData['user']['id'])->get()->first();
            $this->updateMemberRoles($memberToUpdate, $memberData, $guildRoles);
        }
    }

    /**
     * @param NewDiscordUser $event
     */
    public function onNewDiscordUser(NewDiscordUser $event)
    {
        $userData = $event->getUserData();
        if (false && User::where('email', $userData['email'])->get()->count() > 0) {
            throw new \Exception("User with your email already exists");
        }

        if (false && User::where('id', $userData['id'])->get()->count() > 0) {
            throw new \Exception("User with your id already exists");
        }

        $user = new User();
        $user->id = $userData['id'];
        $user->name = $userData['username'];
        $user->email = $userData['email'];
        $user->avatar = $userData['avatar'];
        $user->discriminator = $userData['discriminator'];
        $user->save();
    }

    /**
     * @param Member $member
     * @param array $memberData
     * @param Role[] $guildRoles
     */
    private function updateMemberRoles(Member $member, array $memberData, array $guildRoles)
    {
        /** @var int[] $roleIds */
        $roleIds = array_filter($memberData['roles'], function ($roleId) use ($guildRoles) {
            foreach ($guildRoles as $guildRole) {
                var_dump($guildRole->id);
                if ($guildRole->id == $roleId) {
                    return true;
                }
            }
            return false;
        });
        $member->roles()->sync($roleIds);
    }

    /**
     * @param UserJoinDiscordGuild $event
     */
    public function onUserJoinDiscordGuild(UserJoinDiscordGuild $event)
    {
        $user = $event->getUser();

        $guildName = $event->getGuild();

        /** @var Collection $guilds */
        $guilds = Guild::where('name', '=', $guildName)->orWhere('id', '=', $guildName)->get();
        if ($guilds->count() == 0) {
            throw new \Exception("Cant find guild to join");
        } else if ($guilds->count() > 1) {
            throw new \Exception("Guild name ambiguous");
        }
        $guild = $guilds->first();

        $member = new Member();
        $member->name = $user->name;
        $member->guild_id = $guild->id;
        $user->members()->save($member);
    }

    /**
     * @param UserLeaveDiscordGuild $event
     */
    public function onUserLeaveDiscordGuild(UserLeaveDiscordGuild $event)
    {
        $user = $event->getUser();
        $guild = $event->getGuild();

        /** @var Collection $members */
        $members = Member::where('guild_id', '=', $guild->id)->where('user_id', '=', $user->id)->get();
        if ($members->count() == 0) {
            throw new \Exception("Cant leave a guild you arnt member of");
        }
        $member = $members->first();
        $member->user_id = null;
        $member->save();
    }

    /**
     * @param \Illuminate\Events\Dispatcher $events
     */
    public function subscribe(\Illuminate\Events\Dispatcher $events)
    {
        $events->listen(
            UpdateMembersRoles::class,
            DiscordEventSubscriber::class."@onUpdateMembersRoles"
        );

        $events->listen(
            NewDiscordUser::class,
            DiscordEventSubscriber::class."@onNewDiscordUser"
        );

        $events->listen(
            UserJoinDiscordGuild::class,
            DiscordEventSubscriber::class."@onUserJoinDiscordGuild"
        );

        $events->listen(
            UserLeaveDiscordGuild::class,
            DiscordEventSubscriber::class."@onUserLeaveDiscordGuild"
        );
    }
}