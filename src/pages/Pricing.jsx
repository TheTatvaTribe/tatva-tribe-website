import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [openFaq, setOpenFaq] = useState(null);

    const plans = [
        {
            name: 'Basic',
            description: 'Perfect for getting started',
            monthlyPrice: 2999,
            yearlyPrice: 29990,
            features: [
                'Personalized workout plan',
                'Basic nutrition guidelines',
                'Weekly check-ins',
                'Email support',
                'Access to community group',
            ],
            notIncluded: [
                '1-on-1 coaching calls',
                'Custom diet plan',
                'Priority support',
            ],
            popular: false,
        },
        {
            name: 'Pro',
            description: 'Most popular for serious results',
            monthlyPrice: 5999,
            yearlyPrice: 59990,
            features: [
                'Everything in Basic',
                'Custom diet plan',
                '2x weekly coaching calls',
                'Priority WhatsApp support',
                'Progress tracking dashboard',
                'Recipe library access',
            ],
            notIncluded: [
                'Daily check-ins',
                'Unlimited calls',
            ],
            popular: true,
        },
        {
            name: 'Premium',
            description: 'Complete transformation package',
            monthlyPrice: 9999,
            yearlyPrice: 99990,
            features: [
                'Everything in Pro',
                'Daily check-ins',
                'Unlimited coaching calls',
                '24/7 priority support',
                'Monthly body composition analysis',
                'Supplement guidance',
                'Mindfulness sessions',
            ],
            notIncluded: [],
            popular: false,
        },
    ];

    const faqs = [
        {
            question: 'How do I get started?',
            answer: 'Simply choose a plan and click "Get Started". You\'ll receive a welcome email with instructions to book your onboarding call where we\'ll discuss your goals and create your personalized plan.',
        },
        {
            question: 'Can I switch plans later?',
            answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
        },
        {
            question: 'What if I\'m a complete beginner?',
            answer: 'Perfect! Our programs are designed for all fitness levels. We\'ll customize everything based on your current fitness level and gradually progress as you get stronger.',
        },
        {
            question: 'Is there a money-back guarantee?',
            answer: 'Yes, we offer a 7-day money-back guarantee. If you\'re not satisfied with the program, we\'ll refund your payment—no questions asked.',
        },
        {
            question: 'How are the coaching calls conducted?',
            answer: 'Coaching calls are conducted via video call (Zoom/Google Meet) or phone, based on your preference. Sessions typically last 30-45 minutes.',
        },
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-600 via-dark to-dark" />
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />

                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-medium mb-6">
                            Invest in Yourself
                        </span>
                        <h1 className="heading-xl text-cream mb-6">
                            Choose Your <span className="text-gradient">Transformation Plan</span>
                        </h1>
                        <p className="text-xl text-cream/70 mb-8">
                            Flexible plans designed to fit your goals and budget. All plans include personalized attention.
                        </p>

                        {/* Billing Toggle */}
                        <div className="inline-flex items-center gap-4 bg-forest-600/50 rounded-full p-1">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === 'monthly'
                                    ? 'bg-gold-400 text-dark'
                                    : 'text-cream hover:text-gold-400'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === 'yearly'
                                    ? 'bg-gold-400 text-dark'
                                    : 'text-cream hover:text-gold-400'
                                    }`}
                            >
                                Yearly <span className="text-xs opacity-75">(Save 17%)</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="section -mt-8">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative ${plan.popular
                                    ? 'border-gold-400 shadow-lg shadow-gold-400/20 scale-105 z-10'
                                    : ''
                                    }`}
                                hover={false}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-gold-400 text-dark text-xs font-bold px-4 py-1 rounded-full">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="heading-md text-cream mb-2">{plan.name}</h3>
                                    <p className="text-cream/60 text-sm">{plan.description}</p>
                                </div>

                                <div className="text-center mb-6">
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-heading font-bold text-cream">
                                            {formatPrice(billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice)}
                                        </span>
                                        <span className="text-cream/60">
                                            /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <span className="text-gold-400 mt-0.5">✓</span>
                                            <span className="text-cream/80">{feature}</span>
                                        </li>
                                    ))}
                                    {plan.notIncluded.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm opacity-50">
                                            <span className="text-cream/50 mt-0.5">✗</span>
                                            <span className="text-cream/50">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/contact"
                                    className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'
                                        }`}
                                >
                                    Get Started
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Comparison */}
            <section className="section bg-forest-600/30">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="heading-lg text-cream mb-4">
                            All Plans <span className="text-gradient">Include</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: '📱', text: 'Mobile App Access' },
                            { icon: '📊', text: 'Progress Tracking' },
                            { icon: '👥', text: 'Community Access' },
                            { icon: '🔄', text: 'Plan Adjustments' },
                            { icon: '📚', text: 'Resource Library' },
                            { icon: '🎯', text: 'Goal Setting' },
                            { icon: '💬', text: 'Direct Support' },
                            { icon: '🏆', text: 'Milestone Rewards' },
                        ].map((item, index) => (
                            <div key={index} className="text-center p-4">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <p className="text-cream/80 text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="heading-lg text-cream mb-4">
                            Frequently Asked <span className="text-gradient">Questions</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <Card
                                key={index}
                                hover={false}
                                className="cursor-pointer"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-cream">{faq.question}</h3>
                                    <span className={`text-gold-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </div>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-cream/70 text-sm">{faq.answer}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-forest-600/30">
                <div className="container text-center">
                    <h2 className="heading-lg text-cream mb-4">
                        Still Have <span className="text-gradient">Questions?</span>
                    </h2>
                    <p className="text-cream/70 max-w-xl mx-auto mb-8">
                        Get a free consultation to discuss your goals and find the perfect plan for you.
                    </p>
                    <Link to="/contact" className="btn btn-primary">
                        Book Free Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
