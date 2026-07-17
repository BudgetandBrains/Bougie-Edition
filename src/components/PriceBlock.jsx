import { useCurrency } from '../context/CurrencyContext';

export default function PriceBlock({ usd, note, className = '', style }) {
  const { currency, fmt, fmtIntl } = useCurrency();
  if (!usd) return null;
  return (
    <p className={('price ' + className).trim()} style={style}>
      <span className="price-line"><strong>{fmt(usd)}</strong><small>Price in USA</small></span>
      <span className="price-line"><strong>{fmtIntl(usd)}</strong><small>Outside USA</small></span>
      {note && <span className="price-note">{note}</span>}
      {currency.code !== 'USD' && <span className="price-fx">Indicative — invoiced in USD</span>}
    </p>
  );
}
