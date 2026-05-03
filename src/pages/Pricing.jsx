import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const tribeCode = [
    {
        title: 'Your Sankalpa',
        content:
            'Much like a sacred vow, your commitment to a plan is final. All memberships are non-refundable and non-transferable.',
    },
    {
        title: "It's your Marga",
        content:
            'Your SMARTWORK blueprint is built exclusively for your transformation tailored to your body, your goals, and your journey. The more you commit to your plan, the stronger your results.',
    },
    {
        title: 'The Law of Karma (Respectful Conduct)',
        content:
            'We maintain a high-vibe environment built on mutual respect and integrity. Any form of misconduct, disrespect, or breach of our community ethics will end coaching without refund. Smartwork begins with a disciplined mind.',
    },
    {
        title: 'A Moment of Zen',
        content:
            'Life can be unpredictable. We offer a one-time "Pause" period for our Tapasya and Ghor Tapasya practitioners, provided you give us a heads-up at least 1 week prior.',
    },
    {
        title: 'The Temple Disclosure (Medical Disclaimer)',
        content:
            'Your body is your temple, and we treat it with the highest regard. Before embarking on any physical Tapasya, it is your responsibility to consult with a medical professional. You must disclose your full medical history and any physical limitations honestly.',
    },
];

const plans = [
    {
        hindi: 'प्रारंभ',
        name: 'The Prarambh Plan',
        tagline: 'The Kick-Start Plan',
        duration: '1 Month',
        description:
            'Perfect for those ready to plant the seed of discipline. This 1-month immersion focuses on setting your foundation and learning the "Tatva" way of moving.',
        price: '9,999',
    },
    {
        hindi: 'शक्ति',
        name: 'The Shakti Plan',
        tagline: 'The Power 90 Plan',
        duration: '3 Months',
        description:
            'True strength is built through consistency. Over 3 months, we move beyond the basics to ignite your inner power and build your physical capabilities.',
        price: '24,999',
    },
    {
        hindi: 'तपस्या',
        name: 'The Tapasya Plan',
        tagline: 'The 180 Turn-Around',
        duration: '6 Months',
        description:
            'A 6-month commitment to total transformation. This is where the ego dissolves and the "hustle" becomes a habit. Designed for the in born winners!',
        price: '37,999',
    },
    {
        hindi: 'घोर तपस्या',
        name: 'The Ghor Tapasya Plan',
        tagline: 'The Ultimate Devotion',
        duration: '12 Months',
        description:
            'For the elite few who view fitness as a lifelong dharma. A 12-month journey to build a legacy of health that lasts a lifetime.',
        price: '79,999',
    },
];

const Pricing = () => {
    return (
        <div className="pt-20">
            {/* Hero — symmetrical "temple" motif: two mirrored columns of light flanking the title */}
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-dark via-forest-700 to-dark" />
                <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-gold-500/15 to-transparent blur-2xl" />
                <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-gold-500/15 to-transparent blur-2xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] border border-gold-400/10 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] border border-gold-400/5 rounded-full" />

                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-medium mb-6">
                            The Tatva Marga
                        </span>
                        <h1 className="heading-xl text-cream mb-6">
                            Choose Your <span className="text-gradient">Marga</span>
                        </h1>
                        <p className="text-xl text-cream/70 italic">
                            "Transformation is a journey of the self, through the self."
                        </p>
                        <p className="text-cream/60 mt-4">
                            Whether you are seeking a spark or a lifelong legacy, our programs are designed to help you master the art of <strong className="text-cream">Smartwork</strong>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="section -mt-8">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                hover={true}
                                className="flex flex-col"
                            >

                                <div className="mb-4">
                                    <span className="text-3xl font-heading font-semibold text-gold-400">
                                        {plan.hindi}
                                    </span>
                                </div>

                                <h3 className="heading-md text-cream mb-1">{plan.name}</h3>
                                <p className="text-gold-400/80 text-sm font-medium mb-2">{plan.tagline}</p>
                                <span className="inline-block text-cream/50 text-xs uppercase tracking-wider mb-4">
                                    {plan.duration}
                                </span>

                                <p className="text-cream/70 text-sm mb-6 flex-grow">{plan.description}</p>

                                <div className="mb-6">
                                    <span className="text-cream/50 text-sm">Investment: </span>
                                    <span className="text-3xl font-heading font-bold text-cream">
                                        &#8377;{plan.price}
                                    </span>
                                    <span className="text-cream/50 text-sm">/-</span>
                                </div>

                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Tribe's Code (Terms & Conditions) */}
            <section className="section bg-forest-600/20">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-medium mb-6">
                            Terms &amp; Conditions
                        </span>
                        <h2 className="heading-lg text-cream mb-4">
                            The Tribe's <span className="text-gradient">Code</span>
                        </h2>
                        <p className="text-cream/70">
                            Before you begin your Tapasya, please read the principles that govern our tribe.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {tribeCode.map((term, index) => (
                            <div
                                key={index}
                                className="p-6 bg-forest-600/30 rounded-xl border border-forest-500/30"
                            >
                                <h3 className="heading-sm text-cream mb-3">
                                    <span className="text-gold-400 mr-2">{index + 1}.</span>
                                    {term.title}
                                </h3>
                                <p className="text-cream/70 leading-relaxed">{term.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-forest-600/30">
                <div className="container text-center">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-cream/70 mb-4">
                            Not sure which plan is right for you?
                        </p>
                        <h2 className="heading-lg text-cream mb-6">
                            Get a <span className="text-gradient">Free Consultation</span>
                        </h2>
                        <Link to="/contact" className="btn btn-primary text-lg px-10 py-4">
                            Book Your Free Call
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
