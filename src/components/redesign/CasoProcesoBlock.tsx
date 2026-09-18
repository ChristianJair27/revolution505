import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, FileText, Phone, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WA } from '../../constants/whatsapp'

const FUNNEL = [
  { icon: MessageCircle, title: 'WhatsApp', desc: 'Nos escribes o dejas tus datos' },
  { icon: FileText, title: 'Propuesta <2h', desc: 'Cotización clara, sin compromiso' },
  { icon: Phone, title: 'Llamada', desc: 'Alineamos alcance y tiempos' },
  { icon: Rocket, title: 'Kickoff', desc: 'Arrancamos el proyecto' },
] as const

/** Caso real + métrica + funnel comercial, pensado para ir junto a precios. */
export default function CasoProcesoBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55 }}
      className="mt-10 grid md:grid-cols-2 gap-5 md:gap-6"
    >
      {/* Caso + métrica */}
      <div className="rounded-3xl border border-stroke bg-surface/40 p-6 md:p-8 flex flex-col">
        <p className="text-[10px] text-muted uppercase tracking-[0.25em] mb-3">Caso real</p>
        <h3 className="text-xl md:text-2xl font-display italic text-text-primary leading-tight">
          AMQ Group — corporativo + CRM
        </h3>
        <p className="text-sm text-muted mt-3 leading-relaxed flex-1">
          Rediseño web y CRM para captar y dar seguimiento a leads en Querétaro.
          En los primeros meses el tráfico orgánico se convirtió en consultas reales.
        </p>
        <div className="mt-6 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-4xl md:text-5xl font-display italic accent-gradient-text leading-none">+340%</p>
            <p className="text-xs text-muted mt-1">leads orgánicos vs. baseline</p>
          </div>
          <Link
            to="/portafolio"
            className="text-xs text-accent inline-flex items-center gap-1 hover:underline"
          >
            Ver más casos
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Proceso comercial */}
      <div className="rounded-3xl border border-accent/25 bg-accent/[0.04] p-6 md:p-8 flex flex-col">
        <p className="text-[10px] text-muted uppercase tracking-[0.25em] mb-3">Proceso</p>
        <h3 className="text-xl md:text-2xl font-display italic text-text-primary leading-tight mb-5">
          De WhatsApp a kickoff
        </h3>
        <ol className="space-y-3 flex-1">
          {FUNNEL.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl border border-stroke bg-surface/60 flex items-center justify-center text-accent flex-shrink-0">
                <Icon className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  <span className="text-muted mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                  {title}
                </p>
                <p className="text-xs text-muted mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <a
          href={WA.llamada}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 group inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-accent/40 bg-accent/10 text-sm text-text-primary hover:bg-accent/20 transition-colors"
        >
          Empezar por WhatsApp
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  )
}
