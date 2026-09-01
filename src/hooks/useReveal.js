import { useEffect } from 'react';

/**
 * Adds `.visible` to every `.reveal-up` inside `rootRef` once it scrolls
 * into view. The observer is disconnected on unmount — the original
 * script wired these up globally and returned a no-op cleanup, so every
 * client-side navigation leaked another set of listeners.
 */
export function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef?.current ?? document;
    const els = root.querySelectorAll('.reveal-up');
    if (!els.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

/**
 * Scroll/resize handler that also fires once on mount and cleans up.
 * Reads are batched into a rAF so several of these can share a frame.
 */
export function useFrameScroll(handler, deps = []) {
  useEffect(() => {
    let frame = 0;
    const run = () => {
      frame = 0;
      handler();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };

    handler();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
