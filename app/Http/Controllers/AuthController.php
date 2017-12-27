<?php

namespace App\Http\Controllers;

use App\Discord\Events\Login;
use App\Discord\Events\NewDiscordUser;
use App\Discord\Events\UpdateMemberRoles;
use App\Discord\Events\UpdateMembersRoles;
use App\Guild;
use App\Member;
use App\User;
use \GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class AuthController
 * @package App\Http\Controllers
 */
class AuthController extends Controller
{

    public function auth()
    {
        session(['DISCORD_STATE' => base64_encode(openssl_random_pseudo_bytes("20"))]) ;
        $query = http_build_query([
            'client_id' => env('DISCORD_CLIENT_ID'),
            'redirect_uri' => env('APP_URL').'/callback',
            'response_type' => 'code',
            'scope' => 'identify email',
            'state' => session('DISCORD_STATE'),
        ], '', '&',PHP_QUERY_RFC3986);
        return redirect('https://discordapp.com/api/oauth2/authorize?'. $query);
    }

    public function callback(Request $request)
    {
        $http = new Client();

        $response = $http->post('https://discordapp.com/api/oauth2/token', [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => env('DISCORD_CLIENT_ID'),
                'client_secret' => env('DISCORD_CLIENT_SECRET'),
                'redirect_uri' => env('APP_URL').'/callback',
                'code' => $request->code,
            ]
        ]);

        $discordTokens = json_decode((string)$response->getBody());
        session(['DISCORD_TOKENS' => $discordTokens]);

        return redirect("/login");
    }

    public function login()
    {
        $http = new Client();
        $discordTokens = session('DISCORD_TOKENS');

        $responseMe = json_decode(json_encode([
            'username' => 'miffo',
            'verified' => true,
            'mfa_enabled' => false,
            'id' => '95564130404020224',
            'avatar' => '3ff0bb9813ecb261142f0a6a6dcd5912',
            'discriminator' => '2967',
            'email' => 'miffo@swebro.eu',
        ]));

        $responseMe = $http->get("https://discordapp.com/api/users/@me",['headers' => [
            'Authorization' => "{$discordTokens->token_type} {$discordTokens->access_token}",
            'Accept' => 'Application/json',
        ]]);
        $responseMe = json_decode((string)$responseMe->getBody());
        $user = null;
        /** @var Collection $userCollection */
        $userCollection = User::where('id', $responseMe->id)->get();
        if (false && $userCollection->count() > 0) {
            /** @var User $user */
            $user = $userCollection->first();
            //event(new UpdateMembersRoles($member->guild));
        } else {
            event(new NewDiscordUser((array)$responseMe));
            $userCollection = User::where('id', $responseMe->id)->get();
            if (false && $userCollection->count() > 0) {
                throw new \Exception("Could not create user");
            }
            /** @var User $user */
            $user = $userCollection->first();
        }
        Auth::loginUsingId($user->id);

        return redirect("/");
    }
}