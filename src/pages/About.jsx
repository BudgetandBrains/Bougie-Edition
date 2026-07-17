import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function About() {
  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">The story</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">Quietly <span className="serif-italic">extraordinary</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">Bougie Edition is a curated house for branded bags, watches and leather goods. We find the pieces worth owning — and we prove they are real — so the only thing you inherit is the object itself.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split">
            <Reveal className="media tall ph"><span className="lbl">Founder / atelier — editorial portrait</span></Reveal>
            <div>
              <Reveal as="p" className="statement">We started Bougie Edition for one reason: the love of an object made <em>well</em>, and the certainty that it is <em>genuine</em>.</Reveal>
              <Reveal as="p" className="reveal-d2" style={{ marginTop: '26px', fontSize: '1.08rem', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '52ch' }}>Every bag, watch and belt we offer is sourced from trusted channels, inspected in hand, and independently authenticated before it is ever listed. No grey areas. No guesswork. Just considered pieces, verified and ready to be carried for a lifetime.</Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-band" data-header-dark="1">
        <div className="container">
          <div className="sec-head">
            <div>
              <Reveal as="p" className="eyebrow on-dark">The promise</Reveal>
              <Reveal as="h2" className="sec-title reveal-d1" style={{ color: 'var(--ivory-50)' }}>How we <span className="shift serif-italic">authenticate</span></Reveal>
            </div>
          </div>
          <div className="promise-row">
            <Reveal className="promise"><h4>01 — Source</h4><p>Pieces are acquired through established, accountable channels — never anonymous resale.</p></Reveal>
            <Reveal className="promise reveal-d1"><h4>02 — Inspect</h4><p>Materials, stitching, hardware, weight and serials are examined in hand against the maker's standard.</p></Reveal>
            <Reveal className="promise reveal-d2"><h4>03 — Verify</h4><p>Each item is independently authenticated and issued documentation before it is offered to you.</p></Reveal>
          </div>
          <Reveal as="p" className="statement reveal-d2 maxw" style={{ marginTop: '64px', color: 'var(--ivory-50)' }}>When a piece carries our name, it carries our <em>guarantee</em> — in writing, with provenance you can stand behind.</Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container center">
          <Reveal as="p" className="eyebrow" style={{ display: 'inline-block' }}>Begin</Reveal>
          <Reveal as="h2" className="sec-title reveal-d1" style={{ marginBottom: '30px' }}>Find your next piece.</Reveal>
          <Reveal className="reveal-d2" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-gold" to="/shop"><span>Shop the collection</span><ArrowRight className="arrow" size={16} /></Link>
            <Link className="btn btn-ghost" to="/order"><span>How to order</span></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
