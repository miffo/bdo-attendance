<?php

namespace App\GraphQL;

use Folklore\GraphQL\Support\Type As GraphQLType;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class Event
 * @package App\GraphQL
 */
class Event extends GraphQLType
{
    use TimeStamps;

    /** @var array  */
    protected $attributes = [
        'name' => 'Event',
        'description' => 'An event'
    ];

    /**
     * @return array
     */
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field of an event",
            ],
            'event_date' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date of the event",
            ],
            'last_sign_up_date' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Last date to sign up to the event",
            ],
            'name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Name of the event",
            ],
            'description' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Description of the event",
            ],
            'SignUps' => [
                'args' => [
                    'id' => [
                        'type' => Type::int(),
                        'description' => 'Id of the sign up',
                    ],
                ],
                'type' => Type::listOf(GraphQL::Type('SignUp')),
                'description' => "Sign ups for the event",
            ],
            'Attendees' => [
                'args' => [
                    'id' => [
                        'type' => Type::int(),
                        'description' => 'Id of the user',
                    ],
                ],
                'type' => Type::listOf(GraphQL::Type('User')),
                'description' => "Users the attended the event",
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date of the creation of the event",
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date last time event was updated",
            ]
        ];
    }

    /**
     * @param \App\Event $root
     * @param array $args
     * @return \App\SignUp[]
     */
    public function resolveSignUpsField(\App\Event $root, $args)
    {
        if (isset($args['id'])) {
            return $root->SignUps()->where('id', '=', $args['id']);
        }
        return $root->SignUps;
    }

    /**
     * @param \App\Event $root
     * @param array $args
     * @return \App\User[]
     */
    public function resolveAttendeesField(\App\Event $root, $args)
    {
        if (isset($args['id'])) {
            return $root->Attendees()->where('id', '=', $args['id']);
        }
        return $root->Attendees;
    }
}