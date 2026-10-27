import { test, expect } from '@playwright/test'

// PR de performance: lo que mantiene rápido el primer pintado y bajo el peso del home.

const KEY_ROUTES = ['/', '/precios', '/sistemas', '/proceso', '/contacto', '/portafolio', '/desarrollo-web-queretaro', '/portafolio/flyzz']

test('HTML prerenderizado: navbar y H1 visibles sin esperar JS, sin loading screen', async ({ request }) => {
  for (const path of KEY_ROUTES) {
    const html = await (await request.get(path)).text()
    const h1 = html.match(/<h1[^>]*>/)?.[0] ?? ''
    expect(h1, path).not.toContain('opacity:0')
    const nav = html.match(/<nav[^>]*>[\s\S]*?<a /)?.[0] ?? ''
    expect(nav, path).not.toContain('opacity:0')
    expect(html, path).not.toContain('z-[9999]')
  }
})

test('head: GSAP sin precarga, fuentes críticas precargadas, tracking sin <script src> bloqueante', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).not.toMatch(/modulepreload[^>]*vendor-gsap/)
  expect(html).not.toContain('stream.mux.com')
  expect(html.match(/<link rel="preload" href="\/assets\/[^"]+\.woff2" as="font"/g)).toHaveLength(2)
  expect(html).not.toMatch(/<script[^>]+src="https:\/\/(www\.googletagmanager\.com|connect\.facebook\.net)/)
  // Las colas siguen desde el inicio: page views y eventos no se pierden.
  expect(html).toContain("fbq('track', 'PageView')")
  expect(html).toContain('window.dataLayer = window.dataLayer || []')
})

test('tracking: GA4 y Meta Pixel se cargan después del evento load', async ({ page }) => {
  const thirdParty: string[] = []
  await page.route(/googletagmanager|facebook|stream\.mux\.com/, (r) => {
    thirdParty.push(r.request().url())
    return r.abort()
  })
  await page.goto('/desarrollo-web-queretaro')
  await page.waitForLoadState('load')
  await expect.poll(() => thirdParty.some((u) => u.includes('gtag/js'))).toBe(true)
  await expect.poll(() => thirdParty.some((u) => u.includes('fbevents.js'))).toBe(true)
  expect(await page.evaluate(() => Array.isArray(window.dataLayer) && typeof window.fbq === 'function')).toBe(true)
})

test('home: sin imágenes pesadas ni video en móvil', async ({ page, isMobile }) => {
  const heavy: string[] = []
  const requested: string[] = []
  page.on('response', async (res) => {
    const url = res.url()
    requested.push(url)
    if (res.request().resourceType() === 'image') {
      const len = Number(res.headers()['content-length'] ?? (await res.body().catch(() => Buffer.alloc(0))).length)
      if (len > 200 * 1024) heavy.push(`${url} ${Math.round(len / 1024)} KB`)
    }
  })
  await page.route(/googletagmanager|facebook|stream\.mux\.com/, (r) => r.abort())
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.mouse.wheel(0, 20000)
  await page.waitForTimeout(800)
  expect(heavy).toEqual([])
  if (isMobile) {
    expect(requested.filter((u) => /vendor-hls|stream\.mux\.com/.test(u))).toEqual([])
  }
})
