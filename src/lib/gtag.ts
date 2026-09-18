// ============================================================================
// Google Ads / gtag — Revolution505
// ID de la cuenta: AW-18211203518
//
// Uso:
//   1. gtagPageView(pathname) — llamar en cada cambio de ruta (ya integrado en App.tsx)
//   2. gtagWhatsAppClick()    — conversión Ads en clics WA (vía initWhatsAppTracking)
//   3. gtagCallClick()        — conversión Ads opcional en clics tel:
//   4. gtagEvent(action, …)   — eventos genéricos personalizados
//
// NOTA: /contacto envía lead vía POST /api/lead.php (self-hosted).
//       NO dispares lead_form_submit de Ads hasta tener label real (ticket aparte).
//       Los clics wa.me / tel: van por initWhatsAppTracking / initTelClickTracking.
// ============================================================================

/** ID de Google Ads — cambiar aquí si se renueva la cuenta */
export const GTAG_ID = 'AW-18211203518'

/**
 * Placeholder hasta crear la conversión en Google Ads → Herramientas → Conversiones.
 * Reemplaza SOLO el sufijo después de la barra (el label), no el ID AW-…
 * Ejemplo final: 'AW-18211203518/AbCdEfGhIjKlMnOp'
 */
export const WA_CONVERSION_SEND_TO =
  'AW-18211203518/REPLACE_ME_WHATSAPP_CONVERSION_LABEL' as const

/** Misma idea para clics en tel:+52… — opcional hasta que exista la conversión Call. */
export const CALL_CONVERSION_SEND_TO =
  'AW-18211203518/REPLACE_ME_CALL_CONVERSION_LABEL' as const

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

/** Meta Pixel PageView en cada cambio de ruta SPA (además del PageView inicial en index.html). */
export function trackSpaPageView(_path?: string): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView')
  }
}

/** Meta Pixel Contact — clics WhatsApp / teléfono. */
export function trackMetaContact(contentName: 'whatsapp' | 'phone'): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', {
      content_name: contentName,
      content_category: 'lead',
    })
  }
}

/**
 * Wrapper seguro alrededor de window.gtag.
 * Si el usuario tiene un adblocker o gtag aún no cargó, no lanza errores.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtag(...args: any[]): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

/**
 * Registra un page view en Google Ads.
 * Llamar desde App.tsx en cada cambio de `location.pathname`.
 */
export function gtagPageView(path: string): void {
  gtag('config', GTAG_ID, {
    page_path: path,
    page_title: document.title,
  })
}

/**
 * Conversión Google Ads: clic en WhatsApp.
 * send_to usa WA_CONVERSION_SEND_TO (placeholder hasta pegar el label real).
 */
export function gtagWhatsAppClick(
  sendTo: string = WA_CONVERSION_SEND_TO,
): void {
  gtag('event', 'conversion', {
    send_to: sendTo,
    event_category: 'Lead',
    event_label: 'whatsapp_click',
    value: 1,
    currency: 'MXN',
  })
}

/**
 * Conversión Google Ads opcional: clic en teléfono (tel:).
 * send_to usa CALL_CONVERSION_SEND_TO (placeholder).
 */
export function gtagCallClick(
  sendTo: string = CALL_CONVERSION_SEND_TO,
): void {
  gtag('event', 'conversion', {
    send_to: sendTo,
    event_category: 'Lead',
    event_label: 'phone_click',
    value: 1,
    currency: 'MXN',
  })
}

/**
 * Opcional: conversión Ads de formulario cuando exista label real.
 * /contacto ya dispara gtagEvent('lead_form_submit') al éxito del POST.
 */
export function gtagContactFormSubmit(conversionLabel = 'PENDIENTE_LABEL'): void {
  gtag('event', 'conversion', {
    send_to: `${GTAG_ID}/${conversionLabel}`,
    event_category: 'Lead',
    event_label: 'contact_form',
  })
}

/** Evento genérico de Google Ads — para acciones personalizadas. */
export function gtagEvent(
  action: string,
  category?: string,
  label?: string,
  value?: number,
): void {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

let _waTrackingInitialized = false
let _telTrackingInitialized = false

/**
 * Listener global (una sola vez) en clics a cualquier `a[href*="wa.me"]`.
 * - Mantiene el open natural de WhatsApp (no preventDefault).
 * - Dispara evento analytics `whatsapp_click`.
 * - Dispara conversión Ads con send_to WA_CONVERSION_SEND_TO
 *   (REPLACE_ME_WHATSAPP_CONVERSION_LABEL hasta crear la conversión en Ads).
 */
export function initWhatsAppTracking(): void {
  if (_waTrackingInitialized || typeof document === 'undefined') return
  _waTrackingInitialized = true

  document.addEventListener(
    'click',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest<HTMLAnchorElement>('a[href*="wa.me"]')
      if (!anchor) return

      const text = anchor.textContent?.trim().slice(0, 40) ?? 'WhatsApp CTA'
      const section = anchor.closest('[id]')?.id ?? 'unknown'

      // Evento de engagement (siempre)
      gtagEvent('whatsapp_click', 'Lead', `${section} — ${text}`)

      // Conversión Google Ads — REPLACE_ME_WHATSAPP_CONVERSION_LABEL en Ads
      // cuando tengas el label real: edita WA_CONVERSION_SEND_TO arriba.
      gtagWhatsAppClick(WA_CONVERSION_SEND_TO)

      // Meta Pixel Contact (brief PIXEL-brief-dev.md)
      trackMetaContact('whatsapp')
    },
    { passive: true },
  )
}

/**
 * Listener global (una sola vez) en clics a `a[href^="tel:"]`.
 * - Mantiene el marcado de llamada (no preventDefault).
 * - Dispara evento `phone_click` + conversión opcional CALL_CONVERSION_SEND_TO.
 */
export function initTelClickTracking(): void {
  if (_telTrackingInitialized || typeof document === 'undefined') return
  _telTrackingInitialized = true

  document.addEventListener(
    'click',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest<HTMLAnchorElement>('a[href^="tel:"]')
      if (!anchor) return

      const text = anchor.textContent?.trim().slice(0, 40) ?? 'Phone CTA'
      const section = anchor.closest('[id]')?.id ?? 'unknown'

      gtagEvent('phone_click', 'Lead', `${section} — ${text}`)

      // Opcional: REPLACE_ME_CALL_CONVERSION_LABEL cuando exista en Google Ads
      gtagCallClick(CALL_CONVERSION_SEND_TO)

      // Meta Pixel Contact en tel:
      trackMetaContact('phone')
    },
    { passive: true },
  )
}
