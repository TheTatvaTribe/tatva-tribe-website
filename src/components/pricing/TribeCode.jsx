import { useRef } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { tribeCode } from '../../data/site';

const Chevron = () => (
  <svg className="code-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Five blocks of terms is a wall of text on a phone, so on mobile each one
 * collapses into a native <details> disclosure — scannable first, readable
 * on demand. On desktop every panel stays open and the summary is inert,
 * so the section reads exactly as it did before.
 */
const TribeCode = () => {
  const rootRef = useRef(null);
  const isMobile = useIsMobile();
  useReveal(rootRef);

  return (
    <section className="code-section" id="tribes-code" ref={rootRef}>
      <div className="container">
        <div className="section-header reveal-up">
          <span className="section-eyebrow">Terms &amp; Conditions</span>
          <h2 className="section-title">The Tribe&rsquo;s Code</h2>
          <p className="section-desc">
            Before you begin your Tapasya, please read the {tribeCode.length} principles that
            govern our tribe.
          </p>
        </div>

        <div className="code-list">
          {tribeCode.map((term, i) => (
            <details
              className="code-item reveal-up"
              key={term.title}
              open={!isMobile}
              style={{ '--delay': `${i * 0.06}s` }}
            >
              <summary
                className="code-summary"
                // Desktop shows every panel open and the summary reads as a
                // plain heading, so a stray click must not collapse it.
                onClick={(e) => { if (!isMobile) e.preventDefault(); }}
              >
                <h3>
                  <span>{i + 1}.</span>{' '}
                  {term.title}
                </h3>
                <Chevron />
              </summary>
              <div className="code-body">
                <p>{term.content}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TribeCode;
