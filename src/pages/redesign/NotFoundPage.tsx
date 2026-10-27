import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { usePageMeta } from '../../hooks/usePageMeta'
import { WA } from '../../constants/whatsapp'

const LINKS = [
  { to: '/precios', label: 'Precios y planes' },
  { to: '/sistemas', label: 'Sistemas a medida' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/contacto', label: 'Contacto' },
]

/** Se prerenderiza como dist/404.html (ErrorDocument de Apache) y también cubre rutas desconocidas en la SPA. */
export default function NotFoundPage() {
  usePageMeta(null)

  return (
    <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs text-muted uppercase tracking-[0.3em]">Error 404</span>
        <h1 className="mt-4 text-5xl md:text-7xl font-display italic text-text-primary leading-[0.92]">
          Esta página no existe
        </h1>
        <p className="text-sm text-muted mt-5 leading-relaxed">
          Puede que el enlace esté mal escrito o que la página se haya movido.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white text-sm font-semibold"
          >
            Ir al inicio <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={WA.floating}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-stroke text-text-primary text-sm font-semibold"
          >
            Escríbenos por WhatsApp
          </a>
        </div>

        <nav aria-label="Páginas principales" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted hover:text-text-primary underline-offset-4 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
