import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import ProductCard from './ProductCard';
import { getRelatedProducts } from '../data/related';

/**
 * "More like this" — suggested pieces drawn from the live inventory.
 *
 * Nothing is curated by hand: candidates are scored against the piece on
 * screen (see data/related.js), so pieces added to the catalog sheet start
 * appearing here on their own.
 */
export default function RelatedProducts({ products, index, count = 4 }) {
  const related = getRelatedProducts(products, index, count);

  // One lonely suggestion reads as an accident — show the row or nothing.
  if (related.length < 2) return null;

  return (
    <section className="section related-sec" aria-labelledby="related-title">
      <div className="container">
        <div className="related-head">
          <div>
            <Reveal as="p" className="eyebrow">More like this</Reveal>
            <Reveal as="h2" id="related-title" className="related-title reveal-d1">
              You may also <span className="serif-italic">love</span><span className="dot">.</span>
            </Reveal>
          </div>
          <Reveal as="div" className="reveal-d1 related-all">
            <Link className="link-u" to="/shop" style={{ color: 'var(--ink-900)' }}>View the full collection</Link>
          </Reveal>
        </div>

        <div className="prod-grid related-grid">
          {related.map(({ product, index: catalogIndex }, i) => (
            <ProductCard
              key={catalogIndex}
              product={product}
              /* catalogIndex — position in the full catalog, which is what
                 /product/:id resolves against. Not the loop counter. */
              index={catalogIndex}
              delayClass={'reveal-d' + Math.min(i, 3)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
