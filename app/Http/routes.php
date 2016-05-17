<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::auth();

Route::get('/', function(){ return redirect('/step/1'); });

Route::get('/account',  ['middleware' => 'auth', 'uses' => 'AccountController@index']);

Route::get('/step/{step}', ['middleware' => 'step', 'uses' => 'StepsController@show']);

Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');