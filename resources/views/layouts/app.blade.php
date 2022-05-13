<!DOCTYPE html>
<html>
    <head>
        <!-- General -->
        <title>@yield('title') - Calorie app v2</title>
        <meta charset="UTF-8" />
        <meta name="description" content="@yield('description', 'An app for tracking your calorie intake day-by-day.')">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <!-- Core -->
        <script src="{{ mix('/js/app.js') }}" defer></script>
        <link href="{{ mix('/css/app.css') }}" rel="stylesheet">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap">
    </head>
    <body>
        @yield('content')
    </body>
</html>
