<?php

namespace App\GraphQL\Query;

use App\Character;
use Folklore\GraphQL\Support\Query;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class Character
 * @package App\GraphQL\Query
 */
class Characters extends Query
{
    /** @var array  */
    protected $attributes = [
        'name' => 'character',
    ];

    /**
     * @return GraphQL\Type\Definition\ListOfType
     */
    public function type()
    {
        return Type::listOf(GraphQL::type('Character'));
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
            return Character::where('id', $args['id'])->get();
        } else {
            return Character::all();
        }
    }
}