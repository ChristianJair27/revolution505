// Sube dist/ a Hostinger archivo por archivo con la API de subida (TUS). NO borra nada del servidor,
// a diferencia de hosting_websites_deploy-static-site-archive, que vacía la raíz: aquí viven los
// subdominios (formulario/respuestas, prevent, scripts, postiz).
//
// Credenciales temporales de hosting_files_generate-upload-url, por entorno (nunca en archivos):
//   HOSTINGER_UPLOAD_URL  HOSTINGER_AUTH_KEY  HOSTINGER_REST_AUTH_KEY
//
// Uso: node scripts/deploy-tus.mjs --dry-run
//      node scripts/deploy-tus.mjs --only=robots.txt   (prueba con un archivo)
//      node scripts/deploy-tus.mjs
//
// Orden: assets primero; .htaccess y las páginas al final, y index.html el último, para que el sitio
// cambie cuando todo lo que necesita ya esté arriba.
import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const dist = join(root, 'dist')
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const only = args.find((a) => a.startsWith('--only='))?.slice(7)
const { HOSTINGER_UPLOAD_URL: url, HOSTINGER_AUTH_KEY: auth, HOSTINGER_REST_AUTH_KEY: rest } = process.env

const files = []
;(function walk(d) {
  for (const name of readdirSync(d)) {
    const p = join(d, name)
    if (statSync(p).isDirectory()) walk(p)
    else files.push(relative(dist, p).split('\\').join('/'))
  }
})(dist)

const rank = (f) => (f === 'index.html' ? 3 : f === '.htaccess' ? 2 : f.endsWith('.html') ? 1 : 0)
const upload = files
  .filter((f) => f !== 'api/lead.config.php')
  .filter((f) => !only || f === only)
  .sort((a, b) => rank(a) - rank(b))

console.log(`deploy: ${upload.length} archivos`)
if (dryRun) {
  for (const f of upload) console.log('  ' + f)
  process.exit(0)
}
if (!url || !auth || !rest) {
  console.error('Faltan HOSTINGER_UPLOAD_URL, HOSTINGER_AUTH_KEY o HOSTINGER_REST_AUTH_KEY')
  process.exit(1)
}

const headers = { 'X-Auth': auth, 'X-Auth-Rest': rest, 'Tus-Resumable': '1.0.0' }

async function put(f) {
  const body = readFileSync(join(dist, f))
  const target = `${url.replace(/\/$/, '')}/${f.split('/').map(encodeURIComponent).join('/')}?override=true`
  const created = await fetch(target, {
    method: 'POST',
    headers: { ...headers, 'Upload-Length': String(body.length), 'Upload-Offset': '0' },
  })
  if (created.status !== 201) throw new Error(`POST ${created.status}`)
  if (body.length === 0) return
  const sent = await fetch(target, {
    method: 'PATCH',
    headers: { ...headers, 'Content-Type': 'application/offset+octet-stream', 'Upload-Offset': '0' },
    body,
  })
  const offset = sent.headers.get('upload-offset')
  if (sent.status !== 204 || offset !== String(body.length)) throw new Error(`PATCH ${sent.status} offset ${offset}/${body.length}`)
}

const failed = []
const tryPut = async (f) => {
  for (let i = 0; i < 3; i++) {
    try {
      return await put(f)
    } catch (e) {
      if (i === 2) failed.push(`${f}: ${e.message}`)
    }
  }
}

// En paralelo solo los archivos sin efecto en el sitio; lo que cambia el sitio va en orden
const bulk = upload.filter((f) => rank(f) === 0)
const ordered = upload.filter((f) => rank(f) > 0)
let done = 0
const queue = [...bulk]
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (queue.length) {
      await tryPut(queue.shift())
      if (++done % 25 === 0) console.log(`  ${done}/${upload.length}`)
    }
  }),
)
if (failed.length) {
  console.error('fallaron assets; no se tocan las páginas:\n  ' + failed.join('\n  '))
  process.exit(1)
}
for (const f of ordered) await tryPut(f)
console.log(`listo: ${upload.length - failed.length}/${upload.length}`)
if (failed.length) {
  console.error('fallaron:\n  ' + failed.join('\n  '))
  process.exit(1)
}
