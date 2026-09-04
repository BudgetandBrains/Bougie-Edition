import { useState } from 'react';
import Reveal from '../components/Reveal';
import Captcha from '../components/Captcha';

export default function Consign() {
  const [submitted, setSubmitted] = useState(false);
  const [human, setHuman] = useState(false);

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Sell through us</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">Consign with <span className="serif-italic">us</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">Have a bag, watch or leather good you're ready to let go of? Tell us about it below — our team reviews every submission and replies with an offer, usually within 48 hours.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <p className="statement" style={{ fontSize: 'clamp(1.3rem,2vw,1.7rem)' }}>Considered pieces deserve a considered exit.</p>
              <p style={{ marginTop: '22px', fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '46ch' }}>We authenticate, photograph and present your piece to our client list — you're kept informed at every step, and paid promptly once it sells.</p>
              <div className="promise-row" style={{ marginTop: '44px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
                <div className="promise"><h4>01 — Submit</h4><p>Share the details below — brand, condition, and a few photos help us most.</p></div>
                <div className="promise"><h4>02 — Offer</h4><p>We authenticate remotely where possible and come back with an offer or a consignment estimate.</p></div>
                <div className="promise"><h4>03 — Sold, paid</h4><p>Once your piece sells, you're paid promptly — no chasing required.</p></div>
              </div>
            </Reveal>

            <Reveal className="reveal-d1">
              {!submitted ? (
                <form onSubmit={(e) => { e.preventDefault(); if (!human) return; setSubmitted(true); }}>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="c-name">Full name</label><input id="c-name" name="name" type="text" required placeholder="Your name" /></div>
                    <div className="field"><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" required placeholder="you@email.com" /></div>
                    <div className="field"><label htmlFor="c-phone">Phone / WhatsApp</label><input id="c-phone" name="phone" type="tel" placeholder="+1 555 000 0000" /></div>
                    <div className="field"><label htmlFor="c-brand">Brand</label><input id="c-brand" name="brand" type="text" required placeholder="e.g. Chanel" /></div>
                    <div className="field field-select-wrap"><label htmlFor="c-type">Item type</label>
                      <select id="c-type" name="type"><option>Bag</option><option>Belt</option><option>Watch</option><option>Jewellery</option><option>Other</option></select>
                    </div>
                    <div className="field field-select-wrap"><label htmlFor="c-condition">Condition</label>
                      <select id="c-condition" name="condition"><option>Excellent</option><option>Very good</option><option>Good</option><option>Fair</option></select>
                    </div>
                    <div className="field field-select-wrap"><label htmlFor="c-papers">Original box / papers?</label>
                      <select id="c-papers" name="papers"><option>Yes, complete</option><option>Partial</option><option>No</option></select>
                    </div>
                    <div className="field"><label htmlFor="c-price">Expected price (USD)</label><input id="c-price" name="price" type="text" placeholder="e.g. $2,500" /></div>
                    <div className="field full"><label htmlFor="c-desc">Model &amp; description</label><textarea id="c-desc" name="description" required placeholder="Model, size, colour, hardware, any flaws"></textarea></div>
                    <div className="field full"><label htmlFor="c-notes">Anything else we should know?</label><textarea id="c-notes" name="notes" placeholder="Optional"></textarea></div>
                  </div>
                  <Captcha onVerify={setHuman} />
                  <div className="form-actions">
                    <button className="btn btn-gold" type="submit" disabled={!human} style={{ border: 'none' }}><span>Submit for review</span></button>
                    <p className="form-note">Photos aren't uploaded here — once submitted, we'll email you with a secure link to share them.</p>
                  </div>
                </form>
              ) : (
                <div className="form-success show">
                  <h3>Thank you — received.</h3>
                  <p>Our team will review your piece and reach out within 48 hours with next steps.</p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
