// ============================================================================
// IDs de medición — ÚNICO lugar donde se configuran.
// Se leen de variables VITE_* (archivo .env en la raíz del repo). Todos son valores
// públicos: terminan visibles en el HTML del sitio, no son secretos.
//
// Labels de conversión de Google Ads: vacíos = NO se envía esa conversión
// (antes se enviaban a "REPLACE_ME_*", lo que generaba conversiones basura).
// Para activarlos: Google Ads → Objetivos → Conversiones → (acción) → Configuración
// de etiqueta → copiar SOLO el label (lo que va después de "AW-18211203518/").
// ============================================================================

const env = import.meta.env

/** Measurement ID de GA4 (propiedad Revolution505). */
export const GA4_ID: string = env.VITE_GA4_ID || 'G-L7XMTQTF0S'

/** ID de cuenta de Google Ads. */
export const ADS_ID: string = env.VITE_ADS_ID || 'AW-18211203518'

/** Labels de conversión de Google Ads (solo el sufijo). */
export const ADS_LABELS = {
  lead: env.VITE_ADS_LABEL_LEAD || '',
  whatsapp: env.VITE_ADS_LABEL_WHATSAPP || '',
  phone: env.VITE_ADS_LABEL_PHONE || '',
  email: env.VITE_ADS_LABEL_EMAIL || '',
} as const

export type AdsConversion = keyof typeof ADS_LABELS

/** `AW-…/label` o `null` si el label no está configurado. */
export function adsSendTo(conversion: AdsConversion): string | null {
  const label = ADS_LABELS[conversion]
  return label ? `${ADS_ID}/${label}` : null
}
