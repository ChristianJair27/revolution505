import { motion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Client data — real assets + professional mockups
// ─────────────────────────────────────────────────────────────────────────────
interface Client {
  name:     string
  logo?:    string
  industry: string
  initials: string
}

const CLIENTS: Client[] = [
  { name: 'AMQ Group',             logo: '/assets/amq-logo.png',    industry: 'Construcción',  initials: 'AMQ' },
  { name: 'FlyZZ Services',        logo: '/assets/FLYZZ-logo.png',  industry: 'Servicios',     initials: 'FLZ' },
  { name: 'Peña Abogados',         logo: '/assets/pena-logo.png',   industry: 'Legal',         initials: 'PA'  },
  { name: 'AtakGG',                logo: '/assets/atakgg-logo.png', industry: 'Gaming',        initials: 'AGG' },
  { name: 'Spartan TV',            logo: '/assets/iptv-logo.png',   industry: 'Streaming',     initials: 'SPT' },
  { name: 'Devilish Store',        industry: 'Moda / Retail',       initials: 'DVL' },
  { name: 'Nexus Dental',          industry: 'Salud',               initials: 'NDT' },
  { name: 'CasaFlex',              industry: 'Inmobiliaria',        initials: 'CFX' },
  { name: 'La Que Cura Farmacia',  industry: 'Farmacia',            initials: 'LQC' },
  { name: 'Cielito Restaurantes',  industry: 'Gastronomía',         initials: 'CRT' },
  { name: 'Vitae Nutrición',       industry: 'Salud',               initials: 'VTN' },
]

// Result stats for Row 2
const STATS = [
  '+340% leads',  'Top 3 Google',  '+200% eficiencia',  '$180K+ ventas',
  '500+ usuarios', '+80% consultas', '+180% citas online', '+240% leads/mes',
  '1,200+ SKUs',   '-92% merma',     '24 consolas ctrl.',  '100% automatizado',
  '+420% tráfico', '4.9★ Google',    '-85% llamadas perd.','+55% pacientes',
]

// ─────────────────────────────────────────────────────────────────────────────
// Single client card
// ─────────────────────────────────────────────────────────────────────────────
function ClientCard({ client }: { client: Client }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 mx-2 rounded-2xl border border-stroke/50 bg-surface/30 hover:border-accent/25 hover:bg-surface/60 transition-all duration-300 cursor-default select-none group">
      {client.logo ? (
        /* Real logo */
        <img
          src={client.logo}
          alt={client.name}
          className="h-7 w-auto max-w-[88px] object-contain opacity-50 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-400"
          draggable={false}
          loading="lazy"
        />
      ) : (
        /* Initials badge fallback */
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'hsl(217 91% 60% / 0.12)', border: '1px solid hsl(217 91% 60% / 0.2)' }}
        >
          <span className="text-[9px] font-bold accent-gradient-text">{client.initials}</span>
        </div>
      )}

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted group-hover:text-text-primary transition-colors duration-200 whitespace-nowrap">
          {client.name}
        </p>
        <p className="text-[9px] text-muted/50 whitespace-nowrap hidden sm:block">{client.industry}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function ClientsMarquee() {
  // Duplicate for seamless infinite loop
  const row1 = [...CLIENTS, ...CLIENTS]
  const row2 = [...STATS,   ...STATS  ]

  return (
    <section className="relative py-12 md:py-16 border-y border-stroke overflow-hidden">

      {/* Left / right edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-bg to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-bg to-transparent" />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55 }}
        className="relative z-10 text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Clientes que confían en nosotros</span>
          <span className="w-8 h-px bg-stroke" />
        </div>
        <p className="text-[11px] text-muted/50">
          11 proyectos entregados · Querétaro, CDMX y todo México
        </p>
      </motion.div>

      {/* ── Row 1: Client logo cards → scrolls LEFT ── */}
      <div className="relative mb-3 overflow-hidden">
        <div
          className="flex animate-marquee-scroll"
          style={{ width: 'max-content' }}
          aria-hidden
        >
          {row1.map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
        </div>
      </div>

      {/* ── Row 2: Result stats → scrolls RIGHT ── */}
      <div className="relative overflow-hidden">
        <div
          className="flex animate-marquee-scroll-rev"
          style={{ width: 'max-content' }}
          aria-hidden
        >
          {row2.map((stat, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-2 px-4 py-2 rounded-full border border-stroke/40 bg-surface/15 whitespace-nowrap select-none"
            >
              <span className={`text-[11px] ${i % 3 === 0 ? 'accent-gradient-text font-medium' : 'text-muted/70'}`}>
                {stat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle center top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.06), transparent 70%)' }}
        aria-hidden
      />
    </section>
  )
}
