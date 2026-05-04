import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Route-level code splitting: each page becomes a separate JS chunk that
// only downloads when the user navigates to it. Navbar + Footer + the
// shared shell stay in the main bundle so the chrome is always available.
//
// Home is loaded eagerly (no lazy) because it's the most common landing
// page and we don't want the initial render to hit the Suspense fallback.
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Tiny placeholder shown during the brief route-chunk fetch. Matches the
// site's dark theme so there's no flash. The empty pt-20 reserves the
// vertical space the navbar usually occupies.
function PageLoader() {
  return (
    <div className="pt-20 min-h-screen bg-dark" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
    </div>
  );
}

// Vite injects BASE_URL with a trailing slash (e.g. "/tatva-tribe-website/").
// react-router expects a basename without a trailing slash.
const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
  return (
    <Router basename={ROUTER_BASENAME || undefined}>
      <ScrollToTop />
      <div className="min-h-screen bg-dark flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
