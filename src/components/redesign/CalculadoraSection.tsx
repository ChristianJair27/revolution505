import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, ArrowRight, Zap, Globe, ShoppingCart,
  Monitor, Users, Calendar,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type ProjectType = 'landing' | 'web' | 'ecommerce' | 'pos' | 'crm' | 'reservas'
type UrgencyType = 'normal' | 'fast' | 'urgent'

interface Config {
  type:    ProjectType
  pages:   number
  extras:  string[]
  urgency: UrgencyType
}

interface ExtraOption {
  id:    string
  label: string
  price: [number, number]
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────
const PROJECT_TYPES: {
  id: ProjectType
  Icon: React.ElementType
  label: string
  desc: string
  hasPages: boolean
}[] = [
  { id: 'landing',   Icon: Zap,          label: 'Landing Page',    desc: 'Página de alta conversión',       hasPages: false },
  { id: 'web',       Icon: Globe,        label: 'Sitio Web',       desc: 'Múltiples páginas y secciones',   hasPages: true  },
  { id: 'ecommerce', Icon: ShoppingCart, label: 'Tienda Online',   desc: 'E-commerce con catálogo y pagos', hasPages: true  },
  { id: 'pos',       Icon: Monitor,      label: 'Sistema POS',     desc: 'Punto de venta personalizado',    hasPages: false },
  { id: 'crm',       Icon: Users,        label: 'CRM Empresarial', desc: 'Gestión de clientes y ventas',    hasPages: false },
  { id: 'reservas',  Icon: Calendar,     label: 'Sis. Reservas',   desc: 'Agendas y citas en línea',        hasPages: false },
]

const BASE_PRICES: Record<ProjectType, [number, number]> = {
  landing:   [4_500,  7_500],
  web:       [8_500,  15_000],
  ecommerce: [14_000, 25_000],
  pos:       [18_000, 35_000],
  crm:       [22_000, 45_000],
  reservas:  [16_000, 28_000],
}

const EXTRAS_BY_TYPE: Record<ProjectType, ExtraOption[]> = {
  landing: [
    { id: 'blog',  label: 'Sección de blog/noticias',    price: [1_500, 2_500] },
    { id: 'admin', label: 'Panel administrable (CMS)',   price: [2_000, 3_500] },
    { id: 'api',   label: 'Integración WhatsApp API',   price: [1_500, 2_500] },
  ],
  web: [
    { id: 'blog',      label: 'Blog integrado',            price: [1_500, 2_500] },
    { id: 'admin',     label: 'Panel administrable (CMS)', price: [2_000, 3_500] },
    { id: 'multilang', label: 'Multilenguaje (ES/EN)',     price: [3_000, 5_000] },
    { id: 'api',       label: 'Integraciones API externas', price: [3_500, 8_000] },
  ],
  ecommerce: [
    { id: 'multilang', label: 'Multilenguaje (ES/EN)',           price: [3_000, 5_000] },
    { id: 'api',       label: 'Mercado Pago / Stripe / PayPal',  price: [3_500, 6_000] },
    { id: 'crm_basic', label: 'CRM básico de clientes',         price: [4_000, 7_000] },
  ],
  pos: [
    { id: 'delivery',     label: 'Módulo delivery/envíos',   price: [4_000, 7_000] },
    { id: 'loyalty',      label: 'Programa de puntos',       price: [3_000, 5_000] },
    { id: 'multi',        label: 'Multi-sucursal',           price: [5_000, 9_000] },
    { id: 'online_menu',  label: 'Menú digital QR',          price: [2_000, 3_500] },
  ],
  crm: [
    { id: 'email',   label: 'Email marketing integrado', price: [3_000, 5_000] },
    { id: 'reports', label: 'Reportes avanzados PDF',    price: [2_500, 4_500] },
    { id: 'mobile',  label: 'App móvil (PWA)',           price: [5_000, 9_000] },
    { id: 'api',     label: 'API REST personalizada',    price: [4_000, 8_000] },
  ],
  reservas: [
    { id: 'payment',   label: 'Pago en línea (Stripe/MP)',      price: [3_500, 6_000] },
    { id: 'reminders', label: 'Recordatorios SMS/WhatsApp',     price: [2_500, 4_000] },
    { id: 'calendar',  label: 'Sync con Google Calendar',       price: [2_000, 3_500] },
    { id: 'portal',    label: 'Portal del cliente',             price: [3_000, 5_000] },
  ],
}

const DELIVERY_DAYS: Record<ProjectType, Record<UrgencyType, string>> = {
  landing:   { normal: '5-7',   fast: '3-5',   urgent: '2-3'  },
  web:       { normal: '10-15', fast: '7-10',  urgent: '5-7'  },
  ecommerce: { normal: '15-22', fast: '10-15', urgent: '8-12' },
  pos:       { normal: '20-30', fast: '15-20', urgent: '12-15'},
  crm:       { normal: '25-35', fast: '18-25', urgent: '15-18'},
  reservas:  { normal: '18-25', fast: '12-18', urgent: '10-14'},
}

const PLAN_NAMES: Record<ProjectType, string> = {
  landing:   'Plan Esencial',
  web:       'Plan Profesional',
  ecommerce: 'Plan Premium',
  pos:       'Sistema POS',
  crm:       'Sistema CRM',
  reservas:  'Sistema de Reservas',
}

const INCLUDED_FEATURES: Record<ProjectType, string[]> = {
  landing:   ['Diseño responsive móvil + escritorio', 'SEO on-page básico', 'Formulario de contacto + WhatsApp', 'Hosting + dominio 1 año'],
  web:       ['Diseño UX/UI personalizado', 'SEO on-page + Schema markup', 'Google Analytics configurado', 'Hosting + dominio 1 año', 'Soporte 30 días'],
  ecommerce: ['Catálogo + carrito de compras', 'Pasarela de pagos integrada', 'Panel admin completo', 'SEO para tienda', 'SSL gratuito'],
  pos:       ['Control de inventario en tiempo real', 'Emisión de tickets de venta', 'Reportes diarios y mensuales', 'Control multi-usuario', 'Backup automático'],
  crm:       ['Base de datos de clientes', 'Pipeline de ventas visual', 'Seguimiento de tareas', 'Dashboard ejecutivo', 'Historial de interacciones'],
  reservas:  ['Calendario de citas', 'Panel para staff y clientes', 'Confirmaciones automáticas', 'Reportes de ocupación', 'Vista mobile-friendly'],
}

const URGENCY_OPTIONS: { id: UrgencyType; label: string; sub: string; mult: number }[] = [
  { id: 'normal', label: 'Normal',  sub: 'Sin prisa, calidad máxima', mult: 1.0 },
  { id: 'fast',   label: 'Rápido',  sub: 'Entrega acelerada',         mult: 1.3 },
  { id: 'urgent', label: 'Urgente', sub: 'Máxima prioridad',          mult: 1.6 },
]

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const fmtMXN = (n: number) =>
  new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(n)

function calcPrice(config: Config): [number, number] {
  const [baseMin, baseMax] = BASE_PRICES[config.type]
  const hasPages = ['web', 'ecommerce'].includes(config.type)
  const pageMult = hasPages ? 1 + (config.pages - 1) * 0.07 : 1
  const urgMult  = URGENCY_OPTIONS.find(u => u.id === config.urgency)!.mult

  let extMin = 0, extMax = 0
  EXTRAS_BY_TYPE[config.type].forEach(e => {
    if (config.extras.includes(e.id)) {
      extMin += e.price[0]
      extMax += e.price[1]
    }
  })

  const round500 = (n: number) => Math.round(n / 500) * 500
  return [
    round500((baseMin * pageMult + extMin) * urgMult),
    round500((baseMax * pageMult + extMax) * urgMult),
  ]
}

function buildWAUrl(config: Config, minP: number, maxP: number, days: string): string {
  const typeLabel: Record<ProjectType, string> = {
    landing: 'Landing Page', web: 'Sitio Web', ecommerce: 'Tienda Online',
    pos: 'Sistema POS', crm: 'CRM Empresarial', reservas: 'Sistema de Reservas',
  }
  const urgLabel: Record<UrgencyType, string> = {
    normal: 'Normal', fast: 'Rápido (+30%)', urgent: 'Urgente (+60%)',
  }

  const extrasForType = EXTRAS_BY_TYPE[config.type]
  const selectedExtras = config.extras
    .map(id => extrasForType.find(e => e.id === id)?.label)
    .filter((l): l is string => Boolean(l))

  const hasPages = ['web', 'ecommerce'].includes(config.type)

  const lines: string[] = [
    '🚀 *Solicitud de Cotización — Revolution505*',
    '',
    `📋 *Tipo de proyecto:* ${typeLabel[config.type]}`,
    ...(hasPages ? [`📄 *Páginas:* ${config.pages}`] : []),
    `⚡ *Urgencia:* ${urgLabel[config.urgency]}`,
    ...(selectedExtras.length > 0
      ? [`✅ *Extras:*\n${selectedExtras.map(e => `  • ${e}`).join('\n')}`]
      : []),
    '',
    `💰 *Estimado:* $${fmtMXN(minP)} – $${fmtMXN(maxP)} MXN`,
    `⏱ *Entrega:* ${days} días hábiles`,
    `📦 *Plan sugerido:* ${PLAN_NAMES[config.type]}`,
    '',
    '¿Pueden enviarme una propuesta formal? 🙏',
  ]

  return `https://wa.me/524423723972?text=${encodeURIComponent(lines.join('\n'))}`
}

// ─────────────────────────────────────────────────────────────────────────────
// useAnimatedNumber — smooth counter animation
// ─────────────────────────────────────────────────────────────────────────────
function useAnimatedNumber(target: number, duration = 450) {
  const [value, setValue]   = useState(target)
  const prevRef             = useRef(target)
  const rafRef              = useRef<number>(0)

  useEffect(() => {
    const from = prevRef.current
    const diff = target - from
    if (diff === 0) return

    cancelAnimationFrame(rafRef.current)
    const start = performance.now()

    const tick = (now: number) => {
      const t      = Math.min((now - start) / duration, 1)
      const eased  = 1 - (1 - t) ** 3
      setValue(Math.round(from + diff * eased))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setValue(target)
        prevRef.current = target
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      prevRef.current = target
    }
  }, [target, duration])

  return value
}

// ─────────────────────────────────────────────────────────────────────────────
// Small sub-components
// ─────────────────────────────────────────────────────────────────────────────
function StepLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[10px] font-semibold flex items-center justify-center flex-shrink-0 leading-none">
        {num}
      </span>
      <span className="text-[11px] text-muted uppercase tracking-[0.18em]">{text}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp icon SVG (inline — no extra dep)
// ─────────────────────────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function CalculadoraSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const [config, setConfig] = useState<Config>({
    type:    'web',
    pages:   5,
    extras:  [],
    urgency: 'normal',
  })

  const [minPrice, maxPrice] = calcPrice(config)
  const displayMin = useAnimatedNumber(minPrice)
  const displayMax = useAnimatedNumber(maxPrice)

  const days          = DELIVERY_DAYS[config.type][config.urgency]
  const currentExtras = EXTRAS_BY_TYPE[config.type]
  const hasPages      = PROJECT_TYPES.find(p => p.id === config.type)?.hasPages ?? false
  const sliderPct     = hasPages ? ((config.pages - 1) / 9) * 100 : 0
  const priceBarPct   = Math.min((minPrice / 45_000) * 100, 100)
  const waUrl         = buildWAUrl(config, minPrice, maxPrice, days)

  // Reset extras when type changes
  const setType = useCallback((type: ProjectType) => {
    setConfig(prev => ({
      ...prev,
      type,
      extras: [],
      pages: ['web', 'ecommerce'].includes(type) ? (prev.pages || 5) : 1,
    }))
  }, [])

  const toggleExtra = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      extras: prev.extras.includes(id)
        ? prev.extras.filter(e => e !== id)
        : [...prev.extras, id],
    }))
  }, [])

  // GSAP ScrollTrigger entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 78%', once: true }
      gsap.from('.calc-header',  { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out', scrollTrigger: trigger })
      gsap.from('.calc-left',    { opacity: 0, x: -32, duration: 0.8, ease: 'power3.out', delay: 0.1, scrollTrigger: trigger })
      gsap.from('.calc-right',   { opacity: 0, x: 32,  duration: 0.8, ease: 'power3.out', delay: 0.2, scrollTrigger: trigger })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Step labels
  const step2 = '2'
  const step3 = hasPages ? '3' : '2'
  const step4 = hasPages ? '4' : '3'

  return (
    <section
      ref={sectionRef}
      id="calculadora"
      className="relative py-24 md:py-32 px-4 border-t border-stroke overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.06), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative">

        {/* ── Section Header ── */}
        <div className="calc-header mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Calculadora de Proyectos</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display italic text-text-primary">
            Estima tu inversión{' '}
            <em className="not-italic accent-gradient-text">en tiempo real</em>
          </h2>
          <p className="text-sm text-muted mt-3 max-w-lg leading-relaxed">
            Configura tu proyecto paso a paso y obtén un estimado instantáneo.
            Sin compromisos — cotiza y recibe propuesta en &lt;2 horas.
          </p>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-6 lg:gap-8 items-start">

          {/* ══════════════════════════════════════════════════════
              LEFT PANEL — Configuration
          ══════════════════════════════════════════════════════ */}
          <div className="calc-left space-y-8 bg-surface/30 border border-stroke rounded-3xl p-6 md:p-8">

            {/* STEP 1 — Project type */}
            <div>
              <StepLabel num="1" text="¿Qué tipo de proyecto necesitas?" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-2.5">
                {PROJECT_TYPES.map(({ id, Icon, label, desc }) => {
                  const active = config.type === id
                  return (
                    <motion.button
                      key={id}
                      onClick={() => setType(id)}
                      whileTap={{ scale: 0.96 }}
                      className={`relative text-left p-4 rounded-2xl border transition-all duration-200 ${
                        active
                          ? 'border-accent/50 bg-accent/10 text-text-primary'
                          : 'border-stroke bg-bg/40 text-muted hover:border-stroke/70 hover:text-text-primary hover:bg-surface/50'
                      }`}
                    >
                      {/* Layout-animated highlight */}
                      {active && (
                        <motion.span
                          layoutId="type-highlight"
                          className="absolute inset-0 rounded-2xl"
                          style={{ background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.08), transparent)' }}
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                        />
                      )}
                      <span className="relative z-10 block">
                        <Icon
                          className={`w-5 h-5 mb-2.5 transition-colors ${active ? 'text-accent' : 'text-muted'}`}
                          strokeWidth={1.5}
                        />
                        <span className="block text-sm font-medium leading-tight">{label}</span>
                        <span className="block text-[11px] text-muted mt-1 leading-tight">{desc}</span>
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* STEP 2 — Pages slider (only for web / ecommerce) */}
            <AnimatePresence initial={false}>
              {hasPages && (
                <motion.div
                  key="pages"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <StepLabel num={step2} text="¿Cuántas páginas / secciones?" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>1 pág.</span>
                      <div className="text-center">
                        <span className="font-display italic text-3xl accent-gradient-text">{config.pages}</span>
                        <span className="text-muted ml-1">página{config.pages > 1 ? 's' : ''}</span>
                      </div>
                      <span>10 págs.</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={config.pages}
                      onChange={e => setConfig(prev => ({ ...prev, pages: +e.target.value }))}
                      className="calc-slider w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #60a5fa ${sliderPct}%, hsl(0 0% 12%) ${sliderPct}%)`,
                      }}
                    />
                    <p className="text-[11px] text-muted">
                      Cada página extra suma ~7% al precio base.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 3 — Extras */}
            <div>
              <StepLabel num={step3} text="¿Qué extras necesitas?" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={config.type}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  {currentExtras.map(({ id, label, price }) => {
                    const checked = config.extras.includes(id)
                    return (
                      <button
                        key={id}
                        onClick={() => toggleExtra(id)}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                          checked
                            ? 'border-accent/40 bg-accent/10 text-text-primary'
                            : 'border-stroke bg-bg/30 text-muted hover:border-stroke/70 hover:text-text-primary hover:bg-surface/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Animated checkbox */}
                          <motion.span
                            animate={{
                              backgroundColor: checked ? '#3b82f6' : 'transparent',
                              borderColor:     checked ? '#3b82f6' : 'hsl(0 0% 12%)',
                              scale:           checked ? [1, 1.18, 1] : 1,
                            }}
                            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                            className="w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center"
                          >
                            <AnimatePresence>
                              {checked && (
                                <motion.span
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ duration: 0.12 }}
                                >
                                  <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.span>
                          <span className="text-sm leading-tight">{label}</span>
                        </div>
                        <span className="text-[11px] text-muted flex-shrink-0 tabular-nums">
                          +${fmtMXN(price[0])}
                        </span>
                      </button>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STEP 4 — Urgency */}
            <div>
              <StepLabel num={step4} text="¿Cuándo lo necesitas?" />
              <div className="grid grid-cols-3 gap-2">
                {URGENCY_OPTIONS.map(({ id, label, sub, mult }) => {
                  const active = config.urgency === id
                  return (
                    <motion.button
                      key={id}
                      onClick={() => setConfig(prev => ({ ...prev, urgency: id }))}
                      whileTap={{ scale: 0.97 }}
                      className={`relative p-4 rounded-xl border text-center transition-all duration-200 ${
                        active
                          ? 'border-accent/50 bg-accent/10 text-text-primary'
                          : 'border-stroke bg-bg/40 text-muted hover:border-stroke/70 hover:text-text-primary'
                      }`}
                    >
                      <span className="block text-sm font-medium">{label}</span>
                      <span className="block text-[10px] text-muted mt-0.5 leading-tight">{sub}</span>
                      {mult > 1 && (
                        <span className={`block text-[10px] font-semibold mt-1.5 ${active ? 'text-accent' : 'text-muted'}`}>
                          ×{mult.toFixed(1)}
                        </span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              RIGHT PANEL — Live Summary (sticky)
          ══════════════════════════════════════════════════════ */}
          <div className="calc-right lg:sticky lg:top-24 space-y-4">
            <div className="bg-surface border border-stroke/70 rounded-3xl p-6 md:p-8">

              {/* Plan badge */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Plan recomendado</span>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={config.type}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="text-base font-semibold text-text-primary mt-1"
                    >
                      {PLAN_NAMES[config.type]}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <span className="px-3 py-1 rounded-full accent-gradient text-[9px] text-white font-semibold uppercase tracking-wider flex-shrink-0">
                  Estimado
                </span>
              </div>

              {/* Price — animated numbers */}
              <div className="mb-1">
                <span className="text-[11px] text-muted uppercase tracking-[0.15em]">Inversión estimada</span>
                <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                  <span className="text-4xl md:text-5xl font-display italic accent-gradient-text tabular-nums leading-none">
                    ${fmtMXN(displayMin)}
                  </span>
                  <span className="text-muted text-lg">–</span>
                  <span className="text-3xl font-display italic text-text-primary/50 tabular-nums leading-none">
                    ${fmtMXN(displayMax)}
                  </span>
                </div>
                <span className="text-[10px] text-muted mt-1 block">MXN · IVA no incluido</span>
              </div>

              {/* Price bar */}
              <div className="h-1 bg-stroke/60 rounded-full overflow-hidden mt-4 mb-6">
                <motion.div
                  className="h-full accent-gradient rounded-full"
                  animate={{ width: `${priceBarPct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-bg/60 border border-stroke/50 mb-5">
                <span className="text-xl" aria-hidden>⏱</span>
                <div>
                  <span className="block text-[10px] text-muted uppercase tracking-wider">Tiempo de entrega</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${config.type}-${config.urgency}`}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.18 }}
                      className="block text-sm font-medium text-text-primary mt-0.5"
                    >
                      {days} días hábiles
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Included features */}
              <div className="mb-7">
                <span className="text-[10px] text-muted uppercase tracking-[0.2em] block mb-3">Incluye</span>
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={config.type}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-2"
                  >
                    {INCLUDED_FEATURES[config.type].map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.2 }}
                        className="flex items-start gap-2.5 text-xs text-muted leading-snug"
                      >
                        <Check className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                {/* Primary — WhatsApp with pre-filled message */}
                <a
                  href={waUrl}
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
                    <WhatsAppIcon />
                    Cotizar este proyecto
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>

                {/* Secondary — Schedule call */}
                <a
                  href="https://wa.me/524423723972?text=Hola%2C%20quiero%20agendar%20una%20llamada%20gratuita%20para%20hablar%20de%20mi%20proyecto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-stroke text-sm text-muted hover:text-text-primary hover:border-stroke/70 transition-colors duration-200"
                >
                  <span aria-hidden>📞</span>
                  Agendar llamada gratuita
                </a>
              </div>

              {/* Trust note */}
              <p className="text-center text-[10px] text-muted/70 mt-4">
                🛡 Sin compromiso · Respuesta garantizada en &lt;2 horas
              </p>
            </div>

            {/* Social proof strip */}
            <div className="flex items-center justify-center gap-6 py-2">
              {[
                { icon: '⭐', text: '5/5 en Google' },
                { icon: '📦', text: '95+ proyectos' },
                { icon: '⚡', text: '<2h respuesta' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-[11px] text-muted">
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
