import { useEffect, useRef } from 'react';

/**
 * Returns a ref to attach to any element.
 * When that element enters the viewport, it gets the 'is-visible' class,
 * triggering CSS fade-in/slide-up animations.
 * @param {object} options - IntersectionObserver options
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el); // Only animate once
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
        ...options,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
