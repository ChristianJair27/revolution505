import type { RefObject } from 'react'

// GSAP + ScrollTrigger (~45 KB gzip) se cargan bajo demanda: solo animan secciones
// que entran al hacer scroll, así que no deben bloquear la carga inicial de ninguna ruta.

type Gsap = typeof import('gsap').gsap

let loading: Promise<Gsap> | undefined

/** Resuelve cuando la página terminó de cargar y el hilo principal está libre. */
function afterLoadIdle(): Promise<void> {
  return new Promise((resolve) => {
    const idle = () =>
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(() => resolve(), { timeout: 2000 })
        : setTimeout(resolve, 200)
    if (document.readyState === 'complete') idle()
    else window.addEventListener('load', idle, { once: true })
  })
}

export function loadGsap(): Promise<Gsap> {
  loading ??= afterLoadIdle().then(() => Promise.all([import('gsap'), import('gsap/ScrollTrigger')])).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return gsap
    },
  )
  return loading
}

/**
 * Corre `setup` dentro de un gsap.context cuando GSAP termina de cargar.
 * Devuelve la limpieza para usarla directo en un useEffect:
 *   useEffect(() => withGsap((gsap) => { gsap.from(...) }, sectionRef), [])
 */
export function withGsap(setup: (gsap: Gsap) => void, scope?: RefObject<Element | null>): () => void {
  let ctx: gsap.Context | undefined
  let cancelled = false
  loadGsap()
    .then((g) => {
      if (!cancelled) ctx = g.context(() => setup(g), scope?.current ?? undefined)
    })
    .catch(() => {})
  return () => {
    cancelled = true
    ctx?.revert()
  }
}
