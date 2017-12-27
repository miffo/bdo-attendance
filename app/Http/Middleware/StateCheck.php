<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

class StateCheck
{
    public function handle(Request $request, \Closure $next)
    {
        if ($request->state !== session('DISCORD_STATE')) {
            throw new \Exception("State missmatch");
        }
        return $next($request);
    }
}