import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const posts = [
  {
    title: '¿Cuánto cuesta una página web en México? [2026]',
    desc: 'Guía completa de precios para desarrollar tu sitio web profesional en México.',
    tag: 'Precios',
    slug: '#',
  },
  {
    title: 'Desarrollo web en Querétaro: Guía 2026',
    desc: 'Todo lo que necesitas saber para crear tu página web en Querétaro.',
    tag: 'Local SEO',
    slug: '#',
  },
  {
    title: 'SEO Local para Pequeñas Empresas',
    desc: 'Checklist práctico para aparecer en Google cuando tus clientes te buscan.',
    tag: 'SEO',
    slug: '#',
  },
]

export default function InsightsSection() {
  return (
    <section id="blog" className="relative py-24 md:py-32 px-4 cosmic-gradient">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <span className="text-xs tracking-[0.2em] text-muted uppercase">Blog</span>
            <h2 className="text-3xl md:text-5xl font-display italic text-text-primary mt-2">
              Insights{' '}
              <span className="accent-gradient-text">& Artículos</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-xs text-muted hover:text-text-primary transition-colors"
          >
            Ver todos <ArrowUpRight className="w-3 h-3" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="group bg-surface/50 border border-stroke rounded-2xl p-6 hover:border-accent/30 transition-colors"
            >
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase bg-accent/10 text-accent mb-4">
                {post.tag}
              </span>
              <h3 className="text-base font-body font-medium text-text-primary mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">{post.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Leer más <ArrowUpRight className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </div>

        <a
          href="#"
          className="md:hidden flex items-center justify-center gap-2 text-xs text-muted mt-8"
        >
          Ver todos los artículos <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </section>
  )
}
