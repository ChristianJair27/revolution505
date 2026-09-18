<?php
/**
 * Revolution505 — captura de lead → contacto@revolution505.com
 *
 * Deploy: este archivo vive en public/api/lead.php y Vite lo copia a dist/api/lead.php.
 * Hostinger debe servir PHP (plan web estándar). No requiere Composer.
 *
 * Config opcional: copia lead.config.example.php → lead.config.php (NO commitear secretos)
 * y define SMTP si mail() del hosting no basta.
 *
 * POST JSON:
 *   { name, email, phone, need, business?, company?, website? (honeypot) }
 * Respuesta JSON: { ok: true } | { ok: false, error: "..." }
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// CORS solo mismo origen en prod; permitir preflight básico
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '{}', true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'JSON inválido']);
  exit;
}

// Honeypot: bots suelen llenar "website"
if (!empty($data['website'])) {
  echo json_encode(['ok' => true]); // silencio
  exit;
}

$name     = trim((string)($data['name'] ?? ''));
$email    = trim((string)($data['email'] ?? ''));
$phone    = trim((string)($data['phone'] ?? ''));
$need     = trim((string)($data['need'] ?? ''));
$business = trim((string)($data['business'] ?? ''));

$errors = [];
if ($name === '' || mb_strlen($name) > 120) $errors[] = 'nombre';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 180) $errors[] = 'email';
if ($phone === '' || mb_strlen($phone) > 40) $errors[] = 'teléfono';
if ($need === '' || mb_strlen($need) > 200) $errors[] = 'necesidad';
if ($business !== '' && mb_strlen($business) > 160) $errors[] = 'negocio';

if ($errors) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Campos inválidos: ' . implode(', ', $errors)]);
  exit;
}

$cfg = [
  'to'      => 'contacto@revolution505.com',
  'from'    => 'noreply@revolution505.com',
  'from_name' => 'Revolution505 Web',
  'subject_prefix' => '[Lead web]',
];
$configFile = __DIR__ . '/lead.config.php';
if (is_readable($configFile)) {
  $userCfg = include $configFile;
  if (is_array($userCfg)) $cfg = array_merge($cfg, $userCfg);
}

$ip = $_SERVER['HTTP_CF_CONNECTING_IP']
  ?? $_SERVER['HTTP_X_FORWARDED_FOR']
  ?? $_SERVER['REMOTE_ADDR']
  ?? '';
$ip = is_string($ip) ? explode(',', $ip)[0] : '';
$ua = substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 180);
$when = gmdate('Y-m-d H:i:s') . ' UTC';

$subject = $cfg['subject_prefix'] . ' ' . $name . ($need ? " — $need" : '');
$body = "Nuevo lead desde revolution505.com\n\n"
  . "Nombre:    $name\n"
  . "Email:     $email\n"
  . "Teléfono:  $phone\n"
  . "Negocio:   " . ($business !== '' ? $business : '(no indicado)') . "\n"
  . "Necesidad: $need\n\n"
  . "Fecha: $when\n"
  . "IP:    $ip\n"
  . "UA:    $ua\n";

$to = $cfg['to'];
$from = $cfg['from'];
$fromName = $cfg['from_name'];
$encodedFrom = sprintf('"%s" <%s>', addslashes($fromName), $from);

$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: ' . $encodedFrom,
  'Reply-To: ' . $name . ' <' . $email . '>',
  'X-Mailer: Revolution505-LeadForm',
];

$ok = false;
if (!empty($cfg['smtp_host'])) {
  $ok = r505_smtp_send($cfg, $to, $subject, $body, $email, $name);
} else {
  $ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}

if (!$ok) {
  http_response_code(502);
  echo json_encode(['ok' => false, 'error' => 'No se pudo enviar el correo. Intenta WhatsApp o más tarde.']);
  exit;
}

echo json_encode(['ok' => true]);

/**
 * SMTP mínimo (AUTH LOGIN) para Hostinger u otro SMTP del buzón.
 * Config: smtp_host, smtp_port (465|587), smtp_user, smtp_pass, smtp_secure (ssl|tls)
 */
function r505_smtp_send(array $cfg, string $to, string $subject, string $body, string $replyEmail, string $replyName): bool {
  $host = $cfg['smtp_host'];
  $port = (int)($cfg['smtp_port'] ?? 465);
  $user = (string)($cfg['smtp_user'] ?? '');
  $pass = (string)($cfg['smtp_pass'] ?? '');
  $secure = strtolower((string)($cfg['smtp_secure'] ?? 'ssl'));
  $from = $cfg['from'];
  $fromName = $cfg['from_name'];

  $remote = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
  $fp = @stream_socket_client($remote, $errno, $errstr, 20);
  if (!$fp) return false;
  stream_set_timeout($fp, 20);

  $read = function () use ($fp) {
    $data = '';
    while ($str = fgets($fp, 515)) {
      $data .= $str;
      if (isset($str[3]) && $str[3] === ' ') break;
    }
    return $data;
  };
  $write = function (string $cmd) use ($fp) { fwrite($fp, $cmd . "\r\n"); };

  $read();
  $write('EHLO revolution505.com');
  $read();
  if ($secure === 'tls') {
    $write('STARTTLS');
    $read();
    stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
    $write('EHLO revolution505.com');
    $read();
  }
  if ($user !== '') {
    $write('AUTH LOGIN');
    $read();
    $write(base64_encode($user));
    $read();
    $write(base64_encode($pass));
    $auth = $read();
    if (strpos($auth, '235') === false) { fclose($fp); return false; }
  }
  $write('MAIL FROM:<' . $from . '>');
  $read();
  $write('RCPT TO:<' . $to . '>');
  $read();
  $write('DATA');
  $read();
  $msg = 'From: ' . sprintf('"%s" <%s>', addslashes($fromName), $from) . "\r\n"
    . 'To: <' . $to . ">\r\n"
    . 'Reply-To: ' . sprintf('"%s" <%s>', addslashes($replyName), $replyEmail) . "\r\n"
    . 'Subject: =?UTF-8?B?' . base64_encode($subject) . "?=\r\n"
    . "MIME-Version: 1.0\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "\r\n"
    . $body . "\r\n.";
  $write($msg);
  $dataResp = $read();
  $write('QUIT');
  fclose($fp);
  return strpos($dataResp, '250') !== false;
}
