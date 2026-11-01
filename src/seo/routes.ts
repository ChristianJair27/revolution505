// ============================================================================
// Fuente única de verdad para SEO por ruta.
// La usan: usePageMeta (navegación en cliente), scripts/prerender.mjs (HTML por
// ruta + sitemap.xml) y scripts/check-seo.mjs (verificación del build).
// Para agregar una página: créala en App.tsx y agrega aquí su entrada.
// ============================================================================

import { CASOS } from '../content/casos'
import { LANDINGS } from '../content/landings'
import type { Lang } from '../content/types'
import { casoSchema, landingSchema } from './schema'

export const SITE_URL = 'https://revolution505.com'
export const SITE_NAME = 'Revolution505'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/revolution-pag.png`

export type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface RouteMeta {
  path: string
  /** Título sin sufijo; el sufijo " | Revolution505" se agrega salvo en el home. */
  title: string
  description: string
  ogImage?: string
  changefreq: ChangeFreq
  priority: number
  /** Archivos fuente de la página: su último commit define <lastmod> del sitemap. */
  sources: string[]
  /** Idioma de la página (<html lang>). Por defecto 'es'. */
  lang?: Lang
  /** Ruta equivalente en el otro idioma → <link rel="alternate" hreflang>. */
  alternate?: string
  /** JSON-LD propio de la página (se suma al Organization/LocalBusiness global). */
  jsonLd?: Record<string, unknown>
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    alternate: '/en',
    title: 'Revolution505 — Desarrollo Web en Querétaro | México & remoto',
    description:
      'Agencia de desarrollo web en Querétaro con alcance México y remoto. Sitios, POS, CRM y e-commerce desde $6,500 MXN. Cotiza por correo o WhatsApp. Respuesta en menos de 2 horas.',
    changefreq: 'weekly',
    priority: 1.0,
    sources: ['src/pages/Index.tsx', 'src/components/redesign'],
  },
  {
    path: '/precios',
    title: 'Precios y Planes',
    description:
      'Planes web desde $6,500 MXN — Querétaro, México y remoto. Sin letra pequeña. Hosting y soporte incluidos. Cotiza por correo o WhatsApp.',
    changefreq: 'weekly',
    priority: 0.9,
    sources: ['src/pages/redesign/PreciosPage.tsx'],
  },
  {
    path: '/sistemas',
    title: 'Sistemas a Medida',
    description:
      'POS, reservas, CRM y streaming a medida. Base en Querétaro, entrega en México y remoto. Sin mensualidades — el código es tuyo.',
    changefreq: 'weekly',
    priority: 0.8,
    sources: ['src/pages/redesign/SistemasPage.tsx'],
  },
  {
    path: '/portafolio',
    title: 'Portafolio de Proyectos',
    description:
      'Casos reales de Revolution505: sitios y sistemas web para AMQ, Flyzz, La Peña de Santiago, Corporativo Ríos y proyectos propios. Con enlace al sitio en vivo.',
    changefreq: 'monthly',
    priority: 0.8,
    sources: ['src/pages/redesign/PortafolioPage.tsx', 'src/content/casos.ts'],
  },
  {
    path: '/proceso',
    title: 'Proceso de Trabajo',
    description:
      'Proceso claro en 6 pasos — briefing a lanzamiento. Entrega promedio 12 días hábiles. Clientes en Querétaro, México y remoto.',
    changefreq: 'monthly',
    priority: 0.7,
    sources: ['src/pages/redesign/ProcesoPag.tsx'],
  },
  {
    path: '/contacto',
    title: 'Contacto',
    description:
      'Cotiza tu proyecto web o sistema. Lead a contacto@revolution505.com + WhatsApp. Atención en Querétaro, México y remoto. Respuesta en menos de 2 horas.',
    changefreq: 'monthly',
    priority: 0.9,
    sources: ['src/pages/redesign/ContactoPage.tsx'],
  },
]

// Landings de servicio (ES con precios, EN sin precios) — contenido en src/content/landings.ts
routes.push(
  ...LANDINGS.map((l) => ({
    path: l.path,
    title: l.title,
    description: l.description,
    changefreq: 'monthly' as const,
    priority: l.path === '/en' ? 0.8 : 0.7,
    sources: ['src/content/landings.ts', 'src/pages/redesign/LandingPage.tsx'],
    lang: l.lang,
    alternate: l.alternate,
    jsonLd: landingSchema(l),
  })),
)

// Casos de estudio — contenido en src/content/casos.ts
routes.push(
  ...CASOS.map((c) => ({
    path: `/portafolio/${c.slug}`,
    title: `${c.client.split(' — ')[0].split(' (')[0]} — Caso de estudio`,
    description: c.summary,
    ogImage: `${SITE_URL}${c.image}`,
    changefreq: 'yearly' as const,
    priority: 0.6,
    sources: ['src/content/casos.ts', 'src/pages/redesign/CasoPage.tsx'],
    jsonLd: casoSchema(c),
  })),
)

/** Meta de la página 404 (no va en el sitemap, lleva noindex). */
export const NOT_FOUND_META = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o se movió. Revisa nuestros servicios o escríbenos por WhatsApp.',
}

export function fullTitle(route: Pick<RouteMeta, 'path' | 'title'>): string {
  return route.path === '/' ? route.title : `${route.title} | ${SITE_NAME}`
}

export function canonicalUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

export function getRoute(path: string): RouteMeta | undefined {
  return routes.find((r) => r.path === path)
}
