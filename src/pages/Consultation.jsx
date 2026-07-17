import { useState } from 'react';
import Reveal from '../components/Reveal';

export default function Consultation() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Talk to us, privately</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">Book a <span className="serif-italic">consultation</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">A private call or video consultation — to talk through a purchase, a sale, condition, or anything else. No pressure, just expertise.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <p className="statement" style={{ fontSize: 'clamp(1.3rem,2vw,1.7rem)' }}>Fifteen minutes, no obligation.</p>
              <p style={{ marginTop: '22px', fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '46ch' }}>Whether you're considering a first purchase or weighing up consigning a piece, a short call often answers more than a dozen messages back and forth.</p>
              <div className="promise-row" style={{ marginTop: '44px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
                <div className="promise"><h4>01 — Request</h4><p>Tell us what you'd like to discuss and your preferred time.</p></div>
                <div className="promise"><h4>02 — Confirm</h4><p>We confirm a slot by email or WhatsApp within one business day.</p></div>
                <div className="promise"><h4>03 — Talk it through</h4><p>A relaxed call or video consultation with a specialist from our team.</p></div>
              </div>
            </Reveal>

            <Reveal className="reveal-d1">
              {!submitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="v-name">Full name</label><input id="v-name" name="name" type="text" required placeholder="Your name" /></div>
                    <div className="field"><label htmlFor="v-email">Email</label><input id="v-email" name="email" type="email" required placeholder="you@email.com" /></div>
                    <div className="field"><label htmlFor="v-phone">Phone / WhatsApp</label><input id="v-phone" name="phone" type="tel" placeholder="+1 555 000 0000" /></div>
                    <div className="field field-select-wrap"><label htmlFor="v-reason">Reason for the call</label>
                      <select id="v-reason" name="reason"><option>Buying guidance</option><option>Selling &amp; consignment</option><option>Authentication question</option><option>General enquiry</option></select>
                    </div>
                    <div className="field"><label htmlFor="v-date">Preferred date</label><input id="v-date" name="date" type="date" /></div>
                    <div className="field"><label htmlFor="v-time">Preferred time</label><input id="v-time" name="time" type="time" /></div>
                    <div className="field field-select-wrap full"><label htmlFor="v-method">Preferred method</label>
                      <select id="v-method" name="method"><option>Phone call</option><option>WhatsApp video</option><option>Video call (Zoom / FaceTime)</option></select>
                    </div>
                    <div className="field full"><label htmlFor="v-notes">What would you like to discuss?</label><textarea id="v-notes" name="notes" placeholder="A specific bag, a piece you're considering consigning, anything else"></textarea></div>
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-gold" type="submit" style={{ border: 'none' }}><span>Request a consultation</span></button>
                    <p className="form-note">Consultations are complimentary and carry no obligation to buy or sell.</p>
                  </div>
                </form>
              ) : (
                <div className="form-success show">
                  <h3>Request received.</h3>
                  <p>We'll confirm your slot by email or WhatsApp within one business day.</p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
