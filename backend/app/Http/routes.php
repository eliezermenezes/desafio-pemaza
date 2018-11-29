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

Route::get('/', function () {
    return response()->json([
        'Title' => 'Backend Teste Pemaza',
        'Autor:' => 'Caio'
    ]);
});



Route::group(['prefix' => 'api/client', 'middleware' => 'cors'], function ($app) {
    $app->get('/', 'ClientController@get');
    $app->post('/', 'ClientController@post');
    $app->get('/{id}', 'ClientController@getById');
    $app->delete('/{id}', 'ClientController@delete');
    $app->get('/{id}/restore', 'ClientController@restore');
    $app->patch('/{id}', 'ClientController@update');
});