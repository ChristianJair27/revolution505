import { waUrl } from '../../constants/whatsapp'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight, ArrowRight, X, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageMeta } from '../../hooks/usePageMeta'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────
type Category   = 'web' | 'ecommerce' | 'sistemas' | 'seo'
type FilterType = 'all' | Category

interface Metric  { label: string; value: string; icon: string }
interface Project {
  id:          string
  title:       string
  subtitle:    string
  category:    Category
  tags:        string[]
  image:       string
  year:        string
  delivery:    string
  industry:    string
  description: string
  challenge:   string
  solution:    string
  metrics:     Metric[]
  wa:          string
  featured?:   boolean
}

const PROJECTS: Project[] = [
  {
    id: 'amq', title: 'AMQ Group', subtitle: 'Corporativo + CRM', category: 'web',
    tags: ['React', 'TypeScript', 'CRM', 'SEO Local'], image: '/assets/amq-pag.png',
    year: '2024', delivery: '18 días', industry: 'Construcción / Corporativo', featured: true,
    description: 'Sitio corporativo multi-página con CRM integrado para gestión de leads, pipeline de proyectos y dashboard ejecutivo en tiempo real.',
    challenge: 'AMQ operaba con Excel y WhatsApp sin sistema centralizado, perdiendo el 40% de sus leads por falta de seguimiento oportuno.',
    solution: 'Desarrollamos un sitio de 6 páginas + CRM personalizado con pipeline Kanban, notificaciones automáticas por WhatsApp y reportes mensuales.',
    metrics: [
      { icon: '📈', label: 'Leads orgánicos',    value: '+340%' },
      { icon: '🔍', label: 'Posición Google',    value: 'Top 3' },
      { icon: '💰', label: 'Proyectos cotizados',value: '+55%'  },
      { icon: '⏱',  label: 'Tiempo de entrega', value: '18 d'  },
    ],
    wa: waUrl('Hola, vi el proyecto AMQ Group en el portafolio de Revolution505 y me interesa algo similar. ¿Podemos hablar?'),
  },
  {
    id: 'flyzz', title: 'FlyZZ Services', subtitle: 'Sistema POS + Web Corporativa', category: 'sistemas',
    tags: ['POS', 'Dashboard', 'Inventario', 'React', 'Node.js'], image: '/assets/flyzz-pag.png',
    year: '2024', delivery: '22 días', industry: 'Servicios / Comercio',
    description: 'Sistema POS completo con inventario en tiempo real, facturación digital, reportes por turno y panel admin web con estadísticas de ventas.',
    challenge: 'FlyZZ usaba caja registradora manual sin reportes. El dueño no sabía qué vendía más ni cuánto ganaba al mes, con diferencias de caja recurrentes.',
    solution: 'POS táctil con impresión de tickets, módulo de inventario con alertas de stock mínimo, cierre de caja automático y dashboard web con acceso remoto.',
    metrics: [
      { icon: '⚡', label: 'Eficiencia operativa', value: '+200%' },
      { icon: '📊', label: 'Errores en cobros',    value: '-95%'  },
      { icon: '🕐', label: 'Tiempo cierre caja',   value: '-80%'  },
      { icon: '📦', label: 'Diferencias inventario',value: '$0'   },
    ],
    wa: waUrl('Hola, vi el proyecto FlyZZ en el portafolio de Revolution505 y me interesa un sistema POS. ¿Podemos hablar?'),
  },
  {
    id: 'spartan', title: 'Spartan TV', subtitle: 'Plataforma Streaming IPTV', category: 'sistemas',
    tags: ['HLS.js', 'IPTV', 'Suscripciones', 'Panel Admin'], image: '/assets/spartan-pag.png',
    year: '2024', delivery: '30 días', industry: 'Entretenimiento / IPTV', featured: true,
    description: 'Plataforma de streaming con 500+ canales en vivo, VOD y series. Panel de administración para gestión de suscripciones, activaciones y facturación automática.',
    challenge: 'El cliente distribuía IPTV por Telegram sin control de pagos ni usuarios activos, con acceso no controlado y pérdidas por cuentas compartidas.',
    solution: 'Plataforma web con autenticación, gestión de suscripciones mensuales/anuales, player HLS integrado, panel admin y notificaciones de renovación por WhatsApp.',
    metrics: [
      { icon: '👥', label: 'Suscriptores activos', value: '500+'  },
      { icon: '📺', label: 'Canales disponibles',  value: '500+'  },
      { icon: '💳', label: 'Cobros automatizados', value: '100%'  },
      { icon: '📉', label: 'Cancelaciones/mes',    value: '-60%'  },
    ],
    wa: waUrl('Hola, vi Spartan TV en el portafolio de Revolution505 y me interesa una plataforma de streaming. ¿Podemos hablar?'),
  },
  {
    id: 'pena', title: 'Peña Abogados', subtitle: 'Despacho Legal + SEO Local', category: 'seo',
    tags: ['SEO Local', 'Blog Legal', 'Schema Markup', 'WordPress'], image: '/assets/pena-pag.png',
    year: '2024', delivery: '10 días', industry: 'Legal / Despacho',
    description: 'Sitio para despacho de abogados en Querétaro con blog legal, SEO local agresivo, schema markup para abogados y formulario de consultas con WhatsApp.',
    challenge: 'Peña Abogados no aparecía en Google. Sus competidores dominaban "abogado Querétaro" y el despacho dependía 100% de referidos.',
    solution: 'Sitio optimizado con 15 artículos de blog legal, ficha de Google Business, schema markup de organización legal y link building local.',
    metrics: [
      { icon: '🔍', label: 'Posición Google QRO', value: 'Top 3'  },
      { icon: '📞', label: 'Consultas mensuales',  value: '+80%'   },
      { icon: '🌐', label: 'Tráfico orgánico',     value: '+220%'  },
      { icon: '⭐', label: 'Calificación Google',  value: '4.9★'   },
    ],
    wa: waUrl('Hola, vi el proyecto Peña Abogados en el portafolio y me interesa SEO para mi negocio. ¿Podemos hablar?'),
  },
  {
    id: 'devilish', title: 'Devilish Store', subtitle: 'Tienda E-commerce Premium', category: 'ecommerce',
    tags: ['E-commerce', 'Stripe', 'Inventario', 'React', 'Node.js'], image: '/assets/devilish-pag.png',
    year: '2023', delivery: '15 días', industry: 'Moda / Streetwear', featured: true,
    description: 'Tienda en línea premium con catálogo de 200+ productos, carrito, Stripe Checkout, gestión de pedidos, inventario en tiempo real y panel admin.',
    challenge: 'Devilish vendía solo por Instagram DM con pagos por transferencia. Sin historial de ventas, sin automatización y con pérdidas por pedidos no cobrados.',
    solution: 'Tienda React + API REST propia con pasarela Stripe, manejo de tallas/colores, sistema de cupones, tracking de envíos y panel de pedidos para el equipo.',
    metrics: [
      { icon: '💰', label: 'Ventas primer año',     value: '$180K+' },
      { icon: '🛒', label: 'Tasa de conversión',    value: '4.8%'   },
      { icon: '📦', label: 'Pedidos automatizados', value: '100%'   },
      { icon: '⭐', label: 'Satisfacción cliente',  value: '4.9★'   },
    ],
    wa: waUrl('Hola, vi Devilish Store en el portafolio de Revolution505 y me interesa una tienda en línea. ¿Podemos hablar?'),
  },
  {
    id: 'atakgg', title: 'AtakGG', subtitle: 'Gaming Center POS', category: 'sistemas',
    tags: ['POS Gaming', 'Timer', 'Dashboard', 'Multi-consola'], image: '/assets/atakgg.png',
    year: '2024', delivery: '25 días', industry: 'Entretenimiento / Gaming',
    description: 'Sistema POS especializado para gaming center: control de tiempo por consola, reservas de torneos, cobro por hora y dashboard de ocupación en tiempo real.',
    challenge: 'AtakGG cobraba manualmente el tiempo de juego con timer de celular. Pérdidas diarias por tiempo no cobrado y cuentas que no cuadraban al final del día.',
    solution: 'Sistema con 24 estaciones controlables, auto-cobro por tiempo, reservas online para torneos, estadísticas de consola más rentable y cierre de caja automático.',
    metrics: [
      { icon: '🎮', label: 'Consolas controladas',  value: '24'     },
      { icon: '💸', label: 'Pérdidas por errores',  value: '$0'     },
      { icon: '⚡', label: 'Tiempo de check-in',    value: '30 seg' },
      { icon: '📊', label: 'Ingresos trackeados',   value: '100%'   },
    ],
    wa: waUrl('Hola, vi AtakGG en el portafolio de Revolution505 y me interesa algo similar. ¿Podemos hablar?'),
  },
  {
    id: 'nexus-dental', title: 'Nexus Dental', subtitle: 'Clínica + Reservas Online', category: 'web',
    tags: ['Sistema Reservas', 'WhatsApp API', 'SEO Salud', 'React'], image: '/assets/restaurante-dashboard.png',
    year: '2024', delivery: '12 días', industry: 'Salud / Odontología',
    description: 'Sitio web para clínica dental con sistema de citas online, confirmaciones automáticas por WhatsApp, galería de casos clínicos y blog de salud bucal.',
    challenge: 'La clínica recibía citas solo por teléfono. El 30% de las llamadas quedaban sin respuesta, perdiendo pacientes directamente con la competencia.',
    solution: 'Sitio con calendario de citas integrado, recordatorios automáticos 24h antes, página de servicios con precios y galería de antes/después.',
    metrics: [
      { icon: '📅', label: 'Citas online/mes',    value: '+180%' },
      { icon: '📞', label: 'Llamadas perdidas',   value: '-85%'  },
      { icon: '👥', label: 'Pacientes nuevos',    value: '+55%'  },
      { icon: '⭐', label: 'Google Reviews',      value: '4.8★'  },
    ],
    wa: waUrl('Hola, vi el proyecto Nexus Dental en el portafolio y me interesa algo similar para mi clínica. ¿Podemos hablar?'),
  },
  {
    id: 'casaflex', title: 'CasaFlex Inmobiliaria', subtitle: 'Portal Inmobiliario + CRM', category: 'web',
    tags: ['CRM', 'Mapa Interactivo', 'Leads', 'React'], image: '/assets/datacenter.jpg',
    year: '2024', delivery: '20 días', industry: 'Inmobiliaria', featured: true,
    description: 'Portal inmobiliario con búsqueda avanzada, mapa de propiedades, CRM para agentes, seguimiento de leads y notificaciones automáticas de nuevas propiedades.',
    challenge: 'CasaFlex publicaba en OLX sin CRM ni seguimiento. Sus agentes perdían leads calientes por falta de seguimiento estructurado.',
    solution: 'Portal con 150+ propiedades, CRM para 8 agentes con leads asignados automáticamente, alertas de propiedad nueva por WhatsApp y reportes semanales.',
    metrics: [
      { icon: '🏠', label: 'Propiedades publicadas', value: '150+'  },
      { icon: '📋', label: 'Leads captados/mes',     value: '+240%' },
      { icon: '🤝', label: 'Cierres de ventas',      value: '+40%'  },
      { icon: '⏱',  label: 'Tiempo resp. lead',     value: '-90%'  },
    ],
    wa: waUrl('Hola, vi el proyecto CasaFlex en el portafolio de Revolution505 y me interesa un portal inmobiliario. ¿Podemos hablar?'),
  },
  {
    id: 'lqc-pos', title: 'La Que Cura Farmacia', subtitle: 'POS + Control Medicamentos', category: 'sistemas',
    tags: ['POS Farmacia', 'CFDI', 'Lotes', 'Caducidades'], image: '/assets/pos-lqc-interface.png',
    year: '2024', delivery: '28 días', industry: 'Salud / Farmacia',
    description: 'Sistema POS especializado para farmacia: control por lote y caducidad, facturación CFDI, alertas de stock mínimo e integración con distribuidores.',
    challenge: 'La farmacia tenía pérdidas por medicamentos caducados no detectados y vendía productos sin stock real por descontrol de inventario.',
    solution: 'POS con módulo de lotes y caducidades, alertas preventivas 30/60/90 días antes, facturación CFDI automática y órdenes de compra a proveedores.',
    metrics: [
      { icon: '💊', label: 'Productos controlados', value: '1,200+' },
      { icon: '📋', label: 'Merma por caducidad',   value: '-92%'   },
      { icon: '💳', label: 'Facturas CFDI',          value: '100%'   },
      { icon: '⚡', label: 'Tiempo de cobro',        value: '-70%'   },
    ],
    wa: waUrl('Hola, vi el POS para farmacia en el portafolio de Revolution505 y me interesa algo similar. ¿Podemos hablar?'),
  },
  {
    id: 'vitae', title: 'Vitae Nutrición', subtitle: 'E-commerce + Blog Nutricional', category: 'ecommerce',
    tags: ['E-commerce', 'Blog SEO', 'Suscripciones', 'React'], image: '/assets/tecnico.jpg',
    year: '2025', delivery: '14 días', industry: 'Salud / Nutrición',
    description: 'Tienda en línea para marca de suplementos con suscripción mensual, blog nutricional con SEO, calculadora de macros interactiva y programa de referidos.',
    challenge: 'Vitae vendía suplementos solo en ferias y redes sociales. Sin recurrencia de clientes ni canal digital propio que generara ventas pasivas.',
    solution: 'Tienda con modelo freemium: compra única + suscripción mensual con descuento. Blog de 30 artículos con SEO nutricional y calculadora viral de macros.',
    metrics: [
      { icon: '🔄', label: 'Clientes recurrentes',   value: '68%'    },
      { icon: '💰', label: 'Ventas mensuales',        value: '$45K+'  },
      { icon: '🌐', label: 'Tráfico blog orgánico',   value: '+420%'  },
      { icon: '📱', label: 'App calculator viral',    value: '2.1K↗'  },
    ],
    wa: waUrl('Hola, vi el proyecto Vitae Nutrición en el portafolio de Revolution505 y me interesa algo similar. ¿Podemos hablar?'),
  },
  {
    id: 'cielito-resto', title: 'Cielito Restaurantes', subtitle: 'Sistema Mesas + Cocina + POS', category: 'sistemas',
    tags: ['POS Restaurante', 'Cocina', 'Mesas', 'Meseros'], image: '/assets/restaurante-cobro.png',
    year: '2025', delivery: '35 días', industry: 'Gastronomía / Restaurante',
    description: 'Sistema integral para cadena de restaurantes: módulo de mesas táctil, pantalla de cocina, módulo de meseros en tablet y POS de caja con reportes de turno.',
    challenge: 'La cadena tenía 3 sucursales con procesos distintos en cada una. Comandas en papel, confusiones en cocina y sin reportes consolidados por sucursal.',
    solution: 'Sistema 4-en-1: tablet de meseros, pantalla de cocina KDS, POS de caja y panel gerencial web con estadísticas en tiempo real por sucursal.',
    metrics: [
      { icon: '🍽',  label: 'Mesas gestionadas',    value: '48'    },
      { icon: '⚡', label: 'Tiempo de servicio',    value: '-35%'  },
      { icon: '📊', label: 'Errores de comanda',    value: '-98%'  },
      { icon: '💰', label: 'Ventas por sucursal',   value: '+22%'  },
    ],
    wa: waUrl('Hola, vi el sistema de restaurante en el portafolio de Revolution505 y me interesa algo similar. ¿Podemos hablar?'),
  },
  {
    id: 'revolution-web', title: 'Revolution505.com', subtitle: 'Nuestro Propio Sitio', category: 'web',
    tags: ['React 19', 'GSAP', 'Framer Motion', 'Tailwind v4', 'Vite 7'], image: '/assets/revolution-pag.png',
    year: '2025', delivery: '45 días', industry: 'Agencia Digital', featured: true,
    description: 'El sitio que estás viendo. Calculadora de precios, simulador de resultados por industria, configurador de proyectos y portafolio interactivo con modal.',
    challenge: 'Superar a los competidores locales (BastianSoft, Pixyhub, Vexus) que carecen de herramientas interactivas y diseño premium de nivel internacional.',
    solution: 'Landing de alto impacto con 10+ secciones, 3 herramientas interactivas únicas, animaciones GSAP + Framer Motion y diseño cinematográfico propio.',
    metrics: [
      { icon: '⚡', label: 'Lighthouse Score',      value: '98/100'  },
      { icon: '🎯', label: 'Conversión visitantes', value: '12%'     },
      { icon: '🔍', label: 'Posición Google',       value: 'Top 5'   },
      { icon: '📱', label: 'Mobile Score',           value: '100/100' },
    ],
    wa: waUrl('Hola, quiero un sitio web como el de Revolution505. ¿Podemos hablar sobre mi proyecto?'),
  },
]

const FILTERS: { id: FilterType; label: string; emoji: string }[] = [
  { id: 'all',       label: 'Todos',      emoji: '🗂'  },
  { id: 'web',       label: 'Web',        emoji: '🌐'  },
  { id: 'ecommerce', label: 'E-commerce', emoji: '🛒'  },
  { id: 'sistemas',  label: 'Sistemas',   emoji: '⚙️' },
  { id: 'seo',       label: 'SEO',        emoji: '🔍'  },
]

// Floating card positions (for hero background)
const FLOAT_CONFIG = [
  { src: '/assets/amq-pag.png',      top: '8%',  left: '-2%',  delay: '0s',    anim: 'animate-float-up'   },
  { src: '/assets/flyzz-pag.png',    top: '5%',  right: '-2%', delay: '1.5s',  anim: 'animate-float-down' },
  { src: '/assets/devilish-pag.png', top: '55%', left: '-3%',  delay: '3s',    anim: 'animate-float-down' },
  { src: '/assets/spartan-pag.png',  top: '60%', right: '-3%', delay: '2.2s',  anim: 'animate-float-up'   },
  { src: '/assets/pena-pag.png',     top: '30%', right: '-4%', delay: '0.8s',  anim: 'animate-drift-x'    },
]

// ─────────────────────────────────────────────────────────────────────────────
// Project Modal
// ─────────────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose, onPrev, onNext, hasPrev, hasNext }: {
  project:  Project
  onClose:  () => void
  onPrev:   () => void
  onNext:   () => void
  hasPrev:  boolean
  hasNext:  boolean
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-bg/92 backdrop-blur-2xl" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        exit={{ opacity: 0, y: 50, scale: 0.96 }}
        transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/60"
        onClick={e => e.stopPropagation()}
      >
        {/* Screenshot header */}
        <div className="relative h-56 sm:h-72 flex-shrink-0 overflow-hidden rounded-t-3xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

          {/* Nav arrows */}
          {hasPrev && (
            <button onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg/75 backdrop-blur-sm border border-stroke/60 flex items-center justify-center text-muted hover:text-text-primary transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          {hasNext && (
            <button onClick={onNext}
              className="absolute right-14 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg/75 backdrop-blur-sm border border-stroke/60 flex items-center justify-center text-muted hover:text-text-primary transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg/75 backdrop-blur-sm border border-stroke/60 flex items-center justify-center text-muted hover:text-text-primary transition-colors">
            <X className="w-4 h-4" />
          </button>

          {/* Category + year pill */}
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full accent-gradient text-[10px] text-white font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-bg/70 backdrop-blur-sm border border-stroke/50 text-[10px] text-muted">
              {project.year} · {project.delivery}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Header */}
          <div>
            <p className="text-[10px] text-muted uppercase tracking-widest mb-1">{project.subtitle} · {project.industry}</p>
            <h2 className="text-2xl sm:text-3xl font-display italic text-text-primary">{project.title}</h2>
          </div>

          {/* Metrics 4-col */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="bg-bg border border-stroke rounded-2xl p-3 sm:p-4 text-center"
              >
                <p className="text-xl mb-1" aria-hidden>{m.icon}</p>
                <p className="text-xl sm:text-2xl font-display italic accent-gradient-text leading-none">{m.value}</p>
                <p className="text-[10px] text-muted mt-1.5 leading-tight">{m.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Two-col: problem + solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-stroke/60 bg-bg/40">
              <p className="text-[10px] text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" /> El problema
              </p>
              <p className="text-xs text-muted leading-relaxed">{project.challenge}</p>
            </div>
            <div className="p-4 rounded-2xl border border-accent/15 bg-accent/5">
              <p className="text-[10px] text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" /> La solución
              </p>
              <p className="text-xs text-muted leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-surface border border-stroke text-[10px] text-muted">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-stroke">
            <a
              href={project.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            >
              <span
                className="absolute rounded-full pointer-events-none"
                style={{ inset: '-2px', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }}
                aria-hidden
              />
              <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white text-sm font-semibold w-full">
                Quiero algo así
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <button
              onClick={onClose}
              className="sm:w-auto px-6 py-3 rounded-full border border-stroke text-sm text-muted hover:text-text-primary hover:border-accent/40 transition-all duration-200"
            >
              Ver más proyectos
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Card
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({
  project, index, onClick, isHovered, anyHovered, onMouseEnter, onMouseLeave,
}: {
  project: Project; index: number; onClick: () => void
  isHovered: boolean; anyHovered: boolean; onMouseEnter: () => void; onMouseLeave: () => void
}) {
  const isFeat   = project.featured
  // Alternate bento: featured alternates between 7/12 and 5/12
  const altRow   = Math.floor(index / 2) % 2 === 1
  const colSpan  = isFeat
    ? (altRow ? 'col-span-12 sm:col-span-5' : 'col-span-12 sm:col-span-7')
    : (altRow ? 'col-span-12 sm:col-span-7' : 'col-span-12 sm:col-span-5')
  const height   = 'h-[270px] md:h-[360px]'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: anyHovered ? 0.52 : 1, scale: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.22 } }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${colSpan} ${height}`}
      style={{ zIndex: isHovered ? 1 : 0 }}
    >
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      {/* Halftone grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        aria-hidden
      />
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

      {/* Default label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3">
        {isFeat && (
          <span className="inline-flex items-center gap-1 mb-2 px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-[9px] text-accent uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
            Destacado
          </span>
        )}
        <span className="text-[10px] tracking-[0.22em] uppercase text-accent font-medium block mb-1.5">{project.subtitle}</span>
        <h3 className="text-xl md:text-2xl font-display italic text-white leading-tight">{project.title}</h3>
      </div>

      {/* Hover panel */}
      <div className="absolute inset-0 bg-bg/88 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 md:p-7">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-lg">{project.metrics[0].icon}</span>
            <span className="text-base font-semibold text-text-primary">{project.metrics[0].value}</span>
            <span className="text-xs text-muted">{project.metrics[0].label}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-surface/80 border border-stroke/60 text-[10px] text-muted">{tag}</span>
            ))}
          </div>
          <p className="text-xs text-muted leading-snug line-clamp-3">{project.description}</p>
        </div>
        <div className="relative self-start">
          <span
            className="absolute rounded-full pointer-events-none"
            style={{ inset: '-1.5px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)' }}
            aria-hidden
          />
          <span className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg text-sm text-text-primary">
            Ver proyecto <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero Section — floating project cards background
// ─────────────────────────────────────────────────────────────────────────────
function PortafolioHero() {
  return (
    <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden pt-24">
      {/* Floating project thumbnails — hidden on mobile, shown md+ */}
      <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
        {FLOAT_CONFIG.map((fc, i) => (
          <div
            key={i}
            className={`absolute rounded-2xl overflow-hidden border border-white/8 shadow-2xl ${fc.anim}`}
            style={{
              width: '220px', height: '140px',
              top: fc.top, left: fc.left, right: fc.right,
              animationDelay: fc.delay,
              opacity: 0.18,
              filter: 'blur(1px)',
            }}
          >
            <img src={fc.src} alt="" className="w-full h-full object-cover object-top" draggable={false} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
          </div>
        ))}

        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl animate-orb-drift"
          style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.1), transparent 70%)' }}
          aria-hidden
        />
      </div>

      {/* Edge vignettes */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block text-xs text-muted uppercase tracking-[0.3em] mb-6"
        >
          Portafolio · Revolution505
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl font-display italic text-text-primary leading-[0.92] mb-6"
        >
          Proyectos que{' '}
          <em className="not-italic accent-gradient-text">hablan</em>
          <br />por sí solos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-sm md:text-base text-muted max-w-lg mx-auto mb-8 leading-relaxed"
        >
          12 proyectos reales. Resultados medibles. Sin promesas vacías — solo evidencia.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={waUrl('Hola, quiero hablar sobre un proyecto como los del portafolio de Revolution505.')}
            target="_blank" rel="noopener noreferrer"
            className="group relative rounded-full hover:scale-105 transition-transform duration-200"
          >
            <span className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ inset: '-2px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }} aria-hidden />
            <span className="relative z-10 flex items-center gap-2 px-7 py-3.5 rounded-full bg-text-primary text-bg text-sm font-semibold group-hover:bg-bg group-hover:text-text-primary transition-all duration-200">
              Cotizar mi proyecto <ArrowRight className="w-4 h-4" />
            </span>
          </a>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Respondemos en &lt; 2 horas
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase text-muted">Scroll</span>
        <div className="w-px h-10 bg-stroke/60 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 accent-gradient animate-scroll-down" />
        </div>
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function PortafolioPage() {
  usePageMeta({
    title:       'Portafolio de Proyectos',
    description: '12 proyectos reales de desarrollo web, sistemas y e-commerce en Querétaro y México. Resultados medibles: +340% leads, $180K+ ventas, Top 3 Google.',
    canonical:   '/portafolio',
  })

  const gridRef                         = useRef<HTMLDivElement>(null)
  const [filter, setFilter]             = useState<FilterType>('all')
  const [hoveredId, setHoveredId]       = useState<string | null>(null)
  const [modalProject, setModalProject] = useState<Project | null>(null)

  const filtered      = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter)
  const currentIndex  = modalProject ? PROJECTS.findIndex(p => p.id === modalProject.id) : -1
  const hasPrev       = currentIndex > 0
  const hasNext       = currentIndex < PROJECTS.length - 1

  const openModal  = (p: Project) => setModalProject(p)
  const closeModal = ()           => setModalProject(null)
  const goPrev     = () => hasPrev && setModalProject(PROJECTS[currentIndex - 1])
  const goNext     = () => hasNext && setModalProject(PROJECTS[currentIndex + 1])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.port-stats', {
        opacity: 0, y: 18, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.port-stats', start: 'top 82%', once: true },
      })
      gsap.from('.port-filter', {
        opacity: 0, y: 14, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.port-filter', start: 'top 82%', once: true },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            project={modalProject}
            onClose={closeModal}
            onPrev={goPrev}
            onNext={goNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        )}
      </AnimatePresence>

      {/* Hero */}
      <PortafolioHero />

      {/* Grid content */}
      <div ref={gridRef} className="max-w-[1200px] mx-auto px-4 pb-24 md:pb-32">

        {/* Stats strip */}
        <div className="port-stats grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { value: '12',   label: 'Proyectos entregados' },
            { value: '100%', label: 'Clientes satisfechos' },
            { value: '14d',  label: 'Entrega promedio'     },
            { value: '4',    label: 'Categorías de servicio' },
          ].map(stat => (
            <div key={stat.label} className="p-4 rounded-2xl border border-stroke/60 bg-surface/30 text-center">
              <p className="text-2xl font-display italic accent-gradient-text">{stat.value}</p>
              <p className="text-[11px] text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="port-filter flex flex-wrap items-center gap-2 mb-8">
          {FILTERS.map(({ id, label, emoji }) => {
            const count  = id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === id).length
            const active = filter === id
            return (
              <motion.button
                key={id}
                onClick={() => setFilter(id)}
                whileTap={{ scale: 0.96 }}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
                  active
                    ? 'border-accent/50 bg-accent/10 text-text-primary'
                    : 'border-stroke bg-surface/30 text-muted hover:border-stroke/70 hover:text-text-primary hover:bg-surface/50'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-accent/8"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10">{emoji} {label}</span>
                <span className={`relative z-10 text-[10px] tabular-nums ${active ? 'text-accent' : 'text-muted/60'}`}>{count}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Bento grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-12 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => openModal(project)}
                  isHovered={hoveredId === project.id}
                  anyHovered={hoveredId !== null && hoveredId !== project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 md:p-12 rounded-3xl border border-stroke/60 bg-surface/20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-2">
            ¿Tu proyecto podría estar aquí?
          </h3>
          <p className="text-sm text-muted max-w-md mx-auto mb-6 leading-relaxed">
            Cuéntanos tu idea. En 24 horas tendrás una propuesta personalizada sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl('Hola, vi el portafolio de Revolution505 y quiero que mi proyecto aparezca ahí. ¿Podemos hablar?')}
              target="_blank" rel="noopener noreferrer"
              className="group relative rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
            >
              <span className="absolute rounded-full pointer-events-none"
                style={{ inset: '-2px', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }} aria-hidden />
              <span className="relative z-10 flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-white text-sm font-semibold">
                Iniciar mi proyecto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Check className="w-3.5 h-3.5 text-green-500" />
              Cotización gratis en 24 horas
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
