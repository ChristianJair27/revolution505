import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence }     from 'framer-motion'
import { Link, useLocation }           from 'react-router-dom'
import { ArrowUpRight }                from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Nav links — route-based
// ─────────────────────────────────────────────────────────────────────────────
const LINKS = [
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Sistemas',   href: '/sistemas'   },
  { label: 'Precios',    href: '/precios'     },
  { label: 'Proceso',    href: '/proceso'     },
  { label: 'Contacto',   href: '/contacto'    },
] as const

const WA_CTA =
  'https://wa.me/524423723972?text=' +
  encodeURIComponent('Hola Revolution505, quiero cotizar un proyecto. ¿Están disponibles?')

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const location                              = useLocation()
  const [scrolled,   setScrolled]             = useState(false)
  const [hoverLogo,  setHoverLogo]            = useState(false)
  const [mobileOpen, setMobileOpen]           = useState(false)
  const observerRef                           = useRef<IntersectionObserver | null>(null)
  const [activeSection, setActiveSection]     = useState('')

  // Active link: route match OR section observer (home page)
  const isHome = location.pathname === '/'
  const activeHref = isHome
    ? (activeSection || '')
    : '/' + location.pathname.split('/')[1]

  // Scroll → pill style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section observer (only on home page)
  useEffect(() => {
    if (!isHome) return
    observerRef.current?.disconnect()

    const sectionIds = ['portafolio', 'sistemas', 'precios', 'proceso']
    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) setActiveSection('/' + visible[0].target.id)
      },
      { threshold: [0.15, 0.35], rootMargin: '-80px 0px -45% 0px' }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [isHome, location.pathname])

  // Close drawer on scroll
  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [])

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 md:pt-6 px-4 pointer-events-none"
      aria-label="Navegación principal"
    >
      {/* ── Pill container ── */}
      <motion.div
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className={`pointer-events-auto inline-flex items-center rounded-full border px-2 py-2 transition-all duration-500 ${
          scrolled
            ? 'border-stroke/80 bg-surface/92 backdrop-blur-md shadow-lg shadow-black/25'
            : 'border-white/8 bg-surface/50 backdrop-blur-sm'
        }`}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
          aria-label="Revolution505 — inicio"
          className="relative flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            transform: hoverLogo ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.2s ease',
          }}
        >
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: hoverLogo
                ? 'linear-gradient(-90deg, #3b82f6 0%, #60a5fa 100%)'
                : 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
              mask: 'radial-gradient(circle at center, transparent 59%, black 60%)',
              WebkitMask: 'radial-gradient(circle at center, transparent 59%, black 60%)',
            }}
            animate={{ rotate: hoverLogo ? 360 : 0 }}
            transition={{ duration: 0.75, ease: 'easeInOut' }}
          />
          <span className="relative z-10 w-7 h-7 rounded-full bg-bg flex items-center justify-center overflow-hidden">
            <img
              src="/assets/logo-r.png"
              alt="Revolution505"
              className="w-5 h-5 object-contain"
              width="20"
              height="20"
              draggable={false}
              fetchPriority="high"
            />
          </span>
        </Link>

        <span className="hidden md:block w-px h-5 bg-stroke mx-1 flex-shrink-0" />

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-0.5">
          {LINKS.map(link => {
            const active = activeHref === link.href
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`relative text-sm rounded-full px-4 py-2 transition-all duration-200 ${
                  active
                    ? 'text-text-primary'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-stroke/50"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}
        </div>

        <span className="hidden md:block w-px h-5 bg-stroke mx-1 flex-shrink-0" />

        {/* ── CTA ── */}
        <a
          href={WA_CTA}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta relative flex-shrink-0"
          aria-label="Cotizar proyecto por WhatsApp"
        >
          <span
            className="absolute rounded-full opacity-0 group-hover/cta:opacity-100 transition-opacity duration-200 pointer-events-none"
            style={{ inset: '-1px', background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)' }}
            aria-hidden
          />
          <span className="relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface text-sm text-muted group-hover/cta:text-text-primary transition-colors duration-200">
            Cotizar
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden ml-2 w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-full hover:bg-stroke/40 transition-colors"
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          <motion.span animate={mobileOpen ? { rotate: 45,  y: 7   } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="w-5 h-[1.5px] bg-muted block" />
          <motion.span animate={mobileOpen ? { opacity: 0,  scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.2  }} className="w-5 h-[1.5px] bg-muted block" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -7  } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} className="w-5 h-[1.5px] bg-muted block" />
        </button>
      </motion.div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-auto absolute top-[72px] left-4 right-4 rounded-2xl border border-stroke bg-surface/97 backdrop-blur-2xl p-3 space-y-1 shadow-xl shadow-black/30"
          >
            {LINKS.map(link => {
              const active = activeHref === link.href
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
                    active
                      ? 'text-text-primary bg-stroke/50'
                      : 'text-muted hover:text-text-primary hover:bg-stroke/30'
                  }`}
                >
                  {link.label}
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                </Link>
              )
            })}

            <div className="pt-1 border-t border-stroke mt-1">
              <a
                href={WA_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-white accent-gradient"
              >
                Cotizar por WhatsApp
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
