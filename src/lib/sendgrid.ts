// Minimal SendGrid REST API client — no SDK needed, works fine on Cloudflare Workers via fetch().
// Docs: https://docs.sendgrid.com/api-reference/mail-send/mail-send

export type Bindings = {
  SENDGRID_API_KEY: string
}

interface SendMailOptions {
  apiKey: string
  to: string
  from: string
  fromName?: string
  replyTo?: string
  subject: string
  text: string
}

export async function sendMail(opts: SendMailOptions): Promise<{ ok: boolean; status: number; error?: string }> {
  const body = {
    personalizations: [{ to: [{ email: opts.to }] }],
    from: { email: opts.from, name: opts.fromName ?? 'Groundwork Website' },
    ...(opts.replyTo ? { reply_to: { email: opts.replyTo } } : {}),
    subject: opts.subject,
    content: [{ type: 'text/plain', value: opts.text }],
  }

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (res.ok) {
    return { ok: true, status: res.status }
  }

  let error = ''
  try {
    error = await res.text()
  } catch {
    // ignore
  }
  return { ok: false, status: res.status, error }
}

// Very small helpers to keep the route handlers tidy and avoid injection in the
// plaintext email body (SendGrid content is text/plain, so this is just hygiene).
export function esc(v: unknown): string {
  if (v === undefined || v === null) return ''
  return String(v).trim()
}
