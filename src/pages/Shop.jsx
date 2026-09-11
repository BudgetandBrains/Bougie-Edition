import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import PriceRange from '../components/PriceRange';
import { useCatalog } from '../context/useCatalog';
import { useCurrency } from '../context/CurrencyContext';
import { SORT_OPTIONS, DEFAULT_SORT, normalizeSort, sortProducts } from '../data/sort';
import './shop.extra.css';

const CAT_LABELS = { bags: 'Bags', backpack: 'Backpacks', backpacks: 'Backpacks', jewelry: 'Jewellery', jewellery: 'Jewellery', novelty: 'Novelty', watches: 'Watches', belts: 'Belts & accessories', accessories: 'Accessories' };
const catLabel = (v) => CAT_LABELS[v] || (v ? v.charAt(0).toUpperCase() + v.slice(1) : v);
const TAG_ORDER = ['New in', 'Best seller', 'Sale', 'Featured', 'Limited Edition', 'Rare Find', 'Giftable'];
// Price filter granularity — the slider's step, and what the top of the
// scale is rounded up to.
const PRICE_STEP = 500;

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export default function Shop() {
  const { products } = useCatalog();
  const { fmt } = useCurrency();
  const [params, setParams] = useSearchParams();
  const saleMode = params.get('sale') === '1';
  const dept = params.get('dept');
  const initialCat = params.get('cat') || '';
  const initialTag = params.get('tag') || '';
  const sort = normalizeSort(params.get('sort'));

  const [cat, setCat] = useState(initialCat);            // single-select category
  const [tags, setTags] = useState(initialTag ? [initialTag] : []); // multi-select tags
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(null); // null = full span
  const [advOpen, setAdvOpen] = useState(false);

  const catList = useMemo(() => {
    const seen = [];
    products.forEach((p) => { if (p.category && !seen.includes(p.category)) seen.push(p.category); });
    return seen.sort();
  }, [products]);

  const tagList = useMemo(() => {
    const seen = [];
    products.forEach((p) => (p.tags || []).forEach((t) => { if (!seen.includes(t)) seen.push(t); }));
    return seen.sort((a, b) => {
      const ia = TAG_ORDER.indexOf(a), ib = TAG_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
    });
  }, [products]);

  // Top of the scale comes from the catalog itself, rounded up to the next
  // PRICE_STEP, so the slider always covers the real stock — and follows it
  // when the sheet changes, instead of the old fixed bands.
  const priceCeiling = useMemo(() => {
    const top = products.reduce((m, p) => Math.max(m, p.price || 0), 0);
    return Math.max(Math.ceil(top / PRICE_STEP) * PRICE_STEP, PRICE_STEP);
  }, [products]);

  // Held as null until touched, so a range chosen before the catalog
  // finished loading is never silently widened by a later ceiling.
  const [lo, hi] = priceRange
    ? [Math.min(priceRange[0], priceCeiling), Math.min(priceRange[1], priceCeiling)]
    : [0, priceCeiling];
  const priceActive = lo > 0 || hi < priceCeiling;

  const brandList = useMemo(() => {
    const seen = [];
    products.forEach((p) => { if (p.brand && !seen.includes(p.brand)) seen.push(p.brand); });
    return seen.sort();
  }, [products]);

  // Carries each piece's catalog index through filtering and sorting —
  // that index is what /product/:id resolves against, so reordering the
  // grid never changes where a card points.
  const filtered = useMemo(() => products
    .map((product, index) => ({ product, index }))
    .filter(({ product: p }) => {
      const okCat = !cat || p.category === cat;
      const okTag = !tags.length || tags.some((t) => (p.tags || []).includes(t));
      const okBr = !brands.length || brands.includes(p.brand);
      const okPr = (p.price || 0) >= lo && (p.price || 0) <= hi;
      const okSale = !saleMode || (p.tags || []).includes('Sale');
      return okCat && okTag && okBr && okPr && okSale;
    }), [products, cat, tags, brands, lo, hi, saleMode]);

  const visible = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  // Keep the choice in the URL so a sorted view can be linked and shared.
  function changeSort(value) {
    const next = new URLSearchParams(params);
    if (value === DEFAULT_SORT) next.delete('sort');
    else next.set('sort', value);
    setParams(next, { replace: true });
  }

  useEffect(() => {
    if (saleMode) document.title = 'Sale — Bougie Edition';
    else if (dept) document.title = dept.charAt(0).toUpperCase() + dept.slice(1) + ' — Bougie Edition';
    else document.title = 'Shop All — Bougie Edition';
  }, [saleMode, dept]);

  const activeCount = (cat ? 1 : 0) + tags.length + brands.length + (priceActive ? 1 : 0);
  const summaryParts = [];
  if (cat) summaryParts.push(catLabel(cat));
  if (tags.length) summaryParts.push(tags.length + ' tag' + (tags.length > 1 ? 's' : ''));
  if (brands.length) summaryParts.push(brands.length + ' brand' + (brands.length > 1 ? 's' : ''));
  if (priceActive) summaryParts.push(`${fmt ? fmt(lo) : '$' + lo}–${fmt ? fmt(hi) : '$' + hi}`);

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
              <button className={'chip' + (cat === '' ? ' active' : '')} onClick={() => setCat('')}>All</button>
              {catList.map((c) => (
                <button key={c} className={'chip' + (cat === c ? ' on active' : '')} onClick={() => setCat((v) => (v === c ? '' : c))}>{catLabel(c)}</button>
              ))}
            </div>
            <div className="toolbar-right">
              <button className={'filters-btn' + (advOpen ? ' open' : '')} aria-expanded={advOpen} onClick={() => setAdvOpen((o) => !o)}>
                <SlidersHorizontal size={16} /><span>Filters</span>
                <span className={'fbadge' + (activeCount > 0 ? ' show' : '')}>{activeCount}</span>
              </button>
              <label className="sort-field">
                <span className="visually-hidden">Sort pieces by</span>
                <select className="sort-select" value={sort} onChange={(e) => changeSort(e.target.value)}>
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown className="sort-caret" size={15} aria-hidden="true" />
              </label>
              <span className="count">{filtered.length}{filtered.length === 1 ? ' piece' : ' pieces'}</span>
            </div>
          </div>

          <div className={'adv-panel' + (advOpen ? ' open' : '')}>
            <div className="adv-inner">
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
              <div className="filter-group">
                <div className="fg-head"><h4>Price</h4><span className="fg-hint">Drag to set a range</span></div>
                <PriceRange
                  min={0}
                  max={priceCeiling}
                  step={PRICE_STEP}
                  value={[lo, hi]}
                  onChange={setPriceRange}
                />
              </div>
              <div className="adv-actions">
                <div className="adv-summary">{summaryParts.length ? <>Filtering by <b>{summaryParts.join(', ')}</b></> : 'Showing all pieces'}</div>
                <button className="clear-btn" onClick={() => { setCat(''); setTags([]); setBrands([]); setPriceRange(null); }}>Clear all filters</button>
              </div>
            </div>
          </div>

          <div className="prod-grid" style={{ marginTop: '48px' }}>
            {visible.map(({ product, index }) => <ProductCard key={index} product={product} index={index} />)}
          </div>
          {filtered.length === 0 && <div className="noresults show">No pieces match those filters — try removing a brand or widening the price.</div>}
        </div>
      </section>
    </>
  );
}
