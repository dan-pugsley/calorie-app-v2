@extends('layouts.app')
@section('title', 'Entries')
@section('content')
    <div class="content" style="width: 563px;">
        <!-- Control -->
        <div class="control js-control">
            <table class="control__filters" cellspacing="0">
                <tbody>
                    @if(Auth::user()->is_admin)
                        <tr>
                            <td><label for="control__user">User:</label></td>
                            <td><input id="control__user" class="btn js-user-input" type="number" value="{{ Auth::user()->id }}" min="0"/></td>
                        </tr>
                    @endif
                    <tr>
                        <td><label for="control__from-date">From:</label></td>
                        <td><input id="control__from-date" class="btn js-from-date" type="date"/></td>
                    </tr>
                    <tr>
                        <td><label for="control__to-date">To:</label></td>
                        <td><input id="control__to-date" class="btn js-to-date" type="date"/></td>
                    </tr>
                </tbody>
            </table>
            <input class="btn btn--dark js-add-btn" type="button" value="+ Add entry"/>
        </div>
        <hr>
        <!-- Day list -->
        <div class="day-list js-day-list"></div>
    </div>
    <!-- Entry overflow menu -->
    <div class="overflow-menu hidden js-overflow-menu">
        <input class="js-edit-btn" type="button" value="Edit"/>
        <input class="js-remove-btn" type="button" value="Remove"/>
    </div>
    <div class="js-entry-overlay-container"></div>
@endsection
