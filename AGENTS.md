# Revolution505 — Instrucciones para OpenCode

Sitio web corporativo SPA para Revolution505 Tech Solutions (desarrollo web, sistemas, soluciones digitales).

## Stack

- React 19 + TypeScript 5.9 + Vite 7
- React Router v7 (SPA, client-side routing)
- Tailwind CSS v4 via `@tailwindcss/vite` plugin
- Framer Motion + GSAP (animaciones)
- HLS.js (reproducción de video)
- EmailJS (formulario de contacto)
- Lucide React (iconos)
- `@fontsource/inter` + `@fontsource/instrument-serif` (Google Fonts vía npm)

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor dev Vite (HMR) |
| `npm run build` | typecheck + build cliente + build SSR + `scripts/prerender.mjs` (HTML por ruta, 404, sitemap) |
| `npm run lint` | ESLint (`.ts`, `.tsx`, etc.) |
| `npm run preview:php` | Sirve `dist/` con PHP + `scripts/php-router.php` (imita el `.htaccess` de Hostinger) en :8899 |
| `npm test` | Playwright smoke sobre el build (requiere `npm run build`, PHP y Chrome) |

## SEO / prerender (rama seo-v2)

- **`src/seo/routes.ts` es la fuente única** de title/description/canonical/sitemap por ruta. Página nueva = ruta en `App.tsx` (`AppRoutes`) + entrada en `routes.ts`.
- `npm run build` genera `dist/index.html`, `dist/<ruta>.html`, `dist/404.html` (noindex) y `dist/sitemap.xml` (lastmod = último commit de la fuente). `public/sitemap.xml` ya no existe.
- `main.tsx` hidrata (`hydrateRoot`) el HTML prerenderizado. Nada de `window`/`document`/`Math.random` durante el render: solo en `useEffect`/handlers, o la hidratación falla.
- `public/.htaccess`: sin fallback SPA → URLs inexistentes dan **404 real**; `/ruta/` y `/ruta.html` redirigen 301 a `/ruta`.
- **Contenido (rama seo-v2-content)**: landings de servicio ES/EN en `src/content/landings.ts` y casos de estudio en `src/content/casos.ts`. `routes.ts` genera sus rutas, JSON-LD (`src/seo/schema.ts`), `<html lang>` y hreflang; `App.tsx` las monta con `LandingPage` / `CasoPage`. Landing nueva = una entrada en `landings.ts` (nada más).
- Casos y portafolio: **solo clientes autorizados y hechos verificables** (sitio en vivo o repo). Sin métricas ni testimonios inventados. Páginas EN: sin precios.
- Tracking: IDs y labels de Ads en `.env` (valores públicos) → `src/config/tracking.ts`; eventos en `src/lib/gtag.ts` (`generate_lead`, `whatsapp_click`, `phone_click`, `email_click`).

## Arquitectura

- `src/pages/` — 6 páginas: Index (Home nuevo), Portfolio, Clients, Blog, Contact
- `src/components/` — Header, Footer, sections/ (legacy)
- `src/components/redesign/` — **Nuevos componentes cinematic**: Navbar, HeroSection, SelectedWorks, PreciosSection, ProcesoSection, TestimoniosSection, InsightsSection, FooterSection, WhatsAppButton
- `src/main.tsx` — Entrypoint, hidrata `<App />` en `#root`
- `src/App.tsx` — `AppRoutes` (rutas + 404) envuelto en BrowserRouter; `src/entry-server.tsx` lo envuelve en StaticRouter para prerender
- `src/index.css` — `@import "tailwindcss"` + `@theme` variables + animaciones

## Diseño (Home page)

- **Tema**: Dark-only cósmico (`--bg: 0 0% 4%`), acento azul (`#3b82f6` → `#60a5fa`)
- **Fuentes**: `Inter` (body) + `Instrument Serif` (display, italic)
- **Tailwind v4** — Tema definido vía `@theme` en CSS; no usar `tailwind.config.js` (vestigial)
- **Navbar** — Pill glassmorphism fijo, logo con ring accent gradient
- **Hero** — Full viewport, video HLS de fondo (después del evento load), headline gigante, role cycling
- **Precios** — 3 planes ($6,500 / $12,500 / $22,500 MXN) con WhatsApp CTA directo
- **WhatsApp flotante** — Botón fijo en toda la app

## TypeScript

- Strict mode + `noUnusedLocals`, `noUnusedParameters`
- `verbatimModuleSyntax` activo — usar `import type` para importaciones solo de tipos
- `erasableSyntaxOnly` activo — no usar `enum`, `namespace`, etc.

## Quirks / Gotchas

- **EmailJS** — Credenciales hardcodeadas en `src/pages/Contact.tsx:45-49`. No usar `.env` sin migrar.
- **Ruteo** — `/` usa el diseño nuevo cinematográfico. Las páginas `/portafolio`, `/clientes`, `/blog`, `/contacto` usan el diseño legacy (Header/Footer viejos).
- **Alias de imports** — No hay alias configurados; usar imports relativos.
- **tailwind.config.js** — Vestigial de v3. Las animaciones que tiene están duplicadas en `index.css`.
- **HLS video** — Stream de Mux en `HeroSection`. Arranca solo después de `load` + idle, en escritorio y móvil (en móvil su primer cuadro se vuelve el LCP; aceptado por Christian). Con ahorro de datos, 2G o reducir movimiento queda el gradiente.

## Performance (rama perf)

- **Nada visible arriba del pliegue puede empezar en `opacity:0`** (navbar, H1 y heros): el HTML prerenderizado debe verse sin JS. Animaciones de entrada solo en secciones que entran con scroll.
- Sin loading screen. `main.tsx` hidrata después del primer pintado.
- GSAP + ScrollTrigger se cargan con `withGsap()` (`src/lib/gsap.ts`) tras `load` + idle. No importar `gsap` de forma estática.
- GA4, Ads y Meta Pixel: `gtag()`/`fbq()` encolan desde el inicio; sus librerías se insertan en el evento `load` (`index.html`).
- Imágenes: WebP redimensionadas (≤ 1280 px capturas, ≤ 256 px logos) con `loading="lazy"`. Los PNG originales se quedan solo para OG y páginas legacy.
- Fuentes: `prerender.mjs` precarga Instrument Serif itálica y Inter 400 (latin).
- Home: secciones bajo el pliegue dentro de `.cv-sections` (`content-visibility: auto`).
- `tests/perf.spec.ts` vigila lo anterior.

## Estrategia de Marketing (del análisis de competidores)

Ver `ANALISIS_COMPETIDORES.md` para análisis completo. La landing page implementa:
- Precios visibles en 3 niveles
- WhatsApp CTA en cada sección
- SEO local (copy menciona Michoacán, La Piedad, Morelia)
- Copy persuasivo basado en dolor del cliente

## Deploy a Hostinger (revolution505.com)

Solo con "OK deploy" de Christian.

**NUNCA usar `hosting_websites_deploy-static-site-archive` ni ningún deploy por archivo o por Git en la raíz:** vacían o sobrescriben `public_html`, donde viven los subdominios `formulario` (con `respuestas/`, datos que no están en ningún repo), `prevent`, `scripts` y `postiz`.

Camino seguro (no borra nada):
1. `npm run build && npm test`.
2. Con el plugin de Hostinger, `hosting_files_generate-upload-url` (usuario `u522428285`, dominio `revolution505.com`). Las llaves son temporales: pásalas solo por entorno como `HOSTINGER_UPLOAD_URL`, `HOSTINGER_AUTH_KEY` y `HOSTINGER_REST_AUTH_KEY`, nunca en archivos.
3. `npm run deploy:tus -- --dry-run` y luego `npm run deploy:tus`. Sube assets primero, luego páginas y `.htaccess`, e `index.html` al final.
4. Verifica: `/` de formulario, prevent, scripts y postiz igual que antes, `/revisa-tu-sitio` en vivo y el formulario de `/contacto`.

Alternativa sin plugin: FTP con `HOSTINGER_FTP_*` en `.env.local` y `npm run deploy:ftp`.

Los subdominios heredan `public/.htaccess`: toda regla nueva debe ir después del filtro de `HTTP_HOST`. El formulario usa `mail()`; en el servidor no hay `api/lead.config.php`. Respaldo previo al primer deploy: `docs/respaldos/2026-11-04-servidor/`.
