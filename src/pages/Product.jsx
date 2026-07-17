import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import PriceBlock from '../components/PriceBlock';
import ConditionMeter from '../components/ConditionMeter';
import { useCatalog } from '../context/CatalogContext';
import './product.extra.css';

const DEMO = {
  brand: 'Chanel', name: 'Classic Flap, medium', category: 'bags', price: 11700,
  condition: 'Very good', images: [],
  description: 'An object of quiet consequence — full-grain caviar leather, hand-finished, with the weight and stitch density of a piece made to be carried for a lifetime.'
};

export default function Product() {
  const { id } = useParams();
  const { products, loading } = useCatalog();
  const idx = id !== undefined ? parseInt(id, 10) : NaN;
  const product = !loading && products.length && !Number.isNaN(idx) && products[idx] ? products[idx] : (!loading ? products[0] || DEMO : null);

  useEffect(() => {
    if (product) document.title = `${product.name} — ${product.brand} — Bougie Edition`;
  }, [product]);

  if (loading || !product) {
    return <section className="section container" style={{ paddingTop: 'calc(var(--header-h) + 64px)' }}><p className="eyebrow">Loading…</p></section>;
  }

  const images = product.images && product.images.length ? product.images : [];
  const description = product.description || DEMO.description;

  return (
    <>
      <section className="section" style={{ paddingTop: 'calc(var(--header-h) + clamp(32px,6vh,64px))', paddingBottom: 0 }}>
        <div className="container">
          <Link to="/shop" className="link-u reveal" style={{ color: 'var(--text-muted)', display: 'inline-flex', marginBottom: '36px' }}>← Back to the collection</Link>

          <div className="pwrap">
            <Reveal className="pgallery">
              {images[0] ? <img className="main-img" src={images[0]} alt={product.name} /> : <div className="ph main"><span className="lbl">Product photo — front, on white</span></div>}
              {images[1] ? <img className="sub-img" src={images[1]} alt="" /> : <div className="ph sub"><span className="lbl">Interior &amp; serial</span></div>}
              {images[2] ? <img className="sub-img" src={images[2]} alt="" /> : <div className="ph sub"><span className="lbl">Hardware detail</span></div>}
            </Reveal>

            <Reveal className="pdetail reveal-d1">
              <p className="eyebrow">{(product.category || 'bags').replace(/^\w/, (c) => c.toUpperCase())} · {product.brand}</p>
              <h1 className="page-title" style={{ fontSize: 'clamp(2rem,3.4vw,2.9rem)', margin: '16px 0 6px' }}>{product.name}</h1>
              <p style={{ color: 'var(--text-faint)', fontSize: '.95rem', margin: '0 0 22px' }}>{description}</p>

              <PriceBlock usd={product.price} note="Authenticated" style={{ marginBottom: '22px' }} />

              <ConditionMeter condition={product.condition} />

              <p className="cert-line"><span className="dotb"></span>Ships with a Certificate of Authenticity from Entrupy or LegitApp, alongside our own in-house verification. Zero repainted or repaired bags — every piece leaves our atelier exactly as it arrived.</p>

              <div style={{ display: 'flex', gap: '14px', margin: '30px 0 6px', flexWrap: 'wrap' }}>
                <button className="btn btn-gold" type="button" style={{ border: 'none', flex: 1, justifyContent: 'center', minWidth: '200px' }}><span>Add to bag</span></button>
                <Link className="btn btn-ghost" to="/consultation"><span>Ask about this piece</span></Link>
              </div>

              <div style={{ marginTop: '28px' }}>
                <details className="acc" open>
                  <summary>Details &amp; materials<span className="acc-ic"></span></summary>
                  <div className="acc-body"><p>Caviar-grain calfskin, hand-quilted in the diamond motif, gold-tone hardware with a brushed finish. Comes with dust bag, box and authenticity card.</p></div>
                </details>
                <details className="acc">
                  <summary>Care &amp; restoration<span className="acc-ic"></span></summary>
                  <div className="acc-body"><p>Wipe with a soft dry cloth and store in the dust bag away from direct light. Complimentary condition assessment and restoration quote available any time after purchase.</p></div>
                </details>
                <details className="acc">
                  <summary>Authentication<span className="acc-ic"></span></summary>
                  <div className="acc-body"><p>Independently authenticated in hand — hardware, stitching, serials and provenance — before it is offered. Ships with a Certificate of Authenticity from Entrupy or LegitApp.</p></div>
                </details>
                <details className="acc">
                  <summary>Repair before delivery<span className="acc-ic"></span></summary>
                  <div className="acc-body">
                    <p>Prefer it freshly serviced? If you'd like us to send this bag to a Chanel store or spa for repair before it ships, we're happy to arrange it.</p>
                    <p>The store's repair charge is simply added to your invoice, and we'll share the authentic store repair receipt with you on delivery. Just mention it when you reserve the piece.</p>
                  </div>
                </details>
                <details className="acc">
                  <summary>Shipping &amp; returns<span className="acc-ic"></span></summary>
                  <div className="acc-body"><p>Fully insured, tracked delivery worldwide. Please review our <Link className="link-u" to="/disclaimer" style={{ color: 'var(--ink-900)' }}>pre-loved goods disclaimer</Link> before ordering.</p></div>
                </details>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section dark-band" data-header-dark="1">
        <div className="container center">
          <Reveal as="p" className="eyebrow on-dark" style={{ display: 'inline-block' }}>Not quite sure?</Reveal>
          <Reveal as="p" className="statement reveal-d1 maxw" style={{ margin: '18px auto 34px', color: 'var(--ivory-50)' }}>Book a private call and we'll walk through condition, sizing and provenance together — <em>no pressure, just expertise</em>.</Reveal>
          <Reveal className="reveal-d2" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-gold" to="/consultation"><span>Book a consultation</span><ArrowRight className="arrow" size={16} /></Link>
            <Link className="btn btn-ghost" to="/sourcing" style={{ color: '#fff' }}><span>Request a different piece</span></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
