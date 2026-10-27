import { waUrl } from '../../constants/whatsapp'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight, ArrowRight, X, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageMeta } from '../../hooks/usePageMeta'
import { Link } from 'react-router-dom'
import { CASOS } from '../../content/casos'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────
type Category   = 'web' | 'ecommerce' | 'sistemas' | 'seo'
type FilterType = 'all' | Category

interface Metric  { label: string; value: string; icon: string }
interface Project {
  id:          string
  title:       string
  subtitle:    string
  category:    Category
  tags:        string[]
  image:       string
  year:        string
  delivery:    string
  industry:    string
  description: string
  challenge:   string
  solution:    string
  metrics:     Metric[]
  wa:          string
  featured?:   boolean
  liveUrl?:    string
}

// Datos: src/content/casos.ts (solo clientes autorizados y hechos verificables; sin métricas inventadas).
const FACT_ICONS = ['🏷️', '📌', '🧩', '🌐']
const PROJECTS: Project[] = CASOS.map((c, i) => ({
  id:          c.slug,
  title:       c.client.split(' — ')[0].split(' (')[0],
  subtitle:    c.kind === 'propio' ? 'Proyecto propio' : 'Cliente',
  category:    c.category,
  tags:        c.stack.slice(0, 5),
  image:       c.image,
  year:        c.year ?? '',
  delivery:    c.liveLabel,
  industry:    c.sector,
  description: c.summary,
  challenge:   c.context,
  solution:    c.built.slice(0, 3).join(' '),
  metrics:     c.facts.map((f, j) => ({ ...f, icon: FACT_ICONS[j] ?? '•' })),
  wa:          waUrl(c.waText),
  featured:    i % 3 === 0,
  liveUrl:     c.liveUrl,
}))

const FILTERS: { id: FilterType; label: string; emoji: string }[] = [
  { id: 'all',       label: 'Todos',      emoji: '🗂'  },
  { id: 'web',       label: 'Web',        emoji: '🌐'  },
  { id: 'ecommerce', label: 'E-commerce', emoji: '🛒'  },
  { id: 'sistemas',  label: 'Sistemas',   emoji: '⚙️' },
  { id: 'seo',       label: 'SEO',        emoji: '🔍'  },
]

// Floating card positions (for hero background)
const FLOAT_CONFIG = [
  { src: '/assets/casos/amq-capacitaciones.jpg',  top: '8%',  left: '-2%',  delay: '0s',   anim: 'animate-float-up'   },
  { src: '/assets/casos/flyzz.jpg',               top: '5%',  right: '-2%', delay: '1.5s', anim: 'animate-float-down' },
  { src: '/assets/casos/corporativo-rios.jpg',    top: '55%', left: '-3%',  delay: '3s',   anim: 'animate-float-down' },
  { src: '/assets/casos/atak-gg.jpg',             top: '60%', right: '-3%', delay: '2.2s', anim: 'animate-float-up'   },
  { src: '/assets/casos/la-pena-de-santiago.jpg', top: '30%', right: '-4%', delay: '0.8s', anim: 'animate-drift-x'    },
]

// ─────────────────────────────────────────────────────────────────────────────
// Project Modal
// ─────────────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose, onPrev, onNext, hasPrev, hasNext }: {
  project:  Project
  onClose:  () => void
  onPrev:   () => void
  onNext:   () => void
  hasPrev:  boolean
  hasNext:  boolean
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-bg/92 backdrop-blur-2xl" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        exit={{ opacity: 0, y: 50, scale: 0.96 }}
        transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/60"
        onClick={e => e.stopPropagation()}
      >
        {/* Screenshot header */}
        <div className="relative h-56 sm:h-72 flex-shrink-0 overflow-hidden rounded-t-3xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

          {/* Nav arrows */}
          {hasPrev && (
            <button onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg/75 backdrop-blur-sm border border-stroke/60 flex items-center justify-center text-muted hover:text-text-primary transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          {hasNext && (
            <button onClick={onNext}
              className="absolute right-14 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg/75 backdrop-blur-sm border border-stroke/60 flex items-center justify-center text-muted hover:text-text-primary transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg/75 backdrop-blur-sm border border-stroke/60 flex items-center justify-center text-muted hover:text-text-primary transition-colors">
            <X className="w-4 h-4" />
          </button>

          {/* Category + year pill */}
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full accent-gradient text-[10px] text-white font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-bg/70 backdrop-blur-sm border border-stroke/50 text-[10px] text-muted">
              {[project.year, project.delivery].filter(Boolean).join(' · ')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Header */}
          <div>
            <p className="text-[10px] text-muted uppercase tracking-widest mb-1">{project.subtitle} · {project.industry}</p>
            <h2 className="text-2xl sm:text-3xl font-display italic text-text-primary">{project.title}</h2>
          </div>

          {/* Metrics 4-col */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="bg-bg border border-stroke rounded-2xl p-3 sm:p-4 text-center"
              >
                <p className="text-xl mb-1" aria-hidden>{m.icon}</p>
                <p className="text-base sm:text-lg font-display italic accent-gradient-text leading-tight">{m.value}</p>
                <p className="text-[10px] text-muted mt-1.5 leading-tight">{m.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Two-col: problem + solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-stroke/60 bg-bg/40">
              <p className="text-[10px] text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" /> El problema
              </p>
              <p className="text-xs text-muted leading-relaxed">{project.challenge}</p>
            </div>
            <div className="p-4 rounded-2xl border border-accent/15 bg-accent/5">
              <p className="text-[10px] text-muted uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" /> La solución
              </p>
              <p className="text-xs text-muted leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-surface border border-stroke text-[10px] text-muted">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-stroke">
            <a
              href={project.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
            >
              <span
                className="absolute rounded-full pointer-events-none"
                style={{ inset: '-2px', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }}
                aria-hidden
              />
              <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-white text-sm font-semibold w-full">
                Quiero algo así
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <Link
              to={`/portafolio/${project.id}`}
              className="sm:w-auto px-6 py-3 rounded-full border border-stroke text-sm text-center text-muted hover:text-text-primary hover:border-accent/40 transition-all duration-200"
            >
              Ver caso completo
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Card
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({
  project, index, onClick, isHovered, anyHovered, onMouseEnter, onMouseLeave,
}: {
  project: Project; index: number; onClick: () => void
  isHovered: boolean; anyHovered: boolean; onMouseEnter: () => void; onMouseLeave: () => void
}) {
  const isFeat   = project.featured
  // Alternate bento: featured alternates between 7/12 and 5/12
  const altRow   = Math.floor(index / 2) % 2 === 1
  const colSpan  = isFeat
    ? (altRow ? 'col-span-12 sm:col-span-5' : 'col-span-12 sm:col-span-7')
    : (altRow ? 'col-span-12 sm:col-span-7' : 'col-span-12 sm:col-span-5')
  const height   = 'h-[270px] md:h-[360px]'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: anyHovered ? 0.52 : 1, scale: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.22 } }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${colSpan} ${height}`}
      style={{ zIndex: isHovered ? 1 : 0 }}
    >
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      {/* Halftone grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        aria-hidden
      />
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

      {/* Default label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3">
        {isFeat && (
          <span className="inline-flex items-center gap-1 mb-2 px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-[9px] text-accent uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
            Destacado
          </span>
        )}
        <span className="text-[10px] tracking-[0.22em] uppercase text-accent font-medium block mb-1.5">{project.subtitle}</span>
        <h3 className="text-xl md:text-2xl font-display italic text-white leading-tight">{project.title}</h3>
      </div>

      {/* Hover panel */}
      <div className="absolute inset-0 bg-bg/88 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 md:p-7">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-lg">{project.metrics[0].icon}</span>
            <span className="text-base font-semibold text-text-primary">{project.metrics[0].value}</span>
            <span className="text-xs text-muted">{project.metrics[0].label}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-surface/80 border border-stroke/60 text-[10px] text-muted">{tag}</span>
            ))}
          </div>
          <p className="text-xs text-muted leading-snug line-clamp-3">{project.description}</p>
        </div>
        <div className="relative self-start">
          <span
            className="absolute rounded-full pointer-events-none"
            style={{ inset: '-1.5px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)' }}
            aria-hidden
          />
          <span className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg text-sm text-text-primary">
            Ver proyecto <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero Section — floating project cards background
// ─────────────────────────────────────────────────────────────────────────────
function PortafolioHero() {
  return (
    <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden pt-24">
      {/* Floating project thumbnails — hidden on mobile, shown md+ */}
      <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
        {FLOAT_CONFIG.map((fc, i) => (
          <div
            key={i}
            className={`absolute rounded-2xl overflow-hidden border border-white/8 shadow-2xl ${fc.anim}`}
            style={{
              width: '220px', height: '140px',
              top: fc.top, left: fc.left, right: fc.right,
              animationDelay: fc.delay,
              opacity: 0.18,
              filter: 'blur(1px)',
            }}
          >
            <img src={fc.src} alt="" className="w-full h-full object-cover object-top" draggable={false} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
          </div>
        ))}

        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-3xl animate-orb-drift"
          style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.1), transparent 70%)' }}
          aria-hidden
        />
      </div>

      {/* Edge vignettes */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block text-xs text-muted uppercase tracking-[0.3em] mb-6"
        >
          Portafolio · Revolution505
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl font-display italic text-text-primary leading-[0.92] mb-6"
        >
          Proyectos que{' '}
          <em className="not-italic accent-gradient-text">hablan</em>
          <br />por sí solos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-sm md:text-base text-muted max-w-lg mx-auto mb-8 leading-relaxed"
        >
          Proyectos reales, con enlace al sitio en vivo. Sin métricas infladas: solo lo que construimos.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={waUrl('Hola, quiero hablar sobre un proyecto como los del portafolio de Revolution505.')}
            target="_blank" rel="noopener noreferrer"
            className="group relative rounded-full hover:scale-105 transition-transform duration-200"
          >
            <span className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ inset: '-2px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }} aria-hidden />
            <span className="relative z-10 flex items-center gap-2 px-7 py-3.5 rounded-full bg-text-primary text-bg text-sm font-semibold group-hover:bg-bg group-hover:text-text-primary transition-all duration-200">
              Cotizar mi proyecto <ArrowRight className="w-4 h-4" />
            </span>
          </a>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Respondemos en menos de 2 horas
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase text-muted">Scroll</span>
        <div className="w-px h-10 bg-stroke/60 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 accent-gradient animate-scroll-down" />
        </div>
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function PortafolioPage() {
  usePageMeta('/portafolio')

  const gridRef                         = useRef<HTMLDivElement>(null)
  const [filter, setFilter]             = useState<FilterType>('all')
  const [hoveredId, setHoveredId]       = useState<string | null>(null)
  const [modalProject, setModalProject] = useState<Project | null>(null)

  const filtered      = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter)
  const currentIndex  = modalProject ? PROJECTS.findIndex(p => p.id === modalProject.id) : -1
  const hasPrev       = currentIndex > 0
  const hasNext       = currentIndex < PROJECTS.length - 1

  const openModal  = (p: Project) => setModalProject(p)
  const closeModal = ()           => setModalProject(null)
  const goPrev     = () => hasPrev && setModalProject(PROJECTS[currentIndex - 1])
  const goNext     = () => hasNext && setModalProject(PROJECTS[currentIndex + 1])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.port-stats', {
        opacity: 0, y: 18, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.port-stats', start: 'top 82%', once: true },
      })
      gsap.from('.port-filter', {
        opacity: 0, y: 14, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.port-filter', start: 'top 82%', once: true },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            project={modalProject}
            onClose={closeModal}
            onPrev={goPrev}
            onNext={goNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        )}
      </AnimatePresence>

      {/* Hero */}
      <PortafolioHero />

      {/* Grid content */}
      <div ref={gridRef} className="max-w-[1200px] mx-auto px-4 pb-24 md:pb-32">

        {/* Stats strip */}
        <div className="port-stats grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { value: String(CASOS.length), label: 'Casos publicados' },
            { value: String(CASOS.filter(c => c.kind === 'cliente').length), label: 'Sitios de clientes en vivo' },
            { value: String(CASOS.filter(c => c.kind === 'propio').length), label: 'Productos propios' },
            { value: 'QRO', label: 'Base de operación' },
          ].map(stat => (
            <div key={stat.label} className="p-4 rounded-2xl border border-stroke/60 bg-surface/30 text-center">
              <p className="text-2xl font-display italic accent-gradient-text">{stat.value}</p>
              <p className="text-[11px] text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="port-filter flex flex-wrap items-center gap-2 mb-8">
          {FILTERS.filter(f => f.id === 'all' || PROJECTS.some(p => p.category === f.id)).map(({ id, label, emoji }) => {
            const count  = id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.category === id).length
            const active = filter === id
            return (
              <motion.button
                key={id}
                onClick={() => setFilter(id)}
                whileTap={{ scale: 0.96 }}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
                  active
                    ? 'border-accent/50 bg-accent/10 text-text-primary'
                    : 'border-stroke bg-surface/30 text-muted hover:border-stroke/70 hover:text-text-primary hover:bg-surface/50'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-accent/8"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10">{emoji} {label}</span>
                <span className={`relative z-10 text-[10px] tabular-nums ${active ? 'text-accent' : 'text-muted/60'}`}>{count}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Bento grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-12 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => openModal(project)}
                  isHovered={hoveredId === project.id}
                  anyHovered={hoveredId !== null && hoveredId !== project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Enlaces rastreables a cada caso (el grid abre un modal) */}
        <nav aria-label="Casos de estudio" className="mt-12">
          <h2 className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Casos de estudio completos</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CASOS.map(c => (
              <li key={c.slug}>
                <Link
                  to={`/portafolio/${c.slug}`}
                  className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-stroke/60 bg-surface/30 text-sm text-text-primary hover:border-accent/40 transition-colors"
                >
                  <span>
                    <span className="block font-semibold">{c.client.split(' — ')[0]}</span>
                    <span className="block text-xs text-muted mt-0.5">{c.sector}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted flex-shrink-0" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 md:p-12 rounded-3xl border border-stroke/60 bg-surface/20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-2">
            ¿Tu proyecto podría estar aquí?
          </h3>
          <p className="text-sm text-muted max-w-md mx-auto mb-6 leading-relaxed">
            Cuéntanos tu idea. En 24 horas tendrás una propuesta personalizada sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl('Hola, vi el portafolio de Revolution505 y quiero que mi proyecto aparezca ahí. ¿Podemos hablar?')}
              target="_blank" rel="noopener noreferrer"
              className="group relative rounded-full hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
            >
              <span className="absolute rounded-full pointer-events-none"
                style={{ inset: '-2px', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }} aria-hidden />
              <span className="relative z-10 flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-white text-sm font-semibold">
                Iniciar mi proyecto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Check className="w-3.5 h-3.5 text-green-500" />
              Cotización gratis en 24 horas
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
