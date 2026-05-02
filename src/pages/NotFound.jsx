import { Link } from 'react-router-dom';

const NotFound = () => {
    // 404 — minimal "fog" motif: low opacity, no cheerful gold blob.
    return (
        <div className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-dark via-forest-800 to-dark" />
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-forest-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-gold-400/5 rounded-full blur-3xl" />

            <div className="container relative z-10">
                <div className="max-w-xl mx-auto text-center">
                    <p className="text-8xl font-heading font-bold text-gold-400 mb-4">404</p>
                    <h1 className="heading-lg text-cream mb-4">Page Not Found</h1>
                    <p className="text-cream/70 mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/" className="btn btn-primary">
                            Back to Home
                        </Link>
                        <Link to="/contact" className="btn btn-secondary">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
