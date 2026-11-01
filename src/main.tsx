import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Las rutas vienen prerenderizadas (scripts/prerender.mjs): se hidrata el HTML existente.
// En `npm run dev` el #root llega vacío y se monta normal.
if (container.hasChildNodes()) {
  // La hidratación del home es una tarea larga: se agenda después del primer pintado para
  // que el HTML prerenderizado se vea de inmediato (rAF + setTimeout = justo tras pintar).
  // En pestañas en segundo plano rAF no corre, así que ahí se hidrata directo.
  const hydrate = () => hydrateRoot(container, app)
  if (document.visibilityState === 'hidden') hydrate()
  else requestAnimationFrame(() => setTimeout(hydrate, 0))
} else {
  createRoot(container).render(app)
}
