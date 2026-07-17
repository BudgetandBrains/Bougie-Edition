import { useEffect, useRef, useState } from 'react';

/**
 * Wraps children so they animate in (fade + rise) the first time they
 * scroll into view. Respects prefers-reduced-motion.
 */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [pre, setPre] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setPre(false); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setPre(false); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ('reveal ' + className + (pre ? ' pre' : '')).replace(/\s+/g, ' ').trim();
  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  );
}
