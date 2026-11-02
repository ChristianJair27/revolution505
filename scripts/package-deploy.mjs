// Empaqueta dist/ en deploy/site.zip para el deploy del plugin de Hostinger
// (hosting_deployStaticSiteArchiveV1), que BORRA toda la raíz del sitio antes de extraer.
//
// Los archivos que solo existen en el servidor (p. ej. api/lead.config.php con la contraseña SMTP)
// se respaldan en server-only/ (gitignored) y se mezclan aquí, para que el deploy no los pierda.
//
// Uso: npm run build && node scripts/package-deploy.mjs
//      --allow-missing-config   empaqueta aunque falte server-only/api/lead.config.php
import { cpSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { execFileSync } from 'node:child_process'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const dist = join(root, 'dist')
const serverOnly = join(root, 'server-only')
const out = join(root, 'deploy', 'site.zip')

if (!existsSync(join(dist, 'index.html'))) {
  console.error('No hay build: corre `npm run build` primero.')
  process.exit(1)
}
if (!existsSync(join(serverOnly, 'api', 'lead.config.php')) && !process.argv.includes('--allow-missing-config')) {
  console.error(
    'Falta server-only/api/lead.config.php (respaldo del servidor). Sin él, el formulario deja de enviar correo\n' +
      'después del deploy. Respáldalo primero o usa --allow-missing-config si el servidor usa mail() sin config.',
  )
  process.exit(1)
}

const stage = join(tmpdir(), `r505-deploy-${process.pid}`)
rmSync(stage, { recursive: true, force: true })
cpSync(dist, stage, { recursive: true })
if (existsSync(serverOnly)) {
  cpSync(serverOnly, stage, { recursive: true })
  console.log('mezclado server-only/ (archivos que solo viven en Hostinger)')
}

mkdirSync(join(root, 'deploy'), { recursive: true })
rmSync(out, { force: true })
// bsdtar (incluido en Windows 10+ y macOS) crea zip con -a; incluye .htaccess
// En Windows se fuerza el tar del sistema: el de Git Bash (GNU) interpreta "J:" como host remoto.
const tar = process.platform === 'win32' ? join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'tar.exe') : 'tar'
execFileSync(tar, ['-a', '-c', '-f', out, '-C', stage, '.'], { stdio: 'inherit' })
rmSync(stage, { recursive: true, force: true })
console.log(`listo: ${out} (${Math.round(statSync(out).size / 1024)} KB)`)
