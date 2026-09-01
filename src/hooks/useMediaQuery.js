import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a media query. Used to keep mobile-only behaviour out of the
 * desktop experience — the matching CSS is gated the same way in mobile.css.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // Server snapshot: assume desktop, so mobile-only behaviour is opt-in.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Phone-width layout. Mirrors the 640px breakpoint used across the styles. */
export const useIsMobile = () => useMediaQuery('(max-width: 640px)');

/** Touch-primary device: hover states never fire, so taps need :active feedback. */
export const useIsTouch = () => useMediaQuery('(hover: none) and (pointer: coarse)');
