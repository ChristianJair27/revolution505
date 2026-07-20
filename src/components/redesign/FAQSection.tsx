import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: '¿Cuánto tiempo tarda en estar lista mi página?',
    a: 'Dependiendo del plan: Landing Esencial en 5-7 días hábiles, Sitio Profesional en 10-15 días y Premium en 20-25 días. Si tienes urgencia, ofrecemos entregas aceleradas con un cargo adicional del 30-60% según la prioridad.',
  },
  {
    q: '¿Qué pasa si no me gusta el diseño?',
    a: 'Antes de programar una sola línea de código, te presentamos prototipos interactivos en Figma para que apruebes el diseño. Incluimos 2 rondas de revisiones en el proceso. Si en esa etapa no quedas conforme, rediseñamos sin costo adicional.',
  },
  {
    q: '¿Necesito saber de tecnología para administrar mi sitio?',
    a: 'No. Instalamos un panel administrable (CMS) intuitivo y te damos una capacitación de 2 horas incluida en tu plan. Después podrás actualizar textos, imágenes y publicar en el blog tú solo, sin ayuda técnica.',
  },
  {
    q: '¿El hosting y dominio están incluidos?',
    a: 'Sí. Todos los planes incluyen hosting en servidor de alto rendimiento y dominio .com.mx por 1 año. A partir del segundo año, la renovación es aproximadamente $1,500 MXN anuales — te avisamos con anticipación.',
  },
  {
    q: '¿Pueden crear mi página si estoy en otra ciudad de México?',
    a: 'Trabajamos 100% de forma remota. Hemos entregado proyectos en CDMX, Guadalajara, Monterrey, Querétaro y toda la República. La comunicación es por WhatsApp, videollamada y correo — sin reuniones presenciales obligatorias.',
  },
  {
    q: '¿Qué diferencia hay entre una landing page y un sitio web?',
    a: 'Una landing page es una sola página diseñada para convertir: ideal para anuncios, lanzamientos o negocios que inician. Un sitio web tiene múltiples secciones (inicio, servicios, portafolio, contacto, blog) y es más completo para negocios establecidos.',
  },
  {
    q: '¿Ofrecen mantenimiento después de la entrega?',
    a: 'El Plan Profesional incluye 30 días de soporte y el Premium 60 días. Después, ofrecemos planes de mantenimiento mensual desde $800 MXN que incluyen actualizaciones, copias de seguridad y soporte técnico prioritario.',
  },
  {
    q: '¿Pueden hacer mi sitio aparecer en Google?',
    a: 'Implementamos SEO on-page en todos los planes: optimización técnica, keywords locales, Schema markup y Google Search Console. El posicionamiento orgánico toma entre 2-4 meses para términos locales (ej. "restaurante en Querétaro"). Los anuncios pagados en Google pueden dar resultados inmediatos.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FAQItem — single accordion row
// ─────────────────────────────────────────────────────────────────────────────
interface FAQItemProps {
  question: string
  answer:   string
  isOpen:   boolean
  onToggle: () => void
  index:    number
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-b border-stroke last:border-0"
    >
      {/* Question row — clickable */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`text-sm md:text-base font-medium leading-snug transition-colors duration-200 ${
          isOpen ? 'text-text-primary' : 'text-text-primary/80 group-hover:text-text-primary'
        }`}>
          {question}
        </span>

        {/* +/× icon */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-stroke bg-surface/40 text-muted group-hover:border-stroke/70 group-hover:text-text-primary'
          }`}
          aria-hidden
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        </motion.span>
      </button>

      {/* Answer — animated height */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-sm text-muted leading-relaxed pb-6 max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function FAQSection() {
  const sectionRef       = useRef<HTMLElement>(null)
  const [openIdx, setOpenIdx] = useState<number | null>(0)  // first item open by default

  const toggle = (i: number) => setOpenIdx(prev => prev === i ? null : i)

  // GSAP ScrollTrigger for header
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', {
        opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 md:py-32 px-4 border-t border-stroke"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="faq-header flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Preguntas Frecuentes</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display italic text-text-primary">
              Todo lo que{' '}
              <em className="not-italic accent-gradient-text">necesitas saber</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-md leading-relaxed">
              Resolvemos las dudas más comunes antes de que tengas que preguntar.
            </p>
          </div>

          {/* Quick contact */}
          <div className="flex-shrink-0 flex flex-col gap-2">
            <p className="text-xs text-muted">¿No encuentras tu respuesta?</p>
            <a
              href="https://wa.me/524423723972?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20sus%20servicios.%20%C2%BFPodemos%20hablar%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stroke bg-surface/40 text-sm text-muted hover:text-text-primary hover:border-accent/30 transition-all duration-200 self-start"
            >
              Pregúntanos por WhatsApp
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ── FAQ Accordion ── */}
        <div className="bg-surface/30 border border-stroke rounded-3xl px-6 md:px-10">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.q}
              question={faq.q}
              answer={faq.a}
              isOpen={openIdx === i}
              onToggle={() => toggle(i)}
              index={i}
            />
          ))}
        </div>

        {/* ── Bottom: still have questions ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-10 p-6 md:p-8 rounded-3xl border border-stroke bg-surface/20 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div>
            <p className="text-base font-medium text-text-primary">¿Tienes un proyecto en mente?</p>
            <p className="text-sm text-muted mt-1">Habla con nosotros hoy — respuesta garantizada en menos de 2 horas.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            {/* Primary */}
            <a
              href="https://wa.me/524423723972?text=Hola%20Revolution505%2C%20quiero%20hablar%20sobre%20un%20proyecto.%20%C2%BFEst%C3%A1n%20disponibles%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full"
            >
              <span
                className="absolute rounded-full pointer-events-none"
                style={{ inset: '-1.5px', background: 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)' }}
                aria-hidden
              />
              <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-medium">
                Empezar ahora
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>

            {/* Secondary */}
            <a
              href="#calculadora"
              onClick={e => { e.preventDefault(); document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-stroke text-sm text-muted hover:text-text-primary hover:border-stroke/70 transition-colors duration-200"
            >
              Ver calculadora de precios
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
