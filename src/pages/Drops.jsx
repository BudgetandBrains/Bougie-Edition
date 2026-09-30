import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { useCatalog } from '../context/useCatalog';

export default function Drops() {
  const { products } = useCatalog();
  useEffect(() => { document.title = 'New Arrivals — Bougie Edition'; }, []);

  const newIn = products.filter((p) => (p.tags || []).includes('New in'));
  const show = newIn.length ? newIn : products.slice(0, 12);

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Just landed</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">New <span className="serif-italic">arrivals</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">The latest pieces to land — freshly sourced, authenticated and ready to be carried. See something you love? Submit an inquiry and we'll take it from there.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {newIn.length === 0 && (
            <div className="ctx-note show">Nothing tagged “New in” yet — showing a selection of the latest pieces</div>
          )}
          <div className="prod-grid">
            {show.map((p) => <ProductCard key={p.brand + p.name} product={p} index={products.indexOf(p)} />)}
          </div>
          <Reveal as="p" className="center" style={{ marginTop: '48px' }}>
            <Link className="link-u" to="/shop" style={{ color: 'var(--ink-900)' }}>Browse the full edit</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
