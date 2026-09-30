import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import PriceBlock from '../components/PriceBlock';
import ConditionMeter from '../components/ConditionMeter';
import RelatedProducts from '../components/RelatedProducts';
import { useCatalog } from '../context/useCatalog';
import { IMAGE_MAX } from '../data/catalogConfig';
import './product.extra.css';

const DEMO = {
  brand: 'Chanel', name: 'Classic Flap, medium', category: 'bags', price: 11700,
  condition: 'Very good', images: [],
  description: 'An object of quiet consequence — full-grain caviar leather, hand-finished, with the weight and stitch density of a piece made to be carried for a lifetime.'
};

// Folder mode: discover how many images a product has by loading
// <base>/1.jpg, /2.jpg … in order and stopping at the first one that 404s.
function useFolderImages(base, ext) {
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    if (!base) { setImgs([]); return; }
    let cancelled = false;
    const found = [];
    (function probe(i) {
      if (cancelled) return;
      if (i > (IMAGE_MAX || 15)) { setImgs(found.slice()); return; }
      const url = base + '/' + i + ext;
      const im = new Image();
      im.onload = () => { if (cancelled) return; found.push(url); setImgs(found.slice()); probe(i + 1); };
      im.onerror = () => { if (!cancelled) setImgs(found.slice()); };
      im.src = url;
    })(1);
    return () => { cancelled = true; };
  }, [base, ext]);
  return imgs;
}

// Swipeable image carousel — preview every product photo.
function Gallery({ images, name }) {
  const [active, setActive] = useState(0);
  const touch = useRef(null);
  useEffect(() => { setActive(0); }, [images.length, name]);

  if (!images.length) {
    return (
      <div className="pgallery">
        <div className="ph main"><span className="lbl">Product photo — front, on white</span></div>
        <div className="ph sub"><span className="lbl">Interior &amp; serial</span></div>
        <div className="ph sub"><span className="lbl">Hardware detail</span></div>
      </div>
    );
  }

  const go = (d) => setActive((i) => (i + d + images.length) % images.length);
  const onStart = (e) => { touch.current = e.touches[0].clientX; };
  const onEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };

  return (
    <div className="pcarousel">
      <div className="pc-stage" onTouchStart={onStart} onTouchEnd={onEnd}>
        <img src={images[active]} alt={`${name} — image ${active + 1}`} />
        {images.length > 1 && (
          <>
            <button type="button" className="pc-arrow pc-prev" aria-label="Previous image" onClick={() => go(-1)}><ChevronLeft size={20} /></button>
            <button type="button" className="pc-arrow pc-next" aria-label="Next image" onClick={() => go(1)}><ChevronRight size={20} /></button>
            <div className="pc-count">{active + 1} / {images.length}</div>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="pc-thumbs">
          {images.map((src, i) => (
            <button type="button" key={src} className={'pc-thumb' + (i === active ? ' on' : '')} onClick={() => setActive(i)} aria-label={`View image ${i + 1}`}>
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const { products, loading } = useCatalog();
  const idx = id !== undefined ? parseInt(id, 10) : NaN;
  const product = !loading && products.length && !Number.isNaN(idx) && products[idx] ? products[idx] : (!loading ? products[0] || DEMO : null);
  // The index actually on screen — the line above falls back to products[0]
  // for a missing or out-of-range id, so suggestions must follow that same piece.
  const catalogIndex = products.length ? (!Number.isNaN(idx) && products[idx] ? idx : 0) : -1;

  const folderImgs = useFolderImages(product ? product.imageBase : '', product ? (product.imageExt || '.jpg') : '.jpg');

  useEffect(() => {
    if (product) document.title = `${product.name} — ${product.brand} — Bougie Edition`;
  }, [product]);

  if (loading || !product) {
    return <section className="section container" style={{ paddingTop: 'calc(var(--header-h) + 64px)' }}><p className="eyebrow">Loading…</p></section>;
  }

  const images = product.imageBase
    ? (folderImgs.length ? folderImgs : (product.images || []))
    : (product.images && product.images.length ? product.images : []);
  const description = product.description || DEMO.description;
  const brand = product.brand || 'the brand';

  return (
    <>
      <section className="section" style={{ paddingTop: 'calc(var(--header-h) + clamp(32px,6vh,64px))', paddingBottom: 0 }}>
        <div className="container">
          <Link to="/shop" className="link-u reveal" style={{ color: 'var(--text-muted)', display: 'inline-flex', marginBottom: '36px' }}>← Back to the collection</Link>

          <div className="pwrap">
            <Reveal><Gallery images={images} name={product.name} /></Reveal>

            <Reveal className="pdetail reveal-d1">
              <p className="eyebrow">{(product.categoryGroup || product.category || 'bags').replace(/^\w/, (c) => c.toUpperCase())} · {product.brand}</p>
              <h1 className="page-title" style={{ fontSize: 'clamp(2rem,3.4vw,2.9rem)', margin: '16px 0 12px' }}>{product.name}</h1>

              <PriceBlock usd={product.price} note="Authenticated" style={{ marginBottom: '22px' }} />

              <ConditionMeter condition={product.condition} />

              {/* Call-out: the piece's own description from the sheet */}
              <div className="callout product-callout">
                <h4>Details</h4>
                <p>{description}</p>
              </div>

              <p className="cert-line"><span className="dotb"></span>Ships with a Certificate of Authenticity from Entrupy or LegitApp, alongside our own in-house verification. Zero repainted or repaired bags — every piece leaves our atelier exactly as it arrived.</p>

              {(product.coa || product.ebay) && (
                <p className="product-links">
                  {product.coa && (
                    <a className="coa-link" href={product.coa} target="_blank" rel="noopener noreferrer">
                      Certificate of authentication <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {product.ebay && (
                    <a className="coa-link coa-link--alt" href={product.ebay} target="_blank" rel="noopener noreferrer">
                      View eBay listing <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </p>
              )}

              <div style={{ margin: '30px 0 6px' }}>
                {product.soldOut ? (
                  <Link className="btn btn-gold" to="/sourcing" style={{ width: '100%', justifyContent: 'center' }}><span>Sold — source a similar piece</span></Link>
                ) : (
                  <Link className="btn btn-gold" to="/consultation" style={{ width: '100%', justifyContent: 'center' }}><span>Submit an inquiry to buy</span><ArrowRight className="arrow" size={16} /></Link>
                )}
              </div>

              <div style={{ marginTop: '28px' }}>
                <details className="acc" open>
                  <summary>Authentication<span className="acc-ic"></span></summary>
                  <div className="acc-body">
                    <p>Independently authenticated in hand — hardware, stitching, serials and provenance — before it is offered.</p>
                    <p>Ships with a 100% financially-backed Certificate of Authenticity from leading third-party authenticators — Entrupy and LegitApp.</p>
                    {product.coa && <p><a className="link-u" href={product.coa} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-900)' }}>Certificate of authentication <span aria-hidden="true">↗</span></a></p>}
                  </div>
                </details>
                <details className="acc">
                  <summary>Repair before delivery<span className="acc-ic"></span></summary>
                  <div className="acc-body">
                    <p>Prefer it freshly serviced? If you'd like us to send this piece to a {brand} store or spa for repair before it ships, we're happy to arrange it.</p>
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

      <RelatedProducts products={products} index={catalogIndex} />

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
