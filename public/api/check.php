<?php
/**
 * Revolution505 — "Revisa tu sitio": revisión rápida y gratuita de un sitio web.
 *
 * POST JSON { url } → { ok, url, finalUrl, checks: [{ id, status, label, detail }], score }
 * status: pass | warn | fail
 *
 * Seguridad (el servidor hace la petición, así que se protege contra SSRF):
 *   - Solo http/https, puertos 80/443, host con dominio público.
 *   - Cada salto de redirección se vuelve a validar; la IP resuelta se fija con CURLOPT_RESOLVE
 *     (evita DNS rebinding) y se rechazan rangos privados/reservados.
 *   - Límite de 8 revisiones por IP cada 10 minutos, 10 s por petición y 3 MB de HTML.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const R505_MAX_BYTES = 3 * 1024 * 1024;
const R505_TIMEOUT = 10;
const R505_MAX_REDIRECTS = 5;
const R505_RATE_LIMIT = 8;
const R505_RATE_WINDOW = 600;

function r505_out(int $code, array $payload): never {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  r505_out(405, ['ok' => false, 'error' => 'Método no permitido']);
}

$data = json_decode(file_get_contents('php://input') ?: '{}', true);
$input = is_array($data) ? trim((string)($data['url'] ?? '')) : '';
if ($input === '' || mb_strlen($input) > 300) {
  r505_out(422, ['ok' => false, 'error' => 'Escribe la dirección de tu sitio, por ejemplo minegocio.com']);
}

// --- Límite por IP -----------------------------------------------------------------
$ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
$rateFile = sys_get_temp_dir() . '/r505-check-' . hash('sha256', $ip) . '.json';
$now = time();
$hits = [];
if (is_readable($rateFile)) {
  $hits = array_filter((array)json_decode((string)file_get_contents($rateFile), true), fn($t) => is_int($t) && $t > $now - R505_RATE_WINDOW);
}
if (count($hits) >= R505_RATE_LIMIT) {
  r505_out(429, ['ok' => false, 'error' => 'Hiciste muchas revisiones seguidas. Intenta de nuevo en unos minutos.']);
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode(array_values($hits)), LOCK_EX);

// --- Validación de URL y destino ---------------------------------------------------
if (!preg_match('~^https?://~i', $input)) $input = 'https://' . $input;

/** Devuelve [url, host, port, ip] si el destino es público, o un mensaje de error. */
function r505_target(string $url): array|string {
  $p = parse_url($url);
  if (!$p || empty($p['host']) || !in_array(strtolower($p['scheme'] ?? ''), ['http', 'https'], true)) {
    return 'La dirección no es válida.';
  }
  if (isset($p['user']) || isset($p['pass'])) return 'La dirección no es válida.';
  $host = strtolower(rtrim($p['host'], '.'));
  $scheme = strtolower($p['scheme']);
  $port = (int)($p['port'] ?? ($scheme === 'https' ? 443 : 80));
  if (!in_array($port, [80, 443], true)) return 'Solo se revisan sitios en los puertos normales (80/443).';
  if (filter_var($host, FILTER_VALIDATE_IP) || !str_contains($host, '.') || str_ends_with($host, '.local') || $host === 'localhost') {
    return 'Escribe el dominio de tu sitio, por ejemplo minegocio.com';
  }
  $ips = @gethostbynamel($host);
  if (!$ips) return 'No encontramos ese dominio. Revisa que esté bien escrito.';
  foreach ($ips as $addr) {
    if (!filter_var($addr, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
      return 'Ese dominio no apunta a un sitio público.';
    }
  }
  return [$url, $host, $port, $ips[0]];
}

/** Una petición GET sin seguir redirecciones; devuelve status, headers, body, tiempo. */
function r505_fetch(array $target): array {
  [$url, $host, $port, $ip] = $target;
  $body = '';
  $headers = [];
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RESOLVE => ["$host:$port:$ip"],
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => R505_TIMEOUT,
    CURLOPT_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS,
    CURLOPT_ENCODING => '',
    CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; Revolution505-SiteCheck/1.0; +https://revolution505.com/revisa-tu-sitio)',
    CURLOPT_HTTPHEADER => ['Accept: text/html,application/xhtml+xml', 'Accept-Language: es-MX,es;q=0.9,en;q=0.8'],
    CURLOPT_HEADERFUNCTION => function ($ch, $line) use (&$headers) {
      $parts = explode(':', $line, 2);
      if (count($parts) === 2) $headers[strtolower(trim($parts[0]))] = trim($parts[1]);
      return strlen($line);
    },
    CURLOPT_WRITEFUNCTION => function ($ch, $chunk) use (&$body) {
      $body .= $chunk;
      return strlen($body) > R505_MAX_BYTES ? 0 : strlen($chunk);
    },
  ]);
  curl_exec($ch);
  $res = [
    'status' => (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE),
    'time' => (float)curl_getinfo($ch, CURLINFO_TOTAL_TIME),
    'headers' => $headers,
    'body' => $body,
    'error' => curl_errno($ch) && strlen($body) <= R505_MAX_BYTES ? curl_error($ch) : '',
  ];
  curl_close($ch);
  return $res;
}

/** Sigue redirecciones validando cada salto. */
function r505_get(string $url): array|string {
  for ($i = 0; $i <= R505_MAX_REDIRECTS; $i++) {
    $target = r505_target($url);
    if (is_string($target)) return $target;
    $res = r505_fetch($target);
    if ($res['error'] !== '' && $res['status'] === 0) return 'No pudimos abrir el sitio (' . $res['error'] . ').';
    $location = $res['headers']['location'] ?? '';
    if ($res['status'] >= 300 && $res['status'] < 400 && $location !== '') {
      $url = r505_absolute($url, $location);
      continue;
    }
    $res['finalUrl'] = $url;
    $res['redirects'] = $i;
    return $res;
  }
  return 'El sitio redirige demasiadas veces.';
}

function r505_absolute(string $base, string $rel): string {
  if (preg_match('~^https?://~i', $rel)) return $rel;
  $b = parse_url($base);
  $origin = $b['scheme'] . '://' . $b['host'] . (isset($b['port']) ? ':' . $b['port'] : '');
  if (str_starts_with($rel, '//')) return $b['scheme'] . ':' . $rel;
  if (str_starts_with($rel, '/')) return $origin . $rel;
  $dir = preg_replace('~/[^/]*$~', '/', $b['path'] ?? '/');
  return $origin . $dir . $rel;
}

$page = r505_get($input);
if (is_string($page)) r505_out(422, ['ok' => false, 'error' => $page]);

$html = $page['body'];
$finalUrl = $page['finalUrl'];
$checks = [];
$add = function (string $id, string $status, string $label, string $detail) use (&$checks) {
  $checks[] = compact('id', 'status', 'label', 'detail');
};

// --- 1. Responde --------------------------------------------------------------------
if ($page['status'] >= 400 || $page['status'] === 0) {
  $add('status', 'fail', 'El sitio no carga', "Respondió con error {$page['status']}. Tus clientes ven una página rota.");
  r505_out(200, ['ok' => true, 'url' => $input, 'finalUrl' => $finalUrl, 'checks' => $checks, 'score' => 0]);
}

// --- 2. HTTPS -----------------------------------------------------------------------
$host = (string)parse_url($finalUrl, PHP_URL_HOST);
if (str_starts_with($finalUrl, 'https://')) {
  $plain = r505_get('http://' . $host . '/');
  if (is_array($plain) && str_starts_with($plain['finalUrl'], 'https://')) {
    $add('https', 'pass', 'Conexión segura (https)', 'Tu sitio usa https y redirige la versión sin candado.');
  } else {
    $add('https', 'warn', 'La versión sin https no redirige', "Si alguien entra por http://$host el navegador lo marca como “No seguro”.");
  }
} else {
  $add('https', 'fail', 'Sin conexión segura (https)', 'El navegador muestra “No seguro” junto a tu dirección. Mucha gente se va en ese momento.');
}

// --- 3. Velocidad y peso ------------------------------------------------------------
$kb = (int)round(strlen($html) / 1024);
$secs = round($page['time'], 1);
if ($page['time'] > 3 || $kb > 1500) {
  $add('speed', 'fail', 'Carga lenta', "El HTML tardó {$secs} s y pesa {$kb} KB, sin contar imágenes. En datos móviles se siente lento.");
} elseif ($page['time'] > 1.5 || $kb > 600) {
  $add('speed', 'warn', 'Carga mejorable', "El HTML tardó {$secs} s y pesa {$kb} KB. Se puede aligerar.");
} else {
  $add('speed', 'pass', 'Respuesta rápida', "El HTML tardó {$secs} s y pesa {$kb} KB.");
}

// --- Parseo -------------------------------------------------------------------------
libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML('<?xml encoding="utf-8"?>' . $html, LIBXML_NOWARNING | LIBXML_NOERROR);
$xp = new DOMXPath($dom);
$meta = function (string $name) use ($xp): string {
  $n = $xp->query("//meta[translate(@name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='$name' or @property='$name']/@content")->item(0);
  return $n ? trim($n->nodeValue ?? '') : '';
};
$text = trim(preg_replace('/\s+/', ' ', $dom->textContent ?? ''));
$jsOnly = mb_strlen($text) < 200;

// --- 4. Celular ---------------------------------------------------------------------
if ($meta('viewport') !== '') {
  $add('mobile', 'pass', 'Preparado para celular', 'Tiene la etiqueta que adapta el sitio a la pantalla del teléfono.');
} else {
  $add('mobile', 'fail', 'No se adapta al celular', 'Falta la etiqueta “viewport”: en el teléfono se ve como versión de escritorio en miniatura.');
}

// --- 5. Título y descripción para Google ------------------------------------------
$titleNode = $xp->query('//title')->item(0);
$title = $titleNode ? trim($titleNode->textContent) : '';
$tl = mb_strlen($title);
if ($title === '') {
  $add('title', 'fail', 'Sin título para Google', 'Google no tiene un título que mostrar en los resultados de búsqueda.');
} elseif ($tl < 15 || preg_match('/^(home|inicio|index)\b/i', $title)) {
  $add('title', 'warn', 'Título muy genérico', "Tu título es “{$title}”. Debería decir qué haces y en qué ciudad.");
} elseif ($tl > 70) {
  $add('title', 'warn', 'Título demasiado largo', "Tiene {$tl} caracteres; Google corta a partir de unos 60.");
} else {
  $add('title', 'pass', 'Título para Google', "“{$title}”");
}
$desc = $meta('description');
$dl = mb_strlen($desc);
if ($desc === '') {
  $add('description', 'fail', 'Sin descripción para Google', 'Google inventa el texto bajo tu enlace. Una buena descripción consigue más clics.');
} elseif ($dl < 50 || $dl > 170) {
  $add('description', 'warn', 'Descripción mejorable', "Tiene {$dl} caracteres; lo ideal es entre 120 y 160.");
} else {
  $add('description', 'pass', 'Descripción para Google', "{$dl} caracteres, buena longitud.");
}

// --- 6. WhatsApp --------------------------------------------------------------------
$waBad = [];
$waForeign = [];
$waCount = 0;
foreach ($xp->query('//a/@href') as $attr) {
  $href = html_entity_decode((string)$attr->nodeValue);
  $digits = null;
  if (preg_match('~wa\.me/\+?([0-9]*)~i', $href, $m)) $digits = $m[1];
  elseif (preg_match('~whatsapp\.com/send/?\?[^#]*phone=\+?([0-9]*)~i', $href, $m)) $digits = $m[1];
  if ($digits === null) continue;
  $waCount++;
  // Mensaje prellenado copiado de otro sitio (p. ej. "vengo de la web de otra-sucursal.com")
  if (preg_match('~[?&]text=([^&#]*)~i', $href, $tm)
    && preg_match_all('~(?:https?://)?(?:www\.)?([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,})~i', urldecode($tm[1]), $dm)) {
    $siteHost = preg_replace('/^www\./', '', strtolower((string)parse_url($finalUrl, PHP_URL_HOST)));
    foreach ($dm[1] as $d) {
      $d = strtolower($d);
      if ($d !== $siteHost && !in_array($d, $waForeign, true)) $waForeign[] = $d;
    }
  }
  $len = strlen($digits);
  $isMx = str_starts_with($digits, '52');
  $valid = $len >= 11 && $len <= 15 && (!$isMx || $len === 12 || $len === 13);
  if (!$valid && !in_array($digits, $waBad, true)) $waBad[] = $digits === '' ? '(vacío)' : $digits;
}
if ($waCount === 0) {
  $add('whatsapp', $jsOnly ? 'warn' : 'warn', 'Sin botón de WhatsApp', 'No encontramos un enlace de WhatsApp. En México es el canal donde más clientes preguntan.');
} elseif ($waBad) {
  $add('whatsapp', 'fail', 'Tu botón de WhatsApp está roto', 'Número incompleto o sin lada de país: ' . implode(', ', array_slice($waBad, 0, 3)) . '. El chat no abre y el cliente se va.');
} elseif ($waForeign) {
  $add('whatsapp', 'fail', 'Tu WhatsApp menciona otro sitio', 'El mensaje que se escribe solo al abrir el chat habla de ' . implode(', ', array_slice($waForeign, 0, 2)) . ', no de tu sitio. Confunde al cliente.');
} else {
  $add('whatsapp', 'pass', 'WhatsApp funcionando', "{$waCount} enlace(s) con número completo.");
}

// --- 7. Teléfono --------------------------------------------------------------------
$telBad = [];
$telCount = 0;
foreach ($xp->query("//a[starts-with(@href,'tel:')]/@href") as $attr) {
  $telCount++;
  $d = preg_replace('/\D/', '', (string)$attr->nodeValue);
  if (strlen($d) < 10 || preg_match('/^01\d{10}$/', $d)) $telBad[] = substr((string)$attr->nodeValue, 4) ?: '(vacío)';
}
if ($telBad) {
  $add('phone', 'fail', 'Teléfono con error', 'Enlace(s) de llamada incompletos o con el prefijo 01 (ya no se usa): ' . implode(', ', array_slice(array_unique($telBad), 0, 3)) . '.');
} elseif ($telCount > 0) {
  $add('phone', 'pass', 'Botón para llamar', 'En el celular se puede llamar con un toque.');
} else {
  $add('phone', 'warn', 'Sin botón para llamar', 'Un enlace “tel:” permite llamar con un toque desde el celular.');
}

// --- 8. Negocio local en Google (datos estructurados) -----------------------------
$hasLd = $xp->query("//script[@type='application/ld+json']")->length > 0;
$add('schema', $hasLd ? 'pass' : 'warn', $hasLd ? 'Datos para Google (schema)' : 'Sin datos estructurados',
  $hasLd ? 'Tu sitio le describe a Google qué tipo de negocio eres.' : 'Agregar datos de negocio local (horario, dirección, teléfono) ayuda a aparecer en búsquedas de tu ciudad.');

// --- 9. Imagen al compartir -------------------------------------------------------
$og = $meta('og:image');
$add('og', $og !== '' ? 'pass' : 'warn', $og !== '' ? 'Imagen al compartir' : 'Sin imagen al compartir',
  $og !== '' ? 'Al mandar tu enlace por WhatsApp o redes se ve una imagen.' : 'Cuando alguien comparte tu enlace por WhatsApp aparece sin imagen.');

// --- 10. Contenido actualizado ----------------------------------------------------
$year = (int)gmdate('Y');
if (preg_match_all('/(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/iu', $html, $m) && $m[1]) {
  $latest = max(array_map('intval', $m[1]));
  if ($latest <= $year - 2) {
    $add('fresh', 'warn', 'Parece desactualizado', "El pie de página dice © {$latest}. Da la impresión de que el negocio ya no está activo.");
  }
}

if ($jsOnly) {
  $add('js', 'warn', 'Revisión parcial', 'Tu sitio arma su contenido con JavaScript, así que algunos puntos no se pudieron revisar desde aquí. En la auditoría completa lo revisamos en un navegador real.');
}

$weights = ['pass' => 1, 'warn' => 0.5, 'fail' => 0];
$scored = array_filter($checks, fn($c) => $c['id'] !== 'js');
$score = $scored ? (int)round(100 * array_sum(array_map(fn($c) => $weights[$c['status']], $scored)) / count($scored)) : 0;

r505_out(200, ['ok' => true, 'url' => $input, 'finalUrl' => $finalUrl, 'checks' => $checks, 'score' => $score]);
