import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import './disclaimer.extra.css';

export default function Disclaimer() {
  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Please read</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">A note on <span className="serif-italic">pre-loved</span> goods.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">Every piece we offer has lived a life before it reached us. Here's what that means for you.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="legal">
            <h3>Pre-owned, not new</h3>
            <p>All bags, belts, watches and leather goods sold by Bougie Edition are pre-owned ("pre-loved") unless explicitly stated otherwise. Items were previously owned and used, and will show evidence of that — however light — even where graded "Excellent."</p>

            <h3>Condition &amp; imperfections</h3>
            <p>We grade every piece honestly using our four-point condition meter (Fair · Good · Very good · Excellent), and describe known imperfections in the listing. Natural variation — corner wear, faint hardware marks, minor scent, colour transfer typical of leather goods — should be expected and is not a defect.</p>
            <ul>
              <li>Zero repainted or repaired bags leave our atelier: we do not touch up, recolour or refinish leather before sale.</li>
              <li>Any repair carried out at your request (see "Repair before delivery" on a product page) is disclosed, invoiced separately, and documented with the servicing store's own receipt.</li>
            </ul>

            <h3>Authentication</h3>
            <p>Every item is independently authenticated in hand before listing and, where available, ships with a Certificate of Authenticity from Entrupy or LegitApp. Authentication assesses genuineness, not cosmetic condition — a piece can be 100% authentic and still show wear consistent with its grading.</p>

            <h3>Photography &amp; colour</h3>
            <p>We photograph each piece in consistent, natural light, but screens vary — colour, sheen and hardware tone may look subtly different in person. Placeholder imagery on this site will be replaced with the piece's own photography before it is offered for sale.</p>

            <h3>Pricing &amp; currency</h3>
            <p>All prices are set and invoiced in US Dollars. "Price in USA" and "Price outside USA" reflect an estimate of international duties and insured shipping; the currency switcher shown elsewhere on this site is indicative only and does not change the invoiced currency or amount.</p>

            <h3>Final sale</h3>
            <p>Given the one-of-one nature of pre-owned goods, sales are final once payment is confirmed, except where a piece materially fails to match its authentication or condition disclosure — in which case, contact us and we'll make it right.</p>

            <h3>Questions</h3>
            <p>If anything here is unclear, <Link className="link-u" to="/consultation" style={{ color: 'var(--ink-900)' }}>book a private consultation</Link> and we're glad to talk it through before you buy.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
