# REDESIGN_PLAN.md — Revolution505 Premium Landing Page v2

## Objetivo
Recrear fielmente el estilo de landing page premium dark: single-page, cinematic, dark portfolio con GSAP + Framer Motion + hls.js + Tailwind v4 + React 19. Adaptado al 100% para Revolution505 (agencia de desarrollo web en Michoacán, México).

## New Dependencies
- `gsap` — ScrollTrigger, text animations
- `hls.js` — HLS video background for Hero
- `@fontsource/inter` / `@fontsource/instrument-serif` — Google Fonts as npm packages

## Design System
- **Fonts**: Inter (body, 300–700) + Instrument Serif italic (display)
- **Colors**: Near-black `hsl(0 0% 4%)` bg, blue accent `hsl(217 91% 60%)`
- **Theme**: Dark-only, cosmic gradients, glassmorphism

## Component Tree (Index.tsx)
```
<LoadingScreen />          — Counter 000→100, rotating words
<Navbar />                 — Fixed pill, accent-gradient ring logo
<HeroSection />            — Full viewport, HLS/gradient bg, giant headline, CTAs
<SelectedWorks />          — Bento grid of 5 projects
<PreciosSection />         — 3 pricing tiers
<ProcesoSection />         — 4-step visual process
<TestimoniosSection />     — Client quotes carousel
<InsightsSection />        — Blog teaser cards
<FooterSection />          — Marquee + CTA + links
<WhatsAppButton />         — Floating WhatsApp CTA
```

## File Changes
| File | Action |
|---|---|
| `package.json` | Add gsap, hls.js, @fontsource/inter, @fontsource/instrument-serif |
| `src/index.css` | Complete rewrite (Tailwind v4 @theme + @layer utilities) |
| `src/main.tsx` | Fix duplicate CSS import |
| `src/App.tsx` | Remove old Header/Footer, use new Index |
| `src/pages/Home.tsx` | New Index-based page (or replace inline) |
| `src/components/redesign/LoadingScreen.tsx` | Create |
| `src/components/redesign/Navbar.tsx` | Create |
| `src/components/redesign/HeroSection.tsx` | Create |
| `src/components/redesign/SelectedWorks.tsx` | Create |
| `src/components/redesign/PreciosSection.tsx` | Create |
| `src/components/redesign/ProcesoSection.tsx` | Create |
| `src/components/redesign/TestimoniosSection.tsx` | Create |
| `src/components/redesign/InsightsSection.tsx` | Create |
| `src/components/redesign/FooterSection.tsx` | Create |
| `src/components/redesign/WhatsAppButton.tsx` | Create |

## Implementation Order
1. Install deps → 2. index.css → 3. LoadingScreen → 4. Navbar → 5. Hero → 6. Works → 7. Precios → 8. Proceso → 9. Testimonios → 10. Insights → 11. Footer → 12. WhatsApp → 13. Index → 14. Wire up → 15. Build verify

## SEO & Marketing
- All copy writes in competitive-differentiating style from ANALISIS_COMPETIDORES.md
- Pricing visible ($6,500 / $12,500 / $18,500 MXN)
- WhatsApp CTA on every section
- Local SEO keywords: La Piedad, Morelia, Michoacán
- GA4 ready
