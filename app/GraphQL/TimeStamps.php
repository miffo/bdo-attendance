<?php

namespace App\GraphQL;

use stdClass;

/**
 * Trait TimeStamps
 * @package GraphQL
 */
trait TimeStamps
{
    /**
     * @param stdClass $root
     * @param array $args
     * @return string
     */
    public function resolveCreatedAtField(\App\User $root, $args)
    {
        return $root->created_at->toIso8601String();
    }

    /**
     * @param stdClass $root
     * @param array $args
     * @return string
     */
    public function resolveUpdatedAtField(\App\User $root, $args)
    {
        return $root->updated_at->toIso8601String();
    }
}