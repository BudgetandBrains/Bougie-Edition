import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { useCatalog } from '../context/useCatalog';
import { CATEGORY_GROUPS } from '../data/catalog';
import { useCurrency } from '../context/CurrencyContext';
import './shop.extra.css';

const catLabel = (v) => CATEGORY_GROUPS[v] || (v ? v.charAt(0).toUpperCase() + v.slice(1) : v);
const CAT_ORDER = ['bags', 'accessories', 'novelty'];
const TAG_ORDER = ['New in', 'Best seller', 'Sale', 'Featured', 'Limited Edition', 'Rare Find', 'Giftable'];
const STEP = 500;

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export default function Shop() {
  const { products } = useCatalog();
  const { fmt } = useCurrency();
  const [params] = useSearchParams();
  const saleMode = params.get('sale') === '1';
  const query = (params.get('q') || '').trim();
  const initialCat = params.get('cat') || '';
  const initialTag = params.get('tag') || '';

  const priceCap = useMemo(() => {
    const m = products.reduce((mx, p) => Math.max(mx, p.price || 0), 0);
    return Math.max(STEP, Math.ceil(m / STEP) * STEP);
  }, [products]);

  const [cat, setCat] = useState(initialCat);
  const [tags, setTags] = useState(initialTag ? [initialTag] : []);
  const [brands, setBrands] = useState([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0); // 0 = "up to the cap" (untouched)
  const [sort, setSort] = useState('featured');
  const [advOpen, setAdvOpen] = useState(false);

  const hiPrice = priceMax > 0 ? priceMax : priceCap;
  const priceActive = priceMin > 0 || hiPrice < priceCap;

  const catList = useMemo(() => {
    const seen = [];
    products.forEach((p) => { const g = p.categoryGroup; if (g && !seen.includes(g)) seen.push(g); });
    return seen.sort((a, b) => (CAT_ORDER.indexOf(a) < 0 ? 99 : CAT_ORDER.indexOf(a)) - (CAT_ORDER.indexOf(b) < 0 ? 99 : CAT_ORDER.indexOf(b)));
  }, [products]);

  const tagList = useMemo(() => {
    const seen = [];
    products.forEach((p) => (p.tags || []).forEach((t) => { if (!seen.includes(t)) seen.push(t); }));
    return seen.sort((a, b) => {
      const ia = TAG_ORDER.indexOf(a), ib = TAG_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
    });
  }, [products]);

  const brandList = useMemo(() => {
    const seen = [];
    products.forEach((p) => { if (p.brand && !seen.includes(p.brand)) seen.push(p.brand); });
    return seen.sort();
  }, [products]);

  const filtered = useMemo(() => {
    const ql = query.toLowerCase();
    return products.filter((p) => {
      const okCat = !cat || p.categoryGroup === cat;
      const okTag = !tags.length || tags.some((t) => (p.tags || []).includes(t));
      const okBr = !brands.length || brands.includes(p.brand);
      const okPr = (p.price || 0) >= priceMin && (p.price || 0) <= hiPrice;
      const okSale = !saleMode || (p.tags || []).includes('Sale');
      const okQ = !ql || (p.brand + ' ' + p.name + ' ' + (p.category || '') + ' ' + (p.description || '')).toLowerCase().includes(ql);
      return okCat && okTag && okBr && okPr && okSale && okQ;
    });
  }, [products, cat, tags, brands, priceMin, hiPrice, saleMode, query]);

  const sorted = useMemo(() => {
    const arr = filtered.slice();
    if (sort === 'price-asc') arr.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === 'price-desc') arr.sort((a, b) => (b.price || 0) - (a.price || 0));
    return arr;
  }, [filtered, sort]);

  useEffect(() => {
    if (query) document.title = `“${query}” — Bougie Edition`;
    else if (saleMode) document.title = 'Sale — Bougie Edition';
    else document.title = 'Shop All — Bougie Edition';
  }, [query, saleMode]);

  const money = (v) => (fmt ? fmt(v) : '$' + Number(v).toLocaleString());
  const pct = (v) => (priceCap ? (v / priceCap) * 100 : 0);

  const activeCount = (cat ? 1 : 0) + tags.length + brands.length + (priceActive ? 1 : 0);
  const summaryParts = [];
  if (cat) summaryParts.push(catLabel(cat));
  if (tags.length) summaryParts.push(tags.length + ' tag' + (tags.length > 1 ? 's' : ''));
  if (brands.length) summaryParts.push(brands.length + ' brand' + (brands.length > 1 ? 's' : ''));
  if (priceActive) summaryParts.push(money(priceMin) + '–' + money(hiPrice));

  const clearAll = () => { setCat(''); setTags([]); setBrands([]); setPriceMin(0); setPriceMax(0); };

  let heroEyebrow = 'The full edit', heroTitleText = <>Shop <span className="serif-italic">all</span>.</>;
  let heroLede = 'Everything we carry, in one place. Filter by category, brand and price, then sort to find your piece.';
  let ctxNote = null;
  if (query) {
    heroEyebrow = 'Search results';
    heroTitleText = <>“{query}”</>;
    heroLede = `${filtered.length} ${filtered.length === 1 ? 'piece' : 'pieces'} matching your search.`;
  } else if (saleMode) {
    heroEyebrow = 'Sale — reduced pieces';
    heroTitleText = <>The <span className="serif-italic">sale</span>.</>;
    heroLede = 'A limited selection of authenticated pieces, now reduced.';
    ctxNote = 'Sale — reduced pieces only';
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
              <button className={'chip' + (cat === '' ? ' active' : '')} onClick={() => setCat('')}>All</button>
              {catList.map((c) => (
                <button key={c} className={'chip' + (cat === c ? ' on active' : '')} onClick={() => setCat((v) => (v === c ? '' : c))}>{catLabel(c)}</button>
              ))}
            </div>
            <div className="toolbar-right">
              <label className="sort-wrap">
                <span className="sort-label">Sort</span>
                <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
              <button className={'filters-btn' + (advOpen ? ' open' : '')} aria-expanded={advOpen} onClick={() => setAdvOpen((o) => !o)}>
                <SlidersHorizontal size={16} /><span>Filters</span>
                <span className={'fbadge' + (activeCount > 0 ? ' show' : '')}>{activeCount}</span>
              </button>
              <span className="count">{sorted.length}{sorted.length === 1 ? ' piece' : ' pieces'}</span>
            </div>
          </div>

          <div className={'adv-panel' + (advOpen ? ' open' : '')}>
            <div className="adv-inner">
              <div className="filter-group">
                <div className="fg-head"><h4>Price</h4><span className="fg-hint">{money(priceMin)} – {money(hiPrice)}{hiPrice >= priceCap ? '+' : ''}</span></div>
                <div className="price-slider">
                  <div className="ps-rail"></div>
                  <div className="ps-fill" style={{ left: pct(priceMin) + '%', right: (100 - pct(hiPrice)) + '%' }}></div>
                  <input type="range" className="ps-input ps-min" min={0} max={priceCap} step={STEP} value={priceMin}
                    onChange={(e) => setPriceMin(Math.min(Number(e.target.value), hiPrice))} aria-label="Minimum price" />
                  <input type="range" className="ps-input ps-max" min={0} max={priceCap} step={STEP} value={hiPrice}
                    onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin))} aria-label="Maximum price" />
                </div>
                <div className="ps-scale"><span>{money(0)}</span><span>{money(priceCap)}+</span></div>
              </div>
              <div className="filter-group">
                <div className="fg-head"><h4>Tag</h4><span className="fg-hint">New in, sale &amp; more</span></div>
                <div className="fchips">
                  {tagList.map((t) => (
                    <button key={t} className={'fchip' + (tags.includes(t) ? ' on' : '')} onClick={() => setTags((v) => toggle(v, t))}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <div className="fg-head"><h4>Brand</h4><span className="fg-hint">Select any — combine freely</span></div>
                <div className="fchips">
                  {brandList.map((b) => (
                    <button key={b} className={'fchip' + (brands.includes(b) ? ' on' : '')} onClick={() => setBrands((v) => toggle(v, b))}>{b}</button>
                  ))}
                </div>
              </div>
              <div className="adv-actions">
                <div className="adv-summary">{summaryParts.length ? <>Filtering by <b>{summaryParts.join(', ')}</b></> : 'Showing all pieces'}</div>
                <button className="clear-btn" onClick={clearAll}>Clear all filters</button>
              </div>
            </div>
          </div>

          <div className="prod-grid" style={{ marginTop: '48px' }}>
            {sorted.map((p) => <ProductCard key={p.brand + p.name} product={p} index={products.indexOf(p)} />)}
          </div>
          {sorted.length === 0 && <div className="noresults show">{query ? `No pieces match “${query}”.` : 'No pieces match those filters — try widening the price or removing a brand.'}</div>}
        </div>
      </section>
    </>
  );
}
