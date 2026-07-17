import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { useCatalog } from '../context/CatalogContext';

export default function Home() {
  const { products } = useCatalog();
  const marqueeRef = useRef(null);
  const videosWrapRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const m = marqueeRef.current;
      if (!m) return;
      const x = -(window.pageYOffset * 0.18) % (m.scrollWidth / 3 || 1);
      m.style.transform = 'translate3d(' + x + 'px,0,0)';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const wrap = videosWrapRef.current;
    if (!wrap) return;
    const vids = wrap.querySelectorAll('video');
    if (!vids.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause(); });
    }, { threshold: 0.5 });
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  const icons = products.filter((p) => p.tag === 'Featured' || p.tag === 'Best seller').slice(0, 4);
  const iconsShow = icons.length ? icons : products.slice(0, 4);
  const justIn = products.filter((p) => p.tag === 'New in').slice(0, 4);
  const justInShow = justIn.length ? justIn : products.slice(4, 8);

  return (
    <>
      <section className="hero hero-light">
        <div className="hero-inner">
          <div className="container hero-c">
            <h1 className="hero-title hero-words">
              <span className="mask"><span className="w" style={{ '--i': 0 }}>Timeless Luxury.</span></span>
              <span className="mask"><span className="w" style={{ '--i': 1 }}>Bougie.</span></span>
              <span className="mask"><span className="w accent" style={{ '--i': 2 }}>Iconic.</span></span>
              <span className="mask"><span className="w" style={{ '--i': 3 }}>Yours<span className="pt">.</span></span></span>
            </h1>
          </div>
        </div>
      </section>

      <section className="section stat-band" id="house">
        <div className="container">
          <div className="stat-head">
            <div>
              <Reveal as="p" className="eyebrow">01 — The house</Reveal>
              <Reveal as="h2" className="sec-title reveal-d1">Numbers we <span className="serif-italic">stand behind</span></Reveal>
            </div>
            <Reveal className="stat-intro reveal-d2">
              <p>Every figure reflects a promise kept — pieces sourced with care, authenticated without exception, and guaranteed in writing.</p>
              <Link className="btn btn-ink" to="/about"><span>Our story</span><ArrowRight className="arrow" size={16} /></Link>
            </Reveal>
          </div>
          <div className="stat-row">
            <Reveal className="stat"><div className="num">12<span>+</span></div><div className="lbl2">Years sourcing</div></Reveal>
            <Reveal className="stat reveal-d1"><div className="num">9,400<span>+</span></div><div className="lbl2">Pieces authenticated</div></Reveal>
            <Reveal className="stat reveal-d2"><div className="num">60<span>+</span></div><div className="lbl2">Maisons carried</div></Reveal>
            <Reveal className="stat reveal-d3"><div className="num">100<span>%</span></div><div className="lbl2">Independently verified</div><div className="bar"></div></Reveal>
          </div>
        </div>
      </section>

      <section className="section icons-sec" id="icons" style={{ background: 'var(--surface-page)', borderTop: '1px solid var(--border-hairline)' }}>
        <div className="container">
          <div className="icons-head center">
            <Reveal as="p" className="eyebrow" style={{ justifyContent: 'center' }}>02 — Featured &amp; best-selling</Reveal>
            <Reveal as="h2" className="big-title reveal-d1">Own the <span className="serif-italic">Icons</span><span className="dot">.</span></Reveal>
            <Reveal as="p" className="icons-sub reveal-d2">The pieces that define a collection — verified, documented, and ready to be carried for a lifetime.</Reveal>
          </div>
          <div className="prod-grid" id="iconsGrid">
            {iconsShow.map((p) => <ProductCard key={p.brand + p.name} product={p} index={products.indexOf(p)} />)}
          </div>
          <Reveal as="p" className="center" style={{ marginTop: '48px' }}><Link className="link-u" to="/drops" style={{ color: 'var(--ink-900)' }}>View all new arrivals</Link></Reveal>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <div className="sec-head">
            <div>
              <Reveal as="p" className="eyebrow">03 — Browse the range</Reveal>
              <Reveal as="h2" className="sec-title reveal-d1">Shop by <span className="serif-italic">category</span></Reveal>
            </div>
            <Reveal as={Link} className="link-u reveal-d2" to="/shop" style={{ color: 'var(--ink-900)' }}>Shop all</Reveal>
          </div>
          <div className="cat-grid">
            <Reveal as={Link} className="cat-card" to="/category/bags">
              <img src="/assets/products/IMG_6656.jpg" alt="Bags" />
              <div className="cat-meta"><div><h3>Bags</h3><div className="ct">Flaps · Totes · Crossbody</div></div><span className="go"><ArrowUpRight /></span></div>
            </Reveal>
            <Reveal as={Link} className="cat-card reveal-d1" to="/category/belts">
              <img src="/assets/products/IMG_6963.jpg" alt="Belts" />
              <div className="cat-meta"><div><h3>Belts</h3><div className="ct">Leather · Monogram · Hardware</div></div><span className="go"><ArrowUpRight /></span></div>
            </Reveal>
            <Reveal as={Link} className="cat-card reveal-d2" to="/shop">
              <img src="/assets/products/IMG_7226.jpg" alt="Jewellery" />
              <div className="cat-meta"><div><h3>Jewellery</h3><div className="ct">Necklaces · Pendants · Chains</div></div><span className="go"><ArrowUpRight /></span></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mosaic-sec dark-band warm" data-header-dark="1">
        <div className="mosaic">
          <Reveal><img src="/assets/products/IMG_6690.jpg" alt="Metallic flap with dust bag and cards" /></Reveal>
          <Reveal className="reveal-d1"><img src="/assets/products/IMG_6751.jpg" alt="Hardware and zipper detail" /></Reveal>
          <Reveal className="mosaic-text reveal-d2">
            <p className="eyebrow on-dark">04 — The promise</p>
            <h3 className="mosaic-title">The art of <span className="serif-italic">authentication</span></h3>
            <p>We source rare and sought-after pieces, then verify every one in hand — materials, hardware, serials and provenance — before it is offered. So the only thing you inherit is the object itself.</p>
            <p>Every piece ships with a Certificate of Authenticity from Entrupy or LegitApp — and leaves our atelier exactly as it arrived. Zero repainted or repaired bags, ever.</p>
          </Reveal>
          <Reveal className="reveal-d3"><img src="/assets/products/IMG_6745.jpg" alt="Monogram leather goods detail" /></Reveal>
        </div>
      </section>

      <section className="marquee-sec" aria-hidden="true">
        <div className="marquee" id="marquee" ref={marqueeRef}>
          {[0, 1, 2].map((i) => (
            <span className="marquee-item" key={i}>Authenticated<span className="marquee-sep"></span>Zero repainted or repaired bags<span className="marquee-sep"></span>Lifetime restoration<span className="marquee-sep"></span>Curated edit<span className="marquee-sep"></span>Guaranteed provenance<span className="marquee-sep"></span></span>
          ))}
        </div>
      </section>

      <section className="section" id="new">
        <div className="container">
          <div className="sec-head">
            <div>
              <Reveal as="p" className="eyebrow">05 — Just in</Reveal>
              <Reveal as="h2" className="sec-title reveal-d1">Newly <span className="shift serif-italic">sourced</span></Reveal>
            </div>
            <Reveal as={Link} className="link-u reveal-d2" to="/shop?sort=new" style={{ color: 'var(--ink-900)' }}>See everything new</Reveal>
          </div>
          <div className="prod-grid" id="newGrid">
            {justInShow.map((p) => <ProductCard key={p.brand + p.name} product={p} index={products.indexOf(p)} />)}
          </div>
        </div>
      </section>

      <section className="section dark-band warm" id="brands" data-header-dark="1">
        <div className="container">
          <div className="sec-head">
            <div>
              <Reveal as="p" className="eyebrow on-dark">06 — The labels we carry</Reveal>
              <Reveal as="h2" className="sec-title reveal-d1">In good <span className="shift serif-italic">company</span></Reveal>
            </div>
            <Reveal as={Link} className="link-u reveal-d2" to="/brands" style={{ color: 'var(--cream)' }}>All brands</Reveal>
          </div>
          <Reveal className="brand-wall reveal-d1">
            {['HERMÈS', 'CHANEL', 'ROLEX', 'CARTIER', 'LOUIS VUITTON', 'GUCCI', 'PRADA', 'BOTTEGA'].map((b) => (
              <div className="brand-cell" key={b}><span>{b}</span></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="container">
          <div className="sec-head">
            <div>
              <Reveal as="p" className="eyebrow">07 — In their words</Reveal>
              <Reveal as="h2" className="sec-title reveal-d1">What clients <span className="serif-italic">say</span></Reveal>
            </div>
          </div>
          <div className="review-grid">
            <Reveal className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-quote">"The Birkin arrived exactly as described, down to the sheen on the hardware. The Entrupy report gave me total peace of mind."</p>
              <div className="review-meta"><p className="review-name">Priya R.</p><p className="review-sub">Dubai · Verified buyer</p></div>
            </Reveal>
            <Reveal className="review-card reveal-d1">
              <div className="review-stars">★★★★★</div>
              <p className="review-quote">"I've bought three pieces now. Every one has been honest about condition — never touched up, never repainted. That's rare in this market."</p>
              <div className="review-meta"><p className="review-name">Alexandra M.</p><p className="review-sub">London · Verified buyer</p></div>
            </Reveal>
            <Reveal className="review-card reveal-d2">
              <div className="review-stars">★★★★★</div>
              <p className="review-quote">"Booked a private consultation before my first purchase — no pressure, just expertise. Found exactly the piece I was searching for."</p>
              <div className="review-meta"><p className="review-name">Sophia K.</p><p className="review-sub">Singapore · Verified buyer</p></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="atelier-video">
        <div className="container">
          <div className="sec-head">
            <div>
              <Reveal as="p" className="eyebrow">08 — Straight from the atelier</Reveal>
              <Reveal as="h2" className="sec-title reveal-d1">See it <span className="serif-italic">up close</span></Reveal>
            </div>
          </div>
          <div className="video-grid" ref={videosWrapRef}>
            <Reveal className="video-card">
              <video muted loop controls playsInline preload="metadata" src="/assets/videos/atelier-1.mp4"></video>
              <span className="video-cap">In-hand inspection</span>
            </Reveal>
            <Reveal className="video-card reveal-d1">
              <video muted loop controls playsInline preload="metadata" src="/assets/videos/atelier-2.mp4"></video>
              <span className="video-cap">Detail &amp; hardware</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section dark-band warm" data-header-dark="1">
        <div className="container">
          <div className="sec-head">
            <div>
              <Reveal as="p" className="eyebrow on-dark">09 — Work with us</Reveal>
              <Reveal as="h2" className="sec-title reveal-d1" style={{ color: 'var(--cream)' }}>Beyond the <span className="shift serif-italic">edit</span></Reveal>
            </div>
          </div>
          <Reveal className="service-grid reveal-d1">
            <Link className="service-card" to="/consign">
              <h3>Consign with us</h3>
              <p>Selling a piece? Tell us about it and our team will reach out with an offer and next steps.</p>
              <span className="service-go">Start consigning<ArrowRight className="arrow" size={15} /></span>
            </Link>
            <Link className="service-card" to="/sourcing">
              <h3>Sourcing request</h3>
              <p>Looking for a specific model, colour or size? Ask us to source it — we'll hunt it down for you.</p>
              <span className="service-go">Request a piece<ArrowRight className="arrow" size={15} /></span>
            </Link>
            <Link className="service-card" to="/consultation">
              <h3>Private consultation</h3>
              <p>Book a private call to talk through a purchase, a sale, or simply to ask us anything.</p>
              <span className="service-go">Book a call<ArrowRight className="arrow" size={15} /></span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
