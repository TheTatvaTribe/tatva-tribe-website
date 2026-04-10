const terms = [
    {
        title: 'Your Sankalpa',
        content:
            'Much like a sacred vow, your commitment to a plan is final. All memberships are non-refundable and non-transferable.',
    },
    {
        title: 'The Path is Yours',
        content:
            'We provide the "Smartwork" blueprints, but the Karma is yours to perform. Results are proportional to your devotion.',
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

const Terms = () => {
    return (
        <div className="pt-20">
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-600 via-dark to-dark" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />

                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="heading-xl text-cream mb-4">
                            The Tribe's <span className="text-gradient">Code</span>
                        </h1>
                        <p className="text-xl text-cream/70">Terms & Conditions</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {terms.map((term, index) => (
                            <div
                                key={index}
                                className="p-6 bg-forest-600/30 rounded-xl border border-forest-500/30"
                            >
                                <h2 className="heading-sm text-cream mb-3">
                                    <span className="text-gold-400 mr-2">{index + 1}.</span>
                                    {term.title}
                                </h2>
                                <p className="text-cream/70 leading-relaxed">{term.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Terms;
