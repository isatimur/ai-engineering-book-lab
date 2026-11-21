import { useEffect, useRef } from 'react';

/**
 * Plays a layer's entrance once it scrolls into view.
 *
 * The server HTML is the finished state, so crawlers, no-JS readers and
 * reduced-motion readers see every layer in full. After hydration the hook
 * sets data-reveal="armed" (CSS hides the parts) and switches it to "in" when
 * the layer enters the viewport (CSS plays the entrance). It touches the DOM
 * attribute directly, not React state, so the first client render matches
 * the server render.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.dataset.reveal = 'armed';
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = 'in';
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
