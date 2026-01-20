import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
    ];

    const services = [
        'Personal Training',
        'Diet Plans',
        'Holistic Coaching',
        'Online Consultation',
    ];

    return (
        <footer className="bg-forest-600 border-t border-forest-500/30">
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center">
                                <span className="text-dark font-heading font-bold text-lg">T</span>
                            </div>
                            <span className="font-heading font-bold text-xl text-cream">
                                The Tatva Tribe
                            </span>
                        </Link>
                        <p className="text-cream/70 text-sm">
                            Holistic Health Coaching & Personal Training.
                            SMARTWORK {">"} hardwork is 🔑
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/thetatvatribe._/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-forest-700/50 flex items-center justify-center text-cream hover:bg-gold-400 hover:text-dark transition-all"
                                aria-label="Instagram"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-semibold text-lg text-cream mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-cream/70 hover:text-gold-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-heading font-semibold text-lg text-cream mb-4">
                            Services
                        </h3>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service} className="text-cream/70">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading font-semibold text-lg text-cream mb-4">
                            Get In Touch
                        </h3>
                        <div className="space-y-3 text-cream/70 text-sm">
                            <p>DM "TATVA" for FREE consultation!</p>
                            <a
                                href="https://www.instagram.com/thetatvatribe._/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-gold-400 hover:underline"
                            >
                                @thetatvatribe._
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-forest-500/30 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-cream/50 text-sm">
                        © {currentYear} The Tatva Tribe. All rights reserved.
                    </p>
                    <p className="text-cream/50 text-sm">
                        🧠 @advayshidhaye
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
