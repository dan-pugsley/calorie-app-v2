<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\EntryController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/tokens', function(Request $request) {
    return [
        'token' => User::findOrFail($request->post('user_id'))->createToken('api')->plainTextToken
    ];
});

// Override index route to allow optional filters.
Route::get('entries/{from_ts?}/{to_ts?}/{user_id?}', [EntryController::class, 'index']);

Route::apiResource('entries', EntryController::class);
