import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import PlanIcon from './PlanIcon';

const Band = ({ icon, devanagri, planName }) => (
  <div className="pricing-band">
    <span className="pricing-plan-icon" aria-hidden="true">
      <PlanIcon name={icon} className="pricing-plan-icon-svg" />
    </span>
    <p className="pricing-plan-dev" aria-hidden="true">{devanagri || planName}</p>
  </div>
);

const Tags = ({ badge, savings }) => (
  <div className="pricing-top-tags">
    {badge ? <span className="pricing-popular-badge">{badge}</span> : null}
    {savings ? <span className="pricing-save-top">Save {savings}</span> : null}
  </div>
);

// `heading` is false on the back face so the flipped-away copy does not
// add a second h3 with the same text to the document outline.
const PricePanel = ({ planName, price, duration, heading = true }) => (
  <div className="pricing-price-panel">
    {heading ? (
      <h3 className="pricing-plan-name-en">{planName} Plan</h3>
    ) : (
      <p className="pricing-plan-name-en">{planName} Plan</p>
    )}
    <div className="pricing-price-row">
      <p className="pricing-price">{price}</p>
      <p className="pricing-duration">/ {duration}</p>
    </div>
  </div>
);

const PlanCard = ({
  planName,
  planNameDevanagri,
  icon,
  price,
  duration,
  savings,
  description,
  longDescription,
  stats,
  details,
  bgColor,
  bandColor,
  bandInk,
  badge,
  accentColor,
  ctaLabel,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const backId = useId();

  // Faces are stacked in the same grid cell; the hidden one must stay out
  // of the tab order or keyboard focus lands on an invisible button.
  const frontTab = isFlipped ? -1 : 0;
  const backTab = isFlipped ? 0 : -1;

  return (
    <article
      className="pricing-card-frame"
      style={{
        '--plan-accent': accentColor,
        '--plan-bg': bgColor,
        '--plan-band': bandColor || accentColor,
        '--plan-band-ink': bandInk || accentColor,
      }}
    >
      <div className={`pricing-card-rotor${isFlipped ? ' is-flipped' : ''}`}>
        <div className="pricing-card pricing-face pricing-face-front" aria-hidden={isFlipped}>
          <Band icon={icon} devanagri={planNameDevanagri} planName={planName} />
          <Tags badge={badge} savings={savings} />
          <PricePanel planName={planName} price={price} duration={duration} />
          <p className="pricing-plan-desc">{description}</p>

          <div className="pricing-stats-row">
            {stats.map((stat) => (
              <div key={stat.label} className="pricing-stat">
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
              aria-expanded={isFlipped}
              aria-controls={backId}
              tabIndex={frontTab}
              onClick={() => setIsFlipped(true)}
            >
              Know More
            </button>
            <Link to="/contact" className="pricing-cta" tabIndex={frontTab}>
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div
          className="pricing-card pricing-face pricing-face-back"
          id={backId}
          aria-hidden={!isFlipped}
        >
          <Band icon={icon} devanagri={planNameDevanagri} planName={planName} />
          <Tags badge={badge} savings={savings} />
          <PricePanel planName={planName} price={price} duration={duration} heading={false} />
          <p className="pricing-plan-desc pricing-plan-desc-back">{longDescription}</p>

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
              tabIndex={backTab}
              onClick={() => setIsFlipped(false)}
            >
              Back
            </button>
            <Link to="/contact" className="pricing-cta" tabIndex={backTab}>
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PlanCard;
