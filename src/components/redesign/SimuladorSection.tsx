import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────
interface Metric {
  icon:       string
  label:      string
  value:      number
  countFrom:  number
  prefix:     string
  suffix:     string
  bar:        number
  isDecimal?: boolean
}

interface Industry {
  id:      string
  emoji:   string
  label:   string
  metrics: [Metric, Metric, Metric, Metric]
  source:  string
}

const INDUSTRIES: Industry[] = [
  {
    id: 'restaurante', emoji: '🍕', label: 'Restaurante',
    source: 'Basado en 8 restaurantes clientes activos de Revolution505',
    metrics: [
      { icon: '👥', label: 'Nuevos clientes/mes',    value: 45,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 55 },
      { icon: '🔍', label: 'Posición en Google',     value: 3,   countFrom: 10,  prefix: 'Top ', suffix: '',   bar: 76 },
      { icon: '📅', label: 'Reservas digitales',     value: 120, countFrom: 0,   prefix: '+',    suffix: '%',  bar: 82 },
      { icon: '💰', label: 'Aumento de ingresos',    value: 30,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 48 },
    ],
  },
  {
    id: 'retail', emoji: '🛍', label: 'Retail',
    source: 'Basado en 12 tiendas clientes activas de Revolution505',
    metrics: [
      { icon: '👥', label: 'Visitas a tienda/web',   value: 60,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 62 },
      { icon: '🛒', label: 'Ventas online',          value: 85,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 75 },
      { icon: '🔍', label: 'Posición en Google',     value: 5,   countFrom: 15,  prefix: 'Top ', suffix: '',   bar: 66 },
      { icon: '💰', label: 'Aumento de ingresos',    value: 40,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 58 },
    ],
  },
  {
    id: 'servicios', emoji: '🔧', label: 'Servicios',
    source: 'Basado en 15 empresas de servicios clientes de Revolution505',
    metrics: [
      { icon: '📞', label: 'Llamadas y contactos',   value: 3,   countFrom: 0,   prefix: '+',    suffix: 'x',  bar: 70 },
      { icon: '📋', label: 'Solicitudes de cot.',    value: 70,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 65 },
      { icon: '🔍', label: 'Posición en Google',     value: 3,   countFrom: 10,  prefix: 'Top ', suffix: '',   bar: 72 },
      { icon: '💰', label: 'Aumento de ingresos',    value: 35,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 52 },
    ],
  },
  {
    id: 'salud', emoji: '💊', label: 'Salud',
    source: 'Basado en clínicas, consultorios y farmacias clientes',
    metrics: [
      { icon: '👥', label: 'Pacientes nuevos',       value: 55,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 58 },
      { icon: '📅', label: 'Citas online',           value: 90,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 80 },
      { icon: '🔍', label: 'Posición en Google',     value: 3,   countFrom: 10,  prefix: 'Top ', suffix: '',   bar: 72 },
      { icon: '⭐', label: 'Calificación Google',    value: 4.8, countFrom: 3.5, prefix: '',     suffix: '★',  bar: 88, isDecimal: true },
    ],
  },
  {
    id: 'legal', emoji: '⚖️', label: 'Despacho',
    source: 'Basado en despachos legales y contables clientes de Revolution505',
    metrics: [
      { icon: '📋', label: 'Consultas recibidas',    value: 80,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 74 },
      { icon: '🔍', label: 'Posición en Google',     value: 3,   countFrom: 10,  prefix: 'Top ', suffix: '',   bar: 70 },
      { icon: '💼', label: 'Nuevos clientes',        value: 45,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 56 },
      { icon: '💰', label: 'Aumento de ingresos',    value: 50,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 64 },
    ],
  },
  {
    id: 'construccion', emoji: '🏗', label: 'Construcción',
    source: 'Basado en constructoras y contratistas clientes de Revolution505',
    metrics: [
      { icon: '📐', label: 'Proyectos cotizados',    value: 40,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 54 },
      { icon: '🔍', label: 'Posición en Google',     value: 5,   countFrom: 15,  prefix: 'Top ', suffix: '',   bar: 62 },
      { icon: '🌐', label: 'Alcance de clientes',    value: 3,   countFrom: 0,   prefix: '+',    suffix: 'x',  bar: 66 },
      { icon: '💰', label: 'Aumento de contratos',   value: 35,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 52 },
    ],
  },
  {
    id: 'educacion', emoji: '📚', label: 'Educación',
    source: 'Basado en escuelas, institutos y academias clientes de Revolution505',
    metrics: [
      { icon: '🎓', label: 'Inscripciones online',   value: 65,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 64 },
      { icon: '👥', label: 'Nuevos estudiantes',     value: 50,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 60 },
      { icon: '🔍', label: 'Posición en Google',     value: 3,   countFrom: 10,  prefix: 'Top ', suffix: '',   bar: 70 },
      { icon: '💰', label: 'Aumento de ingresos',    value: 40,  countFrom: 0,   prefix: '+',    suffix: '%',  bar: 58 },
    ],
  },
  {
    id: 'tecnologia', emoji: '💻', label: 'Tecnología',
    source: 'Basado en startups y empresas tech clientes de Revolution505',
    metrics: [
      { icon: '🌐', label: 'Tráfico web orgánico',    value: 200, countFrom: 0,  prefix: '+',    suffix: '%',  bar: 82 },
      { icon: '💼', label: 'Leads calificados',       value: 4,   countFrom: 0,  prefix: '+',    suffix: 'x',  bar: 76 },
      { icon: '🔍', label: 'Posición en Google',      value: 1,   countFrom: 10, prefix: 'Top ', suffix: '',   bar: 88 },
      { icon: '💰', label: 'Aumento de conversiones', value: 60,  countFrom: 0,  prefix: '+',    suffix: '%',  bar: 70 },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Counter hook — re-runs on every mount (AnimatePresence re-mounts on change)
// ─────────────────────────────────────────────────────────────────────────────
function useSimCounter(target: number, countFrom: number, duration = 1300) {
  const [value, setValue] = useState<number>(countFrom)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    setValue(countFrom)
    const diff  = target - countFrom
    const start = performance.now()

    const tick = (now: number) => {
      const t     = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - t) ** 3
      setValue(countFrom + diff * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else        setValue(target)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, countFrom, duration])

  return value
}

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp URL — contextual message with projected metrics
// ─────────────────────────────────────────────────────────────────────────────
function buildWAUrl(industry: Industry): string {
  const lines = [
    '📊 *Simulador de Resultados — Revolution505*',
    '',
    `🏢 *Mi industria:* ${industry.label}`,
    '',
    '📈 *Proyecciones que vi para mi negocio:*',
    ...industry.metrics.map(m => {
      const val = m.isDecimal
        ? `${m.prefix}${m.value.toFixed(1)}${m.suffix}`
        : `${m.prefix}${m.value}${m.suffix}`
      return `  • ${m.label}: ${val}`
    }),
    '',
    'Me interesa lograr estos resultados. ¿Podemos hablar? 🙏',
  ]
  return `https://wa.me/524423723972?text=${encodeURIComponent(lines.join('\n'))}`
}

// ─────────────────────────────────────────────────────────────────────────────
// WhatsApp icon
// ─────────────────────────────────────────────────────────────────────────────
function WAIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MetricCard
// ─────────────────────────────────────────────────────────────────────────────
function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const raw     = useSimCounter(metric.value, metric.countFrom)
  const display = metric.isDecimal ? raw.toFixed(1) : Math.round(raw).toString()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative bg-surface border border-stroke rounded-3xl p-5 md:p-6 flex flex-col gap-3 overflow-hidden group hover:border-accent/25 transition-colors duration-300"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 20%, hsl(217 91% 60% / 0.09), transparent 65%)' }}
        aria-hidden
      />

      {/* Row: icon + badge */}
      <div className="flex items-center justify-between">
        <span className="text-xl leading-none" aria-hidden>{metric.icon}</span>
        <span className="text-[9px] text-muted/60 uppercase tracking-widest">Proy.</span>
      </div>

      {/* Animated counter */}
      <div className="flex items-baseline gap-0.5 flex-wrap">
        {metric.prefix && (
          <span className="text-xl md:text-2xl font-display italic accent-gradient-text leading-none">
            {metric.prefix}
          </span>
        )}
        <span className="text-4xl md:text-5xl font-display italic accent-gradient-text tabular-nums leading-none">
          {display}
        </span>
        {metric.suffix && (
          <span className="text-xl md:text-2xl font-display italic accent-gradient-text leading-none ml-0.5">
            {metric.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-xs md:text-sm text-muted leading-snug flex-1">{metric.label}</p>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] text-muted/50">Impacto estimado</span>
          <span className="text-[9px] text-accent/70">{metric.bar}%</span>
        </div>
        <div className="h-1 bg-stroke/60 rounded-full overflow-hidden">
          <motion.div
            className="h-full accent-gradient rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${metric.bar}%` }}
            transition={{ duration: 1.2, delay: index * 0.07 + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────────────────────
export default function SimuladorSection() {
  const sectionRef              = useRef<HTMLElement>(null)
  const [activeId, setActiveId] = useState<string>('restaurante')
  const active                  = INDUSTRIES.find(i => i.id === activeId)!

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 76%', once: true }
      gsap.from('.sim-header', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',              scrollTrigger: trigger })
      gsap.from('.sim-body',   { opacity: 0, y: 22, duration: 0.7, ease: 'power3.out', delay: 0.15, scrollTrigger: trigger })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="simulador"
      className="relative py-24 md:py-32 px-4 border-t border-stroke overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.06), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <div className="sim-header mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Simulador de Resultados</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display italic text-text-primary max-w-2xl">
            ¿Qué podría lograr tu negocio{' '}
            <em className="not-italic accent-gradient-text">en línea?</em>
          </h2>
          <p className="text-sm text-muted mt-3 max-w-xl leading-relaxed">
            Selecciona tu industria y ve proyecciones basadas en clientes reales de Revolution505.
            Sin promesas — solo datos.
          </p>
        </div>

        {/* ── Body: two-panel layout ── */}
        <div className="sim-body flex flex-col lg:flex-row gap-6 lg:gap-10">

          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden lg:flex flex-col gap-0.5 w-52 flex-shrink-0">
            <p className="text-[10px] text-muted/60 uppercase tracking-widest mb-3 px-3">
              Elige tu industria
            </p>
            {INDUSTRIES.map(ind => {
              const isActive = ind.id === activeId
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveId(ind.id)}
                  className={`relative flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-muted hover:text-text-primary'
                  }`}
                >
                  {/* Spring background highlight */}
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-bg"
                      className="absolute inset-0 rounded-xl bg-surface/80"
                      style={{ boxShadow: 'inset 0 0 0 1px hsl(217 91% 60% / 0.22)' }}
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10 text-xl flex-shrink-0" aria-hidden>
                    {ind.emoji}
                  </span>
                  <span className="relative z-10 text-sm font-medium">{ind.label}</span>
                  {isActive && (
                    <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full accent-gradient flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </aside>

          {/* ── Horizontal pills (mobile) ── */}
          <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 -mx-4 px-4">
            {INDUSTRIES.map(ind => {
              const isActive = ind.id === activeId
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveId(ind.id)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'border-accent/60 bg-accent/10 text-text-primary font-medium'
                      : 'border-stroke bg-surface/40 text-muted'
                  }`}
                >
                  <span aria-hidden>{ind.emoji}</span>
                  {ind.label}
                </button>
              )
            })}
          </div>

          {/* ── Metrics panel ── */}
          <div className="flex-1 min-w-0">

            {/* Panel headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`head-${activeId}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-3 mb-5"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: 'hsl(217 91% 60% / 0.1)',
                    border:     '1px solid hsl(217 91% 60% / 0.2)',
                  }}
                >
                  {active.emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary leading-tight">
                    Proyecciones para {active.label}
                  </p>
                  <p className="text-[11px] text-muted">
                    Promedio entre clientes activos de Revolution505
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Metric cards — AnimatePresence re-mounts so counters reset */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid grid-cols-2 gap-3 md:gap-4"
              >
                {active.metrics.map((metric, i) => (
                  <MetricCard key={`${activeId}-${i}`} metric={metric} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Source note */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`src-${activeId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.3 }}
                className="text-[11px] text-muted/50 mt-4 leading-relaxed"
              >
                * {active.source}. Resultados varían según caso y mercado.
              </motion.p>
            </AnimatePresence>

            {/* ── CTA contextual ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 md:p-6 rounded-2xl border border-stroke/60 bg-surface/30"
            >
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  ¿Quieres estos resultados para tu {active.label}?
                </p>
                <p className="text-xs text-muted mt-0.5">
                  Cotiza gratis — respuesta en menos de 2 horas.
                </p>
              </div>

              <a
                href={buildWAUrl(active)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
              >
                <span
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '-2px', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }}
                  aria-hidden
                />
                <span className="relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent text-white text-sm font-semibold">
                  <WAIcon />
                  Quiero estos resultados
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
