/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA4_ID?: string
  readonly VITE_ADS_ID?: string
  readonly VITE_ADS_LABEL_LEAD?: string
  readonly VITE_ADS_LABEL_WHATSAPP?: string
  readonly VITE_ADS_LABEL_PHONE?: string
  readonly VITE_ADS_LABEL_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
