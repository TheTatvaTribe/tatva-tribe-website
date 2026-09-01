import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollTopButton from './components/ScrollTopButton';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Stories from './pages/Stories';
import NotFound from './pages/NotFound';
import { scrollToSection } from './hooks/useSectionNav';
import { jumpTo } from './utils/scroll';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Explicitly instant. The two-argument form inherits the CSS
    // scroll-behavior, so while the root was `smooth` every route change
    // animated the whole twelve-screen page back to the top.
    jumpTo(0);
  }, [pathname]);
  return null;
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<PricingRedirect />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollTopButton />
    </Router>
  );
}

export default App;
