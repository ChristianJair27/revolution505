import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Hls from 'hls.js'
import gsap from 'gsap'

const roles = ['Páginas Web', 'Sistemas Personalizados', 'Tiendas Online', 'Soluciones Digitales']

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  /* ── Role cycling ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  /* ── HLS video ── */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls({ lowLatencyMode: false, startLevel: -1 })
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
      video.play().catch(() => {})
    }
  }, [])

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl
        .fromTo(
          '.hero-name',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2 },
          0.1
        )
        .fromTo(
          '.hero-blur-in',
          { opacity: 0, filter: 'blur(10px)', y: 20 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.12 },
          0.3
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Video background ── */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        {/* Bottom fade to bg */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
        {/* Fallback cosmic gradient for when video is loading */}
        <div className="absolute inset-0 cosmic-gradient -z-10" />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24">

        {/* Eyebrow */}
        <span className="hero-blur-in inline-block text-xs text-muted uppercase tracking-[0.3em] mb-8">
          TECNOLOGÍA DE VANGUARDIA · MÉXICO 2026
        </span>

        {/* Main headline */}
        <h1 className="hero-name text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Transformamos
          <br />
          <span className="accent-gradient-text">Ideas en Realidad</span>
        </h1>

        {/* Animated role line */}
        <div className="hero-blur-in flex items-center justify-center gap-2 text-lg md:text-xl mb-8 min-h-[2rem]">
          <span className="text-text-primary/40 font-body">Creamos</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[roleIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="font-display italic accent-gradient-text inline-block"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="text-text-primary/40 font-body">que convierten.</span>
        </div>

        {/* Description */}
        <p className="hero-blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12 leading-relaxed">
          Agencia de desarrollo web en Querétaro. Sitios profesionales, sistemas a medida
          y tiendas online con tecnología moderna y resultados medibles.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="hero-blur-in inline-flex flex-col sm:flex-row items-center gap-4">

          {/* Primary: "Ver Proyectos" — solid with gradient border on hover */}
          <button
            onClick={() => scrollTo('portafolio')}
            className="group relative rounded-full hover:scale-105 transition-transform duration-200"
          >
            <span
              className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{ inset: '-2px', background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)' }}
              aria-hidden
            />
            <span className="relative z-10 flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-all duration-200">
              Ver Proyectos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>

          {/* Secondary: "Hablar por WhatsApp" — outlined with gradient border on hover */}
          <a
            href="https://wa.me/524423723972?text=Hola%2C%20vi%20su%20p%C3%A1gina%20y%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-full hover:scale-105 transition-transform duration-200"
          >
            <span
              className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{ inset: '-2px', background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)' }}
              aria-hidden
            />
            <span className="relative z-10 flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent transition-all duration-200">
              Hablar por WhatsApp
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted">SCROLL</span>
        <div className="w-px h-10 bg-stroke/60 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 accent-gradient animate-scroll-down" />
        </div>
      </motion.div>
    </section>
  )
}
