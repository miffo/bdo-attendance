<?php

namespace App\GraphQL\Query;

use App\SignUp;
use Folklore\GraphQL\Support\Query;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class SignUp
 * @package App\GraphQL\Query
 */
class SignUps extends Query
{
    /** @var array  */
    protected $attributes = [
        'name' => 'sign_up',
    ];

    /**
     * @return GraphQL\Type\Definition\ListOfType
     */
    public function type()
    {
        return Type::listOf(GraphQL::type('SignUp'));
    }

    /**
     * @return array
     */
    public function args()
    {
        return [
            'id' => ['name' => 'id', 'type' => Type::int()],
            'event_id' => ['name' => 'event_id', 'type' => Type::int()],
            'user_id' => ['name' => 'user_id', 'type' => Type::int()],
            'character_id' => ['name' => 'character_id', 'type' => Type::int()],
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
            return SignUp::where('id', $args['id'])->get();
        } else {
            return SignUp::all();
        }
    }
}