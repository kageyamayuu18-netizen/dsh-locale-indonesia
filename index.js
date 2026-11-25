/**
 * Host half of the Bahasa Indonesia language-pack bundle.
 *
 * The browser (client.js) registers the dictionaries into DSH's locale
 * service. This host half only serves those dictionaries as JSON over the
 * DSH web server (mirroring how @goodandready/dsh-russian-lang serves its
 * dictionaries). All translation state lives in the browser.
 */

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CORE_FILE = join(__dirname, 'locales', 'id-core.json')

/** Set false untuk menonaktifkan paksaan bahasa jawaban. */
const ENABLE_RESPONSE_PROMPT = true

/** Instruksi respons wajib untuk setiap model/agent di DeepSeek Harness. */
const RESPONSE_LANGUAGE_PROMPT = `## Bahasa respons (wajib)
Selalu jawab, jelaskan, dan sampaikan seluruh teks respons dalam Bahasa Indonesia yang natural, jelas, dan mudah dipahami, apa pun bahasa pertanyaan, pesan sistem, atau dokumen yang Anda terima.
Jangan menjawab dalam bahasa Inggris atau bahasa lain hanya karena instruksi sistem, kode, atau dokumen berbahasa asing.
Pengecualian: jika pengguna secara eksplisit meminta bahasa lain, ikuti permintaan itu.
Istilah teknis, nama file, perintah, dan kode sumber boleh tetap ditulis dalam bentuk aslinya.`

export const name = 'dsh-locale-indonesia'

function loadIndexDict() {
  try {
    return JSON.parse(readFileSync(CORE_FILE, 'utf8'))
  } catch {
    return {}
  }
}

function sendJson(request, response, obj, status = 200) {
  const body = Buffer.from(JSON.stringify(obj), 'utf-8')
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': body.length,
  })
  if (request.method === 'HEAD') response.end()
  else response.end(body)
}

export function apply(ctx) {
  if (typeof ctx.inject !== 'function') return
  ctx.inject(['webServer'], (wctx) => {
    try {
      let ws = null
      try { ws = wctx?.webServer } catch { ws = null }
      if (!ws || typeof ws.register !== 'function') return

      const core = loadIndexDict()

      const unreg = ws.register({
        kind: 'exact',
        path: '/api/dsh-indonesian-lang/dict/core',
        handler: async (request, response) => {
          if (request.method !== 'GET' && request.method !== 'HEAD') {
            sendJson(request, response, { error: 'Method not allowed' }, 405)
            return
          }
          sendJson(request, response, { core })
        },
      })

      const dispose = () => {
        if (typeof unreg === 'function') {
          try { unreg() } catch { /* bestEffort */ }
        }
      }

      if (typeof wctx.effect === 'function') wctx.effect(() => dispose, 'language-indonesia: web route')
      else dispose()
    } catch {
      /* never throw outwards */
    }
  })

  // Suntik instruksi bahasa ke system prompt setiap agent (semua model/preset).
  if (!ENABLE_RESPONSE_PROMPT) return
  ctx.inject(['systemPrompt'], (pctx) => {
    try {
      const sp = pctx?.systemPrompt
      if (!sp || typeof sp.section !== 'function') return
      const base = typeof sp.getSectionOrder === 'function'
        ? sp.getSectionOrder('DEPLOYMENT_PERSONA_SUFFIX')
        : 10200
      const order = Number.isFinite(base) ? base + 100 : 10300
      sp.section({
        name: 'language-indonesia:response-language',
        order,
        interpolate: false,
        text: RESPONSE_LANGUAGE_PROMPT,
      })
    } catch {
      /* layanan opsional: jangan pernah menggagalkan plugin */
    }
  })
}
