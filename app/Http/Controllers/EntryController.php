<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntryRequest;
use App\Http\Requests\UpdateEntryRequest;
use App\Models\User;
use App\Models\Entry;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->authorizeResource(Entry::class, 'entry');
    }

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return [
            'entries' => Entry::where('user_id', $user->id)->get(),
            'daily_calorie_limit' => User::where('id', $user->id)->get('daily_calorie_limit'),
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEntryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEntryRequest $request)
    {
        $safe = $request->safe();

        $entry = Entry::create([
            'user_id' => $request->user()->id,
            'name' => $safe['name'],
            'calories' => $safe['calories'],
            'is_cheat' => $safe['is_cheat'],
        ]);

        return [
            'id' => $entry->id
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function show(Entry $entry)
    {
        return $entry;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEntryRequest  $request
     * @param  \App\Models\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEntryRequest $request, Entry $entry)
    {
        $safe = $request->safe();

        if (isset($safe['name'])) $entry->name = $safe['name'];
        if (isset($safe['calories'])) $entry->calories = $safe['calories'];
        if (isset($safe['is_cheat'])) $entry->is_cheat = $safe['is_cheat'];

        $entry->save();

        return [
            'changed' => $entry->wasChanged()
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Entry  $entry
     * @return \Illuminate\Http\Response
     */
    public function destroy(Entry $entry)
    {
        return [
            'deleted' => $entry->delete()
        ];
    }
}
