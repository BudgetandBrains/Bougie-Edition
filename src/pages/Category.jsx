import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { useCatalog } from '../context/CatalogContext';
import './category.extra.css';

const LEDE = {
  bags: 'Totes, top-handles and clutches — sourced, inspected and authenticated. Each one ready to be carried for a lifetime.',
  watches: "Automatic, dress and sport — every reference verified against the maker\u2019s standard and documented before it is offered.",
  belts: 'Leather, hardware and the finishing pieces — reversible belts, wallets and fine jewellery, each authenticated.'
};
const TITLE = { bags: 'Bags', watches: 'Watches', belts: 'Belts & accessories' };

export default function Category() {
  const { cat: catParam } = useParams();
  const { products } = useCatalog();
  const cat = TITLE[catParam] ? catParam : 'bags';

  useEffect(() => { document.title = TITLE[cat] + ' — Bougie Edition'; }, [cat]);

  const items = products.filter((p) => p.category === cat);

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Products</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">{TITLE[cat]}<span style={{ color: 'var(--gold)' }}>.</span></Reveal>
        <Reveal as="p" className="page-lede reveal-d2">{LEDE[cat]}</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cat-tabs">
            {Object.keys(TITLE).map((k) => (
              <Link key={k} className={'cat-tab' + (k === cat ? ' active' : '')} to={`/category/${k}`}>{TITLE[k]}</Link>
            ))}
          </div>
          <div className="prod-grid">
            {items.map((p) => <ProductCard key={p.brand + p.name} product={p} index={products.indexOf(p)} />)}
          </div>
        </div>
      </section>
    </>
  );
}
