import { useState } from 'react';
import Reveal from '../components/Reveal';

export default function Sourcing() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Can't find it in the edit?</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">Let us <span className="serif-italic">source</span> it.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">Tell us the brand, model and details you're after — our network of trusted sellers means most requests can be filled, authenticated, and delivered.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <p className="statement" style={{ fontSize: 'clamp(1.3rem,2vw,1.7rem)' }}>If it exists, we can likely find it.</p>
              <p style={{ marginTop: '22px', fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '46ch' }}>From a discontinued colourway to a waitlisted reference — describe what you want and we'll hunt it down, authenticate it, and bring it to you.</p>
              <div className="promise-row" style={{ marginTop: '44px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
                <div className="promise"><h4>01 — Request</h4><p>Share the brand, model and any preferences on colour, size or condition.</p></div>
                <div className="promise"><h4>02 — We hunt</h4><p>We search our network and come back with options and pricing.</p></div>
                <div className="promise"><h4>03 — Authenticated &amp; delivered</h4><p>Once you approve, we authenticate and ship it to you, fully insured.</p></div>
              </div>
            </Reveal>

            <Reveal className="reveal-d1">
              {!submitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="s-name">Full name</label><input id="s-name" name="name" type="text" required placeholder="Your name" /></div>
                    <div className="field"><label htmlFor="s-email">Email</label><input id="s-email" name="email" type="email" required placeholder="you@email.com" /></div>
                    <div className="field"><label htmlFor="s-phone">Phone / WhatsApp</label><input id="s-phone" name="phone" type="tel" placeholder="+1 555 000 0000" /></div>
                    <div className="field"><label htmlFor="s-brand">Brand</label><input id="s-brand" name="brand" type="text" required placeholder="e.g. Hermès" /></div>
                    <div className="field"><label htmlFor="s-model">Model / reference</label><input id="s-model" name="model" type="text" placeholder="e.g. Birkin 25" /></div>
                    <div className="field"><label htmlFor="s-color">Preferred colour / material</label><input id="s-color" name="color" type="text" placeholder="e.g. Togo, Noir" /></div>
                    <div className="field field-select-wrap"><label htmlFor="s-budget">Budget range (USD)</label>
                      <select id="s-budget" name="budget"><option>Under $2,000</option><option>$2,000 – $5,000</option><option>$5,000 – $15,000</option><option>$15,000 +</option></select>
                    </div>
                    <div className="field field-select-wrap"><label htmlFor="s-timeline">Timeline</label>
                      <select id="s-timeline" name="timeline"><option>No rush</option><option>Within 3 months</option><option>Urgent</option></select>
                    </div>
                    <div className="field full"><label htmlFor="s-notes">Additional details</label><textarea id="s-notes" name="notes" placeholder="Size, hardware, condition preferences, anything else"></textarea></div>
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-gold" type="submit" style={{ border: 'none' }}><span>Send sourcing request</span></button>
                    <p className="form-note">There's no fee to submit a request — we only follow up once we've found a genuine match.</p>
                  </div>
                </form>
              ) : (
                <div className="form-success show">
                  <h3>Request received.</h3>
                  <p>We'll be in touch as soon as we have options that match — usually within a few days.</p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
