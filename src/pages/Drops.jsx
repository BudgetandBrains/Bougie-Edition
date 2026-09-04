import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { useCatalog } from '../context/useCatalog';

function top(products, cat) {
  const inCat = products.filter((p) => p.category === cat);
  const featured = inCat.filter((p) => p.tag === 'Featured' || p.tag === 'Best seller');
  return (featured.length ? featured : inCat).slice(0, 4);
}

export default function Drops() {
  const { products } = useCatalog();
  const bags = top(products, 'bags');
  const watches = top(products, 'watches');
  const belts = top(products, 'belts');

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Featured &amp; best-selling</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">New <span className="serif-italic">arrivals</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">The latest pieces to land — freshly sourced, authenticated and ready to be carried. The bags, watches and accessories moving fastest right now.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head"><div><Reveal as="p" className="eyebrow">Featured bags</Reveal></div><Reveal as={Link} className="link-u reveal-d1" to="/category/bags" style={{ color: 'var(--ink-900)' }}>All bags</Reveal></div>
          <div className="prod-grid">{bags.map((p) => <ProductCard key={p.brand + p.name} product={p} index={products.indexOf(p)} />)}</div>
        </div>
      </section>

      <section className="section dark-band" data-header-dark="1">
        <div className="container">
          <div className="sec-head"><div><Reveal as="p" className="eyebrow on-dark">Featured watches</Reveal></div><Reveal as={Link} className="link-u reveal-d1" to="/category/watches" style={{ color: '#fff' }}>All watches</Reveal></div>
          <div className="prod-grid">{watches.map((p) => <ProductCard key={p.brand + p.name} product={p} index={products.indexOf(p)} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sec-head"><div><Reveal as="p" className="eyebrow">Featured accessories</Reveal></div><Reveal as={Link} className="link-u reveal-d1" to="/category/belts" style={{ color: 'var(--ink-900)' }}>All accessories</Reveal></div>
          <div className="prod-grid">{belts.map((p) => <ProductCard key={p.brand + p.name} product={p} index={products.indexOf(p)} />)}</div>
        </div>
      </section>
    </>
  );
}
