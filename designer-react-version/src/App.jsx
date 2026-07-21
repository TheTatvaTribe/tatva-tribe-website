import { useEffect, useMemo } from 'react';
import parse from 'html-react-parser';
import pageHtml from './content.html?raw';
import { initTatvaInteractions } from './tatvaInteractions';
import PricingSection from './PricingSection';
import AboutPage from './AboutPage';

// Vite injects the deploy base ('/' locally, '/sub-path/' when published
// under one). Routing and in-page links must be relative to it.
const BASE = import.meta.env.BASE_URL;

function App() {
  const isAboutRoute = useMemo(() => {
    const base = BASE.replace(/\/+$/, '');
    let path = window.location.pathname;
    if (base && path.startsWith(base)) path = path.slice(base.length);
    return (path.replace(/\/+$/, '') || '/') === '/about';
  }, []);

  // Rewrite root-relative hrefs (e.g. "/about", "/#tatvas") so they resolve
  // under the deploy base. Hash-only, external and mailto links are untouched.
  const html = useMemo(() => pageHtml.replace(/href="\/(?!\/)/g, `href="${BASE}`), []);

  const page = useMemo(
    () => {
      if (isAboutRoute) return null;
      return parse(html, {
        replace(node) {
          if (node && node.type === 'tag' && node.name === 'section' && node.attribs?.id === 'services') {
            return <PricingSection />;
          }
          return undefined;
        },
      });
    },
    [isAboutRoute, html]
  );

  useEffect(() => {
    if (isAboutRoute) return undefined;
    const cleanup = initTatvaInteractions();
    return cleanup;
  }, [isAboutRoute]);

  if (isAboutRoute) {
    return <AboutPage />;
  }

  return <>{page}</>;
}

export default App;
