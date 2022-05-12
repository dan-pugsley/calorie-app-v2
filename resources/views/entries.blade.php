@extends('layouts.app')
@section('title', 'Entries')
@section('content')
    <div class="content">
        <!-- Control -->
        <div class="control js-control">
            <table class="control__filters" cellspacing="0">
                <tbody>
                    <tr class="{user_row_class}">
                        <td><label for="control__user">User:</label></td>
                        <td><input id="control__user" class="btn js-user-input" type="number" value="{user_id}" min="0"/></td>
                    </tr>
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
        <div class="days js-days">
            <span class="days__loading js-loading">Loading...</span>
            <template>
                {day}
            </template>
        </div>
    </div>
    <!-- Entry overflow menu -->
    <div class="overflow-menu hidden js-overflow-menu">
        <input class="js-edit-btn" type="button" value="Edit"/>
        <input class="js-remove-btn" type="button" value="Remove"/>
    </div>
    <div class="entry-overlay hidden js-entry-overlay">
        <div class="entry-overlay__blocker js-blocker"></div>
        <form class="entry-overlay__form js-form">
            <table class="entry-overlay__table">
                <tbody>
                    <tr>
                        <td><label for="entry-overlay__date">Date:</label></td>
                        <td><input id="entry-overlay__date" class="js-date-time-input" type="datetime-local" required/></td>
                    </tr>
                    <tr>
                        <td><label for="entry-overlay__name">Food:</label></td>
                        <td><input id="entry-overlay__name" class="js-name-input" type="text" value="banana" maxlength="{name_max_length}" required/></td>
                    </tr>
                    <tr>
                        <td><label for="entry-overlay__cals">Calories:</label></td>
                        <td><input id="entry-overlay__cals" class="js-cals-input" type="number" value="62" min="1" max="{max_calories}" required/></td>
                    </tr>
                    <tr>
                        <td><label for="entry-overlay__cheat">Cheat:</label></td>
                        <td>
                            <label class="entry-overlay__checkbox">
                                <input id="entry-overlay__cheat" class="invisible js-cheat-input" type="checkbox"/>
                                <span>✓</span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="entry-overlay__btns">
                <input class="btn btn--light btn--small js-cancel-btn" type="button" value="Cancel"/>
                <input class="btn btn--dark btn--small" type="submit" value="Confirm"/>
            </div>
        </form>
    </div>
@endsection
