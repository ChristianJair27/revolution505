// ============================================================================
// Fuente única de verdad para SEO por ruta.
// La usan: usePageMeta (navegación en cliente), scripts/prerender.mjs (HTML por
// ruta + sitemap.xml) y scripts/check-seo.mjs (verificación del build).
// Para agregar una página: créala en App.tsx y agrega aquí su entrada.
// ============================================================================

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
}

export const routes: RouteMeta[] = [
  {
    path: '/',
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
      '12 proyectos reales de desarrollo web, sistemas y e-commerce en Querétaro y México. Resultados medibles: +340% leads, $180K+ ventas, Top 3 Google.',
    changefreq: 'monthly',
    priority: 0.8,
    sources: ['src/pages/redesign/PortafolioPage.tsx'],
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
