<?php

namespace App\GraphQL\Query;

use Folklore\GraphQL\Support\Query;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class Afk
 * @package App\GraphQL\Query
 */
class Afk extends Query
{
    /** @var array  */
    protected $attributes = [
        'name' => 'afk',
    ];

    /**
     * @return GraphQL\Type\Definition\ListOfType
     */
    public function type()
    {
        return Type::listOf(GraphQL::type('Afk'));
    }

    /**
     * @return array
     */
    public function args()
    {
        return [
            'id' => ['name' => 'id', 'type' => Type::int()],
            'user_id' => ['name' => 'user_id', 'type' => Type::int()],
        ];
    }

    /**
     * @param \App\Afk $root
     * @param array $args
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function resolve(\App\Afk $root, $args)
    {
        if (isset($args['id'])) {
            return Afk::where('id', $args['id'])->get();
        } else if (isset($args['user_id'])) {
            return Afk::where('user_id', $args['user_id'])->get();
        } else {
            return Afk::all();
        }
    }
}