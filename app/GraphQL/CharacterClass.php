<?php

namespace App\GraphQL;

use Folklore\GraphQL\Support\Type As GraphQLType;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class CharacterClass
 * @package App\GraphQL
 */
class CharacterClass extends GraphQLType
{
    /** @var array  */
    protected $attributes = [
        'name' => 'Class',
        'description' => 'A character class'
    ];

    /**
     * @return array
     */
    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => "Identifying field of class",
            ],
            'name' => [
                'type' => Type::nonNull(Type::string()),
                'description' => "Name of the class",
            ],
            'characters' => [
                'args' => [
                    'id' => [
                        'type' => Type::int(),
                        'description' => 'Id of the character',
                    ],
                ],
                'type' => Type::listOf(GraphQL::Type('Character')),
                'description' => "Characters with the class",
            ],
        ];
    }

    /**
     * @param \App\CharacterClass $root
     * @param array $args
     * @return \App\Character
     */
    public function resolveCharactersField(\App\CharacterClass $root, $args)
    {
        if (isset($args['id'])) {
            return $root->Characters()->where('id', '=', $args['id']);
        }
        return $root->Characters;
    }
}