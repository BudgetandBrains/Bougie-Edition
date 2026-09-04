import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import PriceBlock from './PriceBlock';

const TAG_PRIORITY = ['Sale', 'New in', 'Best seller', 'Limited Edition', 'Rare Find', 'Featured', 'Giftable'];

export default function ProductCard({ product, index, delayClass = '' }) {
  const p = product;
  const img = p.images && p.images[0];
  const [broken, setBroken] = useState(false);
  const tags = (p.tags && p.tags.length) ? p.tags : (p.tag ? [p.tag] : []);
  const primaryTag = TAG_PRIORITY.find((t) => tags.includes(t)) || tags[0] || '';
  return (
    <Reveal
      as={Link} to={`/product/${index}`} className={('prod ' + delayClass).trim()}
      data-cat={p.category} data-brand={p.brand} data-price={p.price}
      data-sale={tags.includes('Sale') ? '1' : undefined}
    >
      <div className={'frame' + (p.soldOut ? ' is-sold' : '')}>
        {p.soldOut
          ? <span className="tag sold-tag">Sold</span>
          : (primaryTag && <span className="tag tag-mini">{primaryTag}</span>)}
        {img && !broken ? <img src={img} alt={p.name} onError={() => setBroken(true)} /> : <div className="ph"><span className="lbl">{p.category || 'Product'}</span></div>}
        {p.soldOut && <div className="sold-veil"><span>Sold</span></div>}
      </div>
      <p className="brand">{p.brand}</p>
      <h3 className="name">{p.name}</h3>
      <PriceBlock usd={p.price} note={p.condition || 'Authenticated'} />
    </Reveal>
  );
}
