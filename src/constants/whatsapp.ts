/** Base única para todos los CTA wa.me de Revolution505. */
export const WA_PHONE = '524423723972'
export const WA_PHONE_DISPLAY = '+52 442 372 3972'
export const WA_PHONE_E164 = '+524423723972'
export const CONTACT_EMAIL = 'contacto@revolution505.com'
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`

const BASE = `https://wa.me/${WA_PHONE}?text=`
const enc = encodeURIComponent

/** Construye wa.me con texto prellenado (única forma recomendada). */
export function waUrl(text: string): string {
  return BASE + enc(text)
}

/** Mensaje unificado tras captura de lead (formulario → WA). */
export function waFromLead(opts: {
  name?: string
  email?: string
  phone?: string
  business?: string
  need?: string
}): string {
  const lines = [
    '📩 *Contacto desde Revolution505.com*',
    '',
    `👤 *Nombre:* ${opts.name?.trim() || '(no especificado)'}`,
    `🏢 *Negocio:* ${opts.business?.trim() || '(no especificado)'}`,
    `✉️ *Email:* ${opts.email?.trim() || '(no especificado)'}`,
    `📱 *Tel:* ${opts.phone?.trim() || '(no especificado)'}`,
    `🎯 *Necesidad:* ${opts.need?.trim() || '(no especificado)'}`,
    '',
    'Me gustaría recibir más información y una cotización. ¿Podemos hablar?',
  ]
  return waUrl(lines.join('\n'))
}

export const WA = {
  navbar: waUrl('Hola, me interesa cotizar un proyecto web. ¿Están disponibles?'),
  hero: waUrl('Hola Revolution505, vi su página y quiero saber más sobre sus servicios.'),
  planBasico: waUrl(
    'Hola, vi sus planes en revolution505.com y me interesa el Plan Esencial ($6,500 MXN). ¿Cuándo podemos hablar?',
  ),
  planPro: waUrl(
    'Hola, vi sus planes en revolution505.com y me interesa el Plan Profesional ($12,500 MXN). ¿Están disponibles para comenzar?',
  ),
  planPremium: waUrl(
    'Hola, vi sus planes en revolution505.com y me interesa el Plan Premium ($22,500 MXN). ¿Podemos agendar una llamada?',
  ),
  sistPOS: waUrl(
    'Hola, vi sus servicios en revolution505.com y me interesa el Sistema POS ($18,000 MXN). ¿Tienen una demo disponible?',
  ),
  sistPOSRestaurante: waUrl(
    'Hola, me interesa el Sistema POS para Restaurante. ¿Pueden darme más información y una demo?',
  ),
  sistPOSGeneral: waUrl(
    'Hola, me interesa el Sistema POS General para mi negocio. ¿Tienen una demo disponible?',
  ),
  sistReservas: waUrl(
    'Hola, vi sus servicios en revolution505.com y me interesa el Sistema de Reservas ($16,000 MXN). ¿Podemos hablar?',
  ),
  sistReservasDemo: waUrl(
    'Hola, me interesa el Sistema de Reservas. ¿Pueden mostrarme cómo funciona?',
  ),
  sistCRM: waUrl(
    'Hola, vi sus servicios en revolution505.com y me interesa el CRM Empresarial ($22,000 MXN). ¿Podemos agendar una llamada?',
  ),
  sistCRMDemo: waUrl(
    'Hola, me interesa el CRM Empresarial. ¿Podemos agendar una llamada para verlo?',
  ),
  sistemasInfo: waUrl(
    'Hola, quiero saber más sobre sus sistemas propios. ¿Podemos agendar una llamada?',
  ),
  precios: waUrl(
    'Hola, vi los precios de Revolution505 y quiero una cotización personalizada. ¿Podemos hablar?',
  ),
  proyectoMedida: waUrl(
    'Hola, necesito un proyecto personalizado. ¿Pueden hacerme una cotización a medida?',
  ),
  queretaro: waUrl('Hola, soy de Querétaro y necesito una página web para mi negocio.'),
  nacional: waUrl('Hola, me interesan sus servicios de desarrollo web. ¿Trabajan remoto?'),
  faq: waUrl('Hola, tengo una pregunta sobre sus servicios. ¿Podemos hablar?'),
  footer: waUrl('Hola Revolution505, vi su página y quiero hablar sobre mi proyecto digital.'),
  floating: waUrl('Hola Revolution505, ¿están disponibles para una consulta rápida?'),
  llamada: waUrl('Hola, quiero agendar una llamada gratuita para hablar de mi proyecto.'),
  testimonios: waUrl(
    'Hola, vi los testimonios y quiero lograr resultados similares para mi negocio.',
  ),
  contacto: waUrl(
    'Hola Revolution505, completé el formulario de contacto y quiero hablar de mi proyecto.',
  ),
} as const
