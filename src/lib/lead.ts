/** Cliente del endpoint PHP /api/lead.php (Hostinger). */
export type LeadPayload = {
  name: string
  email: string
  phone: string
  need: string
  business?: string
  /** Honeypot — debe ir vacío */
  website?: string
}

export type LeadResult =
  | { ok: true }
  | { ok: false; error: string }

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch('/api/lead.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = (await res.json().catch(() => null)) as LeadResult | null
    if (!data || typeof data !== 'object') {
      return { ok: false, error: 'Respuesta inválida del servidor' }
    }
    if (!res.ok || !data.ok) {
      return {
        ok: false,
        error: ('error' in data && data.error) ? data.error : 'No se pudo enviar. Prueba WhatsApp.',
      }
    }
    return { ok: true }
  } catch {
    return {
      ok: false,
      error: 'Sin conexión al servidor de correo. Usa WhatsApp o escribe a contacto@revolution505.com.',
    }
  }
}
