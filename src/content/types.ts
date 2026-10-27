// Tipos del contenido de las landings (ES/EN) y de los casos de estudio.
// Los datos viven en landings.ts y casos.ts; src/seo/routes.ts los convierte en rutas.

export type Lang = 'es' | 'en'

export interface Item {
  title: string
  text: string
}

export interface Faq {
  q: string
  a: string
}

export interface Price {
  label: string
  value: string
  note: string
}

export interface Landing {
  path: string
  lang: Lang
  /** Título del <title> sin sufijo. */
  title: string
  description: string
  /** Nombre corto para breadcrumb, enlaces internos y schema Service. */
  name: string
  eyebrow: string
  h1: string
  intro: string[]
  problemsTitle: string
  problems: Item[]
  servicesTitle: string
  services: Item[]
  steps: Item[]
  /** Solo en español: las páginas EN van sin precios ("Request a quote"). */
  prices?: Price[]
  faqs: Faq[]
  /** Casos de estudio relacionados (slugs de casos.ts). */
  cases?: string[]
  related: { href: string; label: string }[]
  waText: string
  /** Equivalente en el otro idioma (hreflang). */
  alternate?: string
  serviceType: string
  areaServed: string[]
}

export interface Caso {
  slug: string
  client: string
  /** Qué hace el cliente, según su propio sitio. */
  sector: string
  kind: 'cliente' | 'propio'
  category: 'web' | 'sistemas'
  title: string
  summary: string
  /** Contexto del cliente (hechos públicos de su sitio). */
  context: string
  /** Qué construimos (verificable en el sitio en vivo o en el repo). */
  built: string[]
  stack: string[]
  liveUrl: string
  liveLabel: string
  image: string
  year?: string
  /** Hechos cortos para la tarjeta del portafolio. */
  facts: { label: string; value: string }[]
  waText: string
  /** Landing de servicio relacionada. */
  service?: { href: string; label: string }
}
