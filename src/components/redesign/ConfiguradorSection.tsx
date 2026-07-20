import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type AnswerKey = 'industry' | 'goal' | 'brand' | 'timeline' | 'budget'
type Answers   = Partial<Record<AnswerKey, string>>

interface Option {
  emoji: string
  label: string
  value: string
  desc:  string
}

interface StepDef {
  key:     AnswerKey
  title:   string
  sub:     string
  options: Option[]
  cols:    string   // Tailwind grid-cols responsive class
}

interface Proposal {
  plan:     string
  price:    string
  delivery: string
  urgency:  string
  features: string[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Steps data
// ─────────────────────────────────────────────────────────────────────────────
const STEPS: StepDef[] = [
  {
    key:   'industry',
    title: '¿Cuál es tu giro de negocio?',
    sub:   'Lo usamos para diseñar algo perfecto para tu industria.',
    cols:  'grid-cols-2 sm:grid-cols-4',
    options: [
      { emoji: '🍕', label: 'Restaurante',    value: 'Restaurante',          desc: 'Comida y bebida'       },
      { emoji: '⚖️', label: 'Despacho',       value: 'Despacho legal',       desc: 'Jurídico / contable'  },
      { emoji: '🛍',  label: 'Retail',         value: 'Tienda / Retail',      desc: 'Comercio al menudeo'  },
      { emoji: '💊', label: 'Salud',           value: 'Salud',                desc: 'Clínica / farmacia'   },
      { emoji: '🏗',  label: 'Construcción',   value: 'Construcción',         desc: 'Servicios de obra'    },
      { emoji: '💻', label: 'Tecnología',      value: 'Tecnología',           desc: 'Software / TI'        },
      { emoji: '🎨', label: 'Creativo',        value: 'Creativo',             desc: 'Diseño / arte / moda' },
      { emoji: '📦', label: 'Otro',            value: 'Otro negocio',         desc: 'Cuéntame en WhatsApp' },
    ],
  },
  {
    key:   'goal',
    title: '¿Qué objetivo principal tiene tu sitio?',
    sub:   'Cada elemento será diseñado para lograr exactamente esto.',
    cols:  'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    options: [
      { emoji: '📞', label: 'Generar contacto',  value: 'Generar llamadas o contacto',    desc: 'Quiero que me contacten'   },
      { emoji: '🛒', label: 'Vender en línea',   value: 'Vender productos en línea',      desc: 'E-commerce y catálogo'     },
      { emoji: '📋', label: 'Portafolio',        value: 'Mostrar portafolio y trabajo',   desc: 'Proyectos o servicios'     },
      { emoji: '📅', label: 'Agendar citas',     value: 'Recibir reservas o citas',       desc: 'Sistema de agenda online'  },
      { emoji: '📍', label: 'Presencia local',   value: 'Aparecer en Google local',       desc: 'SEO y búsquedas locales'   },
      { emoji: '🎯', label: 'Otro objetivo',     value: 'Otro objetivo específico',       desc: 'Lo explico por WhatsApp'   },
    ],
  },
  {
    key:   'brand',
    title: '¿Tienes logo e identidad visual?',
    sub:   'Así sabemos si necesitamos diseño gráfico desde cero.',
    cols:  'grid-cols-1 sm:grid-cols-3',
    options: [
      { emoji: '✅', label: 'Tengo todo',     value: 'Logo, colores y tipografía definidos',    desc: 'Logo + colores + tipografía' },
      { emoji: '🔧', label: 'Solo el logo',   value: 'Tengo logo, pero nada más',               desc: 'Logo básico, sin más'       },
      { emoji: '❌', label: 'Nada todavía',   value: 'Necesito diseño de identidad completo',   desc: 'Empezamos desde cero'       },
    ],
  },
  {
    key:   'timeline',
    title: '¿Cuándo necesitas estar en línea?',
    sub:   'Ajustamos el plan para que cumplas tu fecha.',
    cols:  'grid-cols-2',
    options: [
      { emoji: '⚡', label: 'En 1 semana',   value: 'En 1 semana (urgente)',  desc: 'Prioridad máxima'          },
      { emoji: '📅', label: '2 - 3 semanas', value: 'En 2 a 3 semanas',      desc: 'El tiempo más habitual'    },
      { emoji: '🗓',  label: 'En 1 mes',     value: 'En 1 mes aproximado',   desc: 'Sin tanto apuro'           },
      { emoji: '🔮', label: 'Sin prisa',     value: 'Sin fecha definida',    desc: 'Cuando esté perfecto'      },
    ],
  },
  {
    key:   'budget',
    title: '¿Cuál es tu presupuesto aproximado?',
    sub:   'Somos 100% transparentes — sin letras pequeñas.',
    cols:  'grid-cols-2',
    options: [
      { emoji: '💚', label: '$5K — $10K MXN',       value: '$5,000 – $10,000 MXN',              desc: 'Landing / sitio básico'            },
      { emoji: '💛', label: '$10K — $20K MXN',      value: '$10,000 – $20,000 MXN',             desc: 'Sitio completo / sistema básico'   },
      { emoji: '🔵', label: '$20K — $40K MXN',      value: '$20,000 – $40,000 MXN',             desc: 'Plataforma avanzada / POS / CRM'   },
      { emoji: '🔑', label: 'Inversión abierta',    value: 'Inversión abierta — quiero lo mejor', desc: 'Lo que requiera para hacerlo bien' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Slide animation variants (slide + blur for cinematic feel)
// ─────────────────────────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({
    x:       dir > 0 ? 52 : -52,
    opacity: 0,
    filter:  'blur(6px)',
  }),
  center: {
    x:       0,
    opacity: 1,
    filter:  'blur(0px)',
    transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: (dir: number) => ({
    x:       dir > 0 ? -52 : 52,
    opacity: 0,
    filter:  'blur(6px)',
    transition: { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

// ─────────────────────────────────────────────────────────────────────────────
// Proposal generation logic
// ─────────────────────────────────────────────────────────────────────────────
function buildProposal(answers: Required<Answers>): Proposal {
  const { budget, goal, brand, timeline, industry } = answers

  // Plan + price based on budget
  let plan  = 'Plan Esencial'
  let price = '$6,500 MXN'

  if (budget.includes('10,000')) { plan = 'Plan Profesional'; price = '$12,500 MXN' }
  if (budget.includes('20,000')) { plan = 'Plan Premium';     price = '$22,500 MXN' }
  if (budget.includes('abierta')) { plan = 'Plan a Medida';   price = 'Cotización personalizada' }

  // Bump plan if goal requires more features
  if (goal.includes('línea')    && plan === 'Plan Esencial') { plan = 'Plan Profesional'; price = '$12,500 MXN' }
  if (goal.includes('reservas') && plan === 'Plan Esencial') { plan = 'Plan Profesional'; price = '$12,500 MXN' }

  // Delivery time
  let delivery = '10-15 días hábiles'
  let urgency  = ''
  if (timeline.includes('urgente'))  { delivery = '5-7 días hábiles'; urgency = '(entrega urgente)' }
  if (timeline.includes('2 a 3'))    { delivery = '10-15 días hábiles' }
  if (timeline.includes('1 mes'))    { delivery = '15-20 días hábiles' }
  if (timeline.includes('definida')) { delivery = '15-20 días hábiles (calidad máxima)' }

  // Smart features based on answers
  const features: string[] = [
    `Diseño UX/UI personalizado para ${industry}`,
    'Versión móvil perfecta (responsive 100%)',
    'SEO on-page — aparecer en Google',
    'Hosting + dominio incluido 1 año',
    'Integración WhatsApp + redes sociales',
  ]
  if (goal.includes('línea'))     features.splice(2, 0, 'Tienda online con catálogo y pagos')
  if (goal.includes('reservas'))  features.splice(2, 0, 'Sistema de reservas / agenda online')
  if (goal.includes('portafolio')) features.splice(2, 0, 'Galería de proyectos y casos de éxito')
  if (goal.includes('Google'))    features.push('Google Business Profile configurado')
  if (goal.includes('llamadas'))  features.push('CTAs optimizados para generar contacto directo')
  if (brand.includes('cero'))     features.push('Diseño de logotipo + paleta de colores')
  if (plan !== 'Plan Esencial')   features.push('Panel administrable (CMS) sin saber programar')
  if (plan === 'Plan Premium' || plan === 'Plan a Medida') features.push('Integraciones avanzadas y reportes')

  return { plan, price, delivery, urgency, features }
}

function buildWAUrl(answers: Required<Answers>, proposal: Proposal): string {
  const lines = [
    '🎯 *Configurador Revolution505 — Mi Propuesta*',
    '',
    `🏢 *Giro:* ${answers.industry}`,
    `🎯 *Objetivo:* ${answers.goal}`,
    `🎨 *Identidad visual:* ${answers.brand}`,
    `📅 *Cuándo lo necesito:* ${answers.timeline}`,
    `💰 *Presupuesto:* ${answers.budget}`,
    '',
    `📦 *Plan sugerido:* ${proposal.plan}`,
    `💵 *Estimado:* ${proposal.price}`,
    `⏱ *Entrega:* ${proposal.delivery}`,
    '',
    '¿Podemos avanzar con esta propuesta? 🙏',
  ]
  return `https://wa.me/524423723972?text=${encodeURIComponent(lines.join('\n'))}`
}

// ─────────────────────────────────────────────────────────────────────────────
// OptionCard
// ─────────────────────────────────────────────────────────────────────────────
interface OptionCardProps {
  opt:       Option
  selected:  boolean
  onSelect:  () => void
}

function OptionCard({ opt, selected, onSelect }: OptionCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      className={`relative text-left p-4 md:p-5 rounded-2xl border transition-all duration-200 ${
        selected
          ? 'border-accent/60 bg-accent/10 text-text-primary'
          : 'border-stroke bg-surface/40 text-muted hover:border-stroke/70 hover:bg-surface/60 hover:text-text-primary'
      }`}
    >
      {/* Animated highlight bg */}
      {selected && (
        <motion.span
          layoutId="option-selected"
          className="absolute inset-0 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.1), transparent)' }}
          transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
        />
      )}

      <span className="relative z-10 block">
        {/* Emoji */}
        <span className="text-2xl md:text-3xl block mb-2.5" aria-hidden>{opt.emoji}</span>

        {/* Label */}
        <span className="block text-sm font-semibold leading-tight mb-1">{opt.label}</span>

        {/* Description */}
        <span className="block text-[11px] text-muted leading-snug">{opt.desc}</span>

        {/* Check indicator */}
        <AnimatePresence>
          {selected && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-white" strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Proposal result screen
// ─────────────────────────────────────────────────────────────────────────────
interface ProposalScreenProps {
  answers:  Required<Answers>
  onReset:  () => void
}

function ProposalScreen({ answers, onReset }: ProposalScreenProps) {
  const proposal = buildProposal(answers)
  const waUrl    = buildWAUrl(answers, proposal)

  const summaryTags = [
    answers.industry, answers.goal, answers.brand, answers.timeline,
  ].filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
          className="text-4xl block"
          aria-hidden
        >
          🎯
        </motion.span>
        <h3 className="text-xl md:text-2xl font-display italic text-text-primary">
          Tu propuesta está lista
        </h3>
        <p className="text-xs text-muted">Revolution505 Tech Solutions</p>
      </div>

      {/* Answer summary chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {summaryTags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-surface border border-stroke text-[11px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Proposal card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="relative rounded-3xl border border-accent/30 bg-surface overflow-hidden"
      >
        {/* Gradient accent bar at top */}
        <div className="h-1 w-full accent-gradient" />

        <div className="p-6 md:p-8 space-y-6">
          {/* Plan + price row */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] block mb-1">Plan recomendado</span>
              <p className="text-xl md:text-2xl font-display italic text-text-primary">{proposal.plan}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted uppercase tracking-[0.2em] block mb-1">Inversión estimada</span>
              <p className="text-xl md:text-2xl font-display italic accent-gradient-text">{proposal.price}</p>
            </div>
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-bg/60 border border-stroke/50">
            <span className="text-lg" aria-hidden>⏱</span>
            <div>
              <span className="block text-[10px] text-muted uppercase tracking-wider">Tiempo de entrega</span>
              <span className="block text-sm font-medium text-text-primary mt-0.5">
                {proposal.delivery}{' '}
                {proposal.urgency && (
                  <span className="text-accent text-[11px]">{proposal.urgency}</span>
                )}
              </span>
            </div>
          </div>

          {/* Features list */}
          <div>
            <p className="text-[10px] text-muted uppercase tracking-[0.2em] mb-3">Lo que incluye tu propuesta</p>
            <motion.ul className="space-y-2.5">
              {proposal.features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.055, duration: 0.3 }}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-accent" strokeWidth={2.5} />
                  </span>
                  {f}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>

      {/* CTAs */}
      <div className="space-y-3">
        {/* Primary: WhatsApp */}
        <motion.a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="group relative flex items-center justify-center gap-2.5 w-full rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        >
          <span
            className="absolute rounded-full pointer-events-none"
            style={{ inset: '-2px', background: 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)' }}
            aria-hidden
          />
          <span className="relative z-10 w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-accent text-white text-sm font-medium">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enviar propuesta por WhatsApp
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </motion.a>

        {/* Secondary: reset */}
        <motion.button
          onClick={onReset}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-stroke text-sm text-muted hover:text-text-primary hover:border-stroke/70 transition-colors duration-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reconfigurar desde el inicio
        </motion.button>
      </div>

      {/* Trust */}
      <p className="text-center text-[10px] text-muted/70">
        🛡 Sin compromiso · Respuesta garantizada en &lt;2 horas
      </p>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function ConfiguradorSection() {
  const sectionRef               = useRef<HTMLElement>(null)
  const [step,      setStep]     = useState(0)         // 0..4 = questions, 5 = result
  const [direction, setDirection]= useState(1)          // 1 forward, -1 backward
  const [answers,   setAnswers]  = useState<Answers>({})

  const TOTAL    = STEPS.length   // 5
  const current  = STEPS[step]
  const selected = current ? answers[current.key] : undefined
  const progress = Math.round(((step) / TOTAL) * 100)

  const select = useCallback((value: string) => {
    if (!current) return
    setAnswers(prev => ({ ...prev, [current.key]: value }))
  }, [current])

  const goNext = useCallback(() => {
    setDirection(1)
    setStep(s => s + 1)
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)
    setStep(s => s - 1)
  }, [])

  const reset = useCallback(() => {
    setAnswers({})
    setDirection(-1)
    setStep(0)
  }, [])

  // GSAP entrance for section header
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.config-header', {
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
      gsap.from('.config-card', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const isResult = step >= TOTAL

  return (
    <section
      ref={sectionRef}
      id="configurador"
      className="relative py-24 md:py-32 px-4 border-t border-stroke overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[400px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.06), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto relative">

        {/* ── Section header ── */}
        <div className="config-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Configurador Rápido</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display italic text-text-primary">
              Diseña tu proyecto{' '}
              <em className="not-italic accent-gradient-text">en minutos</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-lg leading-relaxed">
              5 preguntas inteligentes. Al final generamos tu propuesta personalizada
              y la enviamos directo a WhatsApp.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {['⚡ Tarda 2 minutos', '🎯 Propuesta personalizada', '📲 Directo a WhatsApp'].map(b => (
              <span key={b} className="px-3 py-1.5 rounded-full border border-stroke bg-surface/40 text-xs text-muted">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ── Main card ── */}
        <div className="config-card max-w-3xl mx-auto">
          <div className="bg-surface/50 border border-stroke rounded-3xl p-6 md:p-10 relative overflow-hidden">

            {/* Card inner glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 blur-2xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.08), transparent 70%)' }}
              aria-hidden
            />

            {/* ── Progress bar + step counter ── */}
            {!isResult && (
              <div className="relative mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-muted">
                    Paso <span className="text-text-primary font-medium">{step + 1}</span> de {TOTAL}
                  </span>
                  <span className="text-[11px] text-muted">{progress}% completado</span>
                </div>
                <div className="h-1.5 bg-stroke/60 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full accent-gradient rounded-full"
                    animate={{ width: `${Math.max(((step + 1) / TOTAL) * 100, 8)}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
                {/* Step dots */}
                <div className="flex justify-between mt-2.5 px-0.5">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i < step ? 'bg-accent' : i === step ? 'bg-accent scale-125' : 'bg-stroke'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Animated content area ── */}
            <AnimatePresence mode="wait" custom={direction}>
              {isResult ? (
                <motion.div key="result">
                  <ProposalScreen
                    answers={answers as Required<Answers>}
                    onReset={reset}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Question */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-display italic text-text-primary leading-tight">
                      {current.title}
                    </h3>
                    <p className="text-sm text-muted mt-2">{current.sub}</p>
                  </div>

                  {/* Options grid */}
                  <div className={`grid gap-2.5 md:gap-3 ${current.cols}`}>
                    {current.options.map(opt => (
                      <OptionCard
                        key={opt.value}
                        opt={opt}
                        selected={selected === opt.value}
                        onSelect={() => select(opt.value)}
                      />
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-2">
                    {/* Back button */}
                    {step > 0 ? (
                      <button
                        onClick={goBack}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-stroke text-sm text-muted hover:text-text-primary hover:border-stroke/70 transition-colors duration-200"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Anterior
                      </button>
                    ) : (
                      <div />
                    )}

                    {/* Next / Finish button */}
                    <motion.button
                      onClick={goNext}
                      disabled={!selected}
                      whileTap={selected ? { scale: 0.97 } : {}}
                      className={`group relative rounded-full transition-all duration-200 ${
                        selected ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                      }`}
                    >
                      {selected && (
                        <span
                          className="absolute rounded-full pointer-events-none"
                          style={{ inset: '-2px', background: 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)' }}
                          aria-hidden
                        />
                      )}
                      <span className={`relative z-10 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                        selected
                          ? 'bg-accent text-white'
                          : 'bg-surface border border-stroke text-muted'
                      }`}>
                        {step === TOTAL - 1 ? 'Ver mi propuesta' : 'Siguiente'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Below card note */}
          {!isResult && (
            <p className="text-center text-[11px] text-muted mt-4">
              Puedes navegar entre pasos libremente · Sin registro necesario
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
