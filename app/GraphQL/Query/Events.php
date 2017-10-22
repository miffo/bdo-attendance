<?php

namespace App\GraphQL\Query;

use App\Event;
use Folklore\GraphQL\Support\Query;
use GraphQL;
use GraphQL\Type\Definition\Type;

/**
 * Class Event
 * @package App\GraphQL\Query
 */
class Events extends Query
{
    /** @var array  */
    protected $attributes = [
        'name' => 'events',
    ];

    /**
     * @return GraphQL\Type\Definition\ListOfType
     */
    public function type()
    {
        return Type::listOf(GraphQL::type('Event'));
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
            return Event::where('id', $args['id'])->get();
        } else {
            return Event::all();
        }
    }
}