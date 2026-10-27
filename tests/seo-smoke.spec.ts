import { test, expect, type Page } from '@playwright/test'
import { routes, canonicalUrl, fullTitle } from '../src/seo/routes'

// Bloquea terceros (GA, Meta, Mux) para que las pruebas sean deterministas.
async function blockThirdParties(page: Page) {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort())
}

/** Eventos gtag('event', name, params) empujados a dataLayer. */
async function gtagEvents(page: Page) {
  return page.evaluate(() =>
    (window.dataLayer ?? [])
      .filter((e: unknown) => e && typeof e === 'object' && (e as ArrayLike<unknown>)[0] === 'event')
      .map((e: ArrayLike<unknown>) => ({ name: e[1] as string, params: e[2] as Record<string, unknown> })),
  )
}

for (const route of routes) {
  test(`HTML prerenderizado ${route.path}: title, description, canonical, H1`, async ({ request }) => {
    const res = await request.get(route.path)
    expect(res.status()).toBe(200)
    const html = await res.text()
    const esc = (s: string) => s.replace(/&/g, '&amp;')
    expect(html).toContain(`<title>${esc(fullTitle(route))}</title>`)
    expect(html).toContain(`<meta name="description" content="${esc(route.description)}" />`)
    expect(html).toContain(`<link rel="canonical" href="${canonicalUrl(route.path)}" />`)
    expect(html).toMatch(/<div id="root"><.+<h1/s)
  })
}

test('404 real, sin barra final y sin duplicados .html', async ({ request }) => {
  const missing = await request.get('/no-existe-xyz')
  expect(missing.status()).toBe(404)
  expect(await missing.text()).toContain('noindex, follow')

  const slash = await request.get('/precios/', { maxRedirects: 0 })
  expect(slash.status()).toBe(301)
  expect(slash.headers()['location']).toBe('/precios')

  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap.match(/<loc>/g)).toHaveLength(routes.length)
  expect(sitemap).toContain('<lastmod>')
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /api/')
})

test('hidrata sin errores en todas las rutas', async ({ page }) => {
  await blockThirdParties(page)
  const errors: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource|net::ERR/.test(m.text())) errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(e.message))
  for (const route of routes) {
    await page.goto(route.path)
    await page.waitForLoadState('networkidle')
  }
  expect(errors).toEqual([])
})

test('eventos de contacto: whatsapp_click, phone_click, email_click', async ({ page }) => {
  await blockThirdParties(page)
  await page.goto('/contacto')
  await page.waitForLoadState('networkidle')
  // Evita abrir las apps: solo nos interesa el listener.
  await page.evaluate(() =>
    document.addEventListener('click', (e) => {
      if ((e.target as Element).closest('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"]')) e.preventDefault()
    }),
  )
  await page.locator('a[href^="tel:"]').first().dispatchEvent('click')
  await page.locator('a[href^="mailto:"]').first().dispatchEvent('click')
  await page.locator('a[href*="wa.me"]').first().dispatchEvent('click')
  const names = (await gtagEvents(page)).map((e) => e.name)
  expect(names).toEqual(expect.arrayContaining(['phone_click', 'email_click', 'whatsapp_click']))
  // Sin labels de Ads configurados no debe salir ninguna conversión (antes iban a REPLACE_ME_*).
  expect(names).not.toContain('conversion')
})

test('formulario: generate_lead solo al éxito del servidor', async ({ page }) => {
  await blockThirdParties(page)
  let status = 500
  await page.route('**/api/lead.php', (r) =>
    r.fulfill({ status, contentType: 'application/json', body: JSON.stringify(status === 200 ? { ok: true } : { ok: false, error: 'x' }) }),
  )
  await page.goto('/contacto')
  await page.waitForLoadState('networkidle')
  const form = page.locator('form').first()
  await page.fill('#lead-name', 'Prueba Playwright')
  await page.fill('#lead-email', 'prueba@example.com')
  await page.fill('#lead-phone', '4420000000')
  await form.getByRole('button', { name: 'Sistema POS' }).click()

  await form.locator('button[type="submit"]').click()
  await expect(page.getByText('x', { exact: true })).toBeVisible()
  expect((await gtagEvents(page)).map((e) => e.name)).not.toContain('generate_lead')

  status = 200
  await form.locator('button[type="submit"]').click()
  await expect(page.getByText('Mensaje enviado')).toBeVisible()
  const lead = (await gtagEvents(page)).find((e) => e.name === 'generate_lead')
  expect(lead?.params).toMatchObject({ service: 'Sistema POS', source: 'contacto_form' })
})
