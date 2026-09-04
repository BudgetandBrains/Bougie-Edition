import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import PriceBlock from './PriceBlock';

export default function ProductCard({ product, index, delayClass = '' }) {
  const p = product;
  const img = p.images && p.images[0];
  const [broken, setBroken] = useState(false);
  return (
    <Reveal
      as={Link} to={`/product/${index}`} className={('prod ' + delayClass).trim()}
      data-cat={p.category} data-brand={p.brand} data-price={p.price}
      data-sale={p.tag === 'Sale' ? '1' : undefined}
    >
      <div className={'frame' + (p.soldOut ? ' is-sold' : '')}>
        {p.soldOut
          ? <span className="tag sold-tag">Sold</span>
          : (p.tag && <span className={'tag' + ((p.tag === 'Featured' || p.tag === 'New in') ? ' gold' : '')}>{p.tag}</span>)}
        {img && !broken ? <img src={img} alt={p.name} onError={() => setBroken(true)} /> : <div className="ph"><span className="lbl">{p.category || 'Product'}</span></div>}
        {p.soldOut ? <div className="sold-veil"><span>Sold</span></div> : <div className="add">Add to bag</div>}
      </div>
      <p className="brand">{p.brand}</p>
      <h3 className="name">{p.name}</h3>
      <PriceBlock usd={p.price} note={p.condition || 'Authenticated'} />
    </Reveal>
  );
}
