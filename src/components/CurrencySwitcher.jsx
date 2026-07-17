import { useEffect, useRef, useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';

export default function CurrencySwitcher() {
  const { currency, setCurrency, CURRENCIES } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div className={'cur-switch' + (open ? ' open' : '')} ref={ref}>
      <button
        className="cur-btn" type="button" aria-haspopup="true" aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
      >
        <span className="cur-code">{currency.code}</span><span className="cur-car">▾</span>
      </button>
      <div className="cur-menu" role="menu">
        <div className="cur-menu-hint">Preview prices in</div>
        {CURRENCIES.map((c) => (
          <button
            key={c.code} className={'cur-opt' + (c.code === currency.code ? ' on' : '')}
            type="button" role="menuitem"
            onClick={() => { setCurrency(c.code); setOpen(false); }}
          >
            <span>{c.code}</span><span className="cur-name">{c.label}</span>
          </button>
        ))}
        <div className="cur-menu-note">Always invoiced in USD.</div>
      </div>
    </div>
  );
}
