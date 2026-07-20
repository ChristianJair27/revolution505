const BASE = 'https://wa.me/524423723972?text='
const enc = encodeURIComponent

export const WA = {
  navbar:      BASE + enc('Hola, me interesa cotizar un proyecto web. ¿Están disponibles?'),
  hero:        BASE + enc('Hola Revolution505, vi su página y quiero saber más sobre sus servicios.'),
  planBasico:  BASE + enc('Hola, me interesa el Plan Esencial ($6,500). ¿Cuándo podemos hablar?'),
  planPro:     BASE + enc('Hola, me interesa el Plan Profesional ($12,500). ¿Están disponibles?'),
  planPremium: BASE + enc('Hola, me interesa el Plan Premium ($22,500). ¿Podemos agendar una llamada?'),
  sistPOS:     BASE + enc('Hola, me interesa el Sistema POS. ¿Tienen una demo disponible?'),
  sistCRM:     BASE + enc('Hola, me interesa el CRM Empresarial. ¿Podemos hablar?'),
  sistReservas:BASE + enc('Hola, me interesa el Sistema de Reservas. ¿Cuándo pueden atenderme?'),
  queretaro:   BASE + enc('Hola, soy de Querétaro y necesito una página web para mi negocio.'),
  nacional:    BASE + enc('Hola, me interesan sus servicios de desarrollo web. ¿Trabajan remoto?'),
  faq:         BASE + enc('Hola, tengo una pregunta sobre sus servicios. ¿Podemos hablar?'),
  footer:      BASE + enc('Hola Revolution505, vi su página y quiero hablar sobre mi proyecto digital.'),
  floating:    BASE + enc('Hola Revolution505, ¿están disponibles para una consulta rápida?'),
  llamada:     BASE + enc('Hola, quiero agendar una llamada gratuita para hablar de mi proyecto.'),
  calc:        BASE + enc('Hola, usé su calculadora y quiero cotizar: '),
  config:      BASE + enc('Hola, completé el configurador y quiero avanzar con mi propuesta.'),
  simulador:   BASE + enc('Hola, usé el simulador y quiero esos resultados para mi negocio.'),
} as const
