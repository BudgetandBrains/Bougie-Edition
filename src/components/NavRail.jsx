import { Link } from 'react-router-dom';
import { ShoppingBag, Shirt, Flower2, Sparkles, Upload, Search, CalendarCheck } from 'lucide-react';

const NAV = [
  { key: 'shop', icon: ShoppingBag, label: 'Shop All', href: '/shop' },
  { key: 'men', icon: Shirt, label: 'Men', href: '/shop?dept=men' },
  { key: 'women', icon: Flower2, label: 'Women', href: '/shop?dept=women' },
  { key: 'drops', icon: Sparkles, label: 'New Arrivals', href: '/drops' },
  { key: 'consult', icon: CalendarCheck, label: 'Book Consultation', href: '/consultation' },
  { key: 'consign', icon: Upload, label: 'Consign', href: '/consign' },
  { key: 'source', icon: Search, label: 'Source', href: '/sourcing' }
];

export default function NavRail({ open, page, onClose }) {
  return (
    <>
      <div className={'nav-scrim' + (open ? ' show' : '')} onClick={onClose}></div>
      <nav className={'nav-rail' + (open ? ' open pinned' : '')} aria-label="Main menu">
        <div className="rail-brand">Bougie Edition</div>
        {NAV.map((n) => {
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
