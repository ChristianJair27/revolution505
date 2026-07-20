import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Diagnóstico', desc: 'Analizamos tu negocio, competencia y objetivos para definir la mejor estrategia.' },
  { num: '02', title: 'Diseño UI/UX', desc: 'Creamos prototipos interactivos en Figma para que visualices el resultado antes de programar.' },
  { num: '03', title: 'Desarrollo', desc: 'Programamos con tecnologías modernas (React, TypeScript, Tailwind) con entregas semanales.' },
  { num: '04', title: 'Lanzamiento', desc: 'Publicamos tu sitio, configuramos SEO, analítica y te capacitamos para gestionarlo.' },
]

export default function ProcesoSection() {
  return (
    <section id="servicios" className="relative py-24 md:py-32 px-4 cosmic-gradient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.2em] text-muted uppercase">Metodología</span>
          <h2 className="text-3xl md:text-5xl font-display italic text-text-primary mt-2">
            Cómo{' '}
            <span className="accent-gradient-text">Trabajamos</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="text-5xl md:text-7xl font-display italic accent-gradient-text opacity-30 mb-4">
                {step.num}
              </div>
              <h3 className="text-lg font-body font-medium text-text-primary mb-2">{step.title}</h3>
              <p className="text-xs md:text-sm text-muted leading-relaxed">{step.desc}</p>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-[1px] bg-stroke" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
