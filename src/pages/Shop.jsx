import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { useCatalog } from '../context/useCatalog';
import './shop.extra.css';

const CATS = [
  { val: 'bags', label: 'Bags' },
  { val: 'watches', label: 'Watches' },
  { val: 'belts', label: 'Belts & accessories' }
];
const PRICES = [
  { val: 'u1000', label: 'Under $1,000' },
  { val: '1-5k', label: '$1,000 – $6,000' },
  { val: '5-15k', label: '$6,000 – $20,000' },
  { val: '15k+', label: '$20,000 +' }
];
const RANGES = {
  u1000: (p) => p < 1000,
  '1-5k': (p) => p >= 1000 && p < 6000,
  '5-15k': (p) => p >= 6000 && p < 20000,
  '15k+': (p) => p >= 20000
};

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export default function Shop() {
  const { products } = useCatalog();
  const [params] = useSearchParams();
  const saleMode = params.get('sale') === '1';
  const dept = params.get('dept');
  const initialCat = params.get('cat');

  const [cats, setCats] = useState(initialCat ? [initialCat] : []);
  const [brands, setBrands] = useState([]);
  const [prices, setPrices] = useState([]);
  const [advOpen, setAdvOpen] = useState(false);

  const brandList = useMemo(() => {
    const seen = [];
    products.forEach((p) => { if (p.brand && !seen.includes(p.brand)) seen.push(p.brand); });
    return seen.sort();
  }, [products]);

  const filtered = useMemo(() => products.filter((p) => {
    const okCat = !cats.length || cats.includes(p.category);
    const okBr = !brands.length || brands.includes(p.brand);
    const okPr = !prices.length || prices.some((r) => RANGES[r](p.price));
    const okSale = !saleMode || p.tag === 'Sale';
    return okCat && okBr && okPr && okSale;
  }), [products, cats, brands, prices, saleMode]);

  useEffect(() => {
    if (saleMode) document.title = 'Sale — Bougie Edition';
    else if (dept) document.title = dept.charAt(0).toUpperCase() + dept.slice(1) + ' — Bougie Edition';
    else document.title = 'Shop All — Bougie Edition';
  }, [saleMode, dept]);

  const activeCount = cats.length + brands.length + prices.length;
  const summaryParts = [];
  if (cats.length) summaryParts.push(cats.length + ' categor' + (cats.length > 1 ? 'ies' : 'y'));
  if (brands.length) summaryParts.push(brands.length + ' brand' + (brands.length > 1 ? 's' : ''));
  if (prices.length) summaryParts.push(prices.length + ' price range' + (prices.length > 1 ? 's' : ''));

  let heroEyebrow = 'The full edit', heroTitleText = <>Shop <span className="serif-italic">all</span>.</>;
  let heroLede = "Everything we carry, in one place — for those who prefer to browse the whole edit. Filter by category, mix multiple brands and price ranges to find your piece.";
  let ctxNote = null;
  if (saleMode) {
    heroEyebrow = 'Sale — up to 40% off';
    heroTitleText = <>The <span className="serif-italic">sale</span>.</>;
    heroLede = 'A limited selection of authenticated pieces, now reduced. Combine brands and price ranges to find your edit.';
    ctxNote = 'Sale — reduced pieces only';
  } else if (dept) {
    const label = dept.charAt(0).toUpperCase() + dept.slice(1);
    heroEyebrow = label + ' — the edit';
    heroTitleText = <>{label}<span className="serif-italic">.</span></>;
    heroLede = `The ${dept}'s selection — bags, watches and accessories, each sourced and authenticated. Mix multiple brands and price ranges to refine.`;
    ctxNote = label + '\u2019s edit';
  }

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">{heroEyebrow}</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">{heroTitleText}</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">{heroLede}</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {ctxNote && <div className="ctx-note show">{ctxNote}</div>}

          <div className="shop-toolbar reveal">
            <div className="chips">
              <button className={'chip' + (cats.length === 0 ? ' active' : '')} onClick={() => setCats([])}>All</button>
              {CATS.map((c) => (
                <button key={c.val} className={'chip' + (cats.includes(c.val) ? ' on active' : '')} onClick={() => setCats((v) => toggle(v, c.val))}>{c.label}</button>
              ))}
            </div>
            <div className="toolbar-right">
              <button className={'filters-btn' + (advOpen ? ' open' : '')} aria-expanded={advOpen} onClick={() => setAdvOpen((o) => !o)}>
                <SlidersHorizontal size={16} /><span>Filters</span>
                <span className={'fbadge' + (activeCount > 0 ? ' show' : '')}>{activeCount}</span>
              </button>
              <span className="count">{filtered.length}{filtered.length === 1 ? ' piece' : ' pieces'}</span>
            </div>
          </div>

          <div className={'adv-panel' + (advOpen ? ' open' : '')}>
            <div className="adv-inner">
              <div className="filter-group">
                <div className="fg-head"><h4>Brand</h4><span className="fg-hint">Select any — combine freely</span></div>
                <div className="fchips">
                  {brandList.map((b) => (
                    <button key={b} className={'fchip' + (brands.includes(b) ? ' on' : '')} onClick={() => setBrands((v) => toggle(v, b))}>{b}</button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <div className="fg-head"><h4>Price</h4><span className="fg-hint">Select any — combine ranges</span></div>
                <div className="fchips">
                  {PRICES.map((pr) => (
                    <button key={pr.val} className={'fchip' + (prices.includes(pr.val) ? ' on' : '')} onClick={() => setPrices((v) => toggle(v, pr.val))}>{pr.label}</button>
                  ))}
                </div>
              </div>
              <div className="adv-actions">
                <div className="adv-summary">{summaryParts.length ? <>Filtering by <b>{summaryParts.join(', ')}</b></> : 'Showing all pieces'}</div>
                <button className="clear-btn" onClick={() => { setCats([]); setBrands([]); setPrices([]); }}>Clear all filters</button>
              </div>
            </div>
          </div>

          <div className="prod-grid" style={{ marginTop: '48px' }}>
            {filtered.map((p) => <ProductCard key={p.brand + p.name} product={p} index={products.indexOf(p)} />)}
          </div>
          {filtered.length === 0 && <div className="noresults show">No pieces match those filters — try removing a brand or widening the price.</div>}
        </div>
      </section>
    </>
  );
}
