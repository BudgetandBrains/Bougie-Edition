import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import './order.extra.css';

const STEPS = [
  { no: '01', title: 'Choose your piece', body: "Browse the edit or a category, or message us with what you're searching for. Every listing states the brand, model and condition, and is already authenticated." },
  { no: '02', title: 'Reserve & confirm', body: 'Reach out to reserve. We confirm availability, share additional photographs and the authentication documentation, and answer anything you need before you commit.' },
  { no: '03', title: 'Secure payment', body: 'Pay through a secure, traceable method. Your piece is set aside the moment payment is confirmed — nothing is double-sold.' },
  { no: '04', title: 'Authentication on record', body: 'Your piece ships with its authentication record and provenance. The verification is yours to keep, and yours to stand behind.' },
  { no: '05', title: 'Insured delivery', body: "Fully insured, tracked delivery — packaged as the object deserves. We're reachable at every step until it's safely in your hands." }
];

export default function Order() {
  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Placing an order</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">Simple, and <span className="serif-italic">certain</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">Buying a considered piece should feel reassuring, not risky. Here is exactly how it works — and how we prove that what you receive is genuine.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.no}><div className="no">{s.no}</div><div><h3>{s.title}</h3><p>{s.body}</p></div></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section dark-band" data-header-dark="1">
        <div className="container center">
          <Reveal as="p" className="eyebrow on-dark" style={{ display: 'inline-block' }}>Our guarantee</Reveal>
          <Reveal as="p" className="statement reveal-d1 maxw" style={{ margin: '18px auto 34px', color: 'var(--ivory-50)' }}>Every piece is <em>authenticated</em>, documented and guaranteed. If it doesn't hold up, it doesn't ship.</Reveal>
          <Reveal className="reveal-d2" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-gold" to="/shop"><span>Start browsing</span><ArrowRight className="arrow" size={16} /></Link>
            <Link className="btn btn-ghost" to="/consultation" style={{ color: '#fff' }}><span>Message us</span></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
