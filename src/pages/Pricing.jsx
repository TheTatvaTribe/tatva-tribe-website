import { Link } from 'react-router-dom';

const Pricing = () => {
    return (
        <div className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-forest-600 via-dark to-dark" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-forest-500/20 rounded-full blur-3xl" />

            <div className="container relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Icon */}
                    <div className="w-24 h-24 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                        <span className="text-5xl">🚀</span>
                    </div>

                    {/* Badge */}
                    <span className="inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-medium mb-6">
                        Coming Soon
                    </span>

                    {/* Heading */}
                    <h1 className="heading-xl text-cream mb-6">
                        Something <span className="text-gradient">Amazing</span> is Brewing
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-cream/70 mb-8">
                        We're crafting the perfect pricing plans to help you on your fitness journey.
                        Stay tuned — it'll be worth the wait!
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/contact" className="btn btn-primary">
                            Get Notified When We Launch
                        </Link>
                        <Link to="/" className="btn btn-secondary">
                            Back to Home
                        </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16 p-6 bg-forest-600/30 rounded-2xl border border-forest-500/30">
                        <p className="text-cream/80 mb-4">
                            <span className="text-gold-400 font-semibold">In the meantime...</span>
                        </p>
                        <p className="text-cream/60">
                            DM us <strong className="text-cream">"TATVA"</strong> on Instagram for a
                            <span className="text-gold-400"> FREE consultation</span> and personalized quote!
                        </p>
                        <a
                            href="https://www.instagram.com/thetatvatribe._/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 text-gold-400 hover:text-gold-300 transition-colors"
                        >
                            <span>@thetatvatribe._</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
