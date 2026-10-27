// Prerender de todas las rutas + 404 + sitemap.xml.
// Corre después de `vite build` (cliente → dist/) y `vite build --ssr` (→ dist-ssr/).
//
// Salida:
//   dist/index.html        → /
//   dist/<ruta>.html       → /<ruta>   (.htaccess sirve /precios desde precios.html, sin "/" final)
//   dist/404.html          → ErrorDocument 404 (noindex)
//   dist/sitemap.xml       → rutas de src/seo/routes.ts con <lastmod> del último commit de su fuente
import { execFileSync } from 'node:child_process'
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')

const ssr = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const { render, routes, NOT_FOUND_META, SITE_NAME, DEFAULT_OG_IMAGE, canonicalUrl, fullTitle } = ssr

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/** Reemplaza el content de <meta name|property="key" ...>; falla si no existe (para no publicar meta incorrecta). */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`)
  if (!re.test(html)) throw new Error(`index.html no tiene <meta ${attr}="${key}">`)
  return html.replace(re, `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`)
}

function buildPage({ appHtml, title, description, url, image, noindex }) {
  let html = template
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
  const html = buildPage({
    appHtml: render(route.path),
    title: fullTitle(route),
    description: route.description,
    url: canonicalUrl(route.path),
    image: route.ogImage ?? DEFAULT_OG_IMAGE,
    noindex: false,
  })
  writeFileSync(resolve(dist, file), html)
  console.log(`prerender  ${route.path.padEnd(14)} → dist/${file}`)
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
console.log('prerender  404            → dist/404.html')

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${canonicalUrl(r.path)}</loc>
    <lastmod>${lastmod(r.sources)}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`sitemap    ${routes.length} URLs   → dist/sitemap.xml`)

rmSync(ssrDir, { recursive: true, force: true })
