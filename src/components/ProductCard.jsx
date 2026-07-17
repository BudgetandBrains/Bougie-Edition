import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import PriceBlock from './PriceBlock';

export default function ProductCard({ product, index, delayClass = '' }) {
  const p = product;
  const img = p.images && p.images[0];
  return (
    <Reveal
      as={Link} to={`/product/${index}`} className={('prod ' + delayClass).trim()}
      data-cat={p.category} data-brand={p.brand} data-price={p.price}
      data-sale={p.tag === 'Sale' ? '1' : undefined}
    >
      <div className="frame">
        {p.tag && <span className={'tag' + ((p.tag === 'Featured' || p.tag === 'New in') ? ' gold' : '')}>{p.tag}</span>}
        {img ? <img src={img} alt={p.name} /> : <div className="ph"><span className="lbl">{p.category || 'Product'}</span></div>}
        <div className="add">Add to bag</div>
      </div>
      <p className="brand">{p.brand}</p>
      <h3 className="name">{p.name}</h3>
      <PriceBlock usd={p.price} note={p.condition || 'Authenticated'} />
    </Reveal>
  );
}
