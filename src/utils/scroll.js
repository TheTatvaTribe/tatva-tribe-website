/**
 * Scroll helpers.
 *
 * The root stylesheet deliberately leaves `scroll-behavior` at its default,
 * so smooth scrolling only happens where it is asked for here. That keeps
 * plain wheel, trackpad and keyboard scrolling native and immediate.
 */

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Animated scroll for deliberate navigation (section links, back to top). */
export function smoothScrollTo(top) {
  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

/** Immediate jump — used on route changes, which should never animate. */
export function jumpTo(top = 0) {
  window.scrollTo({ top, left: 0, behavior: 'instant' });
}
