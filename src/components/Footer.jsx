import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-top">
          <div>
            <div className="foot-brand">Bougie Edition</div>
            <p style={{ maxWidth: '34ch', margin: '18px 0 0', lineHeight: 1.6, color: 'var(--stone-500)', fontSize: '.95rem' }}>
              Luxury, curated &amp; authenticated. Bags, accessories and novelties of quiet consequence — sourced, verified, yours.
            </p>
          </div>
          <div className="foot-col"><h5>Shop</h5>
            <Link to="/shop?cat=bags">Bags</Link>
            <Link to="/shop?cat=accessories">Accessories</Link>
            <Link to="/shop?cat=novelty">Novelty</Link>
            <Link to="/shop">Shop all</Link>
          </div>
          <div className="foot-col"><h5>Maison</h5>
            <Link to="/brands">Brands</Link>
            <Link to="/drops">New Arrivals</Link>
            <Link to="/authentication">Authentication</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="foot-col"><h5>Services</h5>
            <Link to="/consign">Consign with us</Link>
            <Link to="/sourcing">Source for me</Link>
            <Link to="/consultation">Book a consultation</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
          <div className="foot-col"><h5>Connect</h5>
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
            <Link to="/order">How to order</Link>
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
