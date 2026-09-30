import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Upload, Search, CalendarCheck, ChevronDown, ShieldCheck, HelpCircle } from 'lucide-react';
import { useCatalog } from '../context/useCatalog';
import { CATEGORY_GROUPS } from '../data/catalog';

const catLabel = (v) => CATEGORY_GROUPS[v] || (v ? v.charAt(0).toUpperCase() + v.slice(1) : v);
const CAT_ORDER = ['bags', 'accessories', 'novelty'];

const SECONDARY = [
  { key: 'drops', icon: Sparkles, label: 'New Arrivals', href: '/drops' },
  { key: 'auth', icon: ShieldCheck, label: 'Authentication', href: '/authentication' },
  { key: 'consult', icon: CalendarCheck, label: 'Book Consultation', href: '/consultation' },
  { key: 'consign', icon: Upload, label: 'Consign with us', href: '/consign' },
  { key: 'source', icon: Search, label: 'Source for me', href: '/sourcing' },
  { key: 'faq', icon: HelpCircle, label: 'FAQ', href: '/faq' }
];

export default function NavRail({ open, page, onClose }) {
  const { products } = useCatalog();
  const [shopOpen, setShopOpen] = useState(true);

  const cats = useMemo(() => {
    const seen = [];
    products.forEach((p) => { const g = p.categoryGroup; if (g && !seen.includes(g)) seen.push(g); });
    return seen.sort((a, b) => (CAT_ORDER.indexOf(a) < 0 ? 9 : CAT_ORDER.indexOf(a)) - (CAT_ORDER.indexOf(b) < 0 ? 9 : CAT_ORDER.indexOf(b)));
  }, [products]);

  return (
    <>
      <div className={'nav-scrim' + (open ? ' show' : '')} onClick={onClose}></div>
      <nav className={'nav-rail' + (open ? ' open pinned' : '')} aria-label="Main menu">
        <div className="rail-brand">Bougie Edition</div>

        {/* Shop → cascades to Bags / Accessories / Novelty */}
        <button
          type="button"
          className={'nav-item nav-parent' + (page === 'shop' ? ' current' : '')}
          onClick={() => setShopOpen((o) => !o)}
          aria-expanded={shopOpen}
        >
          <span className="ico"><ShoppingBag /></span>
          <span className="txt">Shop</span>
          <ChevronDown className={'nav-caret' + (shopOpen ? ' open' : '')} size={16} />
        </button>
        <div className={'nav-sub' + (shopOpen ? ' open' : '')}>
          <Link className="nav-subitem" to="/shop" onClick={onClose}>All pieces</Link>
          {cats.map((c) => (
            <Link key={c} className="nav-subitem" to={`/shop?cat=${encodeURIComponent(c)}`} onClick={onClose}>{catLabel(c)}</Link>
          ))}
        </div>

        {SECONDARY.map((n) => {
          const Icon = n.icon;
          return (
            <Link key={n.key} className={'nav-item' + (n.key === page ? ' current' : '')} to={n.href} onClick={onClose}>
              <span className="ico"><Icon /></span><span className="txt">{n.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
