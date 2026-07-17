import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const BRANDS = ['HERMÈS', 'CHANEL', 'ROLEX', 'CARTIER', 'LOUIS VUITTON', 'GUCCI', 'PRADA', 'BOTTEGA', 'DIOR', 'SAINT LAURENT', 'OMEGA', 'AUDEMARS', 'PATEK', 'VAN CLEEF', 'CELINE', 'FENDI'];

export default function Brands() {
  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">The labels we carry</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">In good <span className="serif-italic">company</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">The maisons we stock — every piece curated and authenticated. A wall of names you already trust.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="brand-wall">
            {BRANDS.map((b) => <div className="brand-cell" key={b}><span>{b}</span></div>)}
          </Reveal>
        </div>
      </section>

      <section className="section dark-band" data-header-dark="1">
        <div className="container split">
          <div>
            <Reveal as="p" className="eyebrow on-dark">A word on trust</Reveal>
            <Reveal as="p" className="statement reveal-d1" style={{ marginTop: '18px', color: 'var(--ivory-50)' }}>We are not affiliated with these maisons — we are devoted to <em>their</em> work, and to proving each piece is genuine.</Reveal>
          </div>
          <Reveal className="reveal-d2" style={{ alignSelf: 'center' }}>
            <p style={{ fontSize: '1.08rem', lineHeight: 1.7, color: 'var(--stone-500)', maxWidth: '46ch' }}>Every item is independently authenticated and documented before it reaches you. Brand names are used solely to describe the pieces we carry.</p>
            <div className="mt-sm"><Link className="btn btn-ghost" to="/about" style={{ color: '#fff' }}><span>Our authentication promise</span></Link></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
