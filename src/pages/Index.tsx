import { useRef } from 'react'
import { usePageMeta }      from '../hooks/usePageMeta'
import Navbar               from '../components/redesign/Navbar'
import HeroSection          from '../components/redesign/HeroSection'
import ClientsMarquee       from '../components/redesign/ClientsMarquee'
import CalculadoraSection   from '../components/redesign/CalculadoraSection'
import ConfiguradorSection  from '../components/redesign/ConfiguradorSection'
import SistemasSection      from '../components/redesign/SistemasSection'
import SelectedWorks        from '../components/redesign/SelectedWorks'
import ProcesoSection       from '../components/redesign/ProcesoSection'
import TestimoniosSection   from '../components/redesign/TestimoniosSection'
import SimuladorSection     from '../components/redesign/SimuladorSection'
import PreciosSection       from '../components/redesign/PreciosSection'
import FAQSection           from '../components/redesign/FAQSection'
import InsightsSection      from '../components/redesign/InsightsSection'
import FooterSection        from '../components/redesign/FooterSection'
import WhatsAppButton       from '../components/redesign/WhatsAppButton'

export default function Index() {
  const mainRef = useRef<HTMLDivElement>(null)
  usePageMeta('/')

  return (
    <>
      <div ref={mainRef} className="bg-bg text-text-primary font-body">
        <Navbar />

        {/* 1 — Hook + valor inmediato */}
        <HeroSection />

        {/* 1b — Prueba social inmediata: logos de clientes */}
        <ClientsMarquee />

        {/* Secciones bajo el pliegue: content-visibility (ver .cv-sections en index.css) */}
        <div className="cv-sections">

        {/* 2 — Estimado de precio en tiempo real */}
        <CalculadoraSection />

        {/* 3 — Configurador guiado para quienes no saben por dónde empezar */}
        <ConfiguradorSection />

        {/* 4 — Productos propios (POS, CRM, Reservas) */}
        <SistemasSection />

        {/* 4 — Evidencia de trabajo anterior */}
        <SelectedWorks />

        {/* 5 — Cómo trabajamos */}
        <ProcesoSection />

        {/* 6 — Prueba social + métricas */}
        <TestimoniosSection />

        {/* 7 — Simulador: proyección por industria */}
        <SimuladorSection />

        {/* 8 — Planes de precios (lead ya calificado) */}
        <PreciosSection />

        {/* 8 — Manejo de objeciones */}
        <FAQSection />

        {/* 9 — Contenido SEO */}
        <InsightsSection />

        </div>

        {/* 10 — CTA final + links */}
        <FooterSection />

        {/* Flotante */}
        <WhatsAppButton />
      </div>
    </>
  )
}
