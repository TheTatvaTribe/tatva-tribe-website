import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container">
                <div className="flex items-center justify-between">
                    {/* Logo
                        To use a custom logo image:
                        1. Drop your logo file into public/images/logo.png (PNG with transparent bg works best)
                        2. The <img> below will load it automatically; on error it falls back to the gold "T"
                    */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gold-400 flex items-center justify-center">
                            <span className="absolute inset-0 flex items-center justify-center text-dark font-heading font-bold text-lg" aria-hidden="true">T</span>
                            <img
                                src={`${import.meta.env.BASE_URL}images/logo.png`}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
                                onLoad={(e) => { e.currentTarget.style.opacity = '1'; }}
                                onError={(e) => { e.currentTarget.remove(); }}
                            />
                        </div>
                        {/* Wordmark — drop public/images/wordmark.png (transparent PNG preferred). */}
                        {/* `invert` + `mix-blend-screen` keep a white-BG image readable on the dark theme. */}
                        <img
                            src={`${import.meta.env.BASE_URL}images/wordmark.png`}
                            alt="The Tatva Tribe"
                            className="h-7 w-auto invert mix-blend-screen group-hover:opacity-80 transition-opacity"
                            onError={(e) => {
                                // Fallback to the text wordmark if the image isn't available yet.
                                const fallback = document.createElement('span');
                                fallback.className = 'font-heading font-bold text-xl text-cream group-hover:text-gold-400 transition-colors';
                                fallback.textContent = 'The Tatva Tribe';
                                e.currentTarget.replaceWith(fallback);
                            }}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-medium transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${location.pathname === link.path
                                    ? 'text-gold-400'
                                    : 'text-cream hover:text-gold-400'
                                    }`}
                            >
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
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-80 mt-4' : 'max-h-0'
                        }`}
                >
                    <div className="glass rounded-xl p-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block py-2 px-4 rounded-lg font-medium transition-colors ${location.pathname === link.path
                                    ? 'bg-gold-400/20 text-gold-400'
                                    : 'text-cream hover:bg-forest-600/50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="btn btn-primary w-full mt-4"
                        >
                            Free Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
