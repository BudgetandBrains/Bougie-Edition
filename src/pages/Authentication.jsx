import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function Authentication() {
  useEffect(() => { document.title = 'The Art of Authentication — Bougie Edition'; }, []);

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Our promise</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">The art of <span className="serif-italic">authentication</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">We source rare and sought-after pieces, then verify every one in hand — materials, hardware, serials and provenance — before it is offered. So the only thing you inherit is the object itself.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'center' }}>
            <Reveal className="media tall">
              <img src="/assets/products/IMG_6690.jpg" alt="Authenticated flap with dust bag and cards" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </Reveal>
            <Reveal className="reveal-d1">
              <p className="statement" style={{ fontSize: 'clamp(1.4rem,2.2vw,1.9rem)' }}>Every piece ships with a <em>100% financially-backed</em> Certificate of Authenticity.</p>
              <p style={{ marginTop: '22px', fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '48ch' }}>Independently authenticated by leading third-party authenticators — Entrupy and LegitApp — and it leaves our atelier exactly as it arrived. Zero repainted or repaired bags, ever.</p>
              <div className="promise-row" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="promise"><h4>01 — Sourced with care</h4><p>Rare and sought-after pieces, hand-selected from trusted sources.</p></div>
                <div className="promise"><h4>02 — Verified in hand</h4><p>Materials, hardware, serials and provenance, checked before a piece is listed.</p></div>
                <div className="promise"><h4>03 — Guaranteed in writing</h4><p>A financially-backed Certificate of Authenticity accompanies every piece.</p></div>
              </div>
              <div style={{ marginTop: '38px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link className="btn btn-gold" to="/shop"><span>Shop the edit</span><ArrowRight className="arrow" size={16} /></Link>
                <Link className="btn btn-ghost" to="/consultation"><span>Ask a specialist</span></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            <Reveal className="cat-card" as="div" style={{ pointerEvents: 'none' }}>
              <img src="/assets/products/IMG_6751.jpg" alt="Hardware and zipper detail" />
              <div className="cat-meta"><div><h3>In the details</h3><div className="ct">Hardware · Stitching · Serials</div></div></div>
            </Reveal>
            <Reveal className="cat-card reveal-d1" as="div" style={{ pointerEvents: 'none' }}>
              <img src="/assets/products/IMG_6745.jpg" alt="Monogram leather goods detail" />
              <div className="cat-meta"><div><h3>Provenance</h3><div className="ct">Traced · Documented · Assured</div></div></div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
