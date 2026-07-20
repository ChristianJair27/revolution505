import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, X, Shield } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────
type TabType = 'web' | 'sistemas'

interface Plan {
  id:            string
  name:          string
  emoji:         string
  price:         number
  originalPrice?: number
  desc:          string
  delivery:      string
  highlight:     boolean
  badge?:        string
  features:      string[]
  notIncluded:   string[]
  wa:            string
}

const WA_BASE = 'https://wa.me/524423723972?text='

const WEB_PLANS: Plan[] = [
  {
    id:          'esencial',
    name:        'Esencial',
    emoji:       '⚡',
    price:       6_500,
    desc:        'Para negocios que inician su presencia digital',
    delivery:    '5-7 días hábiles',
    highlight:   false,
    features: [
      'Landing page 1 página de alta conversión',
      'Diseño responsive (móvil + escritorio)',
      'Formulario de contacto + botón WhatsApp',
      'SEO básico on-page',
      'Hosting + dominio .com.mx 1 año',
    ],
    notIncluded: ['Blog', 'Panel admin', 'Google Analytics'],
    wa: encodeURIComponent('Hola, vi sus planes en revolution505.com y me interesa el Plan Esencial ($6,500 MXN). ¿Cuándo podemos hablar?'),
  },
  {
    id:            'profesional',
    name:          'Profesional',
    emoji:         '🚀',
    price:         12_500,
    originalPrice: 15_000,
    desc:          'La opción más elegida por PyMEs en Querétaro',
    delivery:      '10-15 días hábiles',
    highlight:     true,
    badge:         'MÁS POPULAR',
    features: [
      'Sitio web hasta 5 páginas',
      'Diseño UX/UI personalizado',
      'SEO on-page completo + Schema markup',
      'Blog integrado',
      'Panel administrable (CMS)',
      'Google Analytics + Search Console',
      'Integración WhatsApp + Redes Sociales',
      'Capacitación 2h incluida',
      'Hosting + dominio 1 año incluidos',
      '30 días soporte post-entrega',
    ],
    notIncluded:   [],
    wa: encodeURIComponent('Hola, vi sus planes en revolution505.com y me interesa el Plan Profesional ($12,500 MXN). ¿Están disponibles para comenzar?'),
  },
  {
    id:       'premium',
    name:     'Premium',
    emoji:    '💎',
    price:    22_500,
    desc:     'Solución completa para empresas que quieren dominar su mercado',
    delivery: '20-25 días hábiles',
    highlight: false,
    features: [
      'Sitio hasta 12 páginas + landings dedicadas',
      'Diseño UX/UI premium con micro-animaciones',
      'SEO avanzado + Google Business Profile',
      'E-commerce o sistema de reservas integrado',
      'Panel admin completo',
      'Correos corporativos ilimitados',
      'Integraciones API (WhatsApp Business, CRM)',
      'Reportes mensuales de rendimiento',
      'Capacitación + 60 días soporte prioritario',
    ],
    notIncluded: [],
    wa: encodeURIComponent('Hola, vi sus planes en revolution505.com y me interesa el Plan Premium ($22,500 MXN). ¿Podemos agendar una llamada?'),
  },
]

const SISTEMA_PLANS: Plan[] = [
  {
    id:       'pos',
    name:     'Sistema POS',
    emoji:    '🖥',
    price:    18_000,
    desc:     'Punto de venta para restaurantes, comercios y farmacias',
    delivery: '20-30 días hábiles',
    highlight: false,
    features: [
      'Control de inventario en tiempo real',
      'Emisión de tickets y cobros rápidos',
      'Reportes de ventas diarios/mensuales',
      'Multi-usuario con permisos por rol',
      'Compatible con impresoras térmicas',
      'Modo offline (sin internet)',
      'Sin mensualidades — código tuyo',
    ],
    notIncluded: ['Multi-sucursal'],
    wa: encodeURIComponent('Hola, vi sus servicios en revolution505.com y me interesa el Sistema POS ($18,000 MXN). ¿Tienen una demo disponible?'),
  },
  {
    id:       'reservas',
    name:     'Sis. Reservas',
    emoji:    '📅',
    price:    16_000,
    desc:     'Agenda digital para clínicas, restaurantes y servicios',
    delivery: '18-25 días hábiles',
    highlight: true,
    badge:    'MÁS PEDIDO',
    features: [
      'Calendario de citas en tiempo real',
      'Confirmaciones automáticas por WhatsApp',
      'Panel admin + vista para clientes',
      'Recordatorios automáticos de citas',
      'Sync con Google Calendar (opcional)',
      'Reportes de ocupación',
      'Sin mensualidades — código tuyo',
    ],
    notIncluded: [],
    wa: encodeURIComponent('Hola, vi sus servicios en revolution505.com y me interesa el Sistema de Reservas ($16,000 MXN). ¿Podemos hablar?'),
  },
  {
    id:       'crm',
    name:     'CRM Empresarial',
    emoji:    '👥',
    price:    22_000,
    desc:     'Gestión completa de clientes, pipeline y ventas',
    delivery: '25-35 días hábiles',
    highlight: false,
    features: [
      'Base de datos completa de clientes',
      'Pipeline de ventas visual (Kanban)',
      'Seguimiento de tareas y oportunidades',
      'Dashboard ejecutivo con métricas',
      'Historial de interacciones',
      'Reportes de conversión',
      'Sin mensualidades — código tuyo',
    ],
    notIncluded: [],
    wa: encodeURIComponent('Hola, vi sus servicios en revolution505.com y me interesa el CRM Empresarial ($22,000 MXN). ¿Podemos agendar una llamada?'),
  },
]

const fmt = (n: number) => new Intl.NumberFormat('es-MX').format(n)

// ─────────────────────────────────────────────────────────────────────────────
// PlanCard
// ─────────────────────────────────────────────────────────────────────────────
interface PlanCardProps { plan: Plan; index: number }

function PlanCard({ plan, index }: PlanCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative flex flex-col rounded-3xl overflow-hidden ${
        plan.highlight
          ? 'border-2 border-blue-400/70 shadow-2xl shadow-blue-500/30 md:-mt-4 md:mb-4 z-10'
          : 'border border-stroke'
      }`}
    >
      {/* Glassmorphism + glow layer on highlight */}
      {plan.highlight && (
        <>
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: 'radial-gradient(ellipse at top, hsl(217 91% 60% / 0.18) 0%, transparent 60%)',
            }}
            aria-hidden
          />
          {/* Outer glow ring */}
          <div
            className="absolute -inset-px pointer-events-none rounded-3xl"
            style={{
              boxShadow: '0 0 0 1px hsl(217 91% 60% / 0.4), 0 0 60px hsl(217 91% 60% / 0.15)',
            }}
            aria-hidden
          />
        </>
      )}

      {/* Accent bar at top */}
      {plan.highlight && <div className="h-1 w-full accent-gradient flex-shrink-0" />}

      <div className={`flex flex-col flex-1 p-6 md:p-8 ${plan.highlight ? 'bg-surface' : 'bg-surface/40'}`}>

        {/* Badge */}
        {plan.badge && (
          <div className="mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase tracking-widest accent-gradient"
              style={{ boxShadow: '0 0 20px hsl(217 91% 60% / 0.4)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              {plan.badge}
            </span>
          </div>
        )}

        {/* Plan header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl" aria-hidden>{plan.emoji}</span>
            <h3 className={`text-base font-semibold ${plan.highlight ? 'text-text-primary' : 'text-text-primary'}`}>
              {plan.name}
            </h3>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className={`text-4xl md:text-5xl font-display italic leading-none ${plan.highlight ? 'accent-gradient-text' : 'text-text-primary'}`}>
              ${fmt(plan.price)}
            </span>
            <span className="text-xs text-muted">MXN</span>
            {plan.originalPrice && (
              <span className="text-sm text-muted line-through">${fmt(plan.originalPrice)}</span>
            )}
          </div>

          <p className="text-xs text-muted mt-2 leading-snug">{plan.desc}</p>

          {/* Delivery */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
            Entrega: {plan.delivery}
          </div>
        </div>

        {/* Features */}
        <ul className="flex-1 space-y-2.5 mb-6">
          {plan.features.map(f => (
            <li key={f} className="flex items-start gap-2.5 text-xs md:text-sm text-muted">
              <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              {f}
            </li>
          ))}
          {plan.notIncluded.map(f => (
            <li key={f} className="flex items-start gap-2.5 text-xs text-muted/40">
              <X className="w-4 h-4 flex-shrink-0 mt-0.5" strokeWidth={2} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={`${WA_BASE}${plan.wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex items-center justify-center gap-2 w-full rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
            plan.highlight ? '' : 'py-3 px-6 border border-stroke text-sm text-muted hover:text-text-primary hover:border-accent/40'
          }`}
        >
          {plan.highlight ? (
            <>
              <span
                className="absolute rounded-full pointer-events-none"
                style={{ inset: '-2px', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }}
                aria-hidden
              />
              <span className="relative z-10 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white text-sm font-semibold tracking-wide">
                Cotizar por WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </>
          ) : (
            <>
              Cotizar por WhatsApp
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </a>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROI Calculator
// ─────────────────────────────────────────────────────────────────────────────
const TICKET_OPTIONS = [
  { label: '$300',   value: 300   },
  { label: '$500',   value: 500   },
  { label: '$1,000', value: 1_000 },
  { label: '$2,000', value: 2_000 },
  { label: '$5,000', value: 5_000 },
]

function ROICalculator({ selectedPlan }: { selectedPlan: Plan }) {
  const [ticket, setTicket] = useState(500)

  const NEW_CLIENTS = 2
  const monthsToRecover = Math.ceil(selectedPlan.price / (NEW_CLIENTS * ticket))

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="mt-10 p-6 md:p-8 rounded-3xl border border-stroke bg-surface/30"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-sm font-medium text-text-primary mb-1">
              🧮 Calculadora de retorno de inversión
            </p>
            <p className="text-xs text-muted">
              Plan seleccionado: <span className="text-accent">{selectedPlan.emoji} {selectedPlan.name} (${fmt(selectedPlan.price)} MXN)</span>
            </p>
          </div>

          <div>
            <p className="text-xs text-muted mb-2">¿Cuánto cobra por cliente en promedio?</p>
            <div className="flex flex-wrap gap-2">
              {TICKET_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTicket(opt.value)}
                  className={`px-3 py-1.5 rounded-full border text-xs transition-all duration-200 ${
                    ticket === opt.value
                      ? 'border-accent/60 bg-accent/10 text-text-primary'
                      : 'border-stroke text-muted hover:border-stroke/70 hover:text-text-primary'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 text-center md:text-right">
          <p className="text-[11px] text-muted uppercase tracking-wider mb-1">
            Consiguiendo solo {NEW_CLIENTS} clientes nuevos/mes
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={`${ticket}-${selectedPlan.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-4xl md:text-5xl font-display italic accent-gradient-text leading-none"
            >
              {monthsToRecover === 1 ? '1 mes' : `${monthsToRecover} meses`}
            </motion.p>
          </AnimatePresence>
          <p className="text-xs text-muted mt-1">para recuperar tu inversión</p>
          <p className="text-[10px] text-muted/60 mt-2 max-w-[180px] md:ml-auto">
            Cálculo conservador. Muchos clientes lo recuperan en menos tiempo.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Guarantee section
// ─────────────────────────────────────────────────────────────────────────────
const TRUST_POINTS = [
  'Revisiones incluidas',
  'Sin cargos ocultos',
  'Soporte post-entrega',
]

function GuaranteeSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="mt-10 rounded-3xl border border-emerald-500/25 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(160 60% 10% / 0.6) 0%, hsl(220 30% 8% / 0.8) 100%)' }}
    >
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(160 60% 50% / 0.6), transparent)' }} />

      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">

        {/* Icon */}
        <div
          className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'hsl(160 60% 30% / 0.15)', border: '1px solid hsl(160 60% 50% / 0.25)' }}
        >
          <Shield className="w-8 h-8" style={{ color: 'hsl(160 60% 55%)' }} strokeWidth={1.5} />
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-base font-semibold text-text-primary mb-1">
            Garantía de Satisfacción 100%
          </h4>
          <p className="text-sm text-muted leading-relaxed max-w-md">
            Si el diseño inicial no te convence, lo rehacemos sin costo adicional.
            Tu inversión está protegida desde el primer día.
          </p>
        </div>

        {/* Trust points */}
        <div className="flex-shrink-0 flex flex-row md:flex-col gap-4 md:gap-2">
          {TRUST_POINTS.map(item => (
            <div key={item} className="flex items-center gap-2 text-xs whitespace-nowrap" style={{ color: 'hsl(160 60% 55%)' }}>
              <Check className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2.5} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────────────────────
export default function PreciosSection() {
  const sectionRef        = useRef<HTMLElement>(null)
  const [tab, setTab]     = useState<TabType>('web')

  const plans  = tab === 'web' ? WEB_PLANS : SISTEMA_PLANS
  const hiPlan = plans.find(p => p.highlight) ?? plans[1]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 78%', once: true }
      gsap.from('.precio-header', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',             scrollTrigger: trigger })
      gsap.from('.precio-toggle', { opacity: 0, y: 14, duration: 0.6, ease: 'power3.out', delay: 0.1, scrollTrigger: trigger })
      gsap.from('.precio-grid',   { opacity: 0, y: 22, duration: 0.7, ease: 'power3.out', delay: 0.2, scrollTrigger: trigger })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="precios"
      className="relative py-24 md:py-32 px-4 border-t border-stroke overflow-hidden"
    >
      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.07), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto relative">

        {/* ── Header ── */}
        <div className="precio-header text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Inversión</span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display italic text-text-primary">
            Planes{' '}
            <em className="not-italic accent-gradient-text">transparentes</em>
          </h2>
          <p className="text-sm text-muted mt-3 max-w-lg mx-auto leading-relaxed">
            Precios fijos. Sin letra pequeña, sin cargos ocultos.
            Hosting, dominio y soporte incluidos en todos los planes web.
          </p>
        </div>

        {/* ── Toggle: Web / Sistemas ── */}
        <div className="precio-toggle flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 p-1 rounded-full border border-stroke bg-surface/50">
            {(['web', 'sistemas'] as TabType[]).map(t => (
              <motion.button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-5 py-2 rounded-full text-sm transition-colors duration-200 ${
                  tab === t ? 'text-text-primary' : 'text-muted hover:text-text-primary'
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-full bg-stroke/60"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10">
                  {t === 'web' ? '💼 Proyectos Web' : '⚙️ Sistemas'}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Plan cards grid ── */}
        <div className="precio-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-3 gap-5 md:gap-6 md:items-start"
            >
              {plans.map((plan, i) => (
                <PlanCard key={plan.id} plan={plan} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── ROI Calculator ── */}
        <ROICalculator selectedPlan={hiPlan} />

        {/* ── Guarantee section ── */}
        <GuaranteeSection />

        {/* ── Custom project CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 flex justify-center"
        >
          <a
            href={`${WA_BASE}${encodeURIComponent('Hola, necesito un proyecto personalizado. ¿Pueden hacerme una cotización a medida?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-stroke text-sm text-muted hover:text-text-primary hover:border-accent/40 transition-all duration-200"
          >
            ¿Proyecto a medida? Cotiza sin compromiso
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
