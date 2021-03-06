<?php

namespace App\GraphQL;

use Folklore\GraphQL\Support\Type As GraphQLType;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class SignUp
 * @package App\GraphQL
 */
class SignUp extends GraphQLType
{
    use TimeStamps;

    /** @var array  */
    protected $attributes = [
        'name' => 'Sign up',
        'description' => 'A sign up to an event'
    ];

    /**
     * @return array
     */
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field of a sign up",
            ],
            'event_id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field of the event signed for",
            ],
            'user_id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field of the user that has signed",
            ],
            'character_id' => [
                'type' => Type::int(),
                'description' => "Identifying field of character user signed with",
            ],
            'event' => [
                'type' => GraphQL::Type('Event'),
                'description' => "Event signed for",
            ],
            'user' => [
                'type' => GraphQL::Type('User'),
                'description' => "User that has signed",
            ],
            'character' => [
                'type' => GraphQL::Type('Character'),
                'description' => "Character user signed with",
            ],
            'attending' => [
                'type' => Type::nonNull(Type::boolean()),
                'description' => "If the user is coming or not",
            ],
            'comment' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Comment of the sign up",
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date of the creation of the sign up",
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date last time sign up was updated",
            ]
        ];
    }

    /**
     * @param \App\SignUp $root
     * @param array $args
     * @return \App\Event
     */
    public function resolveEventField(\App\SignUp $root, $args)
    {
        return $root->event;
    }

    /**
     * @param \App\SignUp $root
     * @param array $args
     * @return \App\User
     */
    public function resolveUserField(\App\SignUp $root, $args)
    {
        return $root->user;
    }

    /**
     * @param \App\SignUp $root
     * @param array $args
     * @return \App\Character
     */
    public function resolveCharacterField(\App\SignUp $root, $args)
    {
        return $root->Character;
    }
}