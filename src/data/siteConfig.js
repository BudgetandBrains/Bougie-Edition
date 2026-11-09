// ── Site configuration ───────────────────────────────────────────────────────
// Fill these in to make the contact / enquiry forms deliver and to wire up the
// social links. Everything works without a backend.

// Where form submissions (Consign, Sourcing, Consultation, product enquiries)
// are sent. Easiest option: a free Formspree form — create one at
// https://formspree.io, then paste its endpoint here, e.g.
//   'https://formspree.io/f/abcdwxyz'
// Until this is set, forms fall back to CONTACT_EMAIL (below); if neither is
// set the form still shows a thank-you but nothing is delivered.
export const FORM_ENDPOINT = '';

// Fallback: if FORM_ENDPOINT is empty, submitting opens the visitor's email app
// pre-filled to this address. Leave blank to disable the fallback.
export const CONTACT_EMAIL = '';

// Footer social links. Leave blank to point the link at the contact page instead
// of a dead "#".
export const INSTAGRAM_URL = '';
export const WHATSAPP_URL = '';
