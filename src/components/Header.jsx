import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag } from 'lucide-react';
import CurrencySwitcher from './CurrencySwitcher';

export default function Header({ scrolled, onDark, onMenuClick }) {
  return (
    <header className={'site-header' + (scrolled ? ' scrolled' : '') + (onDark ? ' on-dark' : '')}>
      <div className="header-left">
        <button className="menu-trigger" aria-label="Open menu" onClick={onMenuClick}>
          <span className="bars"><span></span><span></span><span></span></span>
          <span className="mlabel">Menu</span>
        </button>
      </div>
      <Link className="logo-link" to="/" aria-label="Bougie Edition home">
        <img className="logo-emblem" src="/assets/bougie-logo.jpg" alt="Bougie Edition" />
      </Link>
      <div className="header-right">
        <CurrencySwitcher />
        <button className="util-btn" aria-label="Search"><Search /></button>
        <button className="util-btn" aria-label="Account"><User /></button>
        <button className="util-btn bag-wrap" aria-label="Bag"><ShoppingBag /><span className="bag-count">2</span></button>
      </div>
    </header>
  );
}
