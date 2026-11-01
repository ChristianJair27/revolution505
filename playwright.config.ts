import { defineConfig, devices } from '@playwright/test'

// Smoke tests contra el build prerenderizado servido con PHP + router que imita el .htaccess de Hostinger.
// Requiere: npm run build · PHP 8 en PATH · Google Chrome instalado (no descarga navegadores).
export default defineConfig({
  testDir: './tests',
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:8899', channel: 'chrome' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel: 'chrome', viewport: { width: 360, height: 780 } } },
  ],
  webServer: {
    command: 'php -S 127.0.0.1:8899 -t dist scripts/php-router.php',
    url: 'http://127.0.0.1:8899/',
    reuseExistingServer: true,
  },
})
