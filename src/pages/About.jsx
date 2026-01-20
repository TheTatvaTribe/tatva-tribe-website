import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const About = () => {
    const tatvas = [
        {
            hindi: 'शरीर',
            english: 'Body Discipline',
            description: 'Anything which promotes Movement.',
            examples: 'Strength training, Endurance, Yoga, Aerobics',
            icon: '💪',
        },
        {
            hindi: 'आहार',
            english: 'Nutrition',
            description: 'Mindful eating, balancing macros, staying hydrated.',
            examples: 'Real food = Real energy',
            icon: '🍎',
        },
        {
            hindi: 'मानस',
            english: 'Mental Toughness',
            description: 'Meditation, Breathwork, Journaling.',
            examples: 'Mental resilience > Digital Chaos',
            icon: '🧠',
        },
        {
            hindi: 'निद्रा',
            english: 'Rest & Recovery',
            description: 'Restorative sleep, active recovery, mobility.',
            examples: 'Good rest = Better mood, strength and health span',
            icon: '😴',
        },
        {
            hindi: 'समाज',
            english: 'Community & Connections',
            description: 'Building good relations, socialising.',
            examples: 'Growing together',
            icon: '🤝',
        },
        {
            hindi: 'प्रकृति',
            english: 'Nature',
            description: 'Aligning with nature, seasonal rhythms in diet & activity.',
            examples: 'Sunlight, fresh air = Natural healers',
            icon: '🌿',
        },
        {
            hindi: 'उद्देश्य',
            english: 'Purpose',
            description: 'Keeping the Right intention, setting a goal.',
            examples: 'No purpose = No Growth',
            icon: '🎯',
        },
    ];

    const audienceTypes = [
        {
            icon: '🔥',
            title: 'The Motivated Beginner',
            description: 'Highly motivated, but don\'t know where to start.',
        },
        {
            icon: '📉',
            title: 'The Inconsistent Learner',
            description: 'Know a little, but struggle to stay consistent.',
        },
        {
            icon: '🔄',
            title: 'The Plateau Warrior',
            description: 'Stuck in the same routine for years.',
        },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-600 via-dark to-dark" />
                <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-forest-500/20 rounded-full blur-3xl" />

                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-medium mb-6 animate-fade-in">
                            Our Philosophy
                        </span>
                        <h1 className="heading-xl text-cream mb-6 animate-slide-up">
                            Beyond Just Workouts —{' '}
                            <span className="text-gradient">Towards Wholeness</span>
                        </h1>
                        <p className="text-xl text-cream/70 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            At The Tatva Tribe, Fitness isn't one-dimensional. It's a blend of all the TATVAS together to create real, lasting change.
                        </p>
                    </div>
                </div>
            </section>

            {/* Master Trainer Section */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="text-gold-400 text-sm font-medium uppercase tracking-wider">
                                About the Master Trainer
                            </span>
                            <h2 className="heading-lg text-cream mt-2 mb-6">
                                From a Curious Teen to a{' '}
                                <span className="text-gradient">Conscious Coach</span>
                            </h2>
                            <div className="space-y-4 text-cream/70">
                                <p>
                                    I began my fitness journey at the age of 14 — as a young kid who hardly knew about form and technique, but was absolutely fascinated by machines, weights, and flexing in the mirror.
                                </p>
                                <p>
                                    Later when I took up Cricket professionally, I realised that fitness is not just physical, it has a lot more layers to it!
                                </p>
                                <p>
                                    Over the last 12–13 years, I've seen fitness through two lenses —
                                </p>
                                <ul className="space-y-2 pl-4">
                                    <li className="flex items-start gap-3">
                                        <span className="text-gold-400 mt-1">👉</span>
                                        <span>as an everyday individual, who just wanted to feel strong and confident, and</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gold-400 mt-1">👉</span>
                                        <span>as an athlete, who understood the science, the discipline, and the holistic approach needed!</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Quote Box */}
                            <div className="mt-8 p-6 bg-forest-600/30 border-l-4 border-gold-400 rounded-r-lg">
                                <p className="text-cream italic text-lg">
                                    "Real progress doesn't come from doing more; it comes from doing what truly matters, with the right guidance and intent."
                                </p>
                            </div>

                            <p className="mt-6 text-cream/70">
                                Today, as a fitness professional, my aim is to build a tribe (a community) of people who have discovered what fitness truly is — <strong className="text-cream">a sustainable lifestyle, not just a temporary goal.</strong>
                            </p>

                            <a
                                href="https://www.instagram.com/advayshidhaye/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary mt-8"
                            >
                                Connect on Instagram
                            </a>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-forest-500 to-forest-700 flex items-center justify-center overflow-hidden">
                                <div className="text-center p-8">
                                    <div className="w-32 h-32 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold-400/30">
                                        <span className="text-5xl">🏋️</span>
                                    </div>
                                    <p className="text-cream font-heading font-bold text-xl">@advayshidhaye</p>
                                    <p className="text-cream/60 text-sm mt-2">Master Trainer</p>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-400/20 rounded-full blur-xl" />
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-forest-400/30 rounded-full blur-xl" />
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
                            Why the name{' '}
                            <span className="text-gradient">'TheTatvaTribe'</span>?
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
                            <Card key={index} className="text-center group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {tatva.icon}
                                </div>
                                <div className="mb-3">
                                    <span className="text-3xl font-bold text-gold-400 font-heading">
                                        {tatva.hindi}
                                    </span>
                                </div>
                                <h3 className="heading-sm text-cream mb-3">{tatva.english}</h3>
                                <p className="text-cream/70 text-sm mb-2">{tatva.description}</p>
                                <p className="text-gold-400/80 text-xs italic">
                                    ({tatva.examples})
                                </p>
                            </Card>
                        ))}
                    </div>

                    {/* 7th Tatva - Featured */}
                    <div className="max-w-md mx-auto">
                        <Card className="text-center group bg-gradient-to-br from-forest-600/80 to-forest-700/80 border-gold-400/30">
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {tatvas[6].icon}
                            </div>
                            <div className="mb-3">
                                <span className="text-4xl font-bold text-gold-400 font-heading">
                                    {tatvas[6].hindi}
                                </span>
                            </div>
                            <h3 className="heading-sm text-cream mb-3">{tatvas[6].english}</h3>
                            <p className="text-cream/70 mb-2">{tatvas[6].description}</p>
                            <p className="text-gold-400/80 text-sm italic">
                                ({tatvas[6].examples})
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Why Join TTT Section */}
            <section className="section">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="heading-lg text-cream mb-4">
                            Why join <span className="text-gradient">TTT</span>?
                        </h2>
                        <p className="text-cream/70 text-lg">
                            Through years of coaching, we've noticed three common types of people in fitness:
                        </p>
                    </div>

                    {/* Audience Types */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {audienceTypes.map((type, index) => (
                            <Card key={index} className="text-center">
                                <div className="text-4xl mb-4">{type.icon}</div>
                                <h3 className="heading-sm text-cream mb-3">{type.title}</h3>
                                <p className="text-cream/70 text-sm">{type.description}</p>
                            </Card>
                        ))}
                    </div>

                    {/* The Solution */}
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="p-8 bg-forest-600/30 rounded-2xl border border-forest-500/30">
                            <p className="text-cream/80 text-lg mb-6">
                                Different journeys, same challenge — <strong className="text-cream">no real progress.</strong>
                            </p>
                            <p className="text-cream/80 text-lg mb-6">
                                And the missing link? <span className="text-gold-400 font-semibold">Professional guidance!</span>
                            </p>
                            <p className="text-cream/70 mb-8">
                                At The Tatva Tribe, our goal is to bridge that gap — by providing a holistic, science-backed approach that helps you train smarter and live stronger. We don't just build fitter bodies — we build healthier lifestyles and stronger mindsets.
                            </p>

                            {/* Philosophy Highlight */}
                            <div className="inline-block px-8 py-4 bg-gradient-to-r from-gold-400/20 to-gold-500/20 rounded-xl border border-gold-400/30">
                                <p className="text-cream text-sm mb-2">Because we believe in one simple philosophy:</p>
                                <p className="text-2xl md:text-3xl font-heading font-bold">
                                    <span className="text-gold-400">SMARTWORK</span>
                                    <span className="text-cream/60 mx-3">{'>'}</span>
                                    <span className="text-cream/80">HARDWORK</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-br from-forest-600/50 to-forest-700/50">
                <div className="container text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="heading-lg text-cream mb-4">
                            Ready to Discover{' '}
                            <span className="text-gradient">Your Tatva</span>?
                        </h2>
                        <p className="text-cream/70 mb-8 text-lg">
                            Start your transformation journey today with a free consultation.
                        </p>
                        <Link to="/contact" className="btn btn-primary text-lg px-10 py-4">
                            Join the Tribe
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
