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


//Route::get('/account',  ['middleware' => 'auth', 'uses' => 'AccountController@index']);

//Route::get('/step/{step}', ['middleware' => 'step', 'uses' => 'StepsController@show']);

//Route::post('/objectives', 'StepsController@getObjectives');

//Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');


// HOME PAGE ===================================
// we dont need to use Laravel Blade
// we will return a PHP file that will hold all of our Angular content
// see the "Where to Place Angular Files" below to see ideas on how to structure your app return


//Route::get('/step/1', function(){ return view('layouts.app'); });

// API ROUTES ==================================
Route::group(array('prefix' => 'api'), function() {

    // since we will be using this just for CRUD, we won't need create and edit
    // Angular will handle both of those forms
    // this ensures that a user can't access api/create or api/edit when there's nothing there
   Route::post('/objectives', 'StepsController@getObjectives');

   Route::post('/interests', 'StepsController@getInterests');

   Route::post('/plans', 'StepsController@getPlans');

   Route::any('/upload_images', 'StepsController@uploadImages');

   Route::post('/auth/register', 'Auth\AuthController@register');

   Route::post('/auth/login', 'Auth\AuthController@login');

   Route::post('/auth/check', 'Auth\AuthController@check');

   Route::post('/auth/logout', 'Auth\AuthController@logout');

});

Route::get('/', function() {
    return view('layouts.app');
});