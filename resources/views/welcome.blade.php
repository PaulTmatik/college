<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <base href="/">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>ГАПОУ НСО «Карасукский педагогический колледж»</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
  </head>
  <body style="background-color: #eee;">
    <div id="application"></div>
    <script src="js/journal.js"></script>
  </body>
</html>
