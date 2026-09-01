import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollTopButton from './components/ScrollTopButton';
import Home from './pages/Home';
import { scrollToSection } from './hooks/useSectionNav';
import { jumpTo } from './utils/scroll';

// Route-level code splitting: each page is a separate chunk that only
// downloads when navigated to. The chrome stays in the main bundle.
// Home is eager — it is the common landing page and should not hit the
// Suspense fallback on first paint.
const About = lazy(() => import('./pages/About'));
const Stories = lazy(() => import('./pages/Stories'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    jumpTo(0);
  }, [pathname]);
  return null;
}

// Placeholder for the brief route-chunk fetch. Reserves the navbar's
// height so the page does not jump when the chunk lands.
function PageLoader() {
  return (
    <div className="route-loader" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}

/** Keeps the old /pricing URL working now that plans live on the home page. */
function PricingRedirect() {
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection('services'));
    });
  }, []);
  return <Home />;
}

// Vite injects BASE_URL with a trailing slash; react-router wants the
// basename without one. On the apex domain BASE_URL is "/", so this
// resolves to undefined and the router sits at the root.
const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
  return (
    <Router basename={ROUTER_BASENAME || undefined}>
      <ScrollToTop />
      <Navbar />
      <main className="site-main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/pricing" element={<PricingRedirect />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollTopButton />
    </Router>
  );
}

export default App;
