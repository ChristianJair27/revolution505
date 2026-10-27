// Entrada SSR usada solo en build por scripts/prerender.mjs (no se despliega).
// No participa en HMR, así que la regla de fast refresh no aplica a sus re-exports.
/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'

export { routes, NOT_FOUND_META, SITE_NAME, DEFAULT_OG_IMAGE, canonicalUrl, fullTitle } from './seo/routes'

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
