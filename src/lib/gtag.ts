// ─────────────────────────────────────────────────────────────────────────────
// Google Ads / gtag — Revolution505
// ID de la cuenta: AW-18211203518
//
// Uso:
//   1. gtagPageView(pathname) — llamar en cada cambio de ruta (ya integrado en App.tsx)
//   2. gtagWhatsAppClick()    — llamar cuando el usuario hace clic en un botón WA
//   3. gtagEvent(action, …)   — eventos genéricos personalizados
// ─────────────────────────────────────────────────────────────────────────────

/** ID de Google Ads — cambiar aquí si se renueva la cuenta */
export const GTAG_ID = 'AW-18211203518'

// ─────────────────────────────────────────────────────────────────────────────
// Tipos globales — extiende Window para que TypeScript reconozca gtag/dataLayer
// ─────────────────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag:      (...args: any[]) => void
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

// ─────────────────────────────────────────────────────────────────────────────
// Page view — disparar en cada cambio de ruta de React Router
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Registra un page view en Google Ads.
 * Llamar desde App.tsx en cada cambio de `location.pathname`.
 *
 * @param path  Ruta actual, e.g. "/portafolio" o "/"
 */
export function gtagPageView(path: string): void {
  gtag('config', GTAG_ID, {
    page_path:  path,
    page_title: document.title,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Conversiones — definir cada acción en Google Ads y pegar el label aquí
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Conversión: clic en cualquier botón de WhatsApp.
 *
 * PASOS para activar:
 *   1. En Google Ads → Herramientas → Conversiones → Nueva conversión
 *   2. Tipo: "Sitio web" → Categoría: "Contacto"
 *   3. Nombre: "WhatsApp Click"
 *   4. Copiar el LABEL generado y pegarlo en el parámetro `conversionLabel`
 *
 * @param conversionLabel  Label de la conversión de Google Ads (formato: "XXXXXXXXX")
 */
export function gtagWhatsAppClick(conversionLabel = 'PENDIENTE_LABEL'): void {
  gtag('event', 'conversion', {
    send_to:        `${GTAG_ID}/${conversionLabel}`,
    event_category: 'Lead',
    event_label:    'whatsapp_click',
    value:          1,
    currency:       'MXN',
  })
}

/**
 * Conversión: envío del formulario de contacto.
 */
export function gtagContactFormSubmit(conversionLabel = 'PENDIENTE_LABEL'): void {
  gtag('event', 'conversion', {
    send_to:        `${GTAG_ID}/${conversionLabel}`,
    event_category: 'Lead',
    event_label:    'contact_form',
  })
}

/**
 * Evento genérico de Google Ads — para acciones personalizadas.
 *
 * @param action    Nombre del evento (e.g. "calculadora_uso", "portafolio_modal")
 * @param category  Categoría opcional (e.g. "engagement")
 * @param label     Etiqueta opcional (e.g. "plan_profesional")
 * @param value     Valor numérico opcional
 */
export function gtagEvent(
  action:   string,
  category?: string,
  label?:    string,
  value?:    number,
): void {
  gtag('event', action, {
    event_category: category,
    event_label:    label,
    value,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Auto-tracking de clics en WhatsApp — escucha global
// ─────────────────────────────────────────────────────────────────────────────

let _waTrackingInitialized = false

/**
 * Registra un listener global (una sola vez) que dispara gtagEvent()
 * cada vez que el usuario hace clic en cualquier enlace que contenga "wa.me".
 *
 * Llamar UNA VEZ desde App.tsx → useEffect([], []).
 * No requiere modificar cada botón de WhatsApp individualmente.
 */
export function initWhatsAppTracking(): void {
  if (_waTrackingInitialized || typeof document === 'undefined') return
  _waTrackingInitialized = true

  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement
    // Busca el elemento <a> más cercano al nodo clickeado
    const anchor = target.closest<HTMLAnchorElement>('a[href*="wa.me"]')
    if (!anchor) return

    // Extrae contexto del enlace para el label del evento
    const text    = anchor.textContent?.trim().slice(0, 40) ?? 'WhatsApp CTA'
    const section = anchor.closest('[id]')?.id ?? 'unknown'

    gtagEvent('whatsapp_click', 'Lead', `${section} — ${text}`)

    // Descomenta cuando tengas el label de conversión de Google Ads:
    // gtagWhatsAppClick('TU_CONVERSION_LABEL')
  }, { passive: true })
}
