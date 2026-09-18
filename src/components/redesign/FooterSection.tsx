import { useRef, useEffect } from 'react'
import { WA, CONTACT_EMAIL, CONTACT_MAILTO } from '../../constants/whatsapp'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, MapPin, Phone, Clock, Mail } from 'lucide-react'
import gsap from 'gsap'

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const MARQUEE_CHUNK = 'REVOLUTION505 • TECNOLOGÍA • QUERÉTARO • DISEÑO PREMIUM • SOLUCIONES QUE CONVIERTEN • '

// isRoute: true → use <Link to=...>, false → scroll to hash on current page
const FOOTER_COLS = [
  {
    title: 'Servicios',
    links: [
      { label: 'Desarrollo Web',      href: '/portafolio', isRoute: true  },
      { label: 'Sistemas POS',        href: '/sistemas',   isRoute: true  },
      { label: 'CRM Empresarial',     href: '/sistemas',   isRoute: true  },
      { label: 'Sistema de Reservas', href: '/sistemas',   isRoute: true  },
      { label: 'Tiendas Online',      href: '/#calculadora', isRoute: false },
      { label: 'SEO Local',           href: '/portafolio', isRoute: true  },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Portafolio',          href: '/portafolio', isRoute: true  },
      { label: 'Precios',             href: '/precios',    isRoute: true  },
      { label: 'Proceso de Trabajo',  href: '/proceso',    isRoute: true  },
      { label: 'Contacto',            href: '/contacto',   isRoute: true  },
      { label: 'Testimonios',         href: '/#testimonios', isRoute: false },
      { label: 'FAQ',                 href: '/proceso',    isRoute: true  },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos y Condiciones', href: '#', isRoute: false },
      { label: 'Política de Privacidad', href: '#', isRoute: false },
      { label: 'Aviso de Cookies',       href: '#', isRoute: false },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Social link icons (inline SVG to avoid extra deps)
// ─────────────────────────────────────────────────────────────────────────────
const WhatsAppSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const InstagramSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

const LinkedInSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const FacebookSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const SOCIALS = [
  { label: 'WhatsApp',  href: WA.footer,                          Icon: WhatsAppSVG  },
  { label: 'Instagram', href: 'https://www.instagram.com/revolution.505/', Icon: InstagramSVG },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/revolution505', Icon: LinkedInSVG  },
  { label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61551803583086', Icon: FacebookSVG  },
]

// ─────────────────────────────────────────────────────────────────────────────
// GSAP Marquee
// ─────────────────────────────────────────────────────────────────────────────
function Marquee() {
  const trackRef    = useRef<HTMLDivElement>(null)
  const tweenRef    = useRef<gsap.core.Tween | null>(null)
  const wrapperRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration:  38,
        ease:      'none',
        repeat:    -1,
      })
    })

    // Pause on hover
    const el = wrapperRef.current
    const pause  = () => tweenRef.current?.pause()
    const resume = () => tweenRef.current?.play()
    el?.addEventListener('mouseenter', pause)
    el?.addEventListener('mouseleave', resume)

    return () => {
      ctx.revert()
      el?.removeEventListener('mouseenter', pause)
      el?.removeEventListener('mouseleave', resume)
    }
  }, [])

  return (
    <div ref={wrapperRef} className="overflow-hidden border-y border-stroke py-5 cursor-default select-none">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={`flex-shrink-0 text-sm md:text-base font-display italic px-3 tracking-wide ${
              i % 2 === 0 ? 'text-muted' : 'accent-gradient-text'
            }`}
            aria-hidden={i > 0}
          >
            {MARQUEE_CHUNK}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 85%', once: true }
      gsap.from('.foot-cta',    { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',             scrollTrigger: trigger })
      gsap.from('.foot-links',  { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.15, scrollTrigger: trigger })
      gsap.from('.foot-bottom', { opacity: 0, y: 12, duration: 0.6, ease: 'power3.out', delay: 0.28, scrollTrigger: trigger })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={sectionRef} className="relative bg-bg border-t border-stroke overflow-hidden">

      {/* ── Background grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(0 0% 96%) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      {/* ── GSAP Marquee ── */}
      <Marquee />

      {/* ── CTA Section ── */}
      <div className="foot-cta relative py-20 md:py-28 px-4 border-b border-stroke overflow-hidden">
        {/* Radial accent glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.12), transparent 70%)' }}
          aria-hidden
        />

        <div className="relative max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Empecemos</span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          {/* Big headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic leading-[0.95] tracking-tight text-text-primary mb-6">
            ¿Listo para transformar
            <br />
            <em className="not-italic accent-gradient-text">tu negocio digital?</em>
          </h2>

          <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-10 leading-relaxed">
            Contáctanos hoy y recibe una propuesta personalizada en menos de 2 horas.
            Sin costo, sin compromiso.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {/* Primary */}
            <a
              href={WA.footer}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
            >
              <span
                className="absolute rounded-full pointer-events-none"
                style={{ inset: '-2px', background: 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)' }}
                aria-hidden
              />
              <span className="relative z-10 flex items-center gap-2.5 px-8 py-4 rounded-full bg-accent text-white text-sm font-medium">
                <WhatsAppSVG />
                Hablar por WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>

            {/* Secondary */}
            <a
              href={WA.llamada}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full"
            >
              <span
                className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ inset: '-1px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }}
                aria-hidden
              />
              <span className="relative z-10 flex items-center gap-2 px-7 py-4 rounded-full border border-stroke bg-bg text-sm text-muted group-hover:text-text-primary transition-colors duration-200">
                <span aria-hidden>📞</span>
                Agendar llamada gratuita
              </span>
            </a>
          </div>

          {/* Contact info strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-xs text-muted">
              <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              Querétaro, México
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Phone className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              (442) 372-3972
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              Lun–Sáb · 09:00–19:00
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Mail className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <a href={CONTACT_MAILTO} className="hover:text-text-primary transition-colors">{CONTACT_EMAIL}</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Links Grid ── */}
      <div className="foot-links max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <img
                src="/assets/logo-r.png"
                alt="Revolution505"
                className="w-10 h-10 object-contain flex-shrink-0"
                width="40"
                height="40"
                draggable={false}
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-text-primary leading-tight">Revolution505</p>
                <p className="text-[10px] text-muted leading-tight">Tech Solutions</p>
              </div>
            </div>

            <p className="text-xs text-muted leading-relaxed mb-5 max-w-[220px]">
              Agencia de desarrollo web con sede en Querétaro. Soluciones digitales
              que generan resultados reales.
            </p>

            {/* Social links */}
            <div className="flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-stroke bg-surface/40 flex items-center justify-center text-muted hover:text-text-primary hover:border-accent/40 hover:bg-surface transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-[10px] text-text-primary font-semibold uppercase tracking-[0.18em] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-xs text-muted hover:text-text-primary transition-colors duration-200 flex items-center gap-1 group/link"
                      >
                        {link.label}
                        <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={e => {
                          if (link.href === '#') { e.preventDefault(); return }
                          if (link.href.startsWith('/#')) {
                            e.preventDefault()
                            const id = link.href.slice(2)
                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                        className="text-xs text-muted hover:text-text-primary transition-colors duration-200 flex items-center gap-1 group/link"
                      >
                        {link.label}
                        <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div className="foot-bottom border-t border-stroke">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-[10px] text-muted order-2 sm:order-1">
            &copy; {new Date().getFullYear()} Revolution505 Tech Solutions · Todos los derechos reservados
          </p>

          {/* Availability indicator */}
          <div className="flex items-center gap-5 order-1 sm:order-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[10px] text-muted">Disponible para proyectos</span>
            </div>

            <div className="flex gap-4">
              <a href="#" onClick={e => e.preventDefault()} className="text-[10px] text-muted hover:text-text-primary transition-colors">Privacidad</a>
              <a href="#" onClick={e => e.preventDefault()} className="text-[10px] text-muted hover:text-text-primary transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
