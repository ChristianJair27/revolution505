import { useState } from 'react'
import { motion }   from 'framer-motion'
import { ArrowRight, MapPin, Clock, Phone, Mail } from 'lucide-react'
import { usePageMeta } from '../../hooks/usePageMeta'

const WA_BASE = 'https://wa.me/524423723972?text='

const SERVICES = [
  'Página web / Landing page',
  'Tienda en línea (E-commerce)',
  'Sistema POS',
  'Sistema de Reservas',
  'CRM Empresarial',
  'Plataforma Streaming',
  'SEO y posicionamiento',
  'Otro',
]

export default function ContactoPage() {
  usePageMeta({
    title:       'Contacto',
    description: 'Cotiza tu proyecto web, sistema o tienda en línea. Respuesta garantizada en menos de 2 horas. Agencia de desarrollo web en Querétaro, México.',
    canonical:   '/contacto',
  })
  const [service, setService] = useState('')
  const [name,    setName]    = useState('')
  const [business, setBusiness] = useState('')

  const buildWA = () => {
    const lines = [
      '👋 *Contacto desde Revolution505.com*',
      '',
      `👤 *Nombre:* ${name || '(no especificado)'}`,
      `🏢 *Negocio:* ${business || '(no especificado)'}`,
      `🛠 *Servicio de interés:* ${service || '(no especificado)'}`,
      '',
      'Me gustaría recibir más información y una cotización. ¿Podemos hablar? 🙏',
    ]
    return WA_BASE + encodeURIComponent(lines.join('\n'))
  }

  const INFO = [
    { icon: <MapPin className="w-4 h-4" />,  label: 'Ubicación',  value: 'Querétaro, México (atención nacional)' },
    { icon: <Clock  className="w-4 h-4" />,  label: 'Horario',    value: 'Lun – Vie 9:00 – 19:00 CST'           },
    { icon: <Phone  className="w-4 h-4" />,  label: 'WhatsApp',   value: '+52 442 372 3972'                      },
    { icon: <Mail   className="w-4 h-4" />,  label: 'Email',      value: 'contacto@revolution505.com'                },
  ]

  return (
    <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 px-4 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.08), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Contacto</span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display italic text-text-primary">
            Hablemos de tu{' '}
            <em className="not-italic accent-gradient-text">proyecto</em>
          </h1>
          <p className="text-sm text-muted mt-3 max-w-lg mx-auto leading-relaxed">
            Completa el formulario y te mandamos una cotización personalizada por WhatsApp.
            Respuesta garantizada en menos de 2 horas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">

          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted uppercase tracking-wider block mb-2">Tu nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Juan García"
                  className="w-full px-4 py-3 rounded-2xl border border-stroke bg-surface/50 text-text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-muted uppercase tracking-wider block mb-2">Tu negocio</label>
                <input
                  type="text"
                  value={business}
                  onChange={e => setBusiness(e.target.value)}
                  placeholder="Mi Empresa S.A."
                  className="w-full px-4 py-3 rounded-2xl border border-stroke bg-surface/50 text-text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted uppercase tracking-wider block mb-2">¿Qué necesitas?</label>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map(s => (
                  <button
                    key={s}
                    onClick={() => setService(s)}
                    className={`px-3 py-2.5 rounded-xl border text-xs text-left transition-all duration-200 ${
                      service === s
                        ? 'border-accent/60 bg-accent/10 text-text-primary'
                        : 'border-stroke bg-surface/30 text-muted hover:border-stroke/70 hover:text-text-primary'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={buildWA()}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 block"
            >
              <span
                className="absolute rounded-full pointer-events-none"
                style={{ inset: '-2px', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }}
                aria-hidden
              />
              <span className="relative z-10 flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-accent text-white text-sm font-semibold w-full">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enviar por WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>

            <p className="text-[11px] text-muted/60 text-center">
              Al hacer clic abrirás WhatsApp con tu mensaje prellenado. Sin spam, sin formularios eternos.
            </p>
          </motion.div>

          {/* ── Info sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="p-6 rounded-3xl border border-stroke/60 bg-surface/20 space-y-4">
              <p className="text-sm font-semibold text-text-primary">Información de contacto</p>
              {INFO.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-surface border border-stroke flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-text-primary mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-3xl border border-emerald-500/20 bg-emerald-500/5">
              <p className="text-sm font-semibold text-text-primary mb-2">¿Por qué Revolution505?</p>
              {[
                'Respuesta en menos de 2 horas',
                'Cotización gratuita y sin compromiso',
                'Entrega en promedio 12 días hábiles',
                'Garantía de satisfacción incluida',
                'Soporte post-entrega en todos los planes',
              ].map(item => (
                <div key={item} className="flex items-center gap-2 py-1.5 text-xs text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
