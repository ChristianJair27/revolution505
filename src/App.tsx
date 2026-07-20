import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect }                               from 'react'
import Navbar         from './components/redesign/Navbar'
import FooterSection  from './components/redesign/FooterSection'
import WhatsAppButton from './components/redesign/WhatsAppButton'
import { gtagPageView, initWhatsAppTracking } from './lib/gtag'

// Pages
import Index          from './pages/Index'
import PortafolioPage from './pages/redesign/PortafolioPage'
import SistemasPage   from './pages/redesign/SistemasPage'
import PreciosPage    from './pages/redesign/PreciosPage'
import ProcesoPag     from './pages/redesign/ProcesoPag'
import ContactoPage   from './pages/redesign/ContactoPage'

// ─────────────────────────────────────────────────────────────────────────────
// Google Ads: registra page view en cada cambio de ruta (SPA)
// ─────────────────────────────────────────────────────────────────────────────
function GtagRouteTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Pequeño delay para que document.title se actualice antes de enviar
    const id = setTimeout(() => gtagPageView(pathname), 150)
    return () => clearTimeout(id)
  }, [pathname])

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll to top + init global WhatsApp click tracking
// ─────────────────────────────────────────────────────────────────────────────
function ScrollReset() {
  const { pathname } = useLocation()

  // Init auto-tracking de WA una sola vez al montar la app
  useEffect(() => { initWhatsAppTracking() }, [])

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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <GtagRouteTracker />
      <Routes>
        {/* Home — full landing (has own Navbar/Footer via Index) */}
        <Route path="/" element={<Index />} />

        {/* Sub-pages use shared Shell */}
        <Route path="/portafolio" element={<Shell><PortafolioPage /></Shell>} />
        <Route path="/sistemas"   element={<Shell><SistemasPage /></Shell>}   />
        <Route path="/precios"    element={<Shell><PreciosPage /></Shell>}     />
        <Route path="/proceso"    element={<Shell><ProcesoPag /></Shell>}      />
        <Route path="/contacto"   element={<Shell><ContactoPage /></Shell>}    />
      </Routes>
    </BrowserRouter>
  )
}
