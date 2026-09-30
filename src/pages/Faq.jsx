import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const FAQS = [
  {
    q: 'How do I buy a piece?',
    a: <>Every piece is one-of-a-kind, so purchases begin with an enquiry. On any product page, tap <b>“Submit an inquiry to buy”</b> and our team confirms availability, final pricing and next steps — usually within a day.</>
  },
  {
    q: 'Are your pieces authentic?',
    a: <>Yes — without exception. Every item is inspected in hand and independently authenticated (hardware, stitching, serials and provenance), and ships with a 100% financially-backed Certificate of Authenticity from leading third-party authenticators such as Entrupy and LegitApp. <Link className="link-u" to="/authentication" style={{ color: 'var(--ink-900)' }}>Read more about our process ↗</Link></>
  },
  {
    q: 'What condition are the pieces in?',
    a: <>Everything is pre-loved and graded honestly — Fair, Good, Very good or Excellent — with the grade shown on each product page. Hover or tap a grade there to see exactly what it means. We never repaint or repair a piece to disguise wear.</>
  },
  {
    q: 'Can I see more photos before buying?',
    a: <>Every product page has a swipeable gallery of the actual item — not stock imagery. If you'd like additional angles or a video, mention it in your enquiry and we'll send them over.</>
  },
  {
    q: 'Do you offer repair or servicing before delivery?',
    a: <>Yes. If you'd like a piece freshly serviced, we can arrange repair through the brand's own store or spa before it ships. The store's charge is added to your invoice and we share the authentic repair receipt on delivery — just mention it when you reserve.</>
  },
  {
    q: 'How does shipping work?',
    a: <>Fully insured, tracked delivery worldwide. Timelines and duties are confirmed with your order. Please review our <Link className="link-u" to="/disclaimer" style={{ color: 'var(--ink-900)' }}>pre-loved goods disclaimer</Link> before ordering.</>
  },
  {
    q: 'Can you source something I can’t find here?',
    a: <>Absolutely. Use <Link className="link-u" to="/sourcing" style={{ color: 'var(--ink-900)' }}>Source for me</Link> to tell us the brand, model and details — our network fills most requests, authenticated and delivered.</>
  },
  {
    q: 'How do I consign or sell a piece?',
    a: <>We'd love to see it. Head to <Link className="link-u" to="/consign" style={{ color: 'var(--ink-900)' }}>Consign with us</Link>, share a few details and photos, and our team responds with an offer or consignment estimate.</>
  }
];

export default function Faq() {
  useEffect(() => { document.title = 'FAQ — Bougie Edition'; }, []);

  return (
    <>
      <section className="page-hero container">
        <Reveal as="p" className="eyebrow">Good to know</Reveal>
        <Reveal as="h1" className="page-title reveal-d1">Frequently asked <span className="serif-italic">questions</span>.</Reveal>
        <Reveal as="p" className="page-lede reveal-d2">Buying, authentication, condition, shipping, sourcing and consignment — the essentials, answered. Still curious? <Link className="link-u" to="/consultation" style={{ color: 'var(--ink-900)' }}>Book a consultation</Link>.</Reveal>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ maxWidth: '760px' }}>
            {FAQS.map((f) => (
              <Reveal key={f.q} as="details" className="acc">
                <summary>{f.q}<span className="acc-ic"></span></summary>
                <div className="acc-body"><p>{f.a}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
