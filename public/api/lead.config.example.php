<?php
/**
 * Copia este archivo a lead.config.php en el mismo directorio (api/) en Hostinger.
 * lead.config.php NO debe subirse a git si contiene contraseñas.
 *
 * Opción A — mail() del hosting (por defecto, sin este archivo):
 *   Suele funcionar si el From es @revolution505.com
 *
 * Opción B — SMTP del buzón Hostinger (recomendado):
 */
return [
  'to' => 'contacto@revolution505.com',
  'from' => 'noreply@revolution505.com', // o el mismo buzón SMTP
  'from_name' => 'Revolution505 Web',
  'subject_prefix' => '[Lead web]',

  // Descomenta y completa para SMTP:
  // 'smtp_host'   => 'smtp.hostinger.com',
  // 'smtp_port'   => 465,
  // 'smtp_secure' => 'ssl', // ssl|tls
  // 'smtp_user'   => 'contacto@revolution505.com',
  // 'smtp_pass'   => 'TU_PASSWORD_DEL_BUZON',
];
