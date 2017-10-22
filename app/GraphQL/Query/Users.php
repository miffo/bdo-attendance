<?php

namespace App\GraphQL\Query;

use GraphQL;
use Folklore\GraphQL\Support\Query;
use GraphQL\Type\Definition\Type;
use App\User;

/**
 * Class UsersQuery
 * @package App\GraphQL\Query
 */
class Users extends Query
{
    /** @var array  */
    protected $attributes = [
        'name' => 'user',
    ];

    /**
     * @return GraphQL\Type\Definition\ListOfType
     */
    public function type()
    {
        return Type::listOf(GraphQL::type('User'));
    }

    /**
     * @return array
     */
    public function args()
    {
        return [
            'id' => ['name' => 'id', 'type' => Type::int()],
            'email' => ['name' => 'email', 'type' => Type::string()],
            'name' => ['name' => 'name', 'type' => Type::string()],
            'family_name' => ['name' => 'family_name', 'type' => Type::string()],
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
            return User::where('id', $args['id'])->get();
        } else if (isset($args['email'])) {
            return User::where('email', $args['email'])->get();
        } else if (isset($args['name'])) {
            return User::where('name', $args['name'])->get();
        } else if (isset($arge['family_name'])) {
            return User::where('family_name', $args['family_name']);
        } else {
            return User::all();
        }
    }
}