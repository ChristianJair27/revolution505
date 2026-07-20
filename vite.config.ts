import { defineConfig } from 'vite'
import react       from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Required for Hostinger root-domain deployment
  base: '/',

  plugins: [react(), tailwindcss()],

  resolve: {
    // Force single React instance — prevents duplicate context / forwardRef crashes
    dedupe: ['react', 'react-dom'],
  },

  build: {
    chunkSizeWarningLimit: 700,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // GSAP: no React dependency — safe to isolate, cached separately
          if (id.includes('node_modules/gsap')) return 'vendor-gsap'

          // HLS.js: video streaming, no React dependency — safe to isolate
          if (id.includes('node_modules/hls.js')) return 'vendor-hls'

          // Everything else (React + ReactDOM + Router + Framer Motion + lucide + misc)
          // MUST stay in one chunk so React is fully initialized before Framer Motion
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
