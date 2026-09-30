import { useCurrency } from '../context/CurrencyContext';

/**
 * Two-handle price filter.
 *
 * Built from two native range inputs stacked on one track, so dragging,
 * keyboard (arrows/Home/End) and screen-reader support come for free —
 * no library, and it degrades sanely if CSS fails to load.
 *
 * Values are always USD, matching the catalog; only the labels run
 * through the currency formatter.
 */
export default function PriceRange({ min, max, step, value, onChange }) {
  const { fmt } = useCurrency();
  const [lo, hi] = value;
  const span = Math.max(max - min, 1);
  const pct = (v) => ((v - min) / span) * 100;

  // Handles must not cross: each pushes against the other's current value.
  function setLo(v) { onChange([Math.min(Number(v), hi), hi]); }
  function setHi(v) { onChange([lo, Math.max(Number(v), lo)]); }

  // When both handles sit on the same spot the upper one would cover the
  // lower, and since it cannot be dragged below its partner the pair would
  // be stuck. Lifting the min handle above once the range collapses at the
  // top keeps the grabbable thumb the one that can still move.
  const loOnTop = lo >= hi;

  return (
    <div className="price-range">
      <div className="pr-values">
        <span className="pr-val">{fmt ? fmt(lo) : '$' + lo.toLocaleString()}</span>
        <span className="pr-dash" aria-hidden="true">—</span>
        <span className="pr-val">
          {fmt ? fmt(hi) : '$' + hi.toLocaleString()}
          {hi >= max && <span className="pr-plus">+</span>}
        </span>
      </div>

      <div className="pr-track">
        <div className="pr-rail" />
        <div
          className="pr-fill"
          style={{ left: pct(lo) + '%', right: (100 - pct(hi)) + '%' }}
        />
        <input
          type="range" className="pr-input pr-lo"
          style={{ zIndex: loOnTop ? 4 : 3 }}
          min={min} max={max} step={step} value={lo}
          onChange={(e) => setLo(e.target.value)}
          aria-label="Minimum price"
          aria-valuetext={fmt ? fmt(lo) : String(lo)}
        />
        <input
          type="range" className="pr-input pr-hi"
          style={{ zIndex: loOnTop ? 3 : 4 }}
          min={min} max={max} step={step} value={hi}
          onChange={(e) => setHi(e.target.value)}
          aria-label="Maximum price"
          aria-valuetext={fmt ? fmt(hi) : String(hi)}
        />
      </div>

      <div className="pr-ends">
        <span>{fmt ? fmt(min) : '$' + min}</span>
        <span>{fmt ? fmt(max) : '$' + max}+</span>
      </div>
    </div>
  );
}
