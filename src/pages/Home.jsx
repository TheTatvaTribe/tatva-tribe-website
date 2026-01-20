import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const Home = () => {
    const features = [
        {
            icon: '💪',
            title: 'Personal Training',
            description: 'Customized workout programs designed for your specific goals and fitness level.',
        },
        {
            icon: '🍎',
            title: 'Nutrition Plans',
            description: 'Science-backed diet plans that fuel your body and support your transformation.',
        },
        {
            icon: '🧠',
            title: 'Mind-Body Balance',
            description: 'Holistic approach combining physical training with mental wellness.',
        },
        {
            icon: '📊',
            title: 'Progress Tracking',
            description: 'Regular assessments and adjustments to ensure continuous improvement.',
        },
        {
            icon: '🎯',
            title: 'Goal Setting',
            description: 'Strategic planning to help you achieve sustainable results.',
        },
        {
            icon: '🤝',
            title: 'Community Support',
            description: 'Join the Tatva Tribe and connect with like-minded fitness enthusiasts.',
        },
    ];

    const testimonials = [
        {
            name: 'Priya S.',
            text: 'The holistic approach changed my life. Not just physically, but mentally too!',
            result: 'Lost 15kg in 4 months',
        },
        {
            name: 'Rahul M.',
            text: 'Smart work really is the key. Best decision I made for my health.',
            result: 'Built lean muscle mass',
        },
        {
            name: 'Anita K.',
            text: 'The personalized diet plan was a game changer. Finally found what works for me.',
            result: 'Transformed lifestyle',
        },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section min-h-[90vh] flex items-center relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-forest-600 via-dark to-dark" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-forest-500/20 rounded-full blur-3xl" />

                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-medium mb-6 animate-fade-in">
                            🌟 Holistic Health Coaching
                        </span>
                        <h1 className="heading-xl text-cream mb-6 animate-slide-up">
                            Transform Your Body,{' '}
                            <span className="text-gradient">Elevate Your Mind</span>
                        </h1>
                        <p className="text-xl text-cream/70 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            SMARTWORK {">"} hardwork is the key. Join The Tatva Tribe and discover
                            a holistic approach to fitness that balances body and mind.
                        </p>
                        <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <Link to="/contact" className="btn btn-primary">
                                Get Free Consultation
                            </Link>
                            <Link to="/about" className="btn btn-secondary">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section bg-forest-600/30">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="heading-lg text-cream mb-4">
                            The <span className="text-gradient">7 Tatvas</span> of Transformation
                        </h2>
                        <p className="text-cream/70">
                            Our comprehensive approach covers every aspect of your health journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="text-center">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="heading-sm text-cream mb-2">{feature.title}</h3>
                                <p className="text-cream/70 text-sm">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="heading-lg text-cream mb-6">
                                More Than Just <span className="text-gradient">Fitness</span>
                            </h2>
                            <p className="text-cream/70 mb-6">
                                At The Tatva Tribe, we believe in a holistic approach to health.
                                Our programs combine cutting-edge training techniques with mindfulness
                                practices to help you achieve sustainable results.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {['Personalized training programs', 'Custom diet plans', 'Mental wellness coaching', 'Ongoing support & community'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-cream/80">
                                        <span className="w-6 h-6 bg-gold-400/20 rounded-full flex items-center justify-center">
                                            <span className="text-gold-400 text-sm">✓</span>
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/about" className="btn btn-secondary">
                                Our Story
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-dark font-heading font-bold text-5xl">T</span>
                                    </div>
                                    <p className="text-cream font-heading font-bold text-xl">The Tatva Tribe</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-400/20 rounded-full blur-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section bg-forest-600/30">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="heading-lg text-cream mb-4">
                            Customer <span className="text-gradient">Love</span>
                        </h2>
                        <p className="text-cream/70">
                            Real transformations from real people in The Tatva Tribe.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index}>
                                <div className="flex items-center gap-1 text-gold-400 mb-4">
                                    {'★★★★★'.split('').map((star, i) => (
                                        <span key={i}>{star}</span>
                                    ))}
                                </div>
                                <p className="text-cream/80 mb-4">"{testimonial.text}"</p>
                                <div className="border-t border-forest-500/30 pt-4">
                                    <p className="font-semibold text-cream">{testimonial.name}</p>
                                    <p className="text-gold-400 text-sm">{testimonial.result}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container">
                    <div className="card bg-gradient-to-r from-forest-600 to-forest-700 text-center py-16 px-8">
                        <h2 className="heading-lg text-cream mb-4">
                            Ready to Start Your <span className="text-gradient">Transformation?</span>
                        </h2>
                        <p className="text-cream/70 max-w-xl mx-auto mb-8">
                            DM "TATVA" for a FREE consultation and take the first step towards
                            a healthier, stronger you!
                        </p>
                        <Link to="/contact" className="btn btn-primary btn-lg">
                            Get Your Free Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
