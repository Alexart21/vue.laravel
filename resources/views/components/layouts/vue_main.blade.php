@php
    header('X-Frame-Options: sameorigin');
    header('X-Content-Type-Options: nosniff');
    header('X-XSS-Protection: 1;mode=block');
    //header('Content-Security-Policy: default-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; img-src \'self\' data:; style-src \'self\' \'unsafe-inline\'; script-src \'self\' \'unsafe-inline\' *.google.com www.gstatic.com; frame-src *.google.com gstatic.com');
    header('Permissions-Policy: camera=(), display-capture=(), geolocation=(), microphone=()');
    header('Referrer-Policy: origin-when-cross-origin');
    header('Strict-Transport-Security: max-age=31536000');
@endphp
    <!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>title</title>
{{--    <link rel="icon" type="image/png" href="{{ asset('icons/512x512.png')  }}"/>--}}
    <meta name="csrf-token" id="csrf_token" content="{{ csrf_token() }}">
{{--    <meta name="msapplication-config" content="{{ asset('browserconfig.xml')  }}"/>--}}
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="HandheldFriendly" content="true">
    <meta name="keywords" content="">
@vite([
'resources/css/vue_app.css',
])
<body>
<main>
    {{ $slot }}
</main>
@vite([
'resources/js/vue_app.js',
])
</body>
</html>
