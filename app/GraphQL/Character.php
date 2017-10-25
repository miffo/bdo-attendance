<?php

namespace App\GraphQL;

use Folklore\GraphQL\Support\Type As GraphQLType;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class Character
 * @package App\GraphQL
 */
class Character extends GraphQLType
{
    use TimeStamps;

    /** @var array  */
    protected $attributes = [
        'name' => 'Character',
        'description' => 'A character'
    ];

    /**
     * @return array
     */
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field of character",
            ],
            'userId' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field for the user of the character",
            ],
            'class_id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field for the characters class",
            ],
            'class_name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Characters class name",
            ],
            'character_class' => [
                'type' => GraphQL::Type('CharacterClass'),
                'description' => "Characters class object",
            ],
            'name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Name of the character",
            ],
            'level' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Level of the caracter",
            ],
            'user' => [
                'type' => GraphQL::Type('User'),
                'description' => "Users whom the charactar belongs to"
            ],
            'created_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date of the creation of the character",
            ],
            'updated_at' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Date last time character was updated",
            ]
        ];
    }

    /**
     * @param \App\Character $root
     * @param array $args
     * @return string
     */
    public function resolveClassNameField(\App\Character $root, $args)
    {
        return $root->characterClass->name;
    }

    /**
     * @param \App\Character $root
     * @param array $args
     * @return \App\CharacterClass
     */
    public function resolveCharacterClassField(\App\Character $root, $args)
    {
        return $root->characterClass;
    }

    /**
     * @param \App\Character $root
     * @param array $args
     * @return \App\User
     */
    public function resolveUserField(\App\Character $root, $args)
    {
        return $root->user;
    }
}