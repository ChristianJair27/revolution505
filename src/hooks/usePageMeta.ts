import { useEffect } from 'react'

interface PageMeta {
  title:       string
  description: string
  canonical?:  string
  ogImage?:    string
}

const SITE_NAME  = 'Revolution505'
const BASE_TITLE = 'Revolution505 — Desarrollo Web Profesional en Querétaro, México'
const BASE_URL   = 'https://revolution505.com'
const DEFAULT_OG = `${BASE_URL}/assets/revolution-pag.png`

function setMeta(selector: string, attr: string, value: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, value)
    document.head.appendChild(el)
  }
  el.content = content
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function usePageMeta({ title, description, canonical, ogImage }: PageMeta) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`
    const pageUrl   = canonical ? `${BASE_URL}${canonical}` : BASE_URL
    const image     = ogImage ?? DEFAULT_OG

    // Title
    document.title = fullTitle

    // Standard
    setMeta('meta[name="description"]',    'name',     'description', description)
    setMeta('meta[name="robots"]',         'name',     'robots',      'index, follow')

    // Open Graph
    setMeta('meta[property="og:title"]',       'property', 'og:title',       fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]',         'property', 'og:url',         pageUrl)
    setMeta('meta[property="og:image"]',       'property', 'og:image',       image)
    setMeta('meta[property="og:type"]',        'property', 'og:type',        'website')
    setMeta('meta[property="og:site_name"]',   'property', 'og:site_name',   SITE_NAME)
    setMeta('meta[property="og:locale"]',      'property', 'og:locale',      'es_MX')

    // Twitter / X
    setMeta('meta[name="twitter:card"]',        'name', 'twitter:card',        'summary_large_image')
    setMeta('meta[name="twitter:title"]',       'name', 'twitter:title',       fullTitle)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:image"]',       'name', 'twitter:image',       image)

    // Canonical
    if (canonical) setLink('canonical', pageUrl)

    return () => {
      document.title = BASE_TITLE
    }
  }, [title, description, canonical, ogImage])
}
