import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Apple, Brain, Moon, Users, Leaf, Target, Flame, TrendingDown, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';

const certifications = [
    { src: '/tatva-tribe-website/images/certifications/certified_personal_trainer.jpeg', alt: 'Certified Personal Trainer' },
    { src: '/tatva-tribe-website/images/certifications/kettlebell_training_specialist.PNG', alt: 'Kettlebell Training Specialist' },
    { src: '/tatva-tribe-website/images/certifications/olympic_weightlifting_training_specialist.PNG', alt: 'Olympic Weightlifting Training Specialist' },
    { src: '/tatva-tribe-website/images/certifications/postureandfunctional_corrective_exercise_specialist.PNG', alt: 'Posture & Functional Corrective Exercise Specialist' },
    { src: '/tatva-tribe-website/images/certifications/resistance_band_training_specialist.PNG', alt: 'Resistance Band Training Specialist' },
    { src: '/tatva-tribe-website/images/certifications/weight_loss_training_specialist.PNG', alt: 'Weight Loss Training Specialist' },
];

const CertificationsCarousel = () => {
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimer = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % certifications.length);
        }, 3000);
    }, []);

    useEffect(() => {
        resetTimer();
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, [current, resetTimer]);

    const go = (dir) => {
        setCurrent((prev) => (prev + dir + certifications.length) % certifications.length);
    };

    return (
        <div className="mt-12 max-w-2xl mx-auto">
            <p className="text-cream/60 text-xs uppercase tracking-wider text-center mb-3">Certifications</p>
            <div className="relative group border-2 border-gold-400/30 rounded-2xl p-4 bg-forest-600/20">
                <div className="overflow-hidden rounded-xl">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                    >
                        {certifications.map((cert, i) => (
                            <div key={i} className="w-full flex-shrink-0">
                                <img
                                    src={cert.src}
                                    alt={cert.alt}
                                    className="w-full h-auto object-contain bg-white"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => go(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dark/70 hover:bg-dark/90 rounded-full flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous certificate"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={() => go(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dark/70 hover:bg-dark/90 rounded-full flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next certificate"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            <div className="flex justify-center gap-1.5 mt-3">
                {certifications.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-gold-400 w-4' : 'bg-cream/30 hover:bg-cream/50'}`}
                        aria-label={`Go to certificate ${i + 1}`}
                    />
                ))}
            </div>
            <p className="text-cream/50 text-xs text-center mt-2">{certifications[current].alt}</p>
        </div>
    );
};

const About = () => {
    const tatvas = [
        {
            hindi: 'शरीर',
            english: 'Body Discipline',
            description: 'Anything which promotes Movement.',
            examples: 'Strength training, Endurance, Yoga, Aerobics',
            Icon: Dumbbell,
            /*
             * TATVA IMAGE — Sharira (Body Discipline)
             * Drop your image into public/images/tatvas/sharira.jpg
             * Then uncomment the line below:
             */
            // image: '/tatva-tribe-website/images/tatvas/sharira.jpg',
        },
        {
            hindi: 'आहार',
            english: 'Nutrition',
            description: 'Mindful eating, balancing macros, staying hydrated.',
            examples: 'Real food = Real energy',
            Icon: Apple,
            /*
             * TATVA IMAGE — Aahaar (Nutrition)
             * Drop your image into public/images/tatvas/aahaar.jpg
             * Then uncomment the line below:
             */
            // image: '/tatva-tribe-website/images/tatvas/aahaar.jpg',
        },
        {
            hindi: 'मानस',
            english: 'Mental Toughness',
            description: 'Meditation, Breathwork, Journaling.',
            examples: 'Mental resilience > Digital Chaos',
            Icon: Brain,
            /*
             * TATVA IMAGE — Manas (Mental Toughness)
             * Drop your image into public/images/tatvas/manas.jpg
             * Then uncomment the line below:
             */
            // image: '/tatva-tribe-website/images/tatvas/manas.jpg',
        },
        {
            hindi: 'निद्रा',
            english: 'Rest & Recovery',
            description: 'Restorative sleep, active recovery, mobility.',
            examples: 'Good rest = Better mood, strength and health span',
            Icon: Moon,
            /*
             * TATVA IMAGE — Nidra (Rest & Recovery)
             * Drop your image into public/images/tatvas/nidra.jpg
             * Then uncomment the line below:
             */
            // image: '/tatva-tribe-website/images/tatvas/nidra.jpg',
        },
        {
            hindi: 'समाज',
            english: 'Community & Connections',
            description: 'Building good relations, socialising.',
            examples: 'Growing together',
            Icon: Users,
            /*
             * TATVA IMAGE — Samaaj (Community)
             * Drop your image into public/images/tatvas/samaaj.jpg
             * Then uncomment the line below:
             */
            // image: '/tatva-tribe-website/images/tatvas/samaaj.jpg',
        },
        {
            hindi: 'प्रकृति',
            english: 'Nature',
            description: 'Aligning with nature, seasonal rhythms in diet & activity.',
            examples: 'Sunlight, fresh air = Natural healers',
            Icon: Leaf,
            /*
             * TATVA IMAGE — Prakriti (Nature)
             * Drop your image into public/images/tatvas/prakriti.jpg
             * Then uncomment the line below:
             */
            // image: '/tatva-tribe-website/images/tatvas/prakriti.jpg',
        },
        {
            hindi: 'उद्देश्य',
            english: 'Purpose',
            description: 'Keeping the Right intention, setting a goal.',
            examples: 'No purpose = No Growth',
            Icon: Target,
            /*
             * TATVA IMAGE — Uddeshya (Purpose)
             * Drop your image into public/images/tatvas/uddeshya.jpg
             * Then uncomment the line below:
             */
            // image: '/tatva-tribe-website/images/tatvas/uddeshya.jpg',
        },
    ];

    const audienceTypes = [
        {
            Icon: Flame,
            title: 'The Motivated Beginner',
            description: 'Highly motivated, but don\'t know where to start.',
        },
        {
            Icon: TrendingDown,
            title: 'The Inconsistent Learner',
            description: 'Know a little, but struggle to stay consistent.',
        },
        {
            Icon: RefreshCw,
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
                            <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl shadow-black/40">
                                <img
                                    src="/tatva-tribe-website/images/trainer.jpeg"
                                    alt="Advay Shidhaye — Master Trainer"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-400/20 rounded-full blur-xl" />
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-forest-400/30 rounded-full blur-xl" />
                        </div>
                    </div>

                    {/* Certifications Carousel */}
                    <CertificationsCarousel />
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
                            <Card key={index} className="text-center group overflow-hidden !p-0">
                                {tatva.image ? (
                                    <div className="w-full h-44 overflow-hidden">
                                        <img
                                            src={tatva.image}
                                            alt={tatva.english}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-44 bg-gradient-to-br from-forest-500/40 to-forest-700/40 flex items-center justify-center">
                                        <div className="w-14 h-14 bg-gold-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <tatva.Icon className="w-7 h-7 text-gold-400" />
                                        </div>
                                    </div>
                                )}
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
                            {tatvas[6].image ? (
                                <div className="w-full h-52 overflow-hidden">
                                    <img
                                        src={tatvas[6].image}
                                        alt={tatvas[6].english}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-52 bg-gradient-to-br from-forest-500/40 to-forest-700/40 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <FeaturedIcon className="w-8 h-8 text-gold-400" />
                                    </div>
                                </div>
                            )}
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
                                <div className="w-14 h-14 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <type.Icon className="w-7 h-7 text-gold-400" />
                                </div>
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
