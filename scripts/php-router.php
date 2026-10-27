<?php
// Router para `php -S` que imita public/.htaccess (Hostinger) en local:
//   archivo existente → se sirve · /ruta → ruta.html · /ruta/ → 301 /ruta · resto → 404.html con 404.
// Uso: npm run preview:php   (después de npm run build)
$root = $_SERVER['DOCUMENT_ROOT'];
$path = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');

if ($path !== '/' && str_ends_with($path, '/')) {
    header('Location: ' . rtrim($path, '/'), true, 301);
    return true;
}
if ($path === '/' || (is_file($root . $path) && !str_contains($path, '..'))) {
    return false;
}
if (is_file($root . $path . '.html')) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($root . $path . '.html');
    return true;
}
http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
readfile($root . '/404.html');
return true;
