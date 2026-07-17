import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-top">
          <div>
            <div className="foot-brand">Bougie Edition</div>
            <p style={{ maxWidth: '34ch', margin: '18px 0 0', lineHeight: 1.6, color: 'var(--stone-500)', fontSize: '.95rem' }}>
              Luxury, curated &amp; authenticated. Bags, watches and accessories of quiet consequence — sourced, verified, yours.
            </p>
          </div>
          <div className="foot-col"><h5>Shop</h5>
            <Link to="/category/bags">Bags</Link>
            <Link to="/category/watches">Watches</Link>
            <Link to="/category/belts">Belts</Link>
            <Link to="/shop">Shop all</Link>
          </div>
          <div className="foot-col"><h5>Maison</h5>
            <Link to="/about">About us</Link>
            <Link to="/brands">Brands</Link>
            <Link to="/drops">New Arrivals</Link>
            <Link to="/order">How to order</Link>
          </div>
          <div className="foot-col"><h5>Services</h5>
            <Link to="/consign">Consign with us</Link>
            <Link to="/sourcing">Sourcing request</Link>
            <Link to="/consultation">Book a consultation</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
          <div className="foot-col"><h5>Connect</h5>
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
            <Link to="/disclaimer">Authentication</Link>
            <Link to="/consultation">Contact</Link>
          </div>
        </div>
        <div className="foot-note">
          <span>© 2026 Bougie Edition — A place for luxury</span>
          <span>Curated · Authenticated · Guaranteed</span>
        </div>
      </div>
    </footer>
  );
}
