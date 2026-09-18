import { useState, useRef, useEffect } from 'react'
import { WA } from '../../constants/whatsapp'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type SystemId = 'restaurante' | 'pos' | 'reservas' | 'crm'
type MockupType = 'reservas' | 'crm'

interface Sistema {
  id:          SystemId
  emoji:       string
  label:       string
  tagline:     string
  description: string
  screenshots: string[]
  mockupType?: MockupType
  features:    string[]
  badge:       string
  price:       string
  whatsapp:    string
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const SISTEMAS: Sistema[] = [
  {
    id: 'restaurante',
    emoji: '🍽',
    label: 'POS Restaurante',
    tagline: 'Control total de tu cocina y comedor',
    description: 'Sistema completo para restaurantes: cobro rápido, mesas en tiempo real, órdenes directas a cocina y reportes diarios. Todo desde una sola pantalla.',
    screenshots: [
      '/assets/restaurante-dashboard.png',
      '/assets/restaurante-mesas.png',
      '/assets/restaurante-cocina.png',
      '/assets/restaurante-cobro.png',
      '/assets/restaurante-meseros-perfil.png',
    ],
    features: [
      'Gestión de mesas en tiempo real',
      'Órdenes enviadas directo a cocina',
      'Control de meseros y comisiones',
      'Cobro con múltiples métodos de pago',
      'Reportes de ventas diarias y mensuales',
      'Modo offline — funciona sin internet',
      'Compatible con impresoras térmicas',
    ],
    badge: 'Sistema Propio',
    price: 'Desde $18,000 MXN',
    whatsapp: WA.sistPOSRestaurante,
  },
  {
    id: 'pos',
    emoji: '🖥',
    label: 'POS General',
    tagline: 'Inventario y ventas bajo control total',
    description: 'Punto de venta flexible para comercios, farmacias, papelerías y tiendas. Controla tu inventario, ventas y clientes desde un panel intuitivo.',
    screenshots: [
      '/assets/pos-atagg-dashboard.png',
      '/assets/pos-lqc-interface.png',
    ],
    features: [
      'Control de inventario en tiempo real',
      'Gestión de clientes y programa de puntos',
      'Múltiples métodos de pago',
      'Alertas automáticas de stock mínimo',
      'Reportes por turno y por vendedor',
      'Lector de código de barras compatible',
      'Multi-usuario con permisos por rol',
    ],
    badge: 'Sistema Propio',
    price: 'Desde $14,000 MXN',
    whatsapp: WA.sistPOSGeneral,
  },
  {
    id: 'reservas',
    emoji: '📅',
    label: 'Sis. Reservas',
    tagline: 'Tu agenda en piloto automático',
    description: 'Sistema de citas y reservas online para clínicas, salones, restaurantes y cualquier negocio que necesite agendar. Tus clientes reservan 24/7 sin llamarte.',
    screenshots: [],
    mockupType: 'reservas',
    features: [
      'Calendario de citas en tiempo real',
      'Confirmaciones automáticas por WhatsApp',
      'Panel para staff y vista para clientes',
      'Recordatorios automáticos de citas',
      'Sincronización con Google Calendar',
      'Historial completo por cliente',
      'Reportes de ocupación y cancelaciones',
    ],
    badge: 'Sistema Propio',
    price: 'Desde $16,000 MXN',
    whatsapp: WA.sistReservasDemo,
  },
  {
    id: 'crm',
    emoji: '👥',
    label: 'CRM Empresarial',
    tagline: 'Tu equipo de ventas en un solo lugar',
    description: 'Gestiona clientes, oportunidades y seguimientos desde un dashboard ejecutivo. Cierra más ventas con menos esfuerzo gracias a un pipeline visual claro.',
    screenshots: [],
    mockupType: 'crm',
    features: [
      'Base de datos completa de clientes',
      'Pipeline de ventas visual (Kanban)',
      'Seguimiento de tareas y oportunidades',
      'Dashboard ejecutivo con métricas clave',
      'Historial completo de interacciones',
      'Reportes de conversión y rendimiento',
      'Gestión de cotizaciones integrada',
    ],
    badge: 'Sistema Propio',
    price: 'Desde $22,000 MXN',
    whatsapp: WA.sistCRMDemo,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Framer Motion variants
// ─────────────────────────────────────────────────────────────────────────────
const EASE_STANDARD: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const featureList = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
}
const featureItem = {
  hidden:  { opacity: 0, x: 18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE_STANDARD } },
}

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp icon
// ─────────────────────────────────────────────────────────────────────────────
const WAIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// CSS Mockup: Reservas
// ─────────────────────────────────────────────────────────────────────────────
const ReservasMockup = () => {
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
  const slots = [
    { time: '09:00', name: 'Juan García',    status: 'Confirmado', color: 'bg-accent/80'         },
    { time: '10:30', name: '',               status: 'Libre',      color: 'bg-stroke/30'          },
    { time: '11:00', name: 'María López',    status: 'Pendiente',  color: 'bg-yellow-500/60'      },
    { time: '13:00', name: '',               status: 'Libre',      color: 'bg-stroke/30'          },
    { time: '14:00', name: 'Carlos Ruiz',    status: 'Confirmado', color: 'bg-accent/80'         },
    { time: '15:30', name: 'Ana Torres',     status: 'Confirmado', color: 'bg-accent/80'         },
  ]
  const highlighted = [3, 7, 10, 14, 17, 20, 24]

  return (
    <div className="absolute inset-0 bg-bg flex overflow-hidden p-3 gap-3 text-text-primary">
      {/* Left: mini calendar */}
      <div className="w-36 flex-shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-text-primary">Junio 2026</span>
          <div className="flex gap-0.5">
            <span className="w-4 h-4 rounded bg-stroke/50 flex items-center justify-center text-[9px] text-muted cursor-pointer">‹</span>
            <span className="w-4 h-4 rounded bg-stroke/50 flex items-center justify-center text-[9px] text-muted cursor-pointer">›</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px mb-0.5">
          {days.map(d => (
            <span key={d} className="text-[8px] text-muted text-center font-medium py-0.5">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px">
          {Array.from({ length: 30 }, (_, i) => i + 1).map(d => (
            <span
              key={d}
              className={`text-[9px] h-5 flex items-center justify-center rounded cursor-pointer transition-colors ${
                d === 3
                  ? 'bg-accent text-white font-bold'
                  : highlighted.includes(d)
                  ? 'bg-accent/20 text-accent'
                  : 'text-muted hover:bg-stroke/40'
              }`}
            >
              {d}
            </span>
          ))}
        </div>
        {/* Legend */}
        <div className="pt-1 space-y-1 border-t border-stroke">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[9px] text-muted">Confirmado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <span className="text-[9px] text-muted">Pendiente</span>
          </div>
        </div>
      </div>

      {/* Right: time slots */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-text-primary">Martes, 3 Jun</span>
          <span className="px-2 py-0.5 rounded-full accent-gradient text-[9px] text-white font-medium">+ Nueva</span>
        </div>
        {slots.map(({ time, name, status, color }) => (
          <div key={time} className="flex items-center gap-2">
            <span className="text-[9px] text-muted w-9 flex-shrink-0 font-mono">{time}</span>
            <div className={`flex-1 h-7 rounded-lg ${color} flex items-center px-2 gap-1.5 overflow-hidden`}>
              {name ? (
                <>
                  <span className="text-[10px] font-medium text-white truncate">{name}</span>
                  <span className={`ml-auto flex-shrink-0 text-[8px] px-1.5 py-px rounded-full font-medium ${
                    status === 'Confirmado' ? 'bg-green-500/20 text-green-300'
                    : status === 'Pendiente' ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-stroke/60 text-muted'
                  }`}>
                    {status}
                  </span>
                </>
              ) : (
                <span className="text-[9px] text-muted italic">Disponible</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS Mockup: CRM
// ─────────────────────────────────────────────────────────────────────────────
const CRMMockup = () => {
  const stats = [
    { label: 'Ingresos',  value: '$185K', delta: '+23%',  color: 'accent-gradient-text' },
    { label: 'Leads',     value: '48',    delta: '+8',    color: 'text-green-400' },
    { label: 'Cerrados',  value: '12',    delta: '+3',    color: 'text-yellow-400' },
  ]
  const pipeline = [
    { stage: 'Prospecto',  count: 18, pct: 72 },
    { stage: 'Cotización', count:  9, pct: 44 },
    { stage: 'Cierre',     count:  4, pct: 22 },
  ]
  const clients = [
    { name: 'AMQ Group',         value: '$45,000', dot: 'bg-green-500',  label: 'Activo'  },
    { name: 'FlyZZ Services',    value: '$28,000', dot: 'bg-yellow-500', label: 'En cotización' },
    { name: 'Restaurante Belén', value: '$18,000', dot: 'bg-accent',     label: 'Nuevo'   },
  ]

  return (
    <div className="absolute inset-0 bg-bg p-3 space-y-2.5 overflow-hidden text-text-primary">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold">Dashboard de Ventas</span>
        <span className="text-[9px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full font-medium">↑ Jun 2026</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-1.5">
        {stats.map(({ label, value, delta, color }) => (
          <div key={label} className="bg-surface rounded-xl p-2 border border-stroke">
            <span className="text-[9px] text-muted block">{label}</span>
            <div className="flex items-end justify-between mt-1 gap-1">
              <span className={`text-sm font-display italic font-bold leading-none ${color}`}>{value}</span>
              <span className="text-[8px] text-green-400 bg-green-400/10 px-1 py-px rounded flex-shrink-0">{delta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div className="bg-surface rounded-xl p-2.5 border border-stroke">
        <span className="text-[9px] font-semibold text-text-primary block mb-2">Pipeline de Ventas</span>
        <div className="space-y-1.5">
          {pipeline.map(({ stage, count, pct }, i) => (
            <div key={stage} className="flex items-center gap-2">
              <span className="text-[9px] text-muted w-16 flex-shrink-0">{stage}</span>
              <div className="flex-1 h-3 bg-stroke/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full accent-gradient rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                />
              </div>
              <span className="text-[9px] text-muted w-4 text-right flex-shrink-0">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clients table */}
      <div className="bg-surface rounded-xl border border-stroke overflow-hidden">
        <div className="px-2.5 py-1.5 border-b border-stroke flex items-center justify-between">
          <span className="text-[9px] font-semibold text-text-primary">Clientes recientes</span>
          <span className="text-[9px] text-accent cursor-pointer">Ver todos →</span>
        </div>
        {clients.map(({ name, value, dot, label }) => (
          <div key={name} className="flex items-center px-2.5 py-1.5 border-b border-stroke/50 last:border-0 gap-2">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
            <span className="text-[10px] text-text-primary flex-1 truncate">{name}</span>
            <span className="text-[10px] text-accent tabular-nums flex-shrink-0">{value}</span>
            <span className="text-[8px] text-muted flex-shrink-0 hidden sm:block">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Browser frame wrapper
// ─────────────────────────────────────────────────────────────────────────────
interface BrowserFrameProps {
  sistema: Sistema
  slideIdx: number
  onPause:  () => void
  onResume: () => void
}

const BrowserFrame = ({ sistema, slideIdx, onPause, onResume }: BrowserFrameProps) => {
  const hasScreenshots = sistema.screenshots.length > 0

  return (
    <div
      className="rounded-2xl overflow-hidden border border-stroke/60 shadow-2xl shadow-black/60"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      {/* Chrome bar */}
      <div className="h-9 bg-surface border-b border-stroke flex items-center px-3 gap-2 flex-shrink-0">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/50" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/50" />
          <span className="w-3 h-3 rounded-full bg-green-400/50" />
        </div>
        <div className="flex-1 h-5 bg-bg/70 rounded-full flex items-center px-3 gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400/60 flex-shrink-0" />
          <span className="text-[10px] text-muted truncate">
            revolution505.com/app/{sistema.id}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-5 h-5 rounded bg-stroke/40 flex items-center justify-center text-[10px] text-muted">↺</span>
          <span className="w-5 h-5 rounded bg-stroke/40 flex items-center justify-center text-[10px] text-muted">⋯</span>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative" style={{ aspectRatio: '16/9' }}>
        {hasScreenshots ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={`${sistema.id}-${slideIdx}`}
              src={sistema.screenshots[slideIdx]}
              alt={`${sistema.label} — pantalla ${slideIdx + 1}`}
              className="absolute inset-0 w-full h-full object-cover object-top"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              draggable={false}
            />
          </AnimatePresence>
        ) : sistema.mockupType === 'reservas' ? (
          <ReservasMockup />
        ) : sistema.mockupType === 'crm' ? (
          <CRMMockup />
        ) : null}

        {/* Screenshot counter (only for real screenshots) */}
        {hasScreenshots && sistema.screenshots.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] text-white">
            {slideIdx + 1}/{sistema.screenshots.length}
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Thumbnail strip (only for systems with real screenshots)
// ─────────────────────────────────────────────────────────────────────────────
interface ThumbnailStripProps {
  sistema:   Sistema
  current:   number
  onChange:  (i: number) => void
}

const ThumbnailStrip = ({ sistema, current, onChange }: ThumbnailStripProps) => {
  if (sistema.screenshots.length < 2) return null

  return (
    <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
      {sistema.screenshots.map((src, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`relative flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
            i === current ? 'border-accent shadow-sm shadow-accent/30' : 'border-stroke/50 opacity-60 hover:opacity-90 hover:border-stroke'
          }`}
        >
          <img src={src} alt="" className="w-full h-full object-cover object-top" draggable={false} loading="lazy" />
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────────────────────
export default function SistemasSection() {
  const sectionRef              = useRef<HTMLElement>(null)
  const [activeId, setActiveId] = useState<SystemId>('restaurante')
  const [slideIdx, setSlideIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const sistema = SISTEMAS.find(s => s.id === activeId)!

  // Reset slide when tab changes
  useEffect(() => { setSlideIdx(0) }, [activeId])

  // Auto-slide for systems with screenshots
  useEffect(() => {
    if (isPaused || sistema.screenshots.length < 2) return
    const id = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % sistema.screenshots.length)
    }, 3200)
    return () => clearInterval(id)
  }, [activeId, isPaused, sistema.screenshots.length])

  // GSAP ScrollTrigger entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 76%', once: true }
      gsap.from('.sist-header',  { opacity: 0, y: 24,  duration: 0.7, ease: 'power3.out',             scrollTrigger: trigger })
      gsap.from('.sist-badges',  { opacity: 0, y: 12,  duration: 0.6, ease: 'power3.out', delay: 0.1, scrollTrigger: trigger })
      gsap.from('.sist-tabs',    { opacity: 0, y: 16,  duration: 0.6, ease: 'power3.out', delay: 0.18, scrollTrigger: trigger })
      gsap.from('.sist-content', { opacity: 0, y: 20,  duration: 0.7, ease: 'power3.out', delay: 0.28, scrollTrigger: trigger })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handlePrev = () => {
    if (!sistema.screenshots.length) return
    setSlideIdx(prev => (prev - 1 + sistema.screenshots.length) % sistema.screenshots.length)
  }
  const handleNext = () => {
    if (!sistema.screenshots.length) return
    setSlideIdx(prev => (prev + 1) % sistema.screenshots.length)
  }

  return (
    <section
      ref={sectionRef}
      id="sistemas"
      className="relative py-24 md:py-32 px-4 border-t border-stroke overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.05), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <div className="sist-header mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Desarrollo de Sistemas</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display italic text-text-primary">
            Software hecho{' '}
            <em className="not-italic accent-gradient-text">para ti</em>
          </h2>
          <p className="text-sm text-muted mt-3 max-w-xl leading-relaxed">
            Sistemas propietarios desarrollados para PyMEs mexicanas.
            Sin mensualidades, sin letra pequeña — el sistema es tuyo.
          </p>
        </div>

        {/* ── Trust badges ── */}
        <div className="sist-badges flex flex-wrap gap-2 mb-10">
          {[
            { icon: '✅', text: 'Sin mensualidades' },
            { icon: '🔧', text: 'Soporte técnico incluido' },
            { icon: '⚡', text: 'Entrega en días, no meses' },
            { icon: '🔑', text: 'Código fuente: tuyo' },
          ].map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stroke/70 bg-surface/40 text-xs text-muted"
            >
              <span>{icon}</span>
              {text}
            </span>
          ))}
        </div>

        {/* ── Tab navigation ── */}
        <div className="sist-tabs grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {SISTEMAS.map(s => {
            const active = s.id === activeId
            return (
              <motion.button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-left transition-all duration-200 ${
                  active
                    ? 'border-accent/50 bg-accent/10 text-text-primary'
                    : 'border-stroke bg-surface/30 text-muted hover:border-stroke/70 hover:text-text-primary hover:bg-surface/50'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tab-highlight"
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.1), transparent)' }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 text-lg leading-none">{s.emoji}</span>
                <span className="relative z-10 text-sm font-medium leading-tight">{s.label}</span>
              </motion.button>
            )
          })}
        </div>

        {/* ── Tab content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="sist-content grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* ── LEFT: Screenshot / Mockup gallery ── */}
            <div className="relative">
              <BrowserFrame
                sistema={sistema}
                slideIdx={slideIdx}
                onPause={() => setIsPaused(true)}
                onResume={() => setIsPaused(false)}
              />

              {/* Arrow controls (only for real screenshots) */}
              {sistema.screenshots.length > 1 && (
                <div className="absolute top-9 inset-x-0 flex justify-between px-3 pointer-events-none">
                  <button
                    onClick={handlePrev}
                    className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-stroke/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors mt-[calc(50%-18px)]"
                    aria-label="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-stroke/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors mt-[calc(50%-18px)]"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Thumbnail strip */}
              <ThumbnailStrip
                sistema={sistema}
                current={slideIdx}
                onChange={setSlideIdx}
              />

              {/* Mockup label for CSS mockups */}
              {!sistema.screenshots.length && (
                <p className="mt-3 text-center text-[11px] text-muted">
                  Vista previa del sistema • Demo disponible por WhatsApp
                </p>
              )}
            </div>

            {/* ── RIGHT: System details ── */}
            <div className="space-y-6">
              {/* Name + badge */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{sistema.emoji}</span>
                  <span className="px-3 py-1 rounded-full accent-gradient text-[10px] text-white font-semibold uppercase tracking-wider">
                    {sistema.badge}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display italic text-text-primary leading-tight">
                  {sistema.label}
                </h3>
                <p className="text-sm text-accent font-medium mt-1">{sistema.tagline}</p>
                <p className="text-sm text-muted mt-3 leading-relaxed">{sistema.description}</p>
              </div>

              {/* Features with stagger */}
              <motion.ul
                variants={featureList}
                initial="hidden"
                animate="visible"
                className="space-y-2.5"
              >
                {sistema.features.map(feature => (
                  <motion.li
                    key={feature}
                    variants={featureItem}
                    className="flex items-start gap-3 text-sm text-muted"
                  >
                    <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" strokeWidth={2.5} />
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Price + CTA */}
              <div className="pt-2 border-t border-stroke space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-display italic accent-gradient-text">
                    {sistema.price}
                  </span>
                  <span className="text-xs text-muted">MXN · pago único</span>
                </div>

                {/* Primary CTA */}
                <a
                  href={sistema.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-2.5 w-full rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                >
                  <span
                    className="absolute rounded-full"
                    style={{ inset: '-2px', background: 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)' }}
                    aria-hidden
                  />
                  <span className="relative z-10 w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-accent text-white text-sm font-medium">
                    <WAIcon />
                    Solicitar demo por WhatsApp
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>

                {/* Secondary: general inquiry */}
                <a
                  href={WA.sistemasInfo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-stroke text-sm text-muted hover:text-text-primary hover:border-stroke/70 transition-colors duration-200"
                >
                  <span aria-hidden>📞</span>
                  Ver todos los sistemas
                </a>

                {/* Guarantee note */}
                <p className="text-center text-[10px] text-muted/70">
                  🛡 Sin mensualidades · Código fuente incluido · Soporte post-entrega
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
