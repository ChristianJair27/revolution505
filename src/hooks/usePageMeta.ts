import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE, NOT_FOUND_META, SITE_NAME, canonicalUrl, fullTitle, getRoute } from '../seo/routes'

// El HTML inicial de cada ruta ya trae su <head> correcto (scripts/prerender.mjs).
// Este hook solo lo mantiene sincronizado al navegar dentro de la SPA.

function setMeta(selector: string, attr: string, value: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, value)
    document.head.appendChild(el)
  }
  el.content = content
}

function setLink(rel: string, href: string | null) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (href === null) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/** Aplica el SEO de una ruta definida en src/seo/routes.ts. `null` = página 404. */
export function usePageMeta(path: string | null) {
  useEffect(() => {
    const route = path === null ? undefined : getRoute(path)
    const title = route ? fullTitle(route) : `${NOT_FOUND_META.title} | ${SITE_NAME}`
    const description = route?.description ?? NOT_FOUND_META.description
    const url = route ? canonicalUrl(route.path) : null
    const image = route?.ogImage ?? DEFAULT_OG_IMAGE

    document.title = title
    setMeta('meta[name="title"]', 'name', 'title', title)
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[name="robots"]', 'name', 'robots', route ? 'index, follow' : 'noindex, follow')

    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    if (url) setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:image"]', 'property', 'og:image', image)

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image)

    setLink('canonical', url)
  }, [path])
}
