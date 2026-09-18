import { useState, type FormEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2, MapPin, Clock, Phone, Mail } from 'lucide-react'
import { usePageMeta } from '../../hooks/usePageMeta'
import { submitLead } from '../../lib/lead'
import { waFromLead, WA_PHONE_DISPLAY, WA_PHONE_E164, CONTACT_EMAIL, CONTACT_MAILTO } from '../../constants/whatsapp'

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

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactoPage() {
  usePageMeta({
    title: 'Contacto',
    description:
      'Cotiza tu proyecto web o sistema. Lead a contacto@revolution505.com + WhatsApp. Atención en Querétaro, México y remoto. Respuesta en menos de 2 horas.',
    canonical: '/contacto',
  })

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [business, setBusiness] = useState('')
  const [need, setNeed] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const waHref = waFromLead({ name, email, phone, business, need })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setError('')
    if (!name.trim() || !email.trim() || !phone.trim() || !need.trim()) {
      setStatus('error')
      setError('Completa nombre, email, teléfono y qué necesitas.')
      return
    }
    setStatus('sending')
    const result = await submitLead({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      need: need.trim(),
      business: business.trim() || undefined,
      website: website.trim() || undefined,
    })
    if (result.ok) {
      setStatus('sent')
      return
    }
    setStatus('error')
    setError(result.error)
  }

  const INFO = [
    { icon: <MapPin className="w-4 h-4" />, label: 'Ubicación', value: 'Querétaro, México · nacional y remoto' },
    { icon: <Clock className="w-4 h-4" />, label: 'Horario', value: 'Lun – Vie 9:00 – 19:00 CST' },
    {
      icon: <Phone className="w-4 h-4" />,
      label: 'Teléfono / WhatsApp',
      value: WA_PHONE_DISPLAY,
      href: `tel:${WA_PHONE_E164}`,
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: 'Email',
      value: CONTACT_EMAIL,
      href: CONTACT_MAILTO,
    },
  ]

  return (
    <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 px-4 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.08), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto relative">
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
            Hablemos de tu <em className="not-italic accent-gradient-text">proyecto</em>
          </h1>
          <p className="text-sm text-muted mt-3 max-w-lg mx-auto leading-relaxed">
            Déjanos tus datos: llegan a <strong className="text-text-primary font-medium">{CONTACT_EMAIL}</strong>.
            Después puedes seguir por WhatsApp. Respuesta en menos de 2 horas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 space-y-5"
          >
            {status === 'sent' ? (
              <div className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 space-y-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base font-semibold text-text-primary">Mensaje enviado</p>
                    <p className="text-sm text-muted mt-1 leading-relaxed">
                      Ya llegó a {CONTACT_EMAIL}. Si quieres avanzar ahora, ábrenos WhatsApp
                      con tus datos prellenados.
                    </p>
                  </div>
                </div>
                <a
                  href={waHref}
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
                    Continuar por WhatsApp
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute opacity-0 pointer-events-none h-0 w-0"
                  aria-hidden
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted uppercase tracking-wider block mb-2" htmlFor="lead-name">
                      Tu nombre *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Juan García"
                      className="w-full px-4 py-3 rounded-2xl border border-stroke bg-surface/50 text-text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted uppercase tracking-wider block mb-2" htmlFor="lead-business">
                      Tu negocio
                    </label>
                    <input
                      id="lead-business"
                      type="text"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="Mi Empresa S.A."
                      className="w-full px-4 py-3 rounded-2xl border border-stroke bg-surface/50 text-text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted uppercase tracking-wider block mb-2" htmlFor="lead-email">
                      Email *
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-2xl border border-stroke bg-surface/50 text-text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted uppercase tracking-wider block mb-2" htmlFor="lead-phone">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="442 123 4567"
                      className="w-full px-4 py-3 rounded-2xl border border-stroke bg-surface/50 text-text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted uppercase tracking-wider block mb-2">¿Qué necesitas? *</label>
                  <div className="grid grid-cols-2 gap-2" role="group" aria-label="Tipo de servicio">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNeed(s)}
                        aria-pressed={need === s}
                        className={`px-3 py-2.5 rounded-xl border text-xs text-left transition-all duration-200 ${
                          need === s
                            ? 'border-accent/60 bg-accent/10 text-text-primary'
                            : 'border-stroke bg-surface/30 text-muted hover:border-stroke/70 hover:text-text-primary'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || !need}
                  className="group relative w-full rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  <span
                    className="absolute rounded-full pointer-events-none"
                    style={{ inset: '-2px', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }}
                    aria-hidden
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-accent text-white text-sm font-semibold w-full">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Enviar cotización
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </span>
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
                  <p className="text-[11px] text-muted/60">
                    También puedes escribirnos directo por WhatsApp (mismo mensaje prellenado).
                  </p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-accent hover:underline inline-flex items-center gap-1"
                  >
                    Abrir WhatsApp
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="p-6 rounded-3xl border border-stroke/60 bg-surface/20 space-y-4">
              <p className="text-sm font-semibold text-text-primary">Información de contacto</p>
              {INFO.map(({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-surface border border-stroke flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-text-primary mt-0.5 inline-block hover:opacity-80 transition-opacity">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-text-primary mt-0.5">{value}</p>
                    )}
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
              ].map((item) => (
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
