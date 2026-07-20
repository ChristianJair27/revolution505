import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// useCounter — smooth animated number from 0 → target when enabled
// ─────────────────────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, enabled = false) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled) return
    setValue(0)
    const start = performance.now()

    const tick = (now: number) => {
      const t      = Math.min((now - start) / duration, 1)
      const eased  = 1 - (1 - t) ** 3
      setValue(Math.round(eased * target))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, enabled])

  return value
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { icon: '📦', value: 95,  suffix: '+', label: 'Proyectos entregados'      },
  { icon: '⭐', value: 100, suffix: '%', label: 'Clientes satisfechos'      },
  { icon: '📅', value: 3,   suffix: '+', label: 'Años de experiencia'       },
  { icon: '⚡', value: 2,   suffix: 'h', label: 'Tiempo de respuesta máx.' },
]

const TESTIMONIALS = [
  {
    name:        'Alejandro Suárez',
    role:        'Director General',
    company:     'AMQ Group',
    logo:        '/assets/amq-logo.png',
    quote:       'Revolution505 transformó completamente nuestra presencia digital. En los primeros 3 meses duplicamos los leads desde la web. Su equipo entiende el negocio, no solo el código.',
    metric:      '+340%',
    metricLabel: 'leads orgánicos',
    rating:      5,
    badge:       'Corporativo + CRM',
  },
  {
    name:        'Regina Romero',
    role:        'CEO & Fundadora',
    company:     'FlyZZ Services',
    logo:        '/assets/FLYZZ-logo.png',
    quote:       'El sistema POS que nos desarrollaron cambió completamente nuestra operación diaria. Ahora procesamos el doble en el mismo tiempo. Comunicación constante y resultados reales.',
    metric:      '+200%',
    metricLabel: 'eficiencia operativa',
    rating:      5,
    badge:       'Sistema POS + Web',
  },
  {
    name:        'Samir T.',
    role:        'Fundador',
    company:     'Spartan TV',
    logo:        null,
    quote:       'La implementación de nuestro panel de streaming fue impecable. Gran atención al detalle, cumplieron tiempos y los resultados superaron mis expectativas. Altamente recomendados.',
    metric:      '500+',
    metricLabel: 'suscriptores activos',
    rating:      5,
    badge:       'Plataforma Streaming',
  },
]

// Framer Motion variants
const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

// ─────────────────────────────────────────────────────────────────────────────
// StatItem — single counter card
// ─────────────────────────────────────────────────────────────────────────────
interface StatItemProps {
  icon:    string
  value:   number
  suffix:  string
  label:   string
  enabled: boolean
  delay:   number
}

function StatItem({ icon, value, suffix, label, enabled, delay }: StatItemProps) {
  const count = useCounter(value, 1600, enabled)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={enabled ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center text-center p-6 rounded-3xl border border-stroke bg-surface/40 hover:border-accent/25 hover:bg-surface/60 transition-all duration-300"
    >
      <span className="text-2xl mb-3" aria-hidden>{icon}</span>
      <div className="flex items-baseline gap-0.5">
        <span className="text-4xl md:text-5xl font-display italic accent-gradient-text tabular-nums leading-none">
          {count}
        </span>
        <span className="text-2xl md:text-3xl font-display italic accent-gradient-text leading-none">
          {suffix}
        </span>
      </div>
      <span className="text-xs text-muted mt-2 leading-snug max-w-[120px]">{label}</span>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TestimonialCard
// ─────────────────────────────────────────────────────────────────────────────
interface CardProps {
  t:     (typeof TESTIMONIALS)[number]
  index: number
}

function TestimonialCard({ t, index }: CardProps) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="flex flex-col bg-surface border border-stroke hover:border-accent/25 rounded-3xl p-7 md:p-8 transition-colors duration-300 hover:shadow-lg hover:shadow-accent/5 group"
    >
      {/* Top row: badge + logo */}
      <div className="flex items-start justify-between mb-6">
        <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] text-accent font-medium uppercase tracking-wider">
          {t.badge}
        </span>
        {t.logo ? (
          <img
            src={t.logo}
            alt={t.company}
            className="w-10 h-10 rounded-xl object-contain bg-bg border border-stroke p-1 flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-surface border border-stroke flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-display italic text-muted leading-none">
              {t.company.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Metric — the star of the card */}
      <div className="mb-5">
        <p className="text-5xl md:text-6xl font-display italic accent-gradient-text leading-none mb-1">
          {t.metric}
        </p>
        <p className="text-xs text-muted uppercase tracking-[0.15em]">{t.metricLabel}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-stroke mb-5" />

      {/* Quote */}
      <blockquote className="text-sm md:text-base text-muted leading-relaxed flex-1 mb-5">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Divider */}
      <div className="w-full h-px bg-stroke mb-5" />

      {/* Footer: stars + author */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-text-primary">{t.name}</p>
          <p className="text-xs text-muted mt-0.5">{t.role}, {t.company}</p>
        </div>
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </motion.article>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function TestimoniosSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 })

  // GSAP ScrollTrigger for section header
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.test-header', {
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative py-24 md:py-32 px-4 border-t border-stroke overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[500px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.05), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <div className="test-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Clientes Satisfechos</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display italic text-text-primary">
              Resultados que{' '}
              <em className="not-italic accent-gradient-text">hablan solos</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-lg leading-relaxed">
              No vendemos promesas. Estos son los resultados reales de nuestros clientes.
            </p>
          </div>
          {/* Google rating badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-text-primary font-medium">5.0</span>
            <span className="text-xs text-muted">en Google</span>
          </div>
        </div>

        {/* ── Stats row (with animated counters) ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-14 md:mb-16"
        >
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              {...stat}
              enabled={statsInView}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* ── Testimonial cards ── */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted mb-4">
            ¿Quieres ser el siguiente caso de éxito?
          </p>
          <a
            href="https://wa.me/524423723972?text=Hola%2C%20vi%20los%20testimonios%20y%20quiero%20lograr%20resultados%20similares%20para%20mi%20negocio."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stroke text-sm text-muted hover:text-text-primary hover:border-accent/40 transition-all duration-200"
          >
            Empezar mi proyecto →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
