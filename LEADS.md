# Captura de leads → contacto@revolution505.com

## Flujo

1. Usuario llena `/contacto`: nombre, email, teléfono, necesidad (+ negocio opcional).
2. Frontend `POST /api/lead.php` (`src/lib/lead.ts`).
3. PHP valida, anti-bot honeypot (`website`), y envía correo a **contacto@revolution505.com**.
4. UI muestra éxito + CTA WhatsApp con el mismo mensaje prellenado (`waFromLead`).
5. En paralelo siempre hay link “Abrir WhatsApp” por si el correo falla o el usuario prefiere chat.

Placeholders de Google Ads (WA / tel) no se tocan.

## Por qué PHP (no EmailJS / Formspree)

- Hosting Hostinger ya tiene buzón `contacto@` y PHP.
- Sin SaaS de pago ni cargos a tarjeta.
- `@emailjs/browser` sigue en `package.json` por el formulario legacy `Contact.tsx`; el redesign usa solo el endpoint propio.

## Deploy Hostinger

1. Build: `npm run build` → `dist/` incluye `dist/api/lead.php` (copiado desde `public/api/`).
2. Sube el contenido de `dist/` (o redeploy del pipeline).
3. Confirma que Hostinger ejecuta `.php` (plan web / PHP habilitado). Un CDN 100% estático sin PHP no enviará correo.
4. **Opcional SMTP (recomendado):** en el servidor, junto a `api/lead.php`, crea `lead.config.php` a partir de `lead.config.example.php` con las credenciales SMTP del buzón Hostinger (`smtp.hostinger.com`, puerto 465 SSL). No subas contraseñas a git.
5. Prueba: envía un lead de prueba y revisa la bandeja (y spam) de `contacto@revolution505.com`.

## Dev local

`vite` no ejecuta PHP. El formulario fallará el `fetch` a `/api/lead.php` en local; el CTA de WhatsApp sigue funcionando. Para probar el mail, usa preview en Hostinger o un PHP built-in apuntando a `public/`.

## Archivos

| Archivo | Rol |
|---|---|
| `public/api/lead.php` | Endpoint POST |
| `public/api/lead.config.example.php` | Plantilla SMTP |
| `src/lib/lead.ts` | Cliente fetch |
| `src/constants/whatsapp.ts` | Textos `wa.me` + `waFromLead` |
| `src/pages/redesign/ContactoPage.tsx` | UI formulario + WA |
