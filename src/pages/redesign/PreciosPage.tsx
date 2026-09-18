import { WA } from '../../constants/whatsapp'
import { motion }        from 'framer-motion'
import { ArrowRight }     from 'lucide-react'
import SimuladorSection   from '../../components/redesign/SimuladorSection'
import PreciosSection     from '../../components/redesign/PreciosSection'
import { usePageMeta }    from '../../hooks/usePageMeta'


// ── Floating price tokens ────────────────────────────────────────────────────
const PRICE_TOKENS = [
  { label: 'Plan Esencial',     value: '$6,500',  top: '18%', left: '6%',   delay: '0s',   anim: 'animate-float-up'   },
  { label: 'Plan Profesional',  value: '$12,500', top: '12%', right: '8%',  delay: '1.2s', anim: 'animate-float-down' },
  { label: 'Sistema POS',       value: '$18,000', top: '62%', left: '3%',   delay: '2.4s', anim: 'animate-float-down' },
  { label: 'Plan Premium',      value: '$22,500', top: '65%', right: '5%',  delay: '0.8s', anim: 'animate-float-up'   },
  { label: 'Sis. Reservas',     value: '$16,000', top: '38%', right: '2%',  delay: '1.8s', anim: 'animate-drift-x'    },
]

function PricesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Drifting orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-orb-drift"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.12), transparent 70%)' }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl animate-orb-drift"
        style={{ background: 'radial-gradient(ellipse, hsl(217 80% 70% / 0.08), transparent 70%)', animationDelay: '6s', animationDirection: 'reverse' }}
        aria-hidden
      />

      {/* Floating price tokens */}
      {PRICE_TOKENS.map((token, i) => (
        <div
          key={i}
          className={`absolute ${token.anim}`}
          style={{ top: token.top, left: token.left, right: token.right, animationDelay: token.delay, opacity: 0.22 }}
        >
          <div className="px-4 py-2.5 rounded-2xl border border-accent/30 bg-surface/80 backdrop-blur-sm">
            <p className="text-[10px] text-muted whitespace-nowrap">{token.label}</p>
            <p className="text-lg font-display italic accent-gradient-text leading-tight">{token.value}</p>
            <p className="text-[9px] text-muted">MXN</p>
          </div>
        </div>
      ))}

      {/* Grid dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(217 91% 60%) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  )
}

function PreciosHero() {
  const STATS = [
    { value: 'Fijo',  label: 'Sin letra pequeña' },
    { value: '100%',  label: 'Transparente'       },
    { value: '30d',   label: 'Soporte incluido'   },
  ]

  return (
    <section className="relative min-h-[68vh] flex items-center justify-center overflow-hidden pt-24">
      <PricesBackground />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block text-xs text-muted uppercase tracking-[0.3em] mb-6"
        >
          Precios · Revolution505
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl font-display italic text-text-primary leading-[0.92] mb-6"
        >
          Inversión{' '}
          <em className="not-italic accent-gradient-text">transparente</em>,
          <br />resultados garantizados
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-sm md:text-base text-muted max-w-lg mx-auto mb-8 leading-relaxed"
        >
          Precios fijos, sin cargos ocultos. Hosting, dominio y soporte incluidos.
          Paga una vez — el código es tuyo para siempre.
        </motion.p>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-display italic accent-gradient-text">{s.value}</p>
              <p className="text-[10px] text-muted mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={WA.precios}
            target="_blank" rel="noopener noreferrer"
            className="group relative rounded-full hover:scale-105 transition-transform duration-200"
          >
            <span className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ inset: '-2px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }} aria-hidden />
            <span className="relative z-10 flex items-center gap-2 px-7 py-3.5 rounded-full bg-text-primary text-bg text-sm font-semibold group-hover:bg-bg group-hover:text-text-primary transition-all duration-200">
              Cotizar ahora <ArrowRight className="w-4 h-4" />
            </span>
          </a>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Respuesta en menos de 2 horas
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

export default function PreciosPage() {
  usePageMeta({
    title:       'Precios y Planes',
    description: 'Planes web desde $6,500 MXN — Querétaro, México y remoto. Sin letra pequeña. Hosting y soporte incluidos. Cotiza por correo o WhatsApp.',
    canonical:   '/precios',
  })
  return (
    <>
      <PreciosHero />
      <SimuladorSection />
      <PreciosSection />
    </>
  )
}
