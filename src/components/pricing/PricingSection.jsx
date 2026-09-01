import { useRef } from 'react';
import PlanCard from './PlanCard';
import { useReveal } from '../../hooks/useReveal';
import { plans } from '../../data/site';

const PricingSection = () => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section id="services" className="pricing-section" ref={rootRef}>
      <div className="pricing-shell">
        <div className="pricing-header reveal-up">
          <p className="pricing-eyebrow">Plans</p>
          <h2 className="pricing-title">Customised plans for your goals</h2>
          <p className="pricing-desc">
            Built around your routine, timeline, and transformation target, so every step feels
            personal and practical. Tap <strong>Know More</strong> on any card for the full detail.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <PlanCard key={plan.planName} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
