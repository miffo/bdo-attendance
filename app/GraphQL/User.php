<?php

namespace App\GraphQL;

use Folklore\GraphQL\Support\Type as GraphQLType;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class UserType
 * @package App\GraphQL
 */
class User extends GraphQLType
{
    use TimeStamps;

    /** @var array  */
    protected $attributes = [
        'name' => 'User',
        'description' => 'a user'
    ];

    /**
     * @return array
     */
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field of user",
            ],
            'name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Nick name of the user",
            ],
            'family_name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Ingame family name of the user",
            ],
            'email' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Email of the user",
            ],
            'default_character' => [
                'type' => Type::int(),
                'description' => "Identifying field of users default character",
            ],
            'Characters' => [
                'args' => [
                    'id' => [
                        'type' => Type::int(),
                        'description' => 'Id of the character',
                    ],
                ],
                'type' => Type::listOf(GraphQL::Type('Character')),
                'description' => "Users characters",
            ],
            'DefaultCharacter' => [
                'type' => GraphQL::Type('Character'),
                'description' => "Users default character",
            ],
            'SignUps' => [
                'args' => [
                    'id' => [
                        'type' => Type::int(),
                        'description' => 'Id of the sign up',
                    ],
                ],
                'type' => Type::listOf(GraphQL::Type('SignUp')),
                'description'=> "User signups",
            ],
            'Afkes' => [
                'args' => [
                    'id' => [
                        'type' => Type::int(),
                        'description' => 'Id of the afk notice',
                    ],
                ],
                'type' => Type::listOf(GraphQL::Type('Afk')),
                'description'=> "User Afk notifications",
            ],
            'AttendedEvents' => [
                'args' => [
                    'id' => [
                        'type' => Type::int(),
                        'description' => 'Id of the event',
                    ],
                ],
                'type' => Type::listOf(GraphQL::Type('Event')),
                'description'=> "User attended events",
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date of the creation of the user",
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date last time user was updated",
            ],
        ];
    }

    /**
     * @param \App\User $root
     * @param array $args
     * @return \App\Character[]
     */
    public function resolveCharactersField(\App\User $root, $args)
    {
        if(isset($args['id'])) {
            return $root->Characters()->where('id', "=", $args['id']);
        }
        return $root->Characters;
    }

    /**
     * @param \App\User $root
     * @param array $args
     * @return \App\Character
     */
    public function resolveDefaultCharacterField(\App\User $root, $args)
    {
        return $root->DefaultCharacter;
    }

    /**
     * @param \App\User $root
     * @param array $args
     * @return \App\SignUp[]
     */
    public function resolveSignUpsField(\App\User $root, $args)
    {
        if(isset($args['id'])) {
            return $root->SignUps()->where('id', "=", $args['id']);
        }
        return $root->SignUps;
    }

    /**
     * @param \App\User $root
     * @param array $args
     * @return \App\Afk[]
     */
    public function resolveAfkesField(\App\User $root, $args)
    {
        if(isset($args['id'])) {
            return $root->Afkes()->where('id', "=", $args['id']);
        }
        return $root->Afkes;
    }

    /**
     * @param \App\User $root
     * @param array $args
     * @return \App\Event[]
     */
    public function resolveAttendedEventsField(\App\User $root, $args)
    {
        if(isset($args['id'])) {
            return $root->AttendedEvents()->where('id', "=", $args['id']);
        }
        return $root->AttendedEvents;
    }
}