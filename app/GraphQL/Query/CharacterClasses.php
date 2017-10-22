<?php

namespace App\GraphQL\Query;

use App\CharacterClass;
use Folklore\GraphQL\Support\Query;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class CharacterClass
 * @package App\GraphQL\Query
 */
class CharacterClasses extends Query
{
    /** @var array  */
    protected $attributes = [
        'name' => 'character_class',
    ];

    /**
     * @return GraphQL\Type\Definition\ListOfType
     */
    public function type()
    {
        return Type::listOf(GraphQL::type('CharacterClass'));
    }

    /**
     * @return array
     */
    public function args()
    {
        return [
            'id' => ['name' => 'id', 'type' => Type::int()],
        ];
    }

    /**
     * @param $root
     * @param array $args
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function resolve($root, $args)
    {
        if (isset($args['id'])) {
            return CharacterClass::where('id', $args['id'])->get();
        } else {
            return CharacterClass::all();
        }
    }
}