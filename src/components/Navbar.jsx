import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandMark from './ui/BrandMark';
import { navLinks } from '../content/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Scroll listener — throttle via rAF and pass passive: true so the
    // browser doesn't have to wait for our handler before scrolling.
    useEffect(() => {
        let raf = null;
        const handleScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 20);
                raf = null;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    // Close the mobile menu on route change. setIsOpen-in-effect is flagged
    // by the new react-hooks rule, but this is the canonical pattern for
    // syncing internal UI state with external navigation state.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(false);
    }, [location.pathname]);

    const navLinkClass = (path) =>
        `font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${
            location.pathname === path ? 'text-gold-400' : 'text-cream hover:text-gold-400'
        }`;

    const mobileLinkClass = (path) =>
        `block py-2 px-4 rounded-lg font-medium transition-colors ${
            location.pathname === path ? 'bg-gold-400/20 text-gold-400' : 'text-cream hover:bg-forest-600/50'
        }`;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'glass py-3' : 'bg-transparent py-5'
            }`}
        >
            <div className="container">
                <div className="flex items-center justify-between">
                    <BrandMark wordmarkClassName="group-hover:opacity-80" />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.path} className={navLinkClass(link.path)}>
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/contact" className="btn btn-primary">
                            Free Consultation
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-cream hover:text-gold-400 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-80 mt-4' : 'max-h-0'
                    }`}
                >
                    <div className="glass rounded-xl p-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.path} className={mobileLinkClass(link.path)}>
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/contact" className="btn btn-primary w-full mt-4">
                            Free Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
