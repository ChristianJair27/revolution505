import { motion }       from 'framer-motion'
import { ArrowRight }    from 'lucide-react'
import SistemasSection   from '../../components/redesign/SistemasSection'
import { usePageMeta }   from '../../hooks/usePageMeta'

const WA = 'https://wa.me/524423723972?text=' +
  encodeURIComponent('Hola, vi la página de Sistemas de Revolution505 y me interesa un sistema a medida. ¿Podemos hablar?')

// ── Puntos de circuito para el SVG animado ──────────────────────────────────
const CIRCUIT_PATHS = [
  'M 50 200 L 200 200 L 200 100 L 400 100',
  'M 400 100 L 600 100 L 600 300 L 800 300',
  'M 800 300 L 900 300 L 900 150 L 1100 150',
  'M 100 400 L 300 400 L 300 500 L 500 500',
  'M 500 500 L 700 500 L 700 350 L 900 350',
  'M 200 600 L 400 600 L 400 450 L 600 450',
  'M 600 450 L 750 450 L 750 600 L 950 600',
  'M 0 500 L 150 500 L 150 650 L 350 650',
  'M 950 200 L 1100 200 L 1100 400',
]

const DOT_POSITIONS = [
  { cx: 200, cy: 100 }, { cx: 400, cy: 100 }, { cx: 600, cy: 100 },
  { cx: 600, cy: 300 }, { cx: 800, cy: 300 }, { cx: 900, cy: 150 },
  { cx: 300, cy: 400 }, { cx: 500, cy: 500 }, { cx: 700, cy: 350 },
  { cx: 750, cy: 450 }, { cx: 150, cy: 500 }, { cx: 950, cy: 200 },
]

function CircuitBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1200 700"
        className="absolute inset-0 w-full h-full opacity-[0.13]"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        {/* Circuit paths — drawn with CSS animation */}
        {CIRCUIT_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="hsl(217 91% 60%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1000"
            style={{
              animation: `circuit-trace ${4 + i * 0.6}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
        {/* Junction dots */}
        {DOT_POSITIONS.map((pos, i) => (
          <circle
            key={i}
            cx={pos.cx} cy={pos.cy} r="4"
            fill="hsl(217 91% 60%)"
            style={{
              animation: `dot-pulse ${2 + (i % 3)}s ease-in-out ${i * 0.35}s infinite`,
            }}
          />
        ))}
      </svg>

      {/* Corner accent gradient */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] blur-3xl"
        style={{ background: 'radial-gradient(ellipse at top right, hsl(217 91% 60% / 0.1), transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] blur-3xl"
        style={{ background: 'radial-gradient(ellipse at bottom left, hsl(217 91% 60% / 0.06), transparent 70%)' }}
      />

      {/* Edge fades */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />
    </div>
  )
}

function SistemasHero() {
  const PILLS = ['POS Restaurante', 'POS Comercio', 'Sistema Reservas', 'CRM', 'Plataforma Streaming']

  return (
    <section className="relative min-h-[68vh] flex items-center justify-center overflow-hidden pt-24">
      <CircuitBackground />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block text-xs text-muted uppercase tracking-[0.3em] mb-6"
        >
          Sistemas a Medida · Revolution505
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl font-display italic text-text-primary leading-[0.92] mb-6"
        >
          Sistemas que{' '}
          <em className="not-italic accent-gradient-text">automatizan</em>
          <br />tu negocio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-sm md:text-base text-muted max-w-lg mx-auto mb-8 leading-relaxed"
        >
          POS, CRM, reservas y plataformas. Código tuyo, sin mensualidades.
          Integración completa con tu operación actual.
        </motion.p>

        {/* System type pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {PILLS.map((pill, i) => (
            <span
              key={pill}
              className="px-3 py-1.5 rounded-full border border-accent/20 bg-accent/8 text-xs text-accent"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {pill}
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
            href={WA}
            target="_blank" rel="noopener noreferrer"
            className="group relative rounded-full hover:scale-105 transition-transform duration-200"
          >
            <span className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ inset: '-2px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }} aria-hidden />
            <span className="relative z-10 flex items-center gap-2 px-7 py-3.5 rounded-full bg-text-primary text-bg text-sm font-semibold group-hover:bg-bg group-hover:text-text-primary transition-all duration-200">
              Ver sistemas disponibles <ArrowRight className="w-4 h-4" />
            </span>
          </a>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Sin mensualidades · Código tuyo
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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

export default function SistemasPage() {
  usePageMeta({
    title:       'Sistemas a Medida',
    description: 'POS para restaurantes y comercios, sistemas de reservas, CRM empresarial y plataformas streaming en Querétaro. Sin mensualidades — el código es tuyo.',
    canonical:   '/sistemas',
  })
  return (
    <>
      <SistemasHero />
      <SistemasSection />
    </>
  )
}
