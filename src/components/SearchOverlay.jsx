import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useCatalog } from '../context/useCatalog';
import { useCurrency } from '../context/CurrencyContext';

export default function SearchOverlay({ open, onClose }) {
  const { products } = useCatalog();
  const { fmt } = useCurrency();
  const [q, setQ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ('');
      const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const term = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return [];
    return products
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => (p.brand + ' ' + p.name + ' ' + (p.category || '')).toLowerCase().includes(term))
      .slice(0, 8);
  }, [term, products]);

  if (!open) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search">
      <div className="search-scrim" onClick={onClose}></div>
      <div className="search-panel">
        <div className="search-bar">
          <Search className="search-ic" size={22} />
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Search brands, bags, watches…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="search-close" aria-label="Close search" onClick={onClose}><X size={22} /></button>
        </div>
        <div className="search-results">
          {!term && <p className="search-hint">Try “Chanel”, “Birkin”, “watch”…</p>}
          {term && results.length === 0 && <p className="search-empty">No pieces match “{q}”.</p>}
          {results.map(({ p, i }) => (
            <Link key={p.brand + p.name} className="search-result" to={`/product/${i}`} onClick={onClose}>
              <span className="sr-thumb">
                {p.images && p.images[0] ? <img src={p.images[0]} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} /> : <span className="sr-ph" />}
              </span>
              <span className="sr-meta">
                <span className="sr-brand">{p.brand}</span>
                <span className="sr-name">{p.name}</span>
              </span>
              <span className="sr-price">{fmt ? fmt(p.price) : '$' + p.price.toLocaleString()}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
