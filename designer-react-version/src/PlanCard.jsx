import React, { useState } from 'react';

function Icon({ name, className }) {
  switch (name) {
    case 'sprout':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M12 20v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 12c0-4 2.7-6.8 7-7-0.2 4.2-3 7-7 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 14c0-3.4-2.3-5.7-6-6 0.2 3.6 2.5 6 6 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M13.5 2 5 13h5l-1.5 9L19 10h-5l-.5-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case 'flame':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M13.8 3c.7 3-1.2 4.4-2.5 5.9-1.4 1.6-2.5 3-2.5 5.1a3.9 3.9 0 0 0 7.8 0c0-1.7-.6-3-1.7-4.3-.9-1.1-1.8-2.2-1.1-4.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12.2 12.8c.4 1.3-.3 2.1-.8 2.8-.5.6-.9 1.1-.9 1.9a1.6 1.6 0 1 0 3.2 0c0-.7-.2-1.2-.7-1.8-.4-.5-.8-1-.8-2.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case 'crown':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="m3 8 4.5 4L12 6l4.5 6L21 8l-2 10H5L3 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case 'sessions':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="6" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" />
          <rect x="15" y="6" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" />
          <path d="M7 10v2.5m10-2.5v2.5M6 18h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'days':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 3v4m8-4v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'support':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-3v-4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 19h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function PlanCard({
  planName,
  planNameDevanagri,
  icon,
  price,
  duration,
  savings,
  description,
  stats,
  details,
  bgColor,
  bandColor,
  bandInk,
  fanIndex = 0,
  isPopular,
  accentColor,
  ctaLabel,
  ctaHref,
  className = '',
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const accent = accentColor;
  const accentSoft = `${accent}1f`;
  const planClassName = ['pricing-card-frame', className].filter(Boolean).join(' ');

  return (
    <article
      className={planClassName}
      style={{ '--plan-accent': accent, '--plan-accent-soft': accentSoft, '--plan-bg': bgColor, '--plan-band': bandColor || accent, '--plan-band-ink': bandInk || accent, '--fan-index': fanIndex }}
    >
      <div className={['pricing-card-rotor', isFlipped ? 'is-flipped' : ''].join(' ')}>
        <div className="pricing-card pricing-face pricing-face-front">
          <div className="pricing-band">
            <span className="pricing-plan-icon" aria-hidden="true">
              <Icon name={icon} className="pricing-plan-icon-svg" />
            </span>
            <h3 className="pricing-plan-dev">{planNameDevanagri || planName}</h3>
          </div>

          <div className="pricing-top-tags">
            {isPopular ? <span className="pricing-popular-badge">Most Popular</span> : null}
            {savings ? <span className="pricing-save-top">Save {savings}</span> : null}
          </div>

          <div className="pricing-price-panel">
            <p className="pricing-plan-name-en">{planName}</p>
            <div className="pricing-price-row">
              <p className="pricing-price">{price}</p>
              <p className="pricing-duration">/ {duration}</p>
            </div>
          </div>

          <p className="pricing-plan-desc">
            {description}
          </p>

          <div className="pricing-stats-row">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="pricing-stat"
              >
                <div>
                  <p className="pricing-stat-value">{stat.value}</p>
                  <p className="pricing-stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pricing-actions">
            <button
              type="button"
              className="pricing-ghost-btn"
              onClick={() => setIsFlipped(true)}
            >
              Know More
            </button>

            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-cta"
            >
              {ctaLabel}
            </a>
          </div>
        </div>

        <div className="pricing-card pricing-face pricing-face-back">
          <div className="pricing-band">
            <span className="pricing-plan-icon" aria-hidden="true">
              <Icon name={icon} className="pricing-plan-icon-svg" />
            </span>
            <h3 className="pricing-plan-dev">{planNameDevanagri || planName}</h3>
          </div>

          <div className="pricing-top-tags">
            {isPopular ? <span className="pricing-popular-badge">Most Popular</span> : null}
            {savings ? <span className="pricing-save-top">Save {savings}</span> : null}
          </div>

          <div className="pricing-price-panel">
            <p className="pricing-plan-name-en">{planName}</p>
            <div className="pricing-price-row">
              <p className="pricing-price">{price}</p>
              <p className="pricing-duration">/ {duration}</p>
            </div>
          </div>

          <p className="pricing-plan-desc pricing-plan-desc-back">{description}</p>

          <p className="pricing-back-title">What you get</p>
          <ul className="pricing-details-list">
            {(details || []).map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>

          <div className="pricing-actions">
            <button
              type="button"
              className="pricing-ghost-btn"
              onClick={() => setIsFlipped(false)}
            >
              Back
            </button>

            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-cta"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PlanCard;
