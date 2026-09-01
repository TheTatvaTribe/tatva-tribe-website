import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSectionNav } from '../hooks/useSectionNav';

const SECTIONS = ['tatvas', 'services'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { pathname } = useLocation();
  const goToSection = useSectionNav();

  const isHome = pathname === '/';

  useEffect(() => {
    // Batched into an animation frame: this used to run three
    // getBoundingClientRect calls on every scroll event, which on a page
    // that is one long scroll interaction is a lot of forced layout.
    let frame = 0;
    const measure = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 60);

      if (!isHome) {
        setActiveSection('');
        return;
      }
      // Highlight whichever section's top has passed just under the navbar.
      let current = '';
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      });
      setActiveSection(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [isHome]);

  // Close the drawer on any route change (including back/forward), adjusted
  // during render rather than in an effect to avoid a cascading re-render.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setIsOpen(false);
  }

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  const sectionLink = (id, label) => (
    <li key={id}>
      <button
        type="button"
        className={`nav-link${isHome && activeSection === id ? ' is-active' : ''}`}
        onClick={() => { setIsOpen(false); goToSection(id); }}
      >
        {label}
      </button>
    </li>
  );

  return (
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" aria-label="The Tatva Tribe home">
          <span className="logo-devanagari">तत्व</span>
          <span className="logo-text">TRIBE</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-links${isOpen ? ' open' : ''}`}>
          {sectionLink('tatvas', 'The 7 Tatvas')}
          {sectionLink('services', 'Plans')}
          <li>
            <Link
              to="/about"
              className={`nav-link${pathname === '/about' ? ' is-active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/stories"
              className={`nav-link${pathname === '/stories' ? ' is-active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Stories
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-link nav-cta${pathname === '/contact' ? ' is-active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Free Consult
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
