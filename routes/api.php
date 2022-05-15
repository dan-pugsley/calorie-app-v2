<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Entry;

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

Route::post('/generate-token/{user_id}', function($userId) {
    return ['token' => User::findOrFail($userId)->createToken('api')->plainTextToken];
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/entries', function(Request $request) {
    return DB::table('entries')->select('*')->where('user_id', $request->user()->id)->get();
});

Route::middleware('auth:sanctum')->post('/entry', function(Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:70',
        'calories' => 'required|integer|between:1,12000',
        'is_cheat' => 'required|boolean',
    ]);

    return Entry::create([
        'user_id' => $request->user()->id,
        'name' => $validated['name'],
        'calories' => $validated['calories'],
        'is_cheat' => $validated['is_cheat'],
    ])->id;
});
