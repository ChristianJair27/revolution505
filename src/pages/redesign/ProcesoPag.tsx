import { WA } from '../../constants/whatsapp'
import { motion }     from 'framer-motion'
import { ArrowRight }  from 'lucide-react'
import ProcesoSection  from '../../components/redesign/ProcesoSection'
import FAQSection      from '../../components/redesign/FAQSection'
import { usePageMeta } from '../../hooks/usePageMeta'


const STEPS = [
  { num: '01', label: 'Briefing',    top: '15%', left: '4%',   delay: '0s',    anim: 'animate-float-up'   },
  { num: '02', label: 'Diseño',      top: '8%',  left: '25%',  delay: '1s',    anim: 'animate-float-down' },
  { num: '03', label: 'Desarrollo',  top: '18%', right: '20%', delay: '2s',    anim: 'animate-float-up'   },
  { num: '04', label: 'Revisión',    top: '8%',  right: '4%',  delay: '0.5s',  anim: 'animate-float-down' },
  { num: '05', label: 'Lanzamiento', top: '60%', left: '4%',   delay: '1.5s',  anim: 'animate-float-down' },
  { num: '06', label: 'Soporte',     top: '65%', right: '4%',  delay: '2.5s',  anim: 'animate-float-up'   },
]

function ProcesoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Step numbers floating */}
      {STEPS.map(step => (
        <div
          key={step.num}
          className={`absolute ${step.anim}`}
          style={{ top: step.top, left: step.left, right: step.right, animationDelay: step.delay, opacity: 0.12 }}
        >
          <div className="text-center">
            <p
              className="font-display italic leading-none"
              style={{ fontSize: '4.5rem', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {step.num}
            </p>
            <p className="text-xs text-muted uppercase tracking-widest mt-1">{step.label}</p>
          </div>
        </div>
      ))}

      {/* Connecting line (decorative SVG) */}
      <svg
        viewBox="0 0 1200 500"
        className="absolute inset-0 w-full h-full opacity-[0.05]"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path
          d="M 100 200 C 200 200, 300 100, 400 150 C 500 200, 600 300, 700 250 C 800 200, 900 100, 1000 150 C 1050 175, 1100 200, 1150 200"
          fill="none"
          stroke="hsl(217 91% 60%)"
          strokeWidth="2"
          strokeDasharray="8 6"
        />
      </svg>

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] blur-3xl animate-orb-drift"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.08), transparent 70%)' }}
        aria-hidden
      />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent" />
    </div>
  )
}

function ProcesoHero() {
  return (
    <section className="relative min-h-[68vh] flex items-center justify-center overflow-hidden pt-24">
      <ProcesoBackground />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block text-xs text-muted uppercase tracking-[0.3em] mb-6"
        >
          Proceso de Trabajo · Revolution505
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl font-display italic text-text-primary leading-[0.92] mb-6"
        >
          Del concepto{' '}
          <em className="not-italic accent-gradient-text">al lanzamiento</em>
          <br />en tiempo récord
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-sm md:text-base text-muted max-w-lg mx-auto mb-8 leading-relaxed"
        >
          Un proceso claro y transparente en 6 pasos. Tú siempre sabes en qué etapa estamos.
          Sin sorpresas, sin retrasos injustificados.
        </motion.p>

        {/* Timeline pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.48 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {STEPS.map(step => (
            <span
              key={step.num}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stroke/60 bg-surface/40 text-xs text-muted"
            >
              <span className="text-[10px] font-display italic accent-gradient-text">{step.num}</span>
              {step.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={WA.llamada}
            target="_blank" rel="noopener noreferrer"
            className="group relative rounded-full hover:scale-105 transition-transform duration-200"
          >
            <span className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ inset: '-2px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }} aria-hidden />
            <span className="relative z-10 flex items-center gap-2 px-7 py-3.5 rounded-full bg-text-primary text-bg text-sm font-semibold group-hover:bg-bg group-hover:text-text-primary transition-all duration-200">
              Iniciar mi proyecto <ArrowRight className="w-4 h-4" />
            </span>
          </a>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Entrega promedio 12 días hábiles
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
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

export default function ProcesoPag() {
  usePageMeta({
    title:       'Proceso de Trabajo',
    description: 'Proceso claro en 6 pasos — briefing a lanzamiento. Entrega promedio 12 días hábiles. Clientes en Querétaro, México y remoto.',
    canonical:   '/proceso',
  })
  return (
    <>
      <ProcesoHero />
      <ProcesoSection />
      <FAQSection />
    </>
  )
}
