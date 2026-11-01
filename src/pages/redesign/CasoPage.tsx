import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { usePageMeta } from '../../hooks/usePageMeta'
import { waUrl } from '../../constants/whatsapp'
import { CASOS } from '../../content/casos'
import type { Caso } from '../../content/types'

// Caso de estudio /portafolio/<slug>. Contenido en src/content/casos.ts (solo hechos verificables).

export default function CasoPage({ caso }: { caso: Caso }) {
  usePageMeta(`/portafolio/${caso.slug}`)
  const others = CASOS.filter((c) => c.slug !== caso.slug).slice(0, 3)

  return (
    <article className="max-w-5xl mx-auto px-4 pt-32 md:pt-40 pb-20">
      <nav aria-label="Ruta de navegación" className="text-xs text-muted mb-8">
        <ol className="flex flex-wrap gap-2">
          <li><Link to="/" className="hover:text-text-primary">Inicio</Link></li>
          <li aria-hidden>/</li>
          <li><Link to="/portafolio" className="hover:text-text-primary">Portafolio</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-text-primary">{caso.client}</li>
        </ol>
      </nav>

      <header>
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-5">
          {caso.kind === 'propio' ? 'Proyecto propio' : 'Caso de cliente'} · {caso.sector}
        </p>
        <h1 className="text-4xl md:text-6xl font-display italic text-text-primary leading-[1.02] max-w-4xl">{caso.title}</h1>
        <p className="text-base text-muted leading-relaxed mt-6 max-w-3xl">{caso.summary}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={caso.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-stroke hover:border-accent/50 text-text-primary text-sm font-semibold transition-colors"
          >
            Ver {caso.liveLabel} <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
          <a
            href={waUrl(caso.waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
          >
            Quiero algo así <ArrowRight className="w-4 h-4" aria-hidden />
          </a>
        </div>
      </header>

      <figure className="mt-12 rounded-2xl overflow-hidden border border-stroke">
        <img
          src={caso.image}
          alt={`Página de inicio de ${caso.liveLabel}`}
          width={1280}
          height={800}
          fetchPriority="high"
          decoding="async"
          className="w-full h-auto"
        />
        <figcaption className="text-xs text-muted px-4 py-3 bg-surface/40">
          Captura del sitio en vivo ({caso.liveLabel}).
        </figcaption>
      </figure>

      <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {caso.facts.map((f) => (
          <div key={f.label} className="p-4 rounded-2xl border border-stroke bg-surface/40">
            <dt className="text-[11px] text-muted uppercase tracking-widest">{f.label}</dt>
            <dd className="text-sm font-semibold text-text-primary mt-1">{f.value}</dd>
          </div>
        ))}
      </dl>

      <section className="py-12 md:py-16 grid md:grid-cols-[1fr_1.4fr] gap-10 border-b border-stroke/60">
        <div>
          <h2 className="text-3xl font-display italic text-text-primary mb-4">El contexto</h2>
          <p className="text-sm text-muted leading-relaxed">{caso.context}</p>
        </div>
        <div>
          <h2 className="text-3xl font-display italic text-text-primary mb-4">Lo que construimos</h2>
          <ul className="space-y-3">
            {caso.built.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-muted leading-relaxed">
                <Check className="w-5 h-5 text-accent flex-shrink-0" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 border-b border-stroke/60">
        <h2 className="text-3xl font-display italic text-text-primary mb-6">Tecnología</h2>
        <ul className="flex flex-wrap gap-2">
          {caso.stack.map((s) => (
            <li key={s} className="px-3 py-1.5 rounded-full border border-stroke bg-surface/40 text-xs text-muted">{s}</li>
          ))}
        </ul>
        {caso.service && (
          <p className="text-sm text-muted mt-8">
            Servicio relacionado:{' '}
            <Link to={caso.service.href} className="text-accent underline underline-offset-4">{caso.service.label}</Link>
          </p>
        )}
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-display italic text-text-primary mb-6">Otros proyectos</h2>
        <ul className="grid sm:grid-cols-3 gap-4">
          {others.map((c) => (
            <li key={c.slug}>
              <Link to={`/portafolio/${c.slug}`} className="block p-5 rounded-2xl border border-stroke bg-surface/40 hover:border-accent/50 transition-colors h-full">
                <p className="text-[11px] text-muted uppercase tracking-widest">{c.kind === 'propio' ? 'Proyecto propio' : 'Cliente'}</p>
                <h3 className="text-base font-semibold text-text-primary mt-1">{c.client}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{c.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/portafolio" className="inline-flex items-center gap-1 text-sm text-accent mt-6">
          Ver todo el portafolio <ArrowRight className="w-3.5 h-3.5" aria-hidden />
        </Link>
      </section>
    </article>
  )
}
