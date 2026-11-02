// Sube dist/ a Hostinger por FTP con TLS (curl). Credenciales en .env.local (gitignored):
//   HOSTINGER_FTP_HOST=ftp.revolution505.com
//   HOSTINGER_FTP_USER=u123456789
//   HOSTINGER_FTP_PASS=...
//   HOSTINGER_FTP_DIR=public_html        (opcional)
//
// Uso:  node scripts/deploy-ftp.mjs --dry-run   (lista lo que subiría, no conecta)
//       node scripts/deploy-ftp.mjs             (respalda index.html y .htaccess remotos y sube)
//
// - La contraseña nunca se imprime ni va en la línea de comandos: curl la lee de un netrc temporal.
// - No borra nada en el servidor y nunca sube api/lead.config.php (vive solo en Hostinger).
import { readFileSync, readdirSync, statSync, writeFileSync, rmSync, mkdirSync, existsSync } from 'node:fs'
import { join, relative, posix } from 'node:path'
import { tmpdir } from 'node:os'
import { spawn } from 'node:child_process'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const dist = join(root, 'dist')
const dryRun = process.argv.includes('--dry-run')

function loadEnv(file) {
  const env = {}
  if (!existsSync(file)) return env
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2')
  }
  return env
}

const env = { ...loadEnv(join(root, '.env.local')), ...process.env }
const host = env.HOSTINGER_FTP_HOST
const user = env.HOSTINGER_FTP_USER
const pass = env.HOSTINGER_FTP_PASS
const dir = (env.HOSTINGER_FTP_DIR || 'public_html').replace(/^\/|\/$/g, '')

const files = []
;(function walk(d) {
  for (const name of readdirSync(d)) {
    const p = join(d, name)
    if (statSync(p).isDirectory()) walk(p)
    else files.push(relative(dist, p).split('\\').join('/'))
  }
})(dist)
const upload = files.filter((f) => f !== 'api/lead.config.php').sort((a, b) => (a === 'index.html') - (b === 'index.html'))

console.log(`deploy: ${upload.length} archivos de dist/ → ${host || '(sin host)'}/${dir}`)
if (dryRun) {
  for (const f of upload) console.log('  ' + f)
  process.exit(0)
}
if (!host || !user || !pass) {
  console.error('Faltan HOSTINGER_FTP_HOST, HOSTINGER_FTP_USER o HOSTINGER_FTP_PASS en .env.local')
  process.exit(1)
}

const netrc = join(tmpdir(), `r505-netrc-${process.pid}`)
writeFileSync(netrc, `machine ${host} login ${user} password ${pass}\n`, { mode: 0o600 })
const base = `ftp://${host}/${dir}/`
const curl = (args) =>
  new Promise((resolve) => {
    const p = spawn('curl', ['--silent', '--show-error', '--ssl-reqd', '--netrc-file', netrc, '--retry', '2', ...args])
    let err = ''
    p.stderr.on('data', (d) => (err += d))
    p.on('close', (code) => resolve({ code, err: err.trim() }))
  })

try {
  // Respaldo mínimo para poder regresar si algo sale mal
  const backup = join(root, 'backups', new Date().toISOString().replace(/[:.]/g, '-'))
  mkdirSync(backup, { recursive: true })
  for (const f of ['index.html', '.htaccess']) {
    const r = await curl(['-o', join(backup, f), base + f])
    console.log(r.code === 0 ? `respaldo: ${f}` : `respaldo: ${f} no existe en el servidor (ok)`)
  }

  let done = 0
  const failed = []
  const queue = [...upload]
  const worker = async () => {
    while (queue.length) {
      const f = queue.shift()
      const r = await curl(['--ftp-create-dirs', '-T', join(dist, f), base + posix.normalize(f)])
      if (r.code !== 0) failed.push(`${f}: ${r.err}`)
      if (++done % 25 === 0) console.log(`  ${done}/${upload.length}`)
    }
  }
  // index.html va al final para que el sitio cambie cuando ya estén los assets nuevos
  const last = upload.at(-1) === 'index.html' ? queue.pop() : null
  await Promise.all([worker(), worker(), worker(), worker()])
  if (last) {
    const r = await curl(['-T', join(dist, last), base + last])
    if (r.code !== 0) failed.push(`${last}: ${r.err}`)
  }
  console.log(`listo: ${upload.length - failed.length}/${upload.length} subidos. Respaldo en ${relative(root, backup)}`)
  if (failed.length) {
    console.error('fallaron:\n  ' + failed.join('\n  '))
    process.exitCode = 1
  }
} finally {
  rmSync(netrc, { force: true })
}
