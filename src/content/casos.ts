import type { Caso } from './types'

// Casos de estudio. SOLO hechos verificables (revisados el 27-oct-2026):
//   · qué hace el cliente → su propio sitio público
//   · qué construimos     → sitio en vivo (crédito "Revolution505" en el footer cuando existe) o repo propio
// Sin métricas, cifras de resultados ni testimonios mientras el cliente no los confirme por escrito.
// Clientes autorizados por Christian: AMQ, Flyzz, La Peña de Santiago, Ríos Fiscal, LQC y ATAK.GG.

export const CASOS: Caso[] = [
  {
    slug: 'amq-capacitaciones',
    client: 'AMQ — Automanufacturas de Querétaro',
    sector: 'Maquinado CNC de precisión para la industria automotriz',
    kind: 'cliente',
    category: 'sistemas',
    title: 'CapacitaAMQ: plataforma de capacitación para colaboradores',
    summary:
      'Sistema web que AMQ usa en su operación diaria para capacitar a su personal: cursos, quizzes con calificación automática y certificados.',
    context:
      'AMQ fabrica partes maquinadas de precisión para la industria automotriz desde 2006, con certificación ISO 9001:2015, y opera en el Parque Industrial Bernardo Quintana, en El Marqués, Querétaro. Las capacitaciones internas (normas NOM, calidad e inducción) necesitaban un solo lugar donde asignarse, seguirse y comprobarse.',
    built: [
      'Catálogo de cursos con lecciones y material en video, PDF y presentaciones.',
      'Quizzes con calificación automática y certificado al aprobar.',
      'Credenciales de empleado y acceso con usuario y contraseña (JWT + bcrypt).',
      'Panel de administración para cursos, material y colaboradores, con subida de archivos.',
      'Frontend estático en Hostinger y API propia desplegada en Coolify (self-hosted).',
    ],
    stack: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js / Express', 'MySQL', 'Coolify'],
    liveUrl: 'https://capacitaciones.amq.com.mx/',
    liveLabel: 'capacitaciones.amq.com.mx',
    image: '/assets/casos/amq-capacitaciones.jpg',
    year: '2026',
    facts: [
      { label: 'Tipo', value: 'Sistema interno' },
      { label: 'Uso', value: 'Diario' },
      { label: 'Ubicación', value: 'P. I. Bernardo Quintana' },
      { label: 'Backend', value: 'API propia' },
    ],
    waText: 'Hola, vi el caso CapacitaAMQ en revolution505.com y me interesa un sistema similar para mi empresa.',
    service: { href: '/sistemas', label: 'Sistemas a medida' },
  },
  {
    slug: 'flyzz',
    client: 'Flyzz',
    sector: 'Servicios con drones: delivery, agro y entretenimiento',
    kind: 'cliente',
    category: 'web',
    title: 'Sitio corporativo para una empresa de servicios con drones',
    summary:
      'Sitio multipágina que presenta las tres líneas de negocio de Flyzz y concentra contacto, noticias y alianzas.',
    context:
      'Flyzz ofrece logística de última milla con drones autónomos (Flyzz Delivery), monitoreo y fumigación de precisión para cultivos (AgroFlyzz) y shows de drones y coberturas aéreas (Flyzz Entertainment). Necesitaba un sitio que explicara cada línea por separado y se viera a la altura de una empresa tecnológica.',
    built: [
      'Inicio con propuesta de valor, "cómo funciona" y las tres líneas de servicio.',
      'Página de servicios con sección propia para Delivery, Agro y Entertainment.',
      'Páginas de nosotros, organización, alianzas, noticias, galería y preguntas frecuentes.',
      'Contacto y páginas legales: aviso legal, privacidad, cookies y términos.',
      'Sitio generado como estático: carga rápida y hosting sencillo.',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Exportación estática'],
    liveUrl: 'https://flyzz.com.mx/',
    liveLabel: 'flyzz.com.mx',
    image: '/assets/casos/flyzz.jpg',
    facts: [
      { label: 'Tipo', value: 'Sitio corporativo' },
      { label: 'Líneas', value: '3 servicios' },
      { label: 'Framework', value: 'Next.js' },
      { label: 'Estado', value: 'En línea' },
    ],
    waText: 'Hola, vi el sitio de Flyzz en el portafolio de Revolution505 y quiero un sitio corporativo así.',
    service: { href: '/desarrollo-web-queretaro', label: 'Desarrollo web en Querétaro' },
  },
  {
    slug: 'la-pena-de-santiago',
    client: 'La Peña de Santiago',
    sector: 'Restaurante de cocina queretana en el Centro Histórico',
    kind: 'cliente',
    category: 'web',
    title: 'Sitio para restaurante con menú, reservaciones y facturación',
    summary:
      'Sitio para un restaurante queretano con dos sucursales: menú por secciones, reservaciones, eventos y solicitud de factura.',
    context:
      'La Peña de Santiago es un restaurante de cocina queretana tradicional con dos sucursales en el Centro Histórico de Querétaro (Guerrero y Madero): desayunos, comida a la carta, buffet y eventos. Sus clientes preguntaban lo mismo todos los días: menú, horarios, cómo reservar y cómo facturar.',
    built: [
      'Menú por secciones (incluido el buffet) y platillos destacados.',
      'Reservaciones, eventos especiales y datos de cada sucursal con enlace a Maps.',
      'Página de facturación para solicitar CFDI.',
      'Asistente virtual (chatbot) y botón de WhatsApp para dudas rápidas.',
      'Galería y páginas legales: términos, privacidad, aviso legal y cookies.',
    ],
    stack: ['React', 'Vite', 'TypeScript'],
    liveUrl: 'https://xn--lapeadesantiago-1qb.com/',
    liveLabel: 'lapeñadesantiago.com',
    image: '/assets/casos/la-pena-de-santiago.jpg',
    facts: [
      { label: 'Tipo', value: 'Sitio de restaurante' },
      { label: 'Sucursales', value: '2' },
      { label: 'Extras', value: 'Facturación + chatbot' },
      { label: 'Zona', value: 'Centro Histórico QRO' },
    ],
    waText: 'Hola, vi el sitio de La Peña de Santiago en el portafolio de Revolution505 y quiero algo así para mi restaurante.',
    service: { href: '/desarrollo-web-queretaro', label: 'Desarrollo web en Querétaro' },
  },
  {
    slug: 'corporativo-rios',
    client: 'Corporativo Ríos (Ríos Fiscal)',
    sector: 'Despacho de contadores públicos y abogados fiscalistas',
    kind: 'cliente',
    category: 'web',
    title: 'Sitio para despacho contable y fiscal en Querétaro',
    summary:
      'Sitio profesional para un despacho contable: servicios, perfil del titular, el despacho y contacto directo por WhatsApp.',
    context:
      'Corporativo Ríos (Ríos Zúñiga & Cía. S.C.) es un despacho de contadores públicos certificados y abogados fiscalistas en Querétaro que atiende a PYMES y empresas en defensa fiscal, auditoría, contabilidad y CFDI. Necesitaba un sitio que transmitiera confianza y llevara a los prospectos a pedir asesoría.',
    built: [
      'Páginas de servicios, "sobre mí", despacho, galería y contacto.',
      'Llamados a "Solicitar asesoría" y botón de WhatsApp en todo el sitio.',
      'Datos estructurados de despacho contable (schema Accountant) para búsquedas locales.',
      'Aviso de privacidad y aviso legal.',
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Schema.org'],
    liveUrl: 'https://riosfiscal.mx/',
    liveLabel: 'riosfiscal.mx',
    image: '/assets/casos/corporativo-rios.jpg',
    facts: [
      { label: 'Tipo', value: 'Sitio profesional' },
      { label: 'Sector', value: 'Contable / fiscal' },
      { label: 'Contacto', value: 'WhatsApp' },
      { label: 'SEO', value: 'Schema local' },
    ],
    waText: 'Hola, vi el sitio de Corporativo Ríos en el portafolio de Revolution505 y quiero un sitio así para mi despacho.',
    service: { href: '/desarrollo-web-queretaro', label: 'Desarrollo web en Querétaro' },
  },
  {
    slug: 'lqc',
    client: 'LQC — League Querétaro Championship',
    sector: 'Liga de esports de League of Legends (proyecto de Revolution505)',
    kind: 'propio',
    category: 'web',
    title: 'Sitio de liga de esports con clasificación en vivo',
    summary:
      'Sitio de la liga de esports de Revolution505: torneos, galería administrable, registro de equipos y tabla de posiciones en vivo.',
    context:
      'LQC es la liga competitiva de League of Legends que organiza Revolution505 en Querétaro. El sitio tenía que servir a jugadores, equipos y patrocinadores, y mostrar la clasificación del torneo en curso sin capturarla a mano.',
    built: [
      'Páginas de torneos, galería, acerca, contacto, reglamento y carta de jugador.',
      'Galería administrable: fotos y videos desde base de datos y almacenamiento (Supabase).',
      'Tabla de posiciones y emparejamientos en vivo leídos de la API pública de ATAK.GG.',
      'Registro de equipos con panel de administración (inscripciones abiertas o cerradas por bandera).',
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Supabase', 'Docker'],
    liveUrl: 'https://lqc.revolution505.com/',
    liveLabel: 'lqc.revolution505.com',
    image: '/assets/casos/lqc.jpg',
    year: '2026',
    facts: [
      { label: 'Tipo', value: 'Proyecto propio' },
      { label: 'Datos', value: 'En vivo (ATAK.GG)' },
      { label: 'Galería', value: 'Administrable' },
      { label: 'Base', value: 'Supabase' },
    ],
    waText: 'Hola, vi el sitio de LQC en el portafolio de Revolution505 y me interesa un sitio con datos en vivo.',
    service: { href: '/desarrollo-web-queretaro', label: 'Desarrollo web en Querétaro' },
  },
  {
    slug: 'atak-gg',
    client: 'ATAK.GG',
    sector: 'Plataforma de stats y torneos de League of Legends (producto de Revolution505)',
    kind: 'propio',
    category: 'sistemas',
    title: 'ATAK.GG: stats en tiempo real y torneos con la API de Riot',
    summary:
      'Producto propio: estadísticas de jugadores, meta, torneos con códigos oficiales de Riot y brackets automáticos, sin anuncios.',
    context:
      'La escena competitiva de League of Legends en LATAM organizaba torneos con herramientas genéricas. Construimos ATAK.GG como producto propio para tener stats y torneos en un solo lugar, en el navegador y sin anuncios.',
    built: [
      'Perfiles, historial de partidas y estadísticas con datos oficiales de la Riot API.',
      'Creación de torneos con códigos oficiales de Riot y brackets automáticos.',
      'Sección de meta, social, cuentas de usuario y dashboard.',
      'API propia en Node.js con MySQL, desplegada en Coolify (self-hosted).',
      'ATAK Companion para Windows: overlay en partida y coach de draft.',
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Node.js / Express', 'MySQL', 'Riot API', 'Electron', 'Coolify'],
    liveUrl: 'https://atakgg.revolution505.com/',
    liveLabel: 'atakgg.revolution505.com',
    image: '/assets/casos/atak-gg.jpg',
    facts: [
      { label: 'Tipo', value: 'Producto propio' },
      { label: 'Datos', value: 'Riot API oficial' },
      { label: 'Hosting', value: 'Coolify self-host' },
      { label: 'Extra', value: 'App de escritorio' },
    ],
    waText: 'Hola, vi ATAK.GG en el portafolio de Revolution505 y me interesa una plataforma web a medida.',
    service: { href: '/sistemas', label: 'Sistemas a medida' },
  },
]

export function getCaso(slug: string): Caso | undefined {
  return CASOS.find((c) => c.slug === slug)
}
