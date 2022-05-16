<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use Carbon\Carbon;

class ReportController extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'admin']);
    }

    public function entriesAdded($periodDays = 7)
    {
        $now = time();
        $offset = $this->daysToSeconds($periodDays);

        return [
            'current_period' => $this->countEntries($now - $offset, $now),
            'previous_period' => $this->countEntries($now - 2 * $offset, $now - $offset),
        ];
    }

    private function countEntries($fromTs, $toTs)
    {
        return Entry::where([
            ['created_at', '>', Carbon::createFromTimestamp($fromTs)],
            ['created_at', '<=', Carbon::createFromTimestamp($toTs)],
        ])->count();
    }

    public function userAvgCals($periodDays = 7)
    {
        $fromTs = time() - $this->daysToSeconds($periodDays);
        $fromTime = Carbon::createFromTimestamp($fromTs);

        $totalCalories = Entry::where('created_at', '>', $fromTime)->sum('calories');
        $totalUsers = Entry::where('created_at', '>', $fromTime)->distinct('user_id')->count();

        return [
            'average_calories_per_user' => round($totalCalories / $totalUsers)
        ];
    }

    private function daysToSeconds($days)
    {
        return $days * 86400;
    }
}
