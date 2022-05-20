<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntryRequest;
use App\Http\Requests\UpdateEntryRequest;
use App\Models\User;
use App\Models\Entry;
use Carbon\Carbon;
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
     * @param  int  $fromTs
     * @param  int  $toTs
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $fromTs = null, $toTs = null, $userId = null)
    {
        $user = $request->user();

        $request->merge(['from_ts' => $fromTs]);
        $request->merge(['to_ts' => $toTs]);
        $request->merge(['user_id' => $userId]);

        $userIdRules = ['integer', 'nullable'];

        // Allow user ID of zero for admin to view ALL users.
        if ($userId != 0)
            $userIdRules[] = 'exists:users,id';

        $request->validate([
            'from_ts' => 'integer|min:0|nullable',
            'to_ts' => 'integer|min:0|nullable',
            'user_id' => $userIdRules,
        ]);

        if (is_null($userId) || !$user->is_admin)
            $userId = $user->id;

        $conditions = [];

        if ($userId) $conditions[] = ['user_id', '=', $userId];
        if ($fromTs) $conditions[] = ['created_at', '>', Carbon::createFromTimestamp($fromTs)];
        if ($toTs) $conditions[] = ['created_at', '<=', Carbon::createFromTimestamp($toTs)];

        $output = [
            'entries' => Entry::where($conditions)->orderByDesc('created_at')->get()
        ];

        if ($userId)
            $output['daily_calorie_limit'] = $user->daily_calorie_limit;

        return $output;
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

        $params = [
            'user_id' => $request->user()->id,
            'name' => $safe['name'],
            'calories' => $safe['calories'],
            'is_cheat' => $safe['is_cheat'],
        ];

        if (isset($safe['created_at']))
            $params[] = $safe['created_at'];

        $entry = Entry::create($params);

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
        if (isset($safe['created_at'])) $entry->created_at = $safe['created_at'];

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
