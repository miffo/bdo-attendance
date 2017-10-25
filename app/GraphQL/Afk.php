<?php

namespace App\GraphQL;

use Folklore\GraphQL\Support\Type As GraphQLType;
use GraphQL\Type\Definition\Type;

/**
 * Class Afk
 * @package App\GraphQL
 */
class Afk extends GraphQLType
{
    use TimeStamps;

    /** @var array  */
    protected $attributes = [
        'name' => 'Afk',
        'description' => "An afk notification"
    ];

    /**
     * @return array
     */
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field of afk notification",
            ],
            'reason' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Reason stated for going afk",
            ],
            'to_date' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date of going afk",
            ],
            'from_date' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date when comming back from going afk",
            ],
            'user' => [
                'type' => \GraphQL::Type('User'),
                'description' => "User whom the afk notice concerns",
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date of the creation of the afk notification",
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date last time afk notification was updated",
            ],
        ];
    }

    /**
     * @param \App\Afk $root
     * @param array $args
     * @return \App\User
     */
    public function resolveUserField(\App\Afk $root, $args)
    {
        return $root->user;
    }
}