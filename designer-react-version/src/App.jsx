import { useEffect, useMemo } from 'react';
import parse from 'html-react-parser';
import pageHtml from './content.html?raw';
import { initTatvaInteractions } from './tatvaInteractions';
import PricingSection from './PricingSection';
import AboutPage from './AboutPage';

function App() {
  const isAboutRoute = useMemo(() => {
    const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
    return normalizedPath === '/about';
  }, []);

  const page = useMemo(
    () => {
      if (isAboutRoute) return null;
      return parse(pageHtml, {
        replace(node) {
          if (node && node.type === 'tag' && node.name === 'section' && node.attribs?.id === 'services') {
            return <PricingSection />;
          }
          return undefined;
        },
      });
    },
    [isAboutRoute]
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
