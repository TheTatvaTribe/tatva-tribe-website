import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import { addRipple } from '../../utils/ripple';
import { EMAIL, INSTAGRAM_URL } from '../../data/site';

const CtaSection = () => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <section className="cta-section" id="start" ref={rootRef}>
      <div className="cta-orbit-wrap" aria-hidden="true">
        <div className="cta-ring cta-ring-1" />
        <div className="cta-ring cta-ring-2" />
        <div className="cta-ring cta-ring-3" />
      </div>

      <div className="cta-inner reveal-up">
        <span className="section-eyebrow">Start Today</span>
        <h2 className="cta-title">
          Ready to Begin Your
          <br />
          Transformation?
        </h2>
        <p className="cta-sub">
          Book a <strong>FREE consultation</strong> and take the first step towards a
          healthier, stronger you.
        </p>
        <div className="cta-actions">
          <Link to="/contact" className="btn btn-primary ripple-btn" onClick={addRipple}>
            Book Free Consultation
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            DM on Instagram
          </a>
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
            Email Us
          </a>
        </div>
        <p className="cta-note">No obligations. No spam. Just real conversations.</p>
      </div>
    </section>
  );
};

export default CtaSection;
