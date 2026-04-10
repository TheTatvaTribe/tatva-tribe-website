import Card from '../components/ui/Card';

const Contact = () => {
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

            {/* Google Form Embed */}
            <section className="section -mt-8">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Card hover={false} className="p-0 overflow-hidden">
                                <iframe
                                    src="https://docs.google.com/forms/d/e/1FAIpQLScScCLsxvv6BaL4wphS_QksI2fm4x0B_QQGeM4pd0LB7DMdMQ/viewform?embedded=true"
                                    width="100%"
                                    height="800"
                                    frameBorder="0"
                                    marginHeight="0"
                                    marginWidth="0"
                                    title="Free Consultation Form"
                                    className="w-full min-h-[800px]"
                                >
                                    Loading...
                                </iframe>
                            </Card>
                        </div>

                        <div className="space-y-6">
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
                                            <span className="text-gold-400">&#10003;</span>
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
