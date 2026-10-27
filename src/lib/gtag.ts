// ============================================================================
// GA4 + Google Ads + Meta Pixel — Revolution505
// IDs y labels de conversión: src/config/tracking.ts (leídos de .env).
//
// Eventos GA4:
//   generate_lead   → éxito del formulario (/api/lead.php)   params: service, source
//   whatsapp_click  → clic en cualquier a[href*="wa.me"]      params: location, link_text
//   phone_click     → clic en a[href^="tel:"]                 params: location, link_text
//   email_click     → clic en a[href^="mailto:"]              params: location, link_text
//
// Uso:
//   1. gtagPageView(pathname)     — en cada cambio de ruta (ya integrado en App.tsx)
//   2. initContactClickTracking() — una vez al montar la app (ya integrado en App.tsx)
//   3. trackLead(service, source) — al éxito del formulario
// ============================================================================

import { ADS_ID, GA4_ID, adsSendTo, type AdsConversion } from '../config/tracking'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void
  }
}

type EventParams = Record<string, string | number | undefined>

/**
 * Wrapper seguro alrededor de window.gtag.
 * Si el usuario tiene un adblocker o gtag aún no cargó, no lanza errores.
 */
function gtag(...args: unknown[]): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

/** Evento GA4 con parámetros. */
export function trackEvent(name: string, params: EventParams = {}): void {
  gtag('event', name, params)
}

/** Conversión de Google Ads; no hace nada si el label no está configurado en .env. */
function trackAdsConversion(conversion: AdsConversion, extra: EventParams = {}): void {
  const sendTo = adsSendTo(conversion)
  if (sendTo) gtag('event', 'conversion', { send_to: sendTo, ...extra })
}

/** Meta Pixel PageView en cada cambio de ruta SPA (además del PageView inicial en index.html). */
export function trackSpaPageView(): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView')
  }
}

/** Meta Pixel estándar (Contact, Lead). */
function trackMeta(event: 'Contact' | 'Lead', params: EventParams): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event, params)
  }
}

/**
 * Registra un page view en Google Ads y GA4.
 * Llamar desde App.tsx en cada cambio de `location.pathname`.
 */
export function gtagPageView(path: string): void {
  const pageParams = {
    page_path: path,
    page_title: document.title,
  }
  gtag('config', ADS_ID, pageParams)
  gtag('config', GA4_ID, pageParams)
}

/** Lead confirmado por el servidor (formulario de contacto). */
export function trackLead(service: string, source: string): void {
  trackEvent('generate_lead', { service, source })
  trackAdsConversion('lead')
  trackMeta('Lead', { content_name: service, content_category: source })
}

const CONTACT_LINKS: { selector: string; event: string; conversion: AdsConversion; meta: string }[] = [
  { selector: 'a[href*="wa.me"]', event: 'whatsapp_click', conversion: 'whatsapp', meta: 'whatsapp' },
  { selector: 'a[href^="tel:"]', event: 'phone_click', conversion: 'phone', meta: 'phone' },
  { selector: 'a[href^="mailto:"]', event: 'email_click', conversion: 'email', meta: 'email' },
]

let _contactTrackingInitialized = false

/**
 * Listener global (una sola vez) para clics en WhatsApp, teléfono y correo.
 * - No hace preventDefault: el enlace abre normalmente.
 * - GA4: whatsapp_click / phone_click / email_click con `location` (id de la sección más cercana).
 * - Google Ads: conversión correspondiente solo si su label existe en .env.
 * - Meta Pixel: Contact.
 */
export function initContactClickTracking(): void {
  if (_contactTrackingInitialized || typeof document === 'undefined') return
  _contactTrackingInitialized = true

  document.addEventListener(
    'click',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      for (const link of CONTACT_LINKS) {
        const anchor = target?.closest<HTMLAnchorElement>(link.selector)
        if (!anchor) continue

        trackEvent(link.event, {
          location: anchor.closest('[id]')?.id ?? 'unknown',
          link_text: anchor.textContent?.trim().slice(0, 40) || undefined,
        })
        trackAdsConversion(link.conversion)
        trackMeta('Contact', { content_name: link.meta, content_category: 'lead' })
        return
      }
    },
    { passive: true },
  )
}
