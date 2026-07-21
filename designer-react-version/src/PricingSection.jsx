import React from 'react';
import PlanCard from './PlanCard';

const plans = [
  {
    planName: 'Prarambha',
    planNameDevanagri: 'प्रारम्भ',
    icon: 'sprout',
    price: 'Rs. 12,499',
    duration: '1 month',
    savings: '',
    description: 'Best fit for foundation, adaptation, and building consistency from day one.',
    stats: [
      { type: 'sessions', value: '12', label: '1-on-1 sessions' },
      { type: 'days', value: '30', label: 'day commitment' },
    ],
    details: [
      'Weekly 1-on-1 coaching and form correction.',
      'Food and routine setup based on your schedule.',
      'Habit tracking with check-ins for consistency.',
    ],
    isPopular: false,
    accentColor: '#D4E84A',
    bandColor: '#C2DC2F',
    bandInk: '#8FA620',
    bgColor: '#111600',
    ctaLabel: 'Choose Prarambha',
    ctaHref: 'https://www.instagram.com/thetatvatribe._/',
  },
  {
    planName: 'Shakti',
    planNameDevanagri: 'शक्ति',
    icon: 'bolt',
    price: 'Rs. 29,999',
    duration: '3 months',
    savings: 'Rs. 7,498',
    description: 'Best fit for consistency, visible momentum, and a solid reset.',
    stats: [
      { type: 'sessions', value: '36', label: '1-on-1 sessions' },
      { type: 'days', value: '90', label: 'day habit block' },
    ],
    details: [
      'Structured progression across strength and conditioning.',
      'Monthly plan upgrades based on your progress data.',
      'Lifestyle accountability to lock in momentum.',
    ],
    isPopular: true,
    accentColor: '#A8D458',
    bandColor: '#3FA447',
    bandInk: '#2F7C37',
    bgColor: '#0D1608',
    ctaLabel: 'Choose Shakti',
    ctaHref: 'https://www.instagram.com/thetatvatribe._/',
  },
  {
    planName: 'Tapasya',
    planNameDevanagri: 'तपस्या',
    icon: 'flame',
    price: 'Rs. 51,999',
    duration: '6 months',
    savings: 'Rs. 22,995',
    description: 'Best fit for transformation, depth, and long-term identity change.',
    stats: [
      { type: 'sessions', value: '72', label: '1-on-1 sessions' },
      { type: 'days', value: '180', label: 'day block' },
    ],
    details: [
      'High-accountability coaching with deeper body recomposition focus.',
      'Flexible strategy updates for plateaus and lifestyle shifts.',
      'Mindset and recovery guidance for long-term transformation.',
    ],
    isPopular: false,
    accentColor: '#5CBF60',
    bandColor: '#43B8AC',
    bandInk: '#2F8781',
    bgColor: '#091209',
    ctaLabel: 'Choose Tapasya',
    ctaHref: 'https://www.instagram.com/thetatvatribe._/',
  },
  {
    planName: 'Ghor Tapasya',
    planNameDevanagri: 'घोर तपस्या',
    icon: 'crown',
    price: 'Rs. 91,999',
    duration: '12 months',
    savings: 'Rs. 57,989',
    description: 'Best fit for elite accountability, legacy outcomes, and year-round coaching.',
    stats: [
      { type: 'sessions', value: '144', label: '1-on-1 sessions' },
      { type: 'days', value: '365', label: 'day partnership' },
    ],
    details: [
      'Priority access, deep personalization, and long-horizon planning.',
      'Advanced coaching cycles with quarterly transformation reviews.',
      'Year-round partnership for sustained elite outcomes.',
    ],
    isPopular: false,
    accentColor: '#36B8A8',
    bandColor: '#A8CE55',
    bandInk: '#7D9C3D',
    bgColor: '#061412',
    ctaLabel: 'Choose Ghor Tapasya',
    ctaHref: 'https://www.instagram.com/thetatvatribe._/',
  },
];

function PricingSection() {
  return (
    <section id="services" className="pricing-section">
      <div className="pricing-shell">
        <div className="pricing-header">
          <p className="pricing-eyebrow">Plans</p>
          <h2 className="pricing-title">Customised plans for your goals</h2>
          <p className="pricing-desc">
            Built around your routine, timeline, and transformation target, so every step feels personal and practical.
          </p>
        </div>

        <div className="pricing-grid pricing-grid-open">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.planName}
              fanIndex={index}
              {...plan}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
