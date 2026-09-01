import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { smoothScrollTo } from '../utils/scroll';

const NAV_OFFSET = 8;

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  const navH = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
    10
  ) || 68;
  smoothScrollTo(el.getBoundingClientRect().top + window.scrollY - navH - NAV_OFFSET);
  return true;
}

/**
 * The app runs on a HashRouter (GitHub Pages), so the URL hash is already
 * spoken for by the router and plain `#section` hrefs cannot work. This
 * navigates home first when needed, then scrolls to the section.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id) => {
      if (pathname === '/') {
        scrollToSection(id);
        return;
      }
      navigate('/');
      // Wait for the home route to paint before measuring the target.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSection(id));
      });
    },
    [navigate, pathname]
  );
}
