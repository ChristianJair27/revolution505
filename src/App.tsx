import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect }                               from 'react'
import { MotionConfig }                             from 'framer-motion'
import Navbar         from './components/redesign/Navbar'
import FooterSection  from './components/redesign/FooterSection'
import WhatsAppButton from './components/redesign/WhatsAppButton'
import { gtagPageView, trackSpaPageView, initContactClickTracking } from './lib/gtag'

// Pages
import Index          from './pages/Index'
import PortafolioPage from './pages/redesign/PortafolioPage'
import SistemasPage   from './pages/redesign/SistemasPage'
import PreciosPage    from './pages/redesign/PreciosPage'
import ProcesoPag     from './pages/redesign/ProcesoPag'
import ContactoPage   from './pages/redesign/ContactoPage'
import NotFoundPage   from './pages/redesign/NotFoundPage'
import LandingPage    from './pages/redesign/LandingPage'
import CasoPage       from './pages/redesign/CasoPage'
import { LANDINGS_ES, LANDINGS_EN } from './content/landings'
import { CASOS }      from './content/casos'

// ─────────────────────────────────────────────────────────────────────────────
// Google Ads: registra page view en cada cambio de ruta (SPA)
// ─────────────────────────────────────────────────────────────────────────────
function GtagRouteTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Pequeño delay para que document.title se actualice antes de enviar
    const id = setTimeout(() => { gtagPageView(pathname); trackSpaPageView() }, 150)
    return () => clearTimeout(id)
  }, [pathname])

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll to top + init global click tracking (WhatsApp, tel:, mailto:)
// ─────────────────────────────────────────────────────────────────────────────
function ScrollReset() {
  const { pathname } = useLocation()

  // Init auto-tracking de WA una sola vez al montar la app
  useEffect(() => { initContactClickTracking() }, [])

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return null
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg text-text-primary font-body">
      <Navbar />
      <main>{children}</main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  )
}

/**
 * Rutas sin router: el cliente las envuelve en <BrowserRouter> (App) y
 * src/entry-server.tsx en <StaticRouter> para prerenderizar cada ruta.
 * Cada ruta nueva debe agregarse también en src/seo/routes.ts.
 */
export function AppRoutes() {
  return (
    <>
      <ScrollReset />
      <GtagRouteTracker />
      {/* Respeta "reducir movimiento" del sistema en todas las animaciones de framer-motion */}
      <MotionConfig reducedMotion="user">
      <Routes>
        {/* Home — full landing (has own Navbar/Footer via Index) */}
        <Route path="/" element={<Index />} />

        {/* Sub-pages use shared Shell */}
        <Route path="/portafolio" element={<Shell><PortafolioPage /></Shell>} />
        <Route path="/sistemas"   element={<Shell><SistemasPage /></Shell>}   />
        <Route path="/precios"    element={<Shell><PreciosPage /></Shell>}     />
        <Route path="/proceso"    element={<Shell><ProcesoPag /></Shell>}      />
        <Route path="/contacto"   element={<Shell><ContactoPage /></Shell>}    />

        {/* Landings de servicio en español (src/content/landings.ts) */}
        {LANDINGS_ES.map(l => (
          <Route key={l.path} path={l.path} element={<Shell><LandingPage landing={l} /></Shell>} />
        ))}

        {/* Páginas en inglés: header/footer propios en inglés, sin precios */}
        {LANDINGS_EN.map(l => (
          <Route key={l.path} path={l.path} element={<LandingPage landing={l} />} />
        ))}

        {/* Casos de estudio (src/content/casos.ts) */}
        {CASOS.map(c => (
          <Route key={c.slug} path={`/portafolio/${c.slug}`} element={<Shell><CasoPage caso={c} /></Shell>} />
        ))}

        {/* 404 — prerenderizado como dist/404.html */}
        <Route path="*"           element={<Shell><NotFoundPage /></Shell>}    />
      </Routes>
      </MotionConfig>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
