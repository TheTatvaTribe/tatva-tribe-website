import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Flame, TrendingDown, RefreshCw, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Card from '../components/ui/Card';
import EyebrowPill from '../components/ui/EyebrowPill';
import ExternalLink from '../components/ui/ExternalLink';
import { socialLinks } from '../content/navigation';

const BASE = import.meta.env.BASE_URL;

const certifications = [
    { src: `${BASE}images/certifications/certified_personal_trainer.jpeg`, alt: 'Certified Personal Trainer' },
    { src: `${BASE}images/certifications/kettlebell_training_specialist.PNG`, alt: 'Kettlebell Training Specialist' },
    { src: `${BASE}images/certifications/olympic_weightlifting_training_specialist.PNG`, alt: 'Olympic Weightlifting Training Specialist' },
    { src: `${BASE}images/certifications/postureandfunctional_corrective_exercise_specialist.PNG`, alt: 'Posture & Functional Corrective Exercise Specialist' },
    { src: `${BASE}images/certifications/resistance_band_training_specialist.PNG`, alt: 'Resistance Band Training Specialist' },
    { src: `${BASE}images/certifications/weight_loss_training_specialist.PNG`, alt: 'Weight Loss Training Specialist' },
];

const CertificationsCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const timeoutRef = useRef(null);

    const shouldAutoplay = !isPaused && !isHovered && !isFocused;

    useEffect(() => {
        if (!shouldAutoplay) return;
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % certifications.length);
        }, 4500);
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, [current, shouldAutoplay]);

    const go = (dir) => {
        setCurrent((prev) => (prev + dir + certifications.length) % certifications.length);
    };

    return (
        <div className="mt-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
                <p className="text-cream/60 text-xs uppercase tracking-wider">Certifications</p>
                <button
                    type="button"
                    onClick={() => setIsPaused((p) => !p)}
                    className="inline-flex items-center gap-2 text-cream/70 hover:text-gold-400 text-xs uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded-md px-2 py-1"
                    aria-pressed={isPaused}
                    aria-label={isPaused ? 'Play certificate carousel' : 'Pause certificate carousel'}
                >
                    {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    <span>{isPaused ? 'Play' : 'Pause'}</span>
                </button>
            </div>
            <div
                className="relative border-2 border-gold-400/30 rounded-2xl p-4 bg-forest-600/20"
                role="region"
                aria-roledescription="carousel"
                aria-label="Trainer certifications"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocusCapture={() => setIsFocused(true)}
                onBlurCapture={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setIsFocused(false);
                }}
            >
                <div className="overflow-hidden rounded-xl">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${current * 100}%)` }}
                        aria-live={shouldAutoplay ? 'off' : 'polite'}
                    >
                        {certifications.map((cert, i) => (
                            <div
                                key={i}
                                className="w-full flex-shrink-0"
                                role="group"
                                aria-roledescription="slide"
                                aria-label={`${i + 1} of ${certifications.length}: ${cert.alt}`}
                                aria-hidden={i !== current}
                            >
                                <img
                                    src={cert.src}
                                    alt={cert.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-auto object-contain bg-white"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => go(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-dark/80 hover:bg-dark rounded-full flex items-center justify-center text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-700"
                    aria-label="Previous certificate"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => go(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-dark/80 hover:bg-dark rounded-full flex items-center justify-center text-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-700"
                    aria-label="Next certificate"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            <p className="text-cream/80 text-sm text-center mt-3 font-medium" aria-live="polite">
                {certifications[current].alt}
            </p>
            <div className="flex justify-center gap-1.5 mt-2">
                {certifications.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${i === current ? 'bg-gold-400 w-6' : 'bg-cream/40 hover:bg-cream/60 w-2'}`}
                        aria-label={`Go to certificate ${i + 1}`}
                        aria-current={i === current ? 'true' : undefined}
                    />
                ))}
            </div>
        </div>
    );
};

// Module-scope: pure presentational data, no reason to recreate on every render.
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

const About = () => {
    return (
        <div className="pt-20">
            {/* Hero Section — soft "horizon" motif: a wide warm band suggesting sunrise */}
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-forest-700 via-dark to-dark" />
                <div className="absolute top-1/2 left-0 right-0 h-48 bg-gradient-to-r from-transparent via-gold-300/10 to-transparent blur-3xl" />
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[40rem] h-40 bg-forest-400/15 rounded-full blur-3xl" />

                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <EyebrowPill className="mb-6 animate-fade-in">Our Philosophy</EyebrowPill>
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

                            <ExternalLink
                                href={socialLinks.trainerInstagram.url}
                                className="btn btn-secondary mt-8 gap-2"
                                iconClassName="w-4 h-4"
                            >
                                Connect on Instagram
                            </ExternalLink>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="aspect-square max-w-md mx-auto rounded-full overflow-hidden shadow-xl shadow-black/40">
                                <img
                                    src={`${BASE}images/trainer.jpeg`}
                                    alt="Advay Shidhaye — Master Trainer"
                                    loading="lazy"
                                    decoding="async"
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
                        <p className="text-cream/70 mb-8 text-lg">
                            Start your transformation journey today with a free consultation. 👇🏼
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
