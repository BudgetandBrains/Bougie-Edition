import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Search, FileCheck, BadgeDollarSign } from 'lucide-react';
import Reveal from '../components/Reveal';

const STEPS = [
  { icon: Search, t: 'Sourced with care', d: 'Rare and sought-after pieces, hand-selected from trusted sources — never bulk, never blind.' },
  { icon: ShieldCheck, t: 'Verified in hand', d: 'Materials, hardware, stitching, serials and provenance, examined in person before a piece is ever listed.' },
  { icon: FileCheck, t: 'Third-party certified', d: 'Independently authenticated by Entrupy and LegitApp — the same tools trusted by the resale industry.' },
  { icon: BadgeDollarSign, t: 'Guaranteed in writing', d: 'A 100% financially-backed Certificate of Authenticity accompanies every piece. Your assurance, in writing.' }
];

const CHECKS = ['Leather grain & texture', 'Hardware weight & engraving', 'Stitch count & alignment', 'Date codes & serials', 'Interior stamps & linings', 'Zippers, clasps & pulls'];

export default function Authentication() {
  useEffect(() => { document.title = 'The Art of Authentication — Bougie Edition'; }, []);

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Every piece, verified</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">The art of <span className="serif-italic">authentication</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">Authenticity isn't a promise we make — it's a process we prove. Every piece is verified in hand, independently certified, and backed in writing, so the only thing you inherit is the object itself.</Reveal>
      </section>

      {/* The guarantee, up front */}
      <section className="section dark-band warm" data-header-dark="1" style={{ paddingBlock: 'clamp(56px,9vh,110px)' }}>
        <div className="container center">
          <Reveal as="p" className="eyebrow on-dark" style={{ display: 'inline-flex' }}>The guarantee</Reveal>
          <Reveal as="p" className="statement reveal-d1 maxw" style={{ margin: '20px auto 0', color: 'var(--cream)', fontSize: 'clamp(1.7rem,3.4vw,2.9rem)' }}>
            A <em>100% financially-backed</em> Certificate of Authenticity with every single piece.
          </Reveal>
          <Reveal as="p" className="reveal-d2" style={{ margin: '22px auto 0', maxWidth: '56ch', color: 'rgba(242,235,225,.72)', lineHeight: 1.7 }}>
            Certified independently through <strong style={{ color: 'var(--cream)' }}>Entrupy</strong> and <strong style={{ color: 'var(--cream)' }}>LegitApp</strong> — not our word alone. If a piece we sold were ever proven inauthentic, you're covered.
          </Reveal>
        </div>
      </section>

      {/* Four-step process */}
      <section className="section">
        <div className="container">
          <div className="sec-head"><div>
            <Reveal as="p" className="eyebrow">The process</Reveal>
            <Reveal as="h2" className="sec-title reveal-d1">Four checks before it's <span className="serif-italic">yours</span></Reveal>
          </div></div>
          <div className="auth-steps">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.t} className={'auth-step' + (i ? ' reveal-d' + Math.min(i, 4) : '')}>
                  <span className="auth-step-ic"><Icon size={22} strokeWidth={1.4} /></span>
                  <span className="auth-step-no">0{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we check — split with imagery */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="split" style={{ alignItems: 'center' }}>
            <Reveal className="media tall">
              <img src="/assets/products/IMG_6751.jpg" alt="Close inspection of hardware and stitching" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </Reveal>
            <Reveal className="reveal-d1">
              <p className="statement" style={{ fontSize: 'clamp(1.4rem,2.2vw,1.9rem)' }}>Down to the last stitch.</p>
              <p style={{ marginTop: '20px', fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-muted)', maxWidth: '46ch' }}>Every detail is compared against known references before a piece passes. If anything is off, it doesn't make the edit.</p>
              <ul className="auth-checks">
                {CHECKS.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <div style={{ marginTop: '34px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link className="btn btn-gold" to="/shop"><span>Shop the edit</span><ArrowRight className="arrow" size={16} /></Link>
                <Link className="btn btn-ghost" to="/faq"><span>Read the FAQ</span></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
