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
| `npm run build` | `tsc -b && vite build` — **typecheck obligatorio antes de build** |
| `npm run lint` | ESLint (`.ts`, `.tsx`, etc.) |
| `npm run preview` | Vista previa del build |

No hay test suite configurada.

## Arquitectura

- `src/pages/` — 6 páginas: Index (Home nuevo), Portfolio, Clients, Blog, Contact
- `src/components/` — Header, Footer, sections/ (legacy)
- `src/components/redesign/` — **Nuevos componentes cinematic**: LoadingScreen, Navbar, HeroSection, SelectedWorks, PreciosSection, ProcesoSection, TestimoniosSection, InsightsSection, FooterSection, WhatsAppButton
- `src/main.tsx` — Entrypoint, monta `<App />` en `#root`
- `src/App.tsx` — BrowserRouter + Routes (`/` usa Index cinematic, otras páginas usan layout legacy)
- `src/index.css` — `@import "tailwindcss"` + `@theme` variables + animaciones

## Diseño (Home page)

- **Tema**: Dark-only cósmico (`--bg: 0 0% 4%`), acento azul (`#3b82f6` → `#60a5fa`)
- **Fuentes**: `Inter` (body) + `Instrument Serif` (display, italic)
- **Tailwind v4** — Tema definido vía `@theme` en CSS; no usar `tailwind.config.js` (vestigial)
- **Loading Screen** — Contador 000→100 con `requestAnimationFrame`, palabras rotativas
- **Navbar** — Pill glassmorphism fijo, logo con ring accent gradient
- **Hero** — Full viewport, video HLS de fondo, partículas, headline gigante, role cycling
- **Precios** — 3 planes ($6,500 / $12,500 / $18,500 MXN) con WhatsApp CTA directo
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
- **HLS video** — El Hero intenta cargar `/assets/hero-bg.m3u8`. Si no existe, fallback a gradiente.

## Estrategia de Marketing (del análisis de competidores)

Ver `ANALISIS_COMPETIDORES.md` para análisis completo. La landing page implementa:
- Precios visibles en 3 niveles
- WhatsApp CTA en cada sección
- SEO local (copy menciona Michoacán, La Piedad, Morelia)
- Copy persuasivo basado en dolor del cliente
