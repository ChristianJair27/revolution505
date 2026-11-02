import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, Loader2, Search } from 'lucide-react'
import { usePageMeta } from '../../hooks/usePageMeta'
import { submitLead } from '../../lib/lead'
import { trackEvent, trackLead } from '../../lib/gtag'
import { waUrl } from '../../constants/whatsapp'

type CheckStatus = 'pass' | 'warn' | 'fail'
type Check = { id: string; status: CheckStatus; label: string; detail: string }
type Report = { url: string; finalUrl: string; checks: Check[]; score: number }

const ICON: Record<CheckStatus, React.ReactNode> = {
  pass: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-label="Bien" />,
  warn: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" aria-label="Mejorable" />,
  fail: <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" aria-label="Error" />,
}

const ORDER: Record<CheckStatus, number> = { fail: 0, warn: 1, pass: 2 }

const WHAT = [
  'Que tu botón de WhatsApp abra el chat correcto',
  'Que el navegador no marque tu sitio como “No seguro”',
  'Que se vea bien en el celular',
  'Que Google tenga título y descripción para mostrarte',
  'Que cargue rápido y no parezca abandonado',
]

async function runCheck(url: string): Promise<Report | string> {
  try {
    const res = await fetch('/api/check.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    const data = await res.json().catch(() => null)
    if (!data || !data.ok) return data?.error ?? 'No pudimos revisar el sitio. Intenta de nuevo.'
    return data as Report
  } catch {
    return 'Sin conexión con el servidor. Intenta de nuevo en un momento.'
  }
}

export default function RevisaTuSitioPage() {
  usePageMeta('/revisa-tu-sitio')

  const [url, setUrl] = useState('')
  const [checking, setChecking] = useState(false)
  const [report, setReport] = useState<Report | null>(null)
  const [checkError, setCheckError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [leadError, setLeadError] = useState('')

  const onCheck = async (e: FormEvent) => {
    e.preventDefault()
    if (checking || !url.trim()) return
    setChecking(true)
    setCheckError('')
    setReport(null)
    const result = await runCheck(url.trim())
    setChecking(false)
    if (typeof result === 'string') {
      setCheckError(result)
      return
    }
    setReport(result)
    trackEvent('site_check', { score: result.score })
  }

  const fails = report?.checks.filter((c) => c.status === 'fail').length ?? 0
  const warns = report?.checks.filter((c) => c.status === 'warn').length ?? 0

  const onLead = async (e: FormEvent) => {
    e.preventDefault()
    if (leadStatus === 'sending' || !report) return
    setLeadError('')
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setLeadStatus('error')
      setLeadError('Completa nombre, correo y WhatsApp.')
      return
    }
    setLeadStatus('sending')
    const result = await submitLead({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      need: `Auditoría gratis (Revisa tu sitio): ${fails} errores, ${warns} mejoras, ${report.score}/100`,
      business: report.finalUrl.slice(0, 160),
      website: website.trim() || undefined,
    })
    if (result.ok) {
      trackLead('auditoria_web', 'revisa_tu_sitio')
      setLeadStatus('sent')
      return
    }
    setLeadStatus('error')
    setLeadError(result.error)
  }

  const scoreColor = !report ? '' : report.score >= 85 ? 'text-emerald-400' : report.score >= 60 ? 'text-amber-400' : 'text-red-400'
  const field = 'w-full px-4 py-3 rounded-2xl bg-surface border border-stroke text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-accent transition-colors'

  return (
    <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 px-4 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.10), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Herramienta gratis</span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display italic text-text-primary">
            Revisa tu sitio en <em className="not-italic accent-gradient-text">30 segundos</em>
          </h1>
          <p className="text-sm text-muted mt-4 max-w-xl mx-auto leading-relaxed">
            Escribe la dirección de tu página y te decimos qué le está costando clientes: WhatsApp roto,
            “No seguro” en el navegador, mala vista en celular o nada que mostrar en Google.
          </p>
        </div>

        <form onSubmit={onCheck} className="flex flex-col sm:flex-row gap-3" role="search">
          <label htmlFor="site-url" className="sr-only">Dirección de tu sitio</label>
          <input
            id="site-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="minegocio.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`${field} flex-1 text-base`}
            maxLength={300}
            required
          />
          <button
            type="submit"
            disabled={checking}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60"
          >
            {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {checking ? 'Revisando…' : 'Revisar mi sitio'}
          </button>
        </form>
        {checkError && <p role="alert" className="mt-4 text-sm text-red-400">{checkError}</p>}

        {!report && !checking && (
          <ul className="mt-10 grid sm:grid-cols-2 gap-3 text-sm text-muted">
            {WHAT.map((w) => (
              <li key={w} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        )}

        {report && (
          <div className="mt-10 space-y-8" aria-live="polite">
            <div className="flex items-center justify-between gap-4 p-6 rounded-3xl border border-stroke bg-surface/60">
              <div className="min-w-0">
                <p className="text-xs text-muted uppercase tracking-[0.2em]">Resultado</p>
                <p className="text-sm text-text-primary mt-1 truncate">{report.finalUrl}</p>
                <p className="text-xs text-muted mt-1">
                  {fails} {fails === 1 ? 'error' : 'errores'} · {warns} {warns === 1 ? 'mejora' : 'mejoras'}
                </p>
              </div>
              <p className={`text-5xl font-display ${scoreColor}`}>
                {report.score}<span className="text-base text-muted">/100</span>
              </p>
            </div>

            <ul className="space-y-3">
              {[...report.checks].sort((a, b) => ORDER[a.status] - ORDER[b.status]).map((c) => (
                <li key={c.id} className="flex gap-3 p-4 rounded-2xl border border-stroke bg-surface/40">
                  {ICON[c.status]}
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{c.label}</p>
                    <p className="text-sm text-muted mt-0.5 leading-relaxed">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="p-6 md:p-8 rounded-3xl border border-accent/30 bg-accent/5">
              {leadStatus === 'sent' ? (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base font-semibold text-text-primary">¡Listo! Te enviamos tu auditoría</p>
                    <p className="text-sm text-muted mt-1 leading-relaxed">
                      En menos de 24 horas hábiles recibes en tu correo la revisión completa, con capturas y cómo
                      arreglar cada punto. Si tienes prisa, escríbenos por{' '}
                      <a className="underline" href={waUrl(`Hola, revisé ${report.finalUrl} en revolution505.com y quiero la auditoría.`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl md:text-3xl font-display italic text-text-primary">
                    Recibe la auditoría completa, gratis
                  </h2>
                  <p className="text-sm text-muted mt-2 leading-relaxed">
                    Revisamos tu sitio en un navegador real, en celular y computadora, y te mandamos capturas de cada
                    problema con la forma de corregirlo. Sin compromiso.
                  </p>
                  <form onSubmit={onLead} className="mt-6 grid sm:grid-cols-3 gap-3">
                    <input
                      type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1} autoComplete="off" className="absolute opacity-0 pointer-events-none h-0 w-0" aria-hidden
                    />
                    <label className="sr-only" htmlFor="lead-name">Nombre</label>
                    <input id="lead-name" className={field} placeholder="Tu nombre" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required />
                    <label className="sr-only" htmlFor="lead-email">Correo</label>
                    <input id="lead-email" className={field} type="email" placeholder="Correo" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={180} required />
                    <label className="sr-only" htmlFor="lead-phone">WhatsApp</label>
                    <input id="lead-phone" className={field} type="tel" placeholder="WhatsApp" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={40} required />
                    <button
                      type="submit"
                      disabled={leadStatus === 'sending'}
                      className="sm:col-span-3 group flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-accent text-white text-sm font-semibold hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-60"
                    >
                      {leadStatus === 'sending' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Quiero mi auditoría gratis
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </form>
                  {leadError && <p role="alert" className="mt-3 text-sm text-red-400">{leadError}</p>}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
