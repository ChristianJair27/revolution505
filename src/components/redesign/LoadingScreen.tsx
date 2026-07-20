import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['Transformamos', 'Diseñamos', 'Convertimos', 'Escalamos', 'Dominamos']

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const duration = 2700
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * 100)
      setCount(current)

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setCount(100)
        setReady(true)
        setTimeout(onComplete, 400)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12 select-none overflow-hidden"
      animate={{ opacity: ready ? 0 : 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Top-left: logo + brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center gap-2.5"
      >
        <img
          src="/assets/logo-r.png"
          alt="Revolution505"
          className="w-7 h-7 object-contain flex-shrink-0"
          draggable={false}
        />
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
          Revolution505
        </span>
      </motion.div>

      {/* Center: rotating action words */}
      <div className="flex items-center justify-center flex-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[wordIndex]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom: progress bar (left) + counter (right) */}
      <div className="flex items-end justify-between gap-6">
        {/* Progress bar */}
        <div className="w-48">
          <div className="h-[3px] bg-stroke/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full accent-gradient rounded-full"
              style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.35)' }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.08, ease: 'linear' }}
            />
          </div>
        </div>

        {/* Counter */}
        <span className="text-6xl md:text-8xl lg:text-9xl font-display italic text-text-primary leading-none tabular-nums">
          {String(count).padStart(3, '0')}
        </span>
      </div>
    </motion.div>
  )
}
