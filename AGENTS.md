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

**NUNCA usar  ni ningún deploy por archivo o por Git en la raíz:** vacían , donde viven los subdominios  (con , datos que no están en ningún repo), ,  y .

Camino seguro (no borra nada):
1. > revolution505@0.0.0 build
> tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs

[36mvite v7.3.1 [32mbuilding client environment for production...[36m[39m
transforming...
[32m✓[39m 2148 modules transformed.
rendering chunks...
computing gzip size...
[2mdist/[22m[32massets/inter-vietnamese-400-normal-DMkecbls.woff2            [39m[1m[2m  4.97 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-vietnamese-300-normal-Bdr24Bqb.woff2            [39m[1m[2m  5.06 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-vietnamese-600-normal-Cc8MFFhd.woff2            [39m[1m[2m  5.10 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-vietnamese-700-normal-DlLaEgI2.woff2            [39m[1m[2m  5.10 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-vietnamese-500-normal-DOriooB6.woff2            [39m[1m[2m  5.11 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-400-normal-DGGRlc-M.woff2             [39m[1m[2m  5.26 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-300-normal-l2DDyC6M.woff2             [39m[1m[2m  5.35 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-500-normal-C4iEst2y.woff2             [39m[1m[2m  5.43 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-600-normal-DRtmH8MT.woff2             [39m[1m[2m  5.43 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-700-normal-qfdV9bQt.woff2             [39m[1m[2m  5.44 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-vietnamese-400-normal-Bbgyi5SW.woff             [39m[1m[2m  6.50 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-vietnamese-300-normal-DDGmYYdT.woff             [39m[1m[2m  6.59 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-vietnamese-500-normal-mJboJaSs.woff             [39m[1m[2m  6.60 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-vietnamese-700-normal-BZaoP0fm.woff             [39m[1m[2m  6.63 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-vietnamese-600-normal-BuLX-rYi.woff             [39m[1m[2m  6.64 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-400-normal-KugGGMne.woff              [39m[1m[2m  7.06 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-300-normal-DLbbeei1.woff              [39m[1m[2m  7.13 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-500-normal-2j5mBUwD.woff              [39m[1m[2m  7.19 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-600-normal-B8X0CLgF.woff              [39m[1m[2m  7.21 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-ext-700-normal-BoQ6DsYi.woff              [39m[1m[2m  7.22 kB[22m[1m[22m
[2mdist/[22m[32mindex.html                                                   [39m[1m[2m  7.42 kB[22m[1m[22m[2m │ gzip:   2.63 kB[22m
[2mdist/[22m[32massets/inter-cyrillic-400-normal-obahsSVq.woff2              [39m[1m[2m  7.71 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-400-normal-B4URO6DV.woff2                 [39m[1m[2m  7.78 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-300-normal-BnqRxXuy.woff2              [39m[1m[2m  7.81 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-500-normal-BasfLYem.woff2              [39m[1m[2m  7.90 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-700-normal-CjBOestx.woff2              [39m[1m[2m  7.90 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-500-normal-BIZE56-Y.woff2                 [39m[1m[2m  7.92 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-700-normal-C3JjAnD8.woff2                 [39m[1m[2m  7.92 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-600-normal-plRanbMR.woff2                 [39m[1m[2m  7.94 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-600-normal-CWCymEST.woff2              [39m[1m[2m  7.97 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-300-normal-DmGD3g_f.woff2                 [39m[1m[2m  8.00 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-400-normal-HOLc17fK.woff               [39m[1m[2m  9.78 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-300-normal-LR1W_oT8.woff               [39m[1m[2m  9.82 kB[22m[1m[22m
[2mdist/[22m[32massets/instrument-serif-latin-ext-400-normal-CFCUzsTy.woff   [39m[1m[2m  9.86 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-700-normal-DrXBdSj3.woff               [39m[1m[2m  9.91 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-400-normal-q2sYcFCs.woff                  [39m[1m[2m  9.92 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-600-normal-4D_pXhcN.woff               [39m[1m[2m  9.94 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-500-normal-CxZf_p3X.woff               [39m[1m[2m  9.94 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-500-normal-Xzm54t5V.woff                  [39m[1m[2m  9.98 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-700-normal-BUv2fZ6O.woff                  [39m[1m[2m  9.98 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-300-normal-BrhSP0vQ.woff                  [39m[1m[2m 10.00 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-greek-600-normal-BZpKdvQh.woff                  [39m[1m[2m 10.03 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-400-normal-BQZuk6qB.woff2          [39m[1m[2m 10.23 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-300-normal-CgCALhwJ.woff2          [39m[1m[2m 10.36 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-500-normal-B0yAr1jD.woff2          [39m[1m[2m 10.43 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-600-normal-Dfes3d0z.woff2          [39m[1m[2m 10.48 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-700-normal-BjwYoWNd.woff2          [39m[1m[2m 10.50 kB[22m[1m[22m
[2mdist/[22m[32massets/instrument-serif-latin-ext-400-italic-D7-lnxEk.woff   [39m[1m[2m 10.51 kB[22m[1m[22m
[2mdist/[22m[32massets/instrument-serif-latin-ext-400-normal-C2je3j2s.woff2  [39m[1m[2m 11.60 kB[22m[1m[22m
[2mdist/[22m[32massets/instrument-serif-latin-ext-400-italic-C9HzH3YL.woff2  [39m[1m[2m 12.38 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-400-normal-DQukG94-.woff           [39m[1m[2m 13.34 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-300-normal-RId2JxDB.woff           [39m[1m[2m 13.40 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-700-normal-LO58E6JB.woff           [39m[1m[2m 13.41 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-500-normal-BmqWE9Dz.woff           [39m[1m[2m 13.45 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-cyrillic-ext-600-normal-Bcila6Z-.woff           [39m[1m[2m 13.46 kB[22m[1m[22m
[2mdist/[22m[32massets/instrument-serif-latin-400-normal-BVbkICAY.woff       [39m[1m[2m 18.34 kB[22m[1m[22m
[2mdist/[22m[32massets/instrument-serif-latin-400-italic-u__WvvIK.woff       [39m[1m[2m 19.26 kB[22m[1m[22m
[2mdist/[22m[32massets/instrument-serif-latin-400-normal-DnYpCC2O.woff2      [39m[1m[2m 21.03 kB[22m[1m[22m
[2mdist/[22m[32massets/instrument-serif-latin-400-italic-DKMiL14s.woff2      [39m[1m[2m 22.13 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-400-normal-C38fXH4l.woff2                 [39m[1m[2m 23.66 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-300-normal-BVlfKGgI.woff2                 [39m[1m[2m 23.92 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-500-normal-Cerq10X2.woff2                 [39m[1m[2m 24.27 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-700-normal-Yt3aPRUw.woff2                 [39m[1m[2m 24.36 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-600-normal-LgqL8muc.woff2                 [39m[1m[2m 24.45 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-400-normal-CyCys3Eg.woff                  [39m[1m[2m 30.70 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-300-normal-i8F0SvXL.woff                  [39m[1m[2m 31.01 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-600-normal-CiBQ2DWP.woff                  [39m[1m[2m 31.26 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-500-normal-BL9OpVg8.woff                  [39m[1m[2m 31.28 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-700-normal-BLAVimhd.woff                  [39m[1m[2m 31.32 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-400-normal-C1nco2VV.woff2             [39m[1m[2m 35.00 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-300-normal-CPgO9Ksf.woff2             [39m[1m[2m 35.88 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-500-normal-CV4jyFjo.woff2             [39m[1m[2m 36.02 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-700-normal-Ca8adRJv.woff2             [39m[1m[2m 36.24 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-600-normal-D2bJ5OIk.woff2             [39m[1m[2m 36.26 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-400-normal-77YHD8bZ.woff              [39m[1m[2m 47.56 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-500-normal-BxGbmqWO.woff              [39m[1m[2m 48.49 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-300-normal-Dp1L8vcn.woff              [39m[1m[2m 48.61 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-700-normal-TidjK2hL.woff              [39m[1m[2m 48.63 kB[22m[1m[22m
[2mdist/[22m[32massets/inter-latin-ext-600-normal-CIVaiw4L.woff              [39m[1m[2m 48.67 kB[22m[1m[22m
[2mdist/[22m[35massets/index-FJ1eom2u.css                                    [39m[1m[2m135.47 kB[22m[1m[22m[2m │ gzip:  18.58 kB[22m
[2mdist/[22m[36massets/vendor-gsap-BZzlqNTp.js                               [39m[1m[2m114.56 kB[22m[1m[22m[2m │ gzip:  45.44 kB[22m
[2mdist/[22m[36massets/index-DR1wRgOz.js                                     [39m[1m[2m269.19 kB[22m[1m[22m[2m │ gzip:  68.55 kB[22m
[2mdist/[22m[36massets/vendor-ClIf4tbp.js                                    [39m[1m[2m354.78 kB[22m[1m[22m[2m │ gzip: 115.52 kB[22m
[2mdist/[22m[36massets/vendor-hls-D1fSjlvU.js                                [39m[1m[2m523.08 kB[22m[1m[22m[2m │ gzip: 162.11 kB[22m
[32m✓ built in 4.98s[39m
[36mvite v7.3.1 [32mbuilding ssr environment for production...[36m[39m
transforming...
[32m✓[39m 38 modules transformed.
rendering chunks...
[2mdist-ssr/[22m[36mentry-server.js  [39m[1m[2m395.84 kB[22m[1m[22m
[32m✓ built in 368ms[39m
prerender  /                                        → dist/index.html
prerender  /precios                                 → dist/precios.html
prerender  /sistemas                                → dist/sistemas.html
prerender  /portafolio                              → dist/portafolio.html
prerender  /proceso                                 → dist/proceso.html
prerender  /contacto                                → dist/contacto.html
prerender  /revisa-tu-sitio                         → dist/revisa-tu-sitio.html
prerender  /desarrollo-web-queretaro                → dist/desarrollo-web-queretaro.html
prerender  /soporte-it-queretaro                    → dist/soporte-it-queretaro.html
prerender  /hosting-y-administracion-web            → dist/hosting-y-administracion-web.html
prerender  /paginas-web-para-consultorios           → dist/paginas-web-para-consultorios.html
prerender  /sistemas-pos                            → dist/sistemas-pos.html
prerender  /en                                      → dist/en.html
prerender  /en/web-development-nearshore-mexico     → dist/en/web-development-nearshore-mexico.html
prerender  /en/wordpress-maintenance                → dist/en/wordpress-maintenance.html
prerender  /en/website-migration                    → dist/en/website-migration.html
prerender  /portafolio/amq-capacitaciones           → dist/portafolio/amq-capacitaciones.html
prerender  /portafolio/flyzz                        → dist/portafolio/flyzz.html
prerender  /portafolio/la-pena-de-santiago          → dist/portafolio/la-pena-de-santiago.html
prerender  /portafolio/corporativo-rios             → dist/portafolio/corporativo-rios.html
prerender  /portafolio/lqc                          → dist/portafolio/lqc.html
prerender  /portafolio/atak-gg                      → dist/portafolio/atak-gg.html
prerender  404                                      → dist/404.html
sitemap    22 URLs   → dist/sitemap.xml
Unknown command: "test"


Did you mean this?
  npm test # Test a package
To see a list of supported npm commands, run:
  npm help.
2. Con el plugin de Hostinger,  (usuario , dominio ). Las llaves son temporales: pásalas solo por entorno como ,  y ; nunca en archivos.
3.  y luego . Sube assets primero, luego páginas y , e  al final.
4. Verifica: subdominios ( de formulario, prevent, scripts y postiz) iguales que antes,  en vivo y el formulario de .

Alternativa sin plugin: FTP con  en  y .

Los subdominios heredan : toda regla nueva debe ir después del filtro de . El formulario usa ; en el servidor no hay . Respaldo previo al primer deploy: .
