<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
  </head>
  <body>
    <div id="application"></div>
    <script src="js/journal.js"></script>
  </body>
</html>
