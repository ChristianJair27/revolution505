// Prerender de todas las rutas + 404 + sitemap.xml.
// Corre después de `vite build` (cliente → dist/) y `vite build --ssr` (→ dist-ssr/).
//
// Salida:
//   dist/index.html        → /
//   dist/<ruta>.html       → /<ruta>   (.htaccess sirve /precios desde precios.html, sin "/" final;
//                                      /portafolio/flyzz → dist/portafolio/flyzz.html)
//   Cada HTML lleva <html lang>, hreflang (si la ruta tiene equivalente en el otro idioma) y su JSON-LD.
//   dist/404.html          → ErrorDocument 404 (noindex)
//   dist/sitemap.xml       → rutas de src/seo/routes.ts con <lastmod> del último commit de su fuente
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

const ssr = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const { render, routes, NOT_FOUND_META, SITE_NAME, DEFAULT_OG_IMAGE, canonicalUrl, fullTitle } = ssr

// Precarga las 2 fuentes del primer pantallazo (titulares en Instrument Serif itálica y
// texto en Inter 400). Sin esto llegan tarde, el texto se pinta con la fuente de respaldo
// y al cambiar de fuente el hero salta (CLS).
const criticalFonts = readdirSync(resolve(dist, 'assets'))
  .filter((f) => /^(instrument-serif-latin-400-italic|inter-latin-400-normal)-[\w-]+\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)

const template = readFileSync(resolve(dist, 'index.html'), 'utf8').replace(
  '</head>',
  () => `    ${criticalFonts.join('\n    ')}\n  </head>`,
)

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/** Reemplaza el content de <meta name|property="key" ...>; falla si no existe (para no publicar meta incorrecta). */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`)
  if (!re.test(html)) throw new Error(`index.html no tiene <meta ${attr}="${key}">`)
  return html.replace(re, `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`)
}

/** <link rel="alternate" hreflang> entre una ruta y su equivalente en el otro idioma (x-default = español). */
function hreflangLinks(route) {
  if (!route?.alternate) return []
  const es = route.lang === 'en' ? route.alternate : route.path
  const en = route.lang === 'en' ? route.path : route.alternate
  return [
    { lang: 'es-MX', href: canonicalUrl(es) },
    { lang: 'en', href: canonicalUrl(en) },
    { lang: 'x-default', href: canonicalUrl(es) },
  ]
}

function buildPage({ appHtml, title, description, url, image, noindex, route }) {
  let html = template
  const lang = route?.lang ?? 'es'
  if (!/<html lang="es">/.test(html)) throw new Error('index.html no tiene <html lang="es">')
  html = html.replace('<html lang="es">', `<html lang="${lang}">`)
  if (lang === 'en') {
    html = setMeta(html, 'property', 'og:locale', 'en_US')
  }
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(title)}</title>`)
  html = setMeta(html, 'name', 'title', title)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:image', image)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', description)
  html = setMeta(html, 'name', 'twitter:image', image)

  const canonicalRe = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/
  if (url) {
    html = setMeta(html, 'property', 'og:url', url)
    html = html.replace(canonicalRe, `<link rel="canonical" href="${escapeAttr(url)}" />`)
  } else {
    html = html.replace(canonicalRe, '')
  }

  const head = [
    ...hreflangLinks(route).map((l) => `<link rel="alternate" hreflang="${l.lang}" href="${escapeAttr(l.href)}" />`),
    // "<" escapado para que ningún texto del JSON pueda cerrar el <script>.
    ...(route?.jsonLd ? [`<script type="application/ld+json">${JSON.stringify(route.jsonLd).replace(/</g, '\\u003c')}</script>`] : []),
  ]
  if (head.length) html = html.replace('</head>', () => `    ${head.join('\n    ')}\n  </head>`)

  if (!html.includes('<div id="root"></div>')) throw new Error('index.html no tiene <div id="root"></div>')
  return html.replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)
}

function lastmod(sources) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...sources], { cwd: root, encoding: 'utf8' }).trim()
    if (out) return out
  } catch {
    // Sin git (p. ej. build desde un .zip): se usa la fecha del build.
  }
  return new Date().toISOString()
}

for (const route of routes) {
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`
  mkdirSync(dirname(resolve(dist, file)), { recursive: true })
  const html = buildPage({
    appHtml: render(route.path),
    title: fullTitle(route),
    description: route.description,
    url: canonicalUrl(route.path),
    image: route.ogImage ?? DEFAULT_OG_IMAGE,
    noindex: false,
    route,
  })
  writeFileSync(resolve(dist, file), html)
  console.log(`prerender  ${route.path.padEnd(40)} → dist/${file}`)
}

writeFileSync(
  resolve(dist, '404.html'),
  buildPage({
    appHtml: render('/__404__'),
    title: `${NOT_FOUND_META.title} | ${SITE_NAME}`,
    description: NOT_FOUND_META.description,
    url: null,
    image: DEFAULT_OG_IMAGE,
    noindex: true,
  }),
)
console.log(`prerender  ${'404'.padEnd(40)} → dist/404.html`)

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${canonicalUrl(r.path)}</loc>
    <lastmod>${lastmod(r.sources)}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>${hreflangLinks(r)
      .map((l) => `
    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${l.href}" />`)
      .join('')}
  </url>`,
  )
  .join('\n')
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
)
console.log(`sitemap    ${routes.length} URLs   → dist/sitemap.xml`)

rmSync(ssrDir, { recursive: true, force: true })
