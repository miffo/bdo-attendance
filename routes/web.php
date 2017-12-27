<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;

Route::any( '/', function () {
    /*if (!Auth::check()) {
        return redirect('/auth');
    }*/
    return View::make('app');
})->middleware('auth');

Route::any('/auth', ['as' => 'login', 'uses' => "AuthController@auth"]);
Route::any('/callback', "AuthController@callback")->middleware("state_check");
Route::any('/login', "AuthController@login")->middleware("token_check");

/**
 * This needs to be last make any request load the single page site.
 */
Route::any( '/{any}', function ($any) {
    return View::make('app');
})->where('any', '.*')->middleware('auth');
