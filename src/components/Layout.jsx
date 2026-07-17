import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import NavRail from './NavRail';
import Footer from './Footer';

function pageKeyFor(pathname) {
  if (pathname.startsWith('/shop') || pathname.startsWith('/category') || pathname.startsWith('/product')) return 'shop';
  if (pathname.startsWith('/drops')) return 'drops';
  if (pathname.startsWith('/consign')) return 'consign';
  if (pathname.startsWith('/sourcing')) return 'source';
  return '';
}

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [railOpen, setRailOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.pageYOffset;
      setScrolled(y > 20);
      const hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 92;
      const probe = y + hh / 2;
      const secs = document.querySelectorAll('[data-header-dark]');
      let dark = false;
      secs.forEach((sec) => {
        const top = sec.offsetTop, bot = top + sec.offsetHeight;
        if (probe >= top && probe < bot) dark = true;
      });
      setOnDark(dark);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setRailOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { setRailOpen(false); window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      <Header scrolled={scrolled} onDark={onDark} onMenuClick={() => setRailOpen((o) => !o)} />
      <NavRail open={railOpen} page={pageKeyFor(location.pathname)} onClose={() => setRailOpen(false)} />
      <Outlet />
      <Footer />
    </>
  );
}
