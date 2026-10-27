import type { Landing } from './types'

// Landings de servicio. Español: con precios "desde" (planes publicados en /precios y /sistemas).
// Inglés: SIN precios, CTA "Request a quote" (decisión de Christian, 26-oct-2026).
// Pendientes a propósito: las 3 landings de parques industriales (faltan datos reales de
// cobertura en sitio y tiempos de respuesta). No inventar esos datos.

const QRO = ['Querétaro', 'El Marqués', 'Corregidora', 'México']

export const LANDINGS_ES: Landing[] = [
  {
    path: '/desarrollo-web-queretaro',
    lang: 'es',
    title: 'Desarrollo Web en Querétaro — Páginas y Sitios a Medida',
    description:
      'Páginas web y sitios a medida en Querétaro: rápidos, con SEO local, WhatsApp y formulario medido en Google Analytics. Desde $6,500 MXN. Cotiza sin compromiso.',
    name: 'Desarrollo web en Querétaro',
    eyebrow: 'Desarrollo web · Querétaro',
    h1: 'Desarrollo web en Querétaro para negocios que quieren clientes, no solo una página',
    intro: [
      'Diseñamos y programamos sitios web para negocios de Querétaro que necesitan aparecer en Google, explicar bien lo que venden y recibir mensajes de clientes reales. Somos un equipo local: puedes vernos en persona, hablar por WhatsApp y saber quién está detrás de tu sitio.',
      'No usamos plantillas genéricas que se ven igual que las de tu competencia. Cada sitio se construye con código propio, carga rápido en celular y queda listo para medir: sabrás cuántas personas te escribieron por WhatsApp, cuántas llenaron el formulario y desde qué página llegaron.',
    ],
    problemsTitle: 'Lo que vemos en la mayoría de los sitios de negocios locales',
    problems: [
      {
        title: 'Tardan en cargar en celular',
        text: 'La mayoría de tus visitas llegan desde el teléfono. Si la página tarda, se van antes de ver tu número o tu dirección.',
      },
      {
        title: 'Google no entiende de qué tratan',
        text: 'Sin títulos, descripciones ni datos estructurados por página, tu sitio no aparece cuando alguien busca tu servicio en Querétaro.',
      },
      {
        title: 'Nadie sabe si generan clientes',
        text: 'Sin eventos de Google Analytics no hay forma de saber qué funciona. Se invierte en anuncios a ciegas.',
      },
    ],
    servicesTitle: 'Qué incluye un sitio con Revolution505',
    services: [
      {
        title: 'Diseño a la medida de tu marca',
        text: 'Diseño propio, pensado primero para celular y adaptado a tu tipo de cliente. Nada de plantillas compradas.',
      },
      {
        title: 'SEO local desde el primer día',
        text: 'Title, descripción y URL limpia por página, datos estructurados (Schema.org), sitemap y robots listos para Search Console.',
      },
      {
        title: 'WhatsApp y formulario que sí llegan',
        text: 'Botones de WhatsApp con mensaje prellenado y formulario con protección anti-spam que llega a tu correo.',
      },
      {
        title: 'Medición con Google Analytics 4',
        text: 'Eventos de lead, clic a WhatsApp, llamada y correo configurados para que veas resultados reales.',
      },
      {
        title: 'Hosting, dominio y SSL resueltos',
        text: 'Te ayudamos con dominio, certificado de seguridad y publicación. El sitio queda a tu nombre.',
      },
      {
        title: 'Soporte después de publicar',
        text: 'Cambios, respaldos y actualizaciones con un plan mensual opcional, sin amarrarte a contratos largos.',
      },
    ],
    steps: [
      { title: 'Llamada o mensaje inicial', text: 'Nos cuentas tu negocio, tus clientes y qué quieres lograr. Sin costo.' },
      { title: 'Propuesta por escrito', text: 'Alcance, precio y plazo claros antes de empezar. Anticipo del 50 %.' },
      { title: 'Diseño y desarrollo', text: 'Ves avances en una versión de prueba y pides ajustes antes de publicar.' },
      { title: 'Publicación y medición', text: 'Publicamos, damos de alta el sitio en Google y te mostramos cómo leer tus resultados.' },
    ],
    prices: [
      { label: 'Plan Esencial', value: 'Desde $6,500 MXN', note: 'Landing de una página con WhatsApp, formulario y SEO básico.' },
      { label: 'Plan Profesional', value: 'Desde $12,500 MXN', note: 'Sitio de hasta 5 páginas para negocio establecido.' },
      { label: 'Plan Premium', value: 'Desde $22,500 MXN', note: 'Sitio amplio con blog, animaciones y más páginas.' },
    ],
    faqs: [
      {
        q: '¿Cuánto cuesta una página web en Querétaro?',
        a: 'Nuestros planes empiezan en $6,500 MXN para una landing de una página. Un sitio de hasta 5 páginas parte de $12,500 MXN. El precio final depende de cuántas páginas, funciones y textos necesites, y te lo damos por escrito antes de empezar.',
      },
      {
        q: '¿Cuánto tarda en estar listo mi sitio?',
        a: 'Depende del alcance y de qué tan rápido tengamos tus textos y fotos. El plazo se acuerda en la propuesta y te mostramos avances en una versión de prueba durante el desarrollo.',
      },
      {
        q: '¿El sitio y el dominio quedan a mi nombre?',
        a: 'Sí. El dominio se registra a tu nombre y el sitio es tuyo. Si algún día decides cambiar de proveedor, te entregamos los archivos.',
      },
      {
        q: '¿Puedo actualizar el contenido yo mismo?',
        a: 'Si necesitas editar seguido (blog, catálogo, promociones), lo planeamos desde el inicio con un panel o CMS. Si los cambios son ocasionales, el plan de mantenimiento los cubre.',
      },
      {
        q: '¿Trabajan solo con negocios de Querétaro?',
        a: 'Nuestra base está en Querétaro y atendemos a toda la zona metropolitana, pero también trabajamos de forma remota con clientes de otros estados de México y del extranjero.',
      },
    ],
    cases: ['corporativo-rios', 'la-pena-de-santiago', 'flyzz'],
    related: [
      { href: '/paginas-web-para-consultorios', label: 'Páginas web para consultorios' },
      { href: '/hosting-y-administracion-web', label: 'Hosting y administración web' },
      { href: '/sistemas-pos', label: 'Sistemas POS' },
      { href: '/precios', label: 'Precios y planes' },
      { href: '/portafolio', label: 'Portafolio' },
    ],
    waText: 'Hola, vi su página de desarrollo web en Querétaro y quiero cotizar un sitio para mi negocio.',
    alternate: '/en/web-development-nearshore-mexico',
    serviceType: 'Desarrollo web',
    areaServed: QRO,
  },
  {
    path: '/soporte-it-queretaro',
    lang: 'es',
    title: 'Soporte IT en Querétaro para PYMES y Oficinas',
    description:
      'Soporte IT en Querétaro para PYMES: correo empresarial, dominios, respaldos, equipos y redes de oficina, más sistemas y sitios web. Cotiza un plan a tu medida.',
    name: 'Soporte IT en Querétaro',
    eyebrow: 'Soporte IT · Querétaro',
    h1: 'Soporte IT en Querétaro para PYMES que no tienen (ni necesitan) un área de sistemas',
    intro: [
      'Muchas empresas en Querétaro dependen de que "el que sabe de computadoras" resuelva el correo, la impresora o el respaldo cuando algo falla. Funciona hasta que esa persona no está, o hasta que se pierde información importante.',
      'En Revolution505 combinamos desarrollo de software con soporte IT: nos encargamos de la parte técnica de tu oficina y de tus sistemas, para que tu equipo trabaje sin interrupciones y tú tengas un solo contacto para todo lo digital.',
    ],
    problemsTitle: 'Problemas típicos que resolvemos',
    problems: [
      {
        title: 'Correo y dominio sin control',
        text: 'Cuentas a nombre de exempleados, contraseñas compartidas o un dominio que nadie sabe dónde se renueva.',
      },
      {
        title: 'Sin respaldos confiables',
        text: 'La información vive en una sola computadora o en una memoria USB. Un fallo de disco y se pierde todo.',
      },
      {
        title: 'Equipos y red que fallan',
        text: 'Computadoras lentas, Wi-Fi que se cae y una red que creció sin planeación.',
      },
    ],
    servicesTitle: 'Qué cubre nuestro soporte IT',
    services: [
      {
        title: 'Correo empresarial y dominios',
        text: 'Configuración, migración y administración de cuentas de correo con tu dominio, y control de renovaciones.',
      },
      {
        title: 'Respaldos y recuperación',
        text: 'Respaldos automáticos de la información crítica de tu negocio y pruebas de restauración.',
      },
      {
        title: 'Equipos de cómputo',
        text: 'Diagnóstico, mantenimiento, actualización y armado de equipos según el trabajo de cada puesto.',
      },
      {
        title: 'Redes de oficina',
        text: 'Revisión y ordenamiento de red y Wi-Fi para que la conexión sea estable.',
      },
      {
        title: 'Servidores y aplicaciones',
        text: 'Administración de servidores y aplicaciones web propias en infraestructura self-hosted.',
      },
      {
        title: 'Sistemas a la medida',
        text: 'Cuando una hoja de cálculo ya no alcanza, desarrollamos el sistema que tu operación necesita.',
      },
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Revisamos correo, dominio, equipos, respaldos y accesos para saber de dónde partimos.' },
      { title: 'Plan y propuesta', text: 'Te proponemos prioridades y un esquema de soporte por escrito, con precio claro.' },
      { title: 'Ordenamos lo urgente', text: 'Primero respaldos y accesos; después lo que más frena a tu equipo.' },
      { title: 'Soporte continuo', text: 'Un solo contacto para dudas, fallas y mejoras.' },
    ],
    prices: [
      { label: 'Diagnóstico inicial', value: 'A cotizar', note: 'Depende del número de equipos y usuarios.' },
      { label: 'Soporte mensual', value: 'A cotizar', note: 'Plan según equipos, usuarios y servicios que administremos.' },
      { label: 'Sitio o sistema web', value: 'Desde $6,500 MXN', note: 'Si además necesitas presencia web o un sistema interno.' },
    ],
    faqs: [
      {
        q: '¿Dan soporte remoto o en sitio?',
        a: 'Resolvemos de forma remota todo lo que se puede (correo, dominio, servidores, aplicaciones). La atención en sitio dentro de Querétaro la acordamos y cotizamos según la ubicación y el tipo de servicio.',
      },
      {
        q: '¿Cuánto cuesta el soporte IT para una PYME?',
        a: 'Depende de cuántos equipos y usuarios tenga tu empresa y qué servicios necesites. Después del diagnóstico te damos una propuesta mensual por escrito, sin contratos forzosos de largo plazo.',
      },
      {
        q: '¿Pueden migrar nuestro correo a otro proveedor?',
        a: 'Sí. Planeamos la migración para no perder correos ni contactos y hacemos el cambio en el horario que menos afecte a tu operación.',
      },
      {
        q: '¿También hacen sistemas y páginas web?',
        a: 'Sí, es nuestra especialidad. Puedes tener soporte IT, sitio web y sistemas internos con el mismo equipo.',
      },
      {
        q: '¿Trabajan con empresas en parques industriales?',
        a: 'Sí. Un ejemplo es AMQ, en el Parque Industrial Bernardo Quintana, que usa a diario la plataforma de capacitación que desarrollamos.',
      },
    ],
    cases: ['amq-capacitaciones'],
    related: [
      { href: '/hosting-y-administracion-web', label: 'Hosting y administración web' },
      { href: '/sistemas', label: 'Sistemas a medida' },
      { href: '/desarrollo-web-queretaro', label: 'Desarrollo web en Querétaro' },
      { href: '/contacto', label: 'Contacto' },
    ],
    waText: 'Hola, vi su página de soporte IT en Querétaro y quiero cotizar soporte para mi empresa.',
    serviceType: 'Soporte técnico informático',
    areaServed: QRO,
  },
  {
    path: '/hosting-y-administracion-web',
    lang: 'es',
    title: 'Hosting y Administración Web — Mantenimiento de Sitios',
    description:
      'Hosting administrado y mantenimiento web: SSL, respaldos, actualizaciones de WordPress, monitoreo y cambios mensuales. Planes desde $800 MXN al mes.',
    name: 'Hosting y administración web',
    eyebrow: 'Hosting · Mantenimiento web',
    h1: 'Hosting y administración web: tu sitio en línea, seguro y actualizado sin que tengas que pensarlo',
    intro: [
      'Un sitio web no termina el día que se publica. Hay que renovar dominio y certificado, aplicar actualizaciones de seguridad, sacar respaldos y hacer cambios cuando cambian tus precios o servicios. Si nadie se encarga, el sitio se cae, se hackea o se queda viejo.',
      'Administramos sitios hechos por nosotros y por otros proveedores, incluidos sitios en WordPress. Tú nos escribes lo que necesitas cambiar y nosotros nos encargamos del resto.',
    ],
    problemsTitle: 'Señales de que tu sitio necesita administración',
    problems: [
      {
        title: 'Aviso de "sitio no seguro"',
        text: 'El certificado SSL venció o no se instaló bien, y el navegador espanta a tus visitas.',
      },
      {
        title: 'WordPress sin actualizar',
        text: 'Plugins y temas viejos son la puerta de entrada más común para malware y spam.',
      },
      {
        title: 'Nadie tiene los accesos',
        text: 'El proveedor anterior desapareció y no sabes dónde está tu hosting ni cómo editar el sitio.',
      },
    ],
    servicesTitle: 'Qué incluye la administración web',
    services: [
      { title: 'Hosting administrado', text: 'Publicación en hosting compartido o servidor propio, con SSL y correo configurados.' },
      { title: 'Respaldos semanales', text: 'Copias del sitio y la base de datos para restaurar rápido si algo sale mal.' },
      { title: 'Actualizaciones de seguridad', text: 'WordPress, plugins y temas al día, probados antes de aplicarlos.' },
      { title: 'Monitoreo', text: 'Revisamos que el sitio esté en línea y que el certificado y el dominio no venzan.' },
      { title: 'Horas de cambios', text: 'Textos, imágenes, precios o páginas nuevas con horas incluidas cada mes.' },
      { title: 'Reporte mensual', text: 'En el plan Pro: visitas, mensajes de WhatsApp y formularios del mes en Google Analytics.' },
    ],
    steps: [
      { title: 'Revisión del sitio', text: 'Revisamos hosting, dominio, versión de WordPress y accesos.' },
      { title: 'Recuperamos el control', text: 'Ordenamos accesos a tu nombre y sacamos un primer respaldo completo.' },
      { title: 'Corregimos lo urgente', text: 'SSL, actualizaciones críticas y limpieza si hubo malware.' },
      { title: 'Administración mensual', text: 'Respaldos, actualizaciones, monitoreo y cambios cada mes.' },
    ],
    prices: [
      { label: 'Mantenimiento Básico', value: 'Desde $800 MXN/mes', note: 'Hosting administrado, SSL, respaldos semanales, monitoreo y 1 h de cambios.' },
      { label: 'Mantenimiento Pro', value: 'Desde $1,500 MXN/mes', note: 'Lo anterior + 3 h de cambios, actualizaciones de WordPress y reporte mensual.' },
      { label: 'Migración de sitio', value: 'Desde $3,500 MXN', note: 'Cambio de hosting con respaldo, SSL y verificación.' },
    ],
    faqs: [
      {
        q: '¿Pueden administrar un sitio que no hicieron ustedes?',
        a: 'Sí. Primero revisamos cómo está hecho y en qué estado está. Si hay que corregir algo antes (por ejemplo, actualizaciones atrasadas o malware), te lo cotizamos por separado.',
      },
      {
        q: '¿El hosting está incluido en el precio?',
        a: 'La administración está incluida. El costo del hosting y del dominio depende del proveedor y del tamaño del sitio; lo pagas a costo, sin margen oculto.',
      },
      {
        q: '¿Qué pasa si mi WordPress ya fue hackeado?',
        a: 'Limpiamos el sitio, cerramos la vulnerabilidad, cambiamos accesos y dejamos respaldos y actualizaciones automáticas para que no vuelva a pasar.',
      },
      {
        q: '¿Hay plazo forzoso?',
        a: 'No manejamos contratos largos forzosos. El servicio es mensual y puedes cancelarlo con aviso previo.',
      },
      {
        q: '¿Pueden cambiar mi sitio a otro hosting?',
        a: 'Sí, hacemos migraciones completas: archivos, base de datos, correo si aplica, SSL y verificación final.',
      },
    ],
    related: [
      { href: '/desarrollo-web-queretaro', label: 'Desarrollo web en Querétaro' },
      { href: '/soporte-it-queretaro', label: 'Soporte IT en Querétaro' },
      { href: '/precios', label: 'Precios y planes' },
      { href: '/contacto', label: 'Contacto' },
    ],
    waText: 'Hola, vi su página de hosting y administración web y quiero que administren mi sitio.',
    alternate: '/en/wordpress-maintenance',
    serviceType: 'Hosting y mantenimiento web',
    areaServed: ['México'],
  },
  {
    path: '/paginas-web-para-consultorios',
    lang: 'es',
    title: 'Páginas Web para Consultorios, Médicos y Dentistas',
    description:
      'Páginas web para consultorios médicos, dentales y de psicología: citas por WhatsApp, cédula visible, aviso de privacidad y SEO local. Desde $6,500 MXN.',
    name: 'Páginas web para consultorios',
    eyebrow: 'Salud · Consultorios',
    h1: 'Páginas web para consultorios que generan confianza y llenan la agenda',
    intro: [
      'Antes de agendar, un paciente busca al especialista en Google, revisa su página y decide en segundos si le da confianza. Si no encuentra tu cédula, tus servicios o una forma fácil de pedir cita, agenda con alguien más.',
      'Hacemos páginas para médicos, dentistas, psicólogos, nutriólogos y fisioterapeutas: claras, rápidas en celular y pensadas para que el paciente te escriba por WhatsApp o llene un formulario de cita.',
    ],
    problemsTitle: 'Lo que hace que un paciente se vaya',
    problems: [
      {
        title: 'No sabe si eres de confianza',
        text: 'Sin cédula profesional, formación ni fotos reales del consultorio, el paciente duda.',
      },
      {
        title: 'Pedir cita es complicado',
        text: 'Un número que nadie contesta o un formulario que no funciona es un paciente perdido.',
      },
      {
        title: 'No apareces en tu zona',
        text: 'Si tu página no indica dónde atiendes, Google no te muestra a pacientes cercanos.',
      },
    ],
    servicesTitle: 'Qué incluye tu página de consultorio',
    services: [
      { title: 'Perfil profesional', text: 'Formación, cédula profesional visible y especialidades, como lo esperan tus pacientes.' },
      { title: 'Citas por WhatsApp', text: 'Botón con mensaje prellenado y formulario de cita que llega a tu correo.' },
      { title: 'Aviso de privacidad', text: 'Página de aviso de privacidad y consentimiento en el formulario, como pide la ley de protección de datos.' },
      { title: 'Ubicación y horarios', text: 'Mapa, horarios y datos de contacto claros, con datos estructurados para Google.' },
      { title: 'Servicios explicados', text: 'Cada tratamiento o servicio con su propia sección para resolver dudas antes de la cita.' },
      { title: 'Sistema de reservas opcional', text: 'Si quieres agenda en línea, la integramos con nuestro sistema de reservas.' },
    ],
    steps: [
      { title: 'Conocemos tu consultorio', text: 'Especialidad, servicios, tipo de paciente y cómo agendas hoy.' },
      { title: 'Propuesta por escrito', text: 'Alcance, precio y plazo claros. Anticipo del 50 %.' },
      { title: 'Diseño y textos', text: 'Te ayudamos a redactar servicios y preguntas frecuentes con lenguaje claro.' },
      { title: 'Publicación', text: 'Publicamos, damos de alta en Google y te enseñamos a ver cuántas citas llegan.' },
    ],
    prices: [
      { label: 'Página de consultorio', value: 'Desde $6,500 MXN', note: 'Una página con perfil, servicios, WhatsApp, formulario y aviso de privacidad.' },
      { label: 'Sitio para clínica', value: 'Desde $12,500 MXN', note: 'Hasta 5 páginas: varios especialistas o servicios.' },
      { label: 'Sistema de reservas', value: 'Desde $16,000 MXN', note: 'Agenda en línea con recordatorios.' },
    ],
    faqs: [
      {
        q: '¿Puedo mostrar mi cédula profesional en la página?',
        a: 'Sí, y lo recomendamos: es de lo primero que buscan los pacientes. La mostramos junto a tu formación y especialidad.',
      },
      {
        q: '¿Necesito aviso de privacidad?',
        a: 'Si recibes datos de pacientes por el formulario, sí. La Ley Federal de Protección de Datos Personales lo exige, y los datos de salud son sensibles. Incluimos la página y el consentimiento en el formulario; el texto final debe revisarlo tu asesor legal.',
      },
      {
        q: '¿Los pacientes pueden agendar en línea?',
        a: 'Con la página básica, la cita se pide por WhatsApp o formulario. Si quieres agenda en línea con horarios disponibles, se agrega nuestro sistema de reservas.',
      },
      {
        q: '¿Pueden publicar mis reseñas de Google?',
        a: 'Podemos enlazar tu perfil de Google para que los pacientes vean tus reseñas reales. No publicamos testimonios inventados.',
      },
      {
        q: '¿Sirve para clínicas con varios especialistas?',
        a: 'Sí. En ese caso conviene un sitio de varias páginas, con un perfil por especialista y una sección por servicio.',
      },
    ],
    related: [
      { href: '/desarrollo-web-queretaro', label: 'Desarrollo web en Querétaro' },
      { href: '/sistemas', label: 'Sistema de reservas' },
      { href: '/hosting-y-administracion-web', label: 'Hosting y administración web' },
      { href: '/precios', label: 'Precios y planes' },
    ],
    waText: 'Hola, vi su página para consultorios y quiero cotizar una página web para mi consultorio.',
    serviceType: 'Diseño de páginas web para consultorios',
    areaServed: QRO,
  },
  {
    path: '/sistemas-pos',
    lang: 'es',
    title: 'Sistema POS para Negocios — Punto de Venta a Medida',
    description:
      'Sistema POS a medida para tiendas y restaurantes: ventas, inventario, cortes de caja y reportes. Sin mensualidades: el código es tuyo. Desde $18,000 MXN.',
    name: 'Sistemas POS',
    eyebrow: 'Punto de venta · POS',
    h1: 'Sistema POS a la medida: vende, controla tu inventario y cierra caja sin hojas de cálculo',
    intro: [
      'Los puntos de venta genéricos cobran mensualidad por usuario, por sucursal o por función, y aun así obligan a tu negocio a trabajar como el software quiere. Cuando necesitas algo distinto, la respuesta es "no se puede".',
      'Desarrollamos sistemas POS a la medida de cómo vende tu negocio: tienda, restaurante o servicio. Pagas el desarrollo una vez, el sistema es tuyo y puede crecer contigo.',
    ],
    problemsTitle: 'Por qué los negocios cambian de punto de venta',
    problems: [
      {
        title: 'Mensualidades que no paran',
        text: 'Cada usuario, caja o sucursal nueva sube la renta del software.',
      },
      {
        title: 'Inventario que no cuadra',
        text: 'Sin entradas y salidas registradas, el stock del sistema no coincide con el anaquel.',
      },
      {
        title: 'Cortes de caja a mano',
        text: 'Cerrar el turno toma tiempo y las diferencias se descubren tarde.',
      },
    ],
    servicesTitle: 'Qué puede incluir tu sistema POS',
    services: [
      { title: 'Ventas y tickets', text: 'Cobro rápido, tickets impresos o digitales y varios métodos de pago.' },
      { title: 'Inventario en tiempo real', text: 'Entradas, salidas, alertas de stock mínimo y control por producto.' },
      { title: 'Cortes de caja', text: 'Cierre por turno y por cajero, con reporte de diferencias.' },
      { title: 'Reportes', text: 'Ventas diarias y mensuales, productos más vendidos y desempeño por sucursal.' },
      { title: 'Usuarios y permisos', text: 'Roles para cajero, gerente y administrador.' },
      { title: 'Módulos para restaurante', text: 'Mesas, comandas a cocina y meseros, si tu negocio lo necesita.' },
    ],
    steps: [
      { title: 'Entendemos tu operación', text: 'Cómo vendes, cobras, surtes y cierras caja hoy.' },
      { title: 'Propuesta por módulos', text: 'Qué incluye la primera versión, precio y plazo por escrito.' },
      { title: 'Desarrollo y pruebas', text: 'Probamos con tus productos y tu equipo antes de usarlo en caja.' },
      { title: 'Arranque y soporte', text: 'Capacitación a tu equipo y soporte en las primeras semanas.' },
    ],
    prices: [
      { label: 'Sistema POS', value: 'Desde $18,000 MXN', note: 'Ventas, inventario, cortes de caja y reportes.' },
      { label: 'POS para restaurante', value: 'A cotizar', note: 'Agrega mesas, comandas a cocina y meseros.' },
      { label: 'Módulos adicionales', value: 'A cotizar', note: 'Facturación, sucursales, integraciones.' },
    ],
    faqs: [
      {
        q: '¿El sistema POS tiene mensualidad?',
        a: 'No. Pagas el desarrollo una vez y el sistema es tuyo. Solo hay costos aparte si necesitas hosting en la nube o un plan de soporte.',
      },
      {
        q: '¿Funciona para restaurantes?',
        a: 'Sí. Además de caja e inventario, se pueden agregar mesas, comandas a cocina y módulo de meseros.',
      },
      {
        q: '¿Puedo ver una demo?',
        a: 'Sí. Escríbenos por WhatsApp y te mostramos cómo funciona antes de cotizar.',
      },
      {
        q: '¿Se puede usar en varias sucursales?',
        a: 'Sí. Se planea desde el inicio para consolidar ventas e inventario de todas las sucursales.',
      },
      {
        q: '¿Qué equipo necesito?',
        a: 'Funciona en computadoras y tabletas con navegador. Te recomendamos impresora de tickets y lector de código de barras según tu negocio.',
      },
    ],
    related: [
      { href: '/sistemas', label: 'Todos nuestros sistemas' },
      { href: '/soporte-it-queretaro', label: 'Soporte IT en Querétaro' },
      { href: '/desarrollo-web-queretaro', label: 'Desarrollo web en Querétaro' },
      { href: '/contacto', label: 'Contacto' },
    ],
    waText: 'Hola, vi su página de sistemas POS y quiero ver una demo y cotizar un punto de venta.',
    serviceType: 'Desarrollo de sistema punto de venta',
    areaServed: ['México'],
  },
]

const EN_AREA = ['United States', 'Canada', 'Mexico', 'Latin America']

export const LANDINGS_EN: Landing[] = [
  {
    path: '/en',
    lang: 'en',
    title: 'Revolution505 — Web Development Agency in Mexico',
    description:
      'Nearshore web development from Querétaro, Mexico: fast websites, WordPress maintenance and website migrations for US and Canadian businesses. Request a quote.',
    name: 'Revolution505 in English',
    eyebrow: 'Revolution505 · Querétaro, Mexico',
    h1: 'A nearshore web team in Mexico, working in your time zone',
    intro: [
      'Revolution505 is a web development agency based in Querétaro, Mexico. We build fast websites and web systems, maintain WordPress sites and migrate websites between hosts for businesses in the United States, Canada and Latin America.',
      'You work directly with the developers who build your project, in Central Time, with clear written scope before any work begins.',
    ],
    problemsTitle: 'Why businesses hire a nearshore team',
    problems: [
      { title: 'Same working hours', text: 'Central Time means real-time calls and same-day answers, not overnight hand-offs.' },
      { title: 'Direct communication', text: 'You talk to the people writing the code. No account-manager layers.' },
      { title: 'Clear scope', text: 'Written scope, timeline and milestones before we start.' },
    ],
    servicesTitle: 'What we do',
    services: [
      { title: 'Websites and landing pages', text: 'Custom, mobile-first sites with technical SEO and analytics built in.' },
      { title: 'WordPress maintenance', text: 'Updates, backups, monitoring and small changes every month.' },
      { title: 'Website migration', text: 'Move your site to a new host with backups, SSL and a verified cut-over.' },
      { title: 'Custom web systems', text: 'Internal tools, dashboards and platforms with your own code base.' },
    ],
    steps: [
      { title: 'Tell us about the project', text: 'Email or WhatsApp us with what you need.' },
      { title: 'Written quote', text: 'Scope, timeline and milestones in writing.' },
      { title: 'Build and review', text: 'You review progress on a staging link before launch.' },
      { title: 'Launch and support', text: 'We launch, hand over access and offer ongoing maintenance.' },
    ],
    faqs: [
      {
        q: 'Where are you located?',
        a: 'Our team is based in Querétaro, Mexico, in the Central Time zone, and works remotely with clients in the US, Canada and Latin America.',
      },
      {
        q: 'Do you work in English?',
        a: 'Yes. Calls, written scope, project updates and documentation can all be in English.',
      },
      {
        q: 'How do I get a price?',
        a: 'Send us a short description of the project. We reply with questions if needed and then a written quote with scope and timeline.',
      },
      {
        q: 'Who owns the code and the domain?',
        a: 'You do. The domain is registered in your name and you receive the code and all access at handover.',
      },
    ],
    cases: ['amq-capacitaciones', 'atak-gg', 'flyzz'],
    related: [
      { href: '/en/web-development-nearshore-mexico', label: 'Nearshore web development' },
      { href: '/en/wordpress-maintenance', label: 'WordPress maintenance' },
      { href: '/en/website-migration', label: 'Website migration' },
    ],
    waText: 'Hi Revolution505, I found your English page and I would like a quote for a web project.',
    alternate: '/',
    serviceType: 'Web development',
    areaServed: EN_AREA,
  },
  {
    path: '/en/web-development-nearshore-mexico',
    lang: 'en',
    title: 'Nearshore Web Development in Mexico',
    description:
      'Nearshore web development team in Querétaro, Mexico: custom websites, landing pages and web apps in Central Time, with written scope. Request a quote.',
    name: 'Nearshore web development',
    eyebrow: 'Nearshore · Web development',
    h1: 'Nearshore web development from Mexico for US and Canadian businesses',
    intro: [
      'We design and build websites, landing pages and web applications from Querétaro, Mexico. Our working hours overlap with yours, so feedback happens in the same day and calls fit your schedule.',
      'Every project ships with technical SEO, analytics events for leads and calls, and a performance budget for mobile. You get the source code and full access at handover.',
    ],
    problemsTitle: 'Common problems we fix',
    problems: [
      { title: 'Slow mobile sites', text: 'Heavy themes and page builders that load slowly on phones and hurt conversions.' },
      { title: 'No measurement', text: 'Forms and calls that are not tracked, so nobody knows which pages bring leads.' },
      { title: 'Offshore delays', text: 'Time-zone gaps that turn a small change into a three-day email thread.' },
    ],
    servicesTitle: 'What is included',
    services: [
      { title: 'Custom design', text: 'Mobile-first design built for your audience, not a resold template.' },
      { title: 'Modern stack', text: 'Astro, React or Next.js for speed; WordPress when your team needs to edit it.' },
      { title: 'Technical SEO', text: 'Unique titles and descriptions, structured data, sitemap and clean URLs.' },
      { title: 'Lead tracking', text: 'Google Analytics 4 events for forms, calls, email and chat clicks.' },
      { title: 'Forms that work', text: 'Spam-protected forms delivered to your inbox or CRM.' },
      { title: 'Handover', text: 'Code repository, credentials and a short guide for your team.' },
    ],
    steps: [
      { title: 'Discovery call', text: 'We learn your business, audience and goals.' },
      { title: 'Written quote', text: 'Scope, timeline and milestones before work begins.' },
      { title: 'Build on staging', text: 'You review real progress on a private staging link.' },
      { title: 'Launch', text: 'Launch, analytics check and handover of code and access.' },
    ],
    faqs: [
      {
        q: 'What is nearshore development?',
        a: 'Working with a team in a nearby country with overlapping hours. From Mexico we share Central Time with much of the US, which makes collaboration fast.',
      },
      {
        q: 'Which technologies do you use?',
        a: 'Astro, React, Next.js, Node.js and WordPress, with self-hosted or managed hosting depending on the project.',
      },
      {
        q: 'Can you work with our existing designer or agency?',
        a: 'Yes. We can build from your designs in Figma or work alongside your marketing team.',
      },
      {
        q: 'How do payments work?',
        a: 'Projects are split into milestones defined in the written quote.',
      },
      {
        q: 'Do you sign NDAs?',
        a: 'Yes, we are happy to sign an NDA before reviewing confidential details.',
      },
    ],
    cases: ['amq-capacitaciones', 'flyzz', 'atak-gg'],
    related: [
      { href: '/en/wordpress-maintenance', label: 'WordPress maintenance' },
      { href: '/en/website-migration', label: 'Website migration' },
      { href: '/en', label: 'Revolution505 in English' },
    ],
    waText: 'Hi Revolution505, I would like a quote for nearshore web development.',
    alternate: '/desarrollo-web-queretaro',
    serviceType: 'Web development',
    areaServed: EN_AREA,
  },
  {
    path: '/en/wordpress-maintenance',
    lang: 'en',
    title: 'WordPress Maintenance and Support Plans',
    description:
      'Monthly WordPress maintenance from a nearshore team in Mexico: updates, backups, uptime monitoring, security fixes and small changes. Request a quote.',
    name: 'WordPress maintenance',
    eyebrow: 'WordPress · Maintenance',
    h1: 'WordPress maintenance that keeps your site fast, secure and up to date',
    intro: [
      'Outdated plugins are one of the most common ways WordPress sites get hacked, and broken updates are the most common way they go down. Most business owners do not have time to watch either.',
      'We take care of updates, backups, monitoring and small content changes every month, so your site keeps working and your team can focus on the business.',
    ],
    problemsTitle: 'Signs your WordPress site needs maintenance',
    problems: [
      { title: 'Pending updates', text: 'Dozens of plugin and theme updates nobody dares to click.' },
      { title: 'No recent backup', text: 'If the site broke today, there is no clean copy to restore.' },
      { title: 'Slow or hacked', text: 'Spam pages, redirects or a site that keeps getting slower.' },
    ],
    servicesTitle: 'What a maintenance plan covers',
    services: [
      { title: 'Core, theme and plugin updates', text: 'Applied and checked, with a backup taken first.' },
      { title: 'Off-site backups', text: 'Regular backups of files and database, stored outside your host.' },
      { title: 'Uptime and SSL monitoring', text: 'We watch availability, SSL certificate and domain renewal dates.' },
      { title: 'Security fixes', text: 'Malware cleanup and hardening if something goes wrong.' },
      { title: 'Content changes', text: 'Small text, image and page edits included each month.' },
      { title: 'Monthly summary', text: 'What was updated and what we found, in plain English.' },
    ],
    steps: [
      { title: 'Site audit', text: 'We review hosting, WordPress version, plugins and access.' },
      { title: 'Baseline backup', text: 'A full backup before we touch anything.' },
      { title: 'Fix the urgent', text: 'Critical updates, SSL and any security issues.' },
      { title: 'Monthly care', text: 'Updates, backups, monitoring and changes every month.' },
    ],
    faqs: [
      {
        q: 'Can you maintain a site another agency built?',
        a: 'Yes. We start with an audit so we know what we are working with before taking it over.',
      },
      {
        q: 'Do you include hosting?',
        a: 'We can manage your current host or move you to a new one. Hosting fees depend on the provider and are billed at cost.',
      },
      {
        q: 'What if my site is already hacked?',
        a: 'We clean it, close the vulnerability, rotate credentials and set up backups and updates so it does not happen again.',
      },
      {
        q: 'Is there a long-term contract?',
        a: 'No. Plans are month to month.',
      },
    ],
    related: [
      { href: '/en/website-migration', label: 'Website migration' },
      { href: '/en/web-development-nearshore-mexico', label: 'Nearshore web development' },
      { href: '/en', label: 'Revolution505 in English' },
    ],
    waText: 'Hi Revolution505, I would like a quote for WordPress maintenance.',
    alternate: '/hosting-y-administracion-web',
    serviceType: 'WordPress maintenance',
    areaServed: EN_AREA,
  },
  {
    path: '/en/website-migration',
    lang: 'en',
    title: 'Website Migration Service — Move Hosts Safely',
    description:
      'Move your website or WordPress site to a new host without losing data: full backup, migration, SSL, DNS cut-over and verification. Request a quote.',
    name: 'Website migration',
    eyebrow: 'Migration · Hosting',
    h1: 'Website migration without broken links, lost email or downtime surprises',
    intro: [
      'Moving a website looks simple until links break, forms stop sending, email goes missing or Google sees a different site. A migration needs a checklist and someone who verifies every step.',
      'We migrate WordPress and static sites between hosts with a full backup first, a tested copy on the new server and a planned DNS cut-over.',
    ],
    problemsTitle: 'What usually goes wrong in a migration',
    problems: [
      { title: 'Broken URLs', text: 'Changed paths and missing redirects that lose search rankings.' },
      { title: 'Email interruptions', text: 'MX records changed without planning, so messages bounce.' },
      { title: 'Mixed content and SSL errors', text: 'Old http links and certificates that are not set up on the new host.' },
    ],
    servicesTitle: 'Our migration checklist',
    services: [
      { title: 'Full backup', text: 'Files and database saved before anything changes.' },
      { title: 'Migration and search-replace', text: 'Site copied to the new host with URLs updated safely.' },
      { title: 'SSL and redirects', text: 'Certificate installed and redirects in place for any changed URL.' },
      { title: 'DNS cut-over', text: 'Planned DNS change with low TTL, coordinated with your email.' },
      { title: 'Verification', text: 'Pages, forms, analytics and email checked after the switch.' },
      { title: 'Rollback plan', text: 'The old site stays available until the new one is verified.' },
    ],
    steps: [
      { title: 'Review', text: 'Current host, site size, email setup and access.' },
      { title: 'Staging copy', text: 'Site running on the new host before DNS changes.' },
      { title: 'Cut-over', text: 'DNS switch at a low-traffic time.' },
      { title: 'Verify', text: 'Full check of pages, forms, SSL and email.' },
    ],
    faqs: [
      {
        q: 'Will my site go down during the migration?',
        a: 'The new site is tested before DNS changes, so visitors move from the old copy to the new one with minimal interruption.',
      },
      {
        q: 'Can you migrate my email too?',
        a: 'Yes, if your email is hosted with the website. We plan it separately so no messages are lost.',
      },
      {
        q: 'Will I lose my Google rankings?',
        a: 'Keeping the same URLs, or redirecting the ones that change, protects your rankings. That is part of the checklist.',
      },
      {
        q: 'Do you migrate sites that are not WordPress?',
        a: 'Yes. Static sites, React or Vite builds and most PHP sites can be migrated.',
      },
    ],
    related: [
      { href: '/en/wordpress-maintenance', label: 'WordPress maintenance' },
      { href: '/en/web-development-nearshore-mexico', label: 'Nearshore web development' },
      { href: '/en', label: 'Revolution505 in English' },
    ],
    waText: 'Hi Revolution505, I would like a quote to migrate my website.',
    serviceType: 'Website migration',
    areaServed: EN_AREA,
  },
]

export const LANDINGS: Landing[] = [...LANDINGS_ES, ...LANDINGS_EN]

export function getLanding(path: string): Landing | undefined {
  return LANDINGS.find((l) => l.path === path)
}
