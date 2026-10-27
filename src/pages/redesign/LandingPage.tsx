import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { usePageMeta } from '../../hooks/usePageMeta'
import { CONTACT_EMAIL, CONTACT_MAILTO, waUrl } from '../../constants/whatsapp'
import { getCaso } from '../../content/casos'
import type { Landing, Lang } from '../../content/types'

// Página de servicio (landing local ES o página EN). El contenido vive en src/content/landings.ts.
// Sin animaciones de entrada: el contenido es visible desde el HTML prerenderizado (mejor LCP y SEO).

const T: Record<Lang, Record<string, string>> = {
  es: {
    home: 'Inicio',
    breadcrumb: 'Ruta de navegación',
    ctaPrimary: 'Cotizar por WhatsApp',
    ctaSecondary: 'Llenar formulario',
    process: 'Cómo trabajamos',
    prices: 'Precios de referencia',
    pricesNote: 'Precios en pesos mexicanos más IVA. El precio final se confirma por escrito en la propuesta.',
    cases: 'Proyectos reales relacionados',
    caseLink: 'Ver caso',
    faq: 'Preguntas frecuentes',
    related: 'También te puede interesar',
    finalTitle: '¿Hablamos de tu proyecto?',
    finalText: 'Cuéntanos qué necesitas y te respondemos con una propuesta clara, sin compromiso.',
  },
  en: {
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    ctaPrimary: 'Request a quote',
    ctaSecondary: 'Chat on WhatsApp',
    process: 'How we work',
    prices: '',
    pricesNote: '',
    cases: 'Related work (case studies in Spanish)',
    caseLink: 'View case',
    faq: 'Frequently asked questions',
    related: 'Related services',
    finalTitle: 'Tell us about your project',
    finalText: 'Send a short description and we will reply with questions or a written quote.',
  },
}

const btnPrimary =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors'
const btnSecondary =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-stroke hover:border-accent/50 text-text-primary text-sm font-semibold transition-colors'

function quoteMailto(l: Landing) {
  return `${CONTACT_MAILTO}?subject=${encodeURIComponent(`Quote request — ${l.name}`)}`
}

function Ctas({ landing }: { landing: Landing }) {
  const t = T[landing.lang]
  const wa = (
    <a href={waUrl(landing.waText)} target="_blank" rel="noopener noreferrer" className={landing.lang === 'es' ? btnPrimary : btnSecondary}>
      {landing.lang === 'es' ? t.ctaPrimary : t.ctaSecondary}
      {landing.lang === 'es' && <ArrowRight className="w-4 h-4" aria-hidden />}
    </a>
  )
  if (landing.lang === 'en') {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <a href={quoteMailto(landing)} className={btnPrimary}>
          {t.ctaPrimary} <ArrowRight className="w-4 h-4" aria-hidden />
        </a>
        {wa}
      </div>
    )
  }
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {wa}
      <Link to="/contacto" className={btnSecondary}>
        {t.ctaSecondary}
      </Link>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-12 md:py-16 border-t border-stroke/60">
      <h2 className="text-3xl md:text-4xl font-display italic text-text-primary leading-tight mb-8">{title}</h2>
      {children}
    </section>
  )
}

function EnHeader({ landing }: { landing: Landing }) {
  return (
    <header className="max-w-5xl mx-auto px-4 pt-6 flex items-center justify-between gap-4">
      <Link to="/en" className="text-sm font-semibold text-text-primary">
        Revolution505
      </Link>
      <nav aria-label="Language" className="flex items-center gap-4 text-sm">
        <Link to={landing.alternate ?? '/'} hrefLang="es-MX" lang="es" className="text-muted hover:text-text-primary underline-offset-4 hover:underline">
          Español
        </Link>
        <a href={quoteMailto(landing)} className="hidden sm:inline-flex px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors">
          Request a quote
        </a>
      </nav>
    </header>
  )
}

function EnFooter() {
  return (
    <footer className="border-t border-stroke/60 mt-8">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row gap-4 justify-between text-xs text-muted">
        <p>Revolution505 Tech Solutions · Querétaro, Mexico · Central Time (UTC−6)</p>
        <p>
          <a href={CONTACT_MAILTO} className="hover:text-text-primary">{CONTACT_EMAIL}</a>
        </p>
      </div>
    </footer>
  )
}

export default function LandingPage({ landing }: { landing: Landing }) {
  usePageMeta(landing.path)
  const t = T[landing.lang]
  const isEn = landing.lang === 'en'
  const homePath = isEn ? '/en' : '/'
  const cases = (landing.cases ?? []).map(getCaso).filter((c) => c !== undefined)

  const body = (
    <article className={`max-w-5xl mx-auto px-4 ${isEn ? 'pt-14 md:pt-20' : 'pt-32 md:pt-40'} pb-20`}>
      {landing.path !== homePath && (
        <nav aria-label={t.breadcrumb} className="text-xs text-muted mb-8">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link to={homePath} className="hover:text-text-primary">{t.home}</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-text-primary">{landing.name}</li>
          </ol>
        </nav>
      )}

      {/* Hero */}
      <header className="pb-12 md:pb-16">
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-5">{landing.eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-display italic text-text-primary leading-[1.02] max-w-4xl">{landing.h1}</h1>
        <div className="mt-6 space-y-4 max-w-3xl">
          {landing.intro.map((p) => (
            <p key={p.slice(0, 24)} className="text-base text-muted leading-relaxed">{p}</p>
          ))}
        </div>
        <div className="mt-8">
          <Ctas landing={landing} />
        </div>
      </header>

      <Section title={landing.problemsTitle}>
        <div className="grid md:grid-cols-3 gap-4">
          {landing.problems.map((p) => (
            <div key={p.title} className="p-6 rounded-2xl border border-stroke bg-surface/40">
              <h3 className="text-base font-semibold text-text-primary mb-2">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={landing.servicesTitle}>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
          {landing.services.map((s) => (
            <li key={s.title} className="flex gap-3">
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden />
              <div>
                <h3 className="text-base font-semibold text-text-primary">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed mt-1">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {cases.length > 0 && (
        <Section title={t.cases}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cases.map((c) => (
              <Link
                key={c.slug}
                to={`/portafolio/${c.slug}`}
                className="group block rounded-2xl border border-stroke bg-surface/40 overflow-hidden hover:border-accent/50 transition-colors"
              >
                <img src={c.image} alt={`Sitio de ${c.client}`} width={1280} height={800} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover object-top" />
                <div className="p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest">{c.sector}</p>
                  <h3 className="text-base font-semibold text-text-primary mt-1">{c.client}</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-accent mt-3">
                    {t.caseLink} <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section title={t.process}>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {landing.steps.map((s, i) => (
            <li key={s.title} className="p-6 rounded-2xl border border-stroke bg-surface/40">
              <span className="text-2xl font-display italic accent-gradient-text">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-base font-semibold text-text-primary mt-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed mt-1">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {landing.prices && landing.prices.length > 0 && (
        <Section title={t.prices}>
          <div className="grid md:grid-cols-3 gap-4">
            {landing.prices.map((p) => (
              <div key={p.label} className="p-6 rounded-2xl border border-stroke bg-surface/40">
                <h3 className="text-sm text-muted">{p.label}</h3>
                <p className="text-2xl font-semibold text-text-primary mt-1">{p.value}</p>
                <p className="text-sm text-muted leading-relaxed mt-2">{p.note}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-4">
            {t.pricesNote}{' '}
            <Link to="/precios" className="underline underline-offset-4 hover:text-text-primary">Ver todos los planes</Link>
          </p>
        </Section>
      )}

      <Section title={t.faq}>
        <div className="divide-y divide-stroke border-y border-stroke">
          {landing.faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-base font-semibold text-text-primary">
                <h3>{f.q}</h3>
                <ChevronDown className="w-5 h-5 text-muted flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <p className="text-sm text-muted leading-relaxed mt-3 max-w-3xl">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section title={t.related}>
        <ul className="flex flex-wrap gap-3">
          {landing.related.map((r) => (
            <li key={r.href}>
              <Link to={r.href} className="inline-flex px-4 py-2 rounded-full border border-stroke text-sm text-muted hover:text-text-primary hover:border-accent/50 transition-colors">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="mt-4 p-8 md:p-12 rounded-3xl border border-stroke bg-surface/40 text-center">
        <h2 className="text-3xl md:text-4xl font-display italic text-text-primary">{t.finalTitle}</h2>
        <p className="text-sm text-muted mt-3 mb-8 max-w-xl mx-auto">{t.finalText}</p>
        <div className="flex justify-center">
          <Ctas landing={landing} />
        </div>
      </section>
    </article>
  )

  if (!isEn) return body
  return (
    <div className="bg-bg text-text-primary font-body min-h-screen">
      <EnHeader landing={landing} />
      <main>{body}</main>
      <EnFooter />
    </div>
  )
}
