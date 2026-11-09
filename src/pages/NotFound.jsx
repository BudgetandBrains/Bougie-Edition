import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function NotFound() {
  useEffect(() => { document.title = 'Page not found — Bougie Edition'; }, []);

  return (
    <section className="page-hero container" style={{ minHeight: '60vh' }}>
      <Reveal as="p" className="eyebrow">404</Reveal>
      <Reveal as="h1" className="page-title reveal-d1">This page has <span className="serif-italic">moved on</span>.</Reveal>
      <Reveal as="p" className="page-lede reveal-d2">The piece or page you're after isn't here. It may have sold, or the link may be out of date.</Reveal>
      <Reveal className="reveal-d3" style={{ marginTop: '32px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        <Link className="btn btn-gold" to="/shop"><span>Browse the edit</span><ArrowRight className="arrow" size={16} /></Link>
        <Link className="btn btn-ghost" to="/"><span>Back to home</span></Link>
      </Reveal>
    </section>
  );
}
