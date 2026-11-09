import { FORM_ENDPOINT, CONTACT_EMAIL } from './siteConfig';

// Deliver a form submission. Returns true if it was sent (or an email draft was
// opened), false if nothing is configured. The UI shows its thank-you either way
// so the visitor is never blocked.
export async function submitForm(kind, data) {
  const payload = { _subject: `Bougie Edition — ${kind}`, formType: kind, ...data };

  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch (err) {
      console.warn('Bougie form: endpoint unreachable —', err);
      /* fall through to the email fallback */
    }
  }

  if (CONTACT_EMAIL) {
    const body = Object.entries(data)
      .filter(([, v]) => v != null && String(v).trim() !== '')
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Bougie Edition — ' + kind)}&body=${encodeURIComponent(body)}`;
    return true;
  }

  return false;
}
