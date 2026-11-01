import type { Caso, Landing } from '../content/types'

// JSON-LD por página. Se inyecta en el <head> del HTML prerenderizado (scripts/prerender.mjs).
// Organization (#org) y LocalBusiness (#local) ya están en index.html; aquí solo se referencian.

const SITE = 'https://revolution505.com'
const abs = (path: string) => (path === '/' ? `${SITE}/` : `${SITE}${path}`)

type JsonLd = Record<string, unknown>

function breadcrumb(items: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  }
}

export function landingSchema(l: Landing): JsonLd {
  const home = l.lang === 'en' ? { name: 'Home', path: '/en' } : { name: 'Inicio', path: '/' }
  const crumbs = l.path === home.path ? [home] : [home, { name: l.name, path: l.path }]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${abs(l.path)}#service`,
        name: l.name,
        serviceType: l.serviceType,
        description: l.description,
        url: abs(l.path),
        inLanguage: l.lang === 'en' ? 'en' : 'es-MX',
        provider: { '@id': `${SITE}/#local` },
        areaServed: l.areaServed.map((name) => ({ '@type': 'Place', name })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: l.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      breadcrumb(crumbs),
    ],
  }
}

export function casoSchema(c: Caso): JsonLd {
  const path = `/portafolio/${c.slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${abs(path)}#work`,
        name: c.title,
        description: c.summary,
        url: abs(path),
        image: `${SITE}${c.image}`,
        inLanguage: 'es-MX',
        creator: { '@id': `${SITE}/#org` },
        about: c.client,
        keywords: c.stack.join(', '),
        ...(c.year ? { dateCreated: c.year } : {}),
      },
      breadcrumb([
        { name: 'Inicio', path: '/' },
        { name: 'Portafolio', path: '/portafolio' },
        { name: c.client, path },
      ]),
    ],
  }
}
