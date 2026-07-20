import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────────────────────
type Category   = 'web' | 'ecommerce' | 'sistemas'
type FilterType = 'all' | Category

interface Project {
  id:          string
  title:       string
  subtitle:    string
  category:    Category
  image:       string
  tags:        string[]
  result:      string
  duration:    string
  colSpan:     string   // responsive col-span classes
  heightClass: string   // explicit height classes
}

const PROJECTS: Project[] = [
  {
    id:          'amq',
    title:       'AMQ Group',
    subtitle:    'Corporativo + CRM',
    category:    'web',
    image:       '/assets/amq-pag.png',
    tags:        ['React', 'TypeScript', 'CRM', 'SEO'],
    result:      '+340% leads orgánicos',
    duration:    '18 días',
    colSpan:     'col-span-12 md:col-span-7',
    heightClass: 'h-[320px] md:h-[440px]',
  },
  {
    id:          'flyzz',
    title:       'FlyZZ Services',
    subtitle:    'Sistema POS + Web',
    category:    'sistemas',
    image:       '/assets/flyzz-pag.png',
    tags:        ['POS', 'Dashboard', 'E-commerce'],
    result:      '+200% eficiencia operativa',
    duration:    '22 días',
    colSpan:     'col-span-12 md:col-span-5',
    heightClass: 'h-[320px] md:h-[440px]',
  },
  {
    id:          'spartan',
    title:       'Spartan TV',
    subtitle:    'Plataforma Streaming',
    category:    'sistemas',
    image:       '/assets/spartan-pag.png',
    tags:        ['Streaming', 'IPTV', 'Panel Admin'],
    result:      '500+ suscriptores activos',
    duration:    '30 días',
    colSpan:     'col-span-12 md:col-span-5',
    heightClass: 'h-[320px] md:h-[440px]',
  },
  {
    id:          'pena',
    title:       'Peña Abogados',
    subtitle:    'Despacho Legal Online',
    category:    'web',
    image:       '/assets/pena-pag.png',
    tags:        ['SEO Local', 'Blog', 'Despacho'],
    result:      'Top 3 Google Querétaro',
    duration:    '10 días',
    colSpan:     'col-span-12 md:col-span-7',
    heightClass: 'h-[320px] md:h-[440px]',
  },
  {
    id:          'devilish',
    title:       'Devilish Store',
    subtitle:    'Tienda Online Premium',
    category:    'ecommerce',
    image:       '/assets/devilish-pag.png',
    tags:        ['E-commerce', 'Dashboard', 'Pagos'],
    result:      '$180K+ ventas en año 1',
    duration:    '15 días',
    colSpan:     'col-span-12',
    heightClass: 'h-[240px] md:h-[300px]',
  },
]

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'all',       label: 'Todos'      },
  { id: 'web',       label: 'Web'        },
  { id: 'sistemas',  label: 'Sistemas'   },
  { id: 'ecommerce', label: 'E-commerce' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function SelectedWorks() {
  const sectionRef                = useRef<HTMLElement>(null)
  const [filter, setFilter]       = useState<FilterType>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter)

  // GSAP ScrollTrigger entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 78%', once: true }
      gsap.from('.works-header',  { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',             scrollTrigger: trigger })
      gsap.from('.works-filters', { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out', delay: 0.12, scrollTrigger: trigger })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portafolio"
      className="relative py-24 md:py-32 px-4 border-t border-stroke overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(217 91% 60% / 0.05), transparent 70%)' }}
        aria-hidden
      />

      <div className="max-w-[1200px] mx-auto relative">

        {/* ── Header ── */}
        <div className="works-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Portafolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display italic text-text-primary">
              Proyectos que{' '}
              <em className="not-italic accent-gradient-text">hablan</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-lg leading-relaxed">
              Cada proyecto tiene una historia de resultados reales. No vendemos promesas — entregamos evidencia.
            </p>
          </div>

          {/* "Ver todos" — desktop → /portafolio */}
          <Link
            to="/portafolio"
            className="hidden md:inline-flex items-center gap-2 group relative rounded-full flex-shrink-0"
          >
            <span
              className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ inset: '-1px', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }}
              aria-hidden
            />
            <span className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full border border-stroke bg-bg text-sm text-muted group-hover:text-text-primary transition-colors">
              Ver todos los proyectos (12)
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* ── Filter tabs ── */}
        <div className="works-filters flex items-center gap-2 mb-8 flex-wrap">
          {FILTERS.map(({ id, label }) => {
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
                <span className="relative z-10">{label}</span>
                <span className={`relative z-10 text-[10px] tabular-nums ${active ? 'text-accent' : 'text-muted/60'}`}>
                  {count}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* ── Bento grid ── */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-12 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isHovered={hoveredId === project.id}
                  anyHovered={hoveredId !== null && hoveredId !== project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* "Ver todos" — mobile → /portafolio */}
        <div className="mt-8 md:hidden flex items-center justify-center gap-4">
          <Link
            to="/portafolio"
            className="flex items-center gap-2 text-sm text-muted hover:text-text-primary transition-colors"
          >
            Ver todos los proyectos (12) <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Project card
// ─────────────────────────────────────────────────────────────────────────────
interface CardProps {
  project:     Project
  isHovered:   boolean
  anyHovered:  boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function ProjectCard({ project, isHovered, anyHovered, onMouseEnter, onMouseLeave }: CardProps) {
  return (
    <motion.article
      layout
      layoutId={project.id}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{
        opacity: anyHovered ? 0.55 : 1,
        scale:   1,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      }}
      exit={{
        opacity: 0,
        scale:   0.95,
        transition: { duration: 0.25 },
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer
        ${project.colSpan} ${project.heightClass}`}
      style={{ zIndex: isHovered ? 1 : 0 }}
    >
      {/* ── Background image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {/* ── Halftone texture (always visible, very subtle) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden
      />

      {/* ── Bottom gradient (always visible) ── */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-0" />

      {/* ── Default bottom label ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
        <span className="text-[10px] tracking-[0.22em] uppercase text-accent font-medium block mb-1.5">
          {project.subtitle}
        </span>
        <h3 className="text-xl md:text-2xl font-display italic text-white leading-tight">
          {project.title}
        </h3>
      </div>

      {/* ── Hover overlay ── */}
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col justify-between p-5 md:p-7">

        {/* Top: result + tags */}
        <div className="space-y-3">
          {/* Result metric */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5"
          >
            <span className="text-[10px] text-muted uppercase tracking-wider font-medium">Resultado</span>
            <span className="text-sm font-semibold text-text-primary">{project.result}</span>
          </motion.div>

          {/* Duration */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted uppercase tracking-wider">Entrega</span>
            <span className="text-xs text-text-primary/80">{project.duration}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-surface/80 border border-stroke/60 text-[10px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: CTA pill with animated gradient border */}
        <div className="self-start">
          <div className="relative">
            {/* Animated gradient ring */}
            <span
              className="absolute rounded-full animate-gradient-shift pointer-events-none"
              style={{
                inset: '-1.5px',
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)',
                backgroundSize: '200% 100%',
              }}
              aria-hidden
            />
            <span className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full bg-bg text-sm text-text-primary">
              Ver{' '}
              <em className="font-display not-italic text-text-primary/90">
                — {project.title}
              </em>
              <ArrowUpRight className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
