import { Link } from 'react-router-dom';
import { Dumbbell, Apple, Brain, Moon, Users, Leaf, Target } from 'lucide-react';
import Card from '../components/ui/Card';

const BASE = import.meta.env.BASE_URL;

const Home = () => {
    const tatvas = [
        {
            hindi: 'शरीर',
            english: 'Body Discipline',
            description: 'Anything which promotes Movement.',
            examples: 'Strength training, Endurance, Yoga, Aerobics',
            Icon: Dumbbell,
            image: `${BASE}images/tatvas/sharira.png`,
        },
        {
            hindi: 'आहार',
            english: 'Nutrition',
            description: 'Mindful eating, balancing macros, staying hydrated.',
            examples: 'Real food = Real energy',
            Icon: Apple,
            image: `${BASE}images/tatvas/aahaar.png`,
        },
        {
            hindi: 'मानस',
            english: 'Mental Toughness',
            description: 'Meditation, Breathwork, Journaling.',
            examples: 'Mental resilience > Digital Chaos',
            Icon: Brain,
            image: `${BASE}images/tatvas/manas.png`,
        },
        {
            hindi: 'निद्रा',
            english: 'Rest & Recovery',
            description: 'Restorative sleep, active recovery, mobility.',
            examples: 'Good rest = Better mood, strength and health span',
            Icon: Moon,
            image: `${BASE}images/tatvas/nidra.png`,
        },
        {
            hindi: 'समाज',
            english: 'Community & Connections',
            description: 'Building good relations, socialising.',
            examples: 'Growing together',
            Icon: Users,
            image: `${BASE}images/tatvas/samaaj.png`,
        },
        {
            hindi: 'प्रकृति',
            english: 'Nature',
            description: 'Aligning with nature, seasonal rhythms in diet & activity.',
            examples: 'Sunlight, fresh air = Natural healers',
            Icon: Leaf,
            image: `${BASE}images/tatvas/prakriti.png`,
        },
        {
            hindi: 'उद्देश्य',
            english: 'Purpose',
            description: 'Keeping the Right intention, setting a goal.',
            examples: 'No purpose = No Growth',
            Icon: Target,
            image: `${BASE}images/tatvas/uddeshya.png`,
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
                    <div className="max-w-3xl mx-auto text-center">
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
                        <div className="flex flex-wrap gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
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

            {/* The 7 Tatvas Section */}
            <section className="section bg-forest-600/30">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-gold-400 text-sm font-medium uppercase tracking-wider">
                            About the Community
                        </span>
                        <h2 className="heading-lg text-cream mt-2 mb-4">
                            The <span className="text-gradient">7 Tatvas</span> of Transformation
                        </h2>
                        <p className="text-cream/70 text-lg">
                            <strong className="text-cream">'Tatva'</strong> simply means the ultimate truth, the core essence of life.
                        </p>
                        <p className="text-cream/70 mt-4">
                            The Tatva Tribe is based on <span className="text-gold-400 font-semibold">7 TATVAS</span>
                        </p>
                    </div>

                    {/* Tatva Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {tatvas.slice(0, 6).map((tatva, index) => (
                            <Card key={index} className="text-center group overflow-hidden !p-0">
                                <div className="w-full h-44 bg-gradient-to-br from-forest-500/40 to-forest-700/40 flex items-center justify-center relative">
                                    {/* Icon fallback: hidden once the image loads; revealed only if the image errors out. */}
                                    <div data-tatva-fallback className="absolute inset-0 m-auto w-14 h-14 bg-gold-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                                        <tatva.Icon className="w-7 h-7 text-gold-400" />
                                    </div>
                                    <img
                                        src={tatva.image}
                                        alt={tatva.english}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 group-hover:scale-105 transition-[opacity,transform] duration-500"
                                        onLoad={(e) => {
                                            e.currentTarget.style.opacity = '1';
                                            const fb = e.currentTarget.parentElement?.querySelector('[data-tatva-fallback]');
                                            if (fb) fb.style.display = 'none';
                                        }}
                                        onError={(e) => { e.currentTarget.remove(); }}
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="mb-2">
                                        <span className="text-3xl font-semibold text-gold-400 font-heading tracking-wide">
                                            {tatva.hindi}
                                        </span>
                                    </div>
                                    <h3 className="heading-sm text-cream mb-3">{tatva.english}</h3>
                                    <p className="text-cream/70 text-sm mb-2">{tatva.description}</p>
                                    <p className="text-gold-400/80 text-xs italic">
                                        ({tatva.examples})
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* 7th Tatva - Featured */}
                    <div className="max-w-md mx-auto">
                        {(() => { const FeaturedIcon = tatvas[6].Icon; return (
                        <Card className="text-center group bg-gradient-to-br from-forest-600/80 to-forest-700/80 border-gold-400/30 overflow-hidden !p-0">
                            <div className="w-full h-52 bg-gradient-to-br from-forest-500/40 to-forest-700/40 flex items-center justify-center relative">
                                <div data-tatva-fallback className="absolute inset-0 m-auto w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                                    <FeaturedIcon className="w-8 h-8 text-gold-400" />
                                </div>
                                <img
                                    src={tatvas[6].image}
                                    alt={tatvas[6].english}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 group-hover:scale-105 transition-[opacity,transform] duration-500"
                                    onLoad={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                        const fb = e.currentTarget.parentElement?.querySelector('[data-tatva-fallback]');
                                        if (fb) fb.style.display = 'none';
                                    }}
                                    onError={(e) => { e.currentTarget.remove(); }}
                                />
                            </div>
                            <div className="p-6">
                                <div className="mb-2">
                                    <span className="text-4xl font-semibold text-gold-400 font-heading tracking-wide">
                                        {tatvas[6].hindi}
                                    </span>
                                </div>
                                <h3 className="heading-sm text-cream mb-3">{tatvas[6].english}</h3>
                                <p className="text-cream/70 mb-2">{tatvas[6].description}</p>
                                <p className="text-gold-400/80 text-sm italic">
                                    ({tatvas[6].examples})
                                </p>
                            </div>
                        </Card>
                        ); })()}
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
