@extends('layouts.app')
@section('title', 'Report')
@section('content')
    <div class="content">
        <span class="heading">Last {period} days</span>
        <hr>
        <div>
            <div class="stat">
                <span>Entries:</span>
                <span class="js-entries"></span>
            </div>
            <div class="stat">
                <span>Avg. cals / user:</span>
                <span class="js-avg-cals"></span>
            </div>
        </div>
    </div>
@endsection
