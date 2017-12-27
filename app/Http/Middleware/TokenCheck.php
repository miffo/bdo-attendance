<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use stdClass;

class TokenCheck
{
    public function handle(Request $request, \Closure $next)
    {
        if (session('DISCORD_TOKENS') instanceof StdClass) {
            $discordTokens = session('DISCORD_TOKENS');
            if (!isset($discordTokens->access_token)
                || !isset($discordTokens->token_type)
                || !isset($discordTokens->expires_in)
                || !isset($discordTokens->refresh_token))
            {
                throw new \Exception("Missing tokens");
            }
        } else {
            throw new \Exception("Missing tokens");
        }
        return $next($request);
    }
}