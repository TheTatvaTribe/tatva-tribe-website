import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Card from '../components/ui/Card';

// ⚠️ REPLACE THESE WITH YOUR EMAILJS CREDENTIALS
const EMAILJS_SERVICE_ID = 'demo_gmail_service1';
const EMAILJS_TEMPLATE_ID = 'template_ulajsyq';
const EMAILJS_PUBLIC_KEY = '8JhoU9RtBGUidcTuP';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        fitnessGoal: '',
        fitnessLevel: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const fitnessGoals = [
        'Weight Loss',
        'Muscle Building',
        'General Fitness',
        'Sports Performance',
        'Flexibility & Mobility',
        'Stress Management',
        'Other',
    ];

    const fitnessLevels = [
        'Complete Beginner',
        'Some Experience',
        'Intermediate',
        'Advanced',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    fitness_goal: formData.fitnessGoal,
                    fitness_level: formData.fitnessLevel,
                    message: formData.message || 'No additional message provided',
                },
                EMAILJS_PUBLIC_KEY
            );

            setIsSubmitted(true);
        } catch (err) {
            console.error('EmailJS Error:', err);
            setError('Failed to send message. Please check EmailJS configuration or DM us on Instagram @thetatvatribe._');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="container">
                    <Card className="max-w-lg mx-auto text-center py-12">
                        <div className="text-6xl mb-6">🎉</div>
                        <h2 className="heading-md text-cream mb-4">Thank You!</h2>
                        <p className="text-cream/70 mb-6">
                            We've received your consultation request. Our team will reach out
                            to you within 24 hours to discuss your fitness journey.
                        </p>
                        <p className="text-gold-400 font-medium">
                            In the meantime, follow us on Instagram!
                        </p>
                        <a
                            href="https://www.instagram.com/thetatvatribe._/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary mt-6"
                        >
                            Follow @thetatvatribe._
                        </a>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-forest-600 via-dark to-dark" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />

                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-medium mb-6">
                            Start Your Journey
                        </span>
                        <h1 className="heading-xl text-cream mb-6">
                            Get Your <span className="text-gradient">Free Consultation</span>
                        </h1>
                        <p className="text-xl text-cream/70">
                            Tell us about your fitness goals and we'll create a personalized plan just for you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="section -mt-8">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <Card hover={false}>
                                <h2 className="heading-md text-cream mb-6">
                                    Tell Us About Yourself
                                </h2>

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-cream/80 text-sm mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="input"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-cream/80 text-sm mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="input"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block text-cream/80 text-sm mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="input"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>

                                        {/* Fitness Goal */}
                                        <div>
                                            <label htmlFor="fitnessGoal" className="block text-cream/80 text-sm mb-2">
                                                Fitness Goal *
                                            </label>
                                            <select
                                                id="fitnessGoal"
                                                name="fitnessGoal"
                                                value={formData.fitnessGoal}
                                                onChange={handleChange}
                                                required
                                                className="input"
                                            >
                                                <option value="">Select your goal</option>
                                                {fitnessGoals.map((goal) => (
                                                    <option key={goal} value={goal}>
                                                        {goal}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Fitness Level */}
                                    <div>
                                        <label className="block text-cream/80 text-sm mb-3">
                                            Current Fitness Level *
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {fitnessLevels.map((level) => (
                                                <label
                                                    key={level}
                                                    className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${formData.fitnessLevel === level
                                                        ? 'bg-gold-400/20 border-gold-400 text-gold-400'
                                                        : 'border-forest-500/30 text-cream/70 hover:border-forest-400'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="fitnessLevel"
                                                        value={level}
                                                        checked={formData.fitnessLevel === level}
                                                        onChange={handleChange}
                                                        className="sr-only"
                                                        required
                                                    />
                                                    <span className="text-sm text-center">{level}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-cream/80 text-sm mb-2">
                                            Tell Us More (Optional)
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            className="input resize-none"
                                            placeholder="Any specific goals, challenges, or questions you'd like to share..."
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-primary w-full"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                    />
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            'Get My Free Consultation'
                                        )}
                                    </button>
                                </form>
                            </Card>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <Card hover={false}>
                                <h3 className="heading-sm text-cream mb-4">Quick Contact</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gold-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-gold-400">📱</span>
                                        </div>
                                        <div>
                                            <p className="text-cream/60 text-xs">DM us on Instagram</p>
                                            <a
                                                href="https://www.instagram.com/thetatvatribe._/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gold-400 font-medium hover:underline"
                                            >
                                                @thetatvatribe._
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gold-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-gold-400">💬</span>
                                        </div>
                                        <div>
                                            <p className="text-cream/60 text-xs">Quick response</p>
                                            <p className="text-cream font-medium">Within 24 hours</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card hover={false} className="bg-gradient-to-br from-gold-400/20 to-forest-600/50">
                                <h3 className="heading-sm text-cream mb-3">
                                    💡 Pro Tip
                                </h3>
                                <p className="text-cream/70 text-sm">
                                    DM "TATVA" to our Instagram for the fastest response and exclusive
                                    tips while you wait for your consultation!
                                </p>
                            </Card>

                            <Card hover={false}>
                                <h3 className="heading-sm text-cream mb-3">What to Expect</h3>
                                <ul className="space-y-3">
                                    {[
                                        'Free 30-min discovery call',
                                        'Goal assessment',
                                        'Personalized recommendations',
                                        'No obligation to sign up',
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm text-cream/70">
                                            <span className="text-gold-400">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
