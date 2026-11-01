import { test, expect, type Page } from '@playwright/test'
import { LANDINGS, LANDINGS_EN } from '../src/content/landings'
import { CASOS } from '../src/content/casos'
import { routes } from '../src/seo/routes'

// PR 2 (contenido): landings ES/EN, casos de estudio, hreflang y JSON-LD.

async function blockThirdParties(page: Page) {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort())
}

function jsonLdBlocks(html: string) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
}

for (const l of LANDINGS) {
  test(`landing ${l.path}: lang, JSON-LD (Service + FAQPage + Breadcrumb) y FAQ visible`, async ({ request }) => {
    const html = await (await request.get(l.path)).text()
    expect(html).toContain(`<html lang="${l.lang}">`)
    const graph = jsonLdBlocks(html).flatMap((j) => j['@graph'] ?? [j])
    const types = graph.map((g) => g['@type'])
    expect(types).toEqual(expect.arrayContaining(['Service', 'FAQPage', 'BreadcrumbList']))
    const faq = graph.find((g) => g['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(l.faqs.length)
    // Cada pregunta del schema está visible en la página (requisito de Google para FAQPage).
    for (const f of l.faqs) expect(html).toContain(f.q.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;'))
    // Cada landing enlaza a otras páginas del sitio (malla interna).
    for (const r of l.related) expect(html).toContain(`href="${r.href}"`)
  })
}

test('páginas EN: sin precios y con "Request a quote"', async ({ request }) => {
  for (const l of LANDINGS_EN) {
    const html = await (await request.get(l.path)).text()
    const body = html.slice(html.indexOf('<div id="root">'))
    expect(body).toContain('Request a quote')
    expect(body).not.toMatch(/\$\s?\d|MXN|USD/)
  }
})

test('hreflang recíproco entre pares ES ↔ EN', async ({ request }) => {
  const paired = routes.filter((r) => r.alternate)
  expect(paired.length).toBeGreaterThanOrEqual(6)
  for (const r of paired) {
    const html = await (await request.get(r.path)).text()
    expect(html).toContain(`hreflang="x-default"`)
    const other = await (await request.get(r.alternate!)).text()
    expect(other).toContain(`href="https://revolution505.com${r.path === '/' ? '/' : r.path}"`)
  }
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toContain('xmlns:xhtml')
  expect(sitemap).toContain('hreflang="en"')
})

test('rutas anidadas: 200 sin barra y 301 con barra', async ({ request }) => {
  for (const path of ['/en/', '/portafolio/flyzz/', '/en/wordpress-maintenance/']) {
    const res = await request.get(path, { maxRedirects: 0 })
    expect(res.status(), path).toBe(301)
    expect(res.headers()['location']).toBe(path.slice(0, -1))
  }
  expect((await request.get('/portafolio/no-existe')).status()).toBe(404)
  expect((await request.get('/portafolio')).status()).toBe(200)
})

test('casos: sitio en vivo enlazado, sin métricas ni clientes inventados', async ({ request }) => {
  for (const c of CASOS) {
    const html = await (await request.get(`/portafolio/${c.slug}`)).text()
    expect(html).toContain(`href="${c.liveUrl}"`)
    expect(html).toContain(c.image)
    const types = jsonLdBlocks(html).flatMap((j) => j['@graph'] ?? [j]).map((g) => g['@type'])
    expect(types).toEqual(expect.arrayContaining(['CreativeWork', 'BreadcrumbList']))
  }
  const portafolio = await (await request.get('/portafolio')).text()
  for (const fake of ['Peña Abogados', 'La Que Cura', 'Nexus Dental', 'CasaFlex', '+340%', '$180K']) {
    expect(portafolio, fake).not.toContain(fake)
  }
  for (const c of CASOS) expect(portafolio).toContain(`href="/portafolio/${c.slug}"`)
})

test('navegación SPA a una landing EN actualiza lang y hreflang', async ({ page }) => {
  await blockThirdParties(page)
  await page.goto('/desarrollo-web-queretaro')
  await page.waitForLoadState('networkidle')
  await page.locator('article a[href="/precios"]').first().click()
  await expect(page).toHaveURL(/\/precios$/)
  await expect(page.locator('link[hreflang]')).toHaveCount(0)
  await page.goto('/en')
  await page.waitForLoadState('networkidle')
  await page.locator('article a[href="/en/wordpress-maintenance"]').first().click()
  await expect(page).toHaveURL(/wordpress-maintenance$/)
  expect(await page.evaluate(() => document.documentElement.lang)).toBe('en')
  await expect(page.locator('link[hreflang="es-MX"]')).toHaveAttribute('href', 'https://revolution505.com/hosting-y-administracion-web')
})

test('sin scroll horizontal en landings y casos', async ({ page }) => {
  await blockThirdParties(page)
  const vw = page.viewportSize()!.width
  for (const path of ['/desarrollo-web-queretaro', '/en/web-development-nearshore-mexico', '/portafolio/amq-capacitaciones']) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const scroll = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(scroll, path).toBeLessThanOrEqual(vw)
  }
})
