import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFrameScroll } from '../../hooks/useReveal';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useSectionNav } from '../../hooks/useSectionNav';
import { addRipple } from '../../utils/ripple';

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
/** Normalise x into 0→1 across [from, to]. */
const ramp = (x, from, to) => (to <= from ? (x >= to ? 1 : 0) : clamp01((x - from) / (to - from)));

/**
 * Scroll-driven hero: the background zooms 1x → 3x, the headline fades
 * away, and the "7 Tatvas" title fades in ready for the first Tatva card.
 *
 * Every phase is expressed as a fraction of `pEnter` — the point in the
 * runway where the first card starts rising over the hero — rather than
 * as fixed constants. The constants were tuned for a 400svh runway, so
 * shortening it would have left the whole sequence firing after the card
 * had already covered the screen.
 */
const Hero = () => {
  const zoneRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const hintRef = useRef(null);
  const revealRef = useRef(null);
  const goToSection = useSectionNav();
  const isMobile = useIsMobile();

  useFrameScroll(() => {
    const zone = zoneRef.current;
    const bg = bgRef.current;
    if (!zone || !bg) return;

    const vh = window.innerHeight;
    const zoneH = zone.offsetHeight;
    const scrolled = Math.max(0, -zone.getBoundingClientRect().top);
    const maxScroll = zoneH - vh;
    const p = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0;

    // The Tatvas section is pulled up by one viewport, so card 1 begins
    // rising once (zoneH - 2vh) has been scrolled.
    const pEnter = maxScroll > 0 ? clamp01((zoneH - 2 * vh) / maxScroll) : 1;

    // Skipped for visitors who ask for reduced motion; the stylesheet
    // collapses the runway to a single screen to match.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Zoom finishes exactly as the first card arrives.
    bg.style.transform = reduced
      ? ''
      : `scale(${(1 + ramp(p, 0, pEnter) * 2).toFixed(3)})`;

    if (contentRef.current) {
      const out = ramp(p, 0, pEnter * 0.45);
      contentRef.current.style.opacity = (1 - out).toFixed(3);
      contentRef.current.style.transform = `translateY(${(out * -40).toFixed(1)}px)`;
    }

    if (hintRef.current) {
      // Held until the title takes over the cue — on a phone especially,
      // an early fade left a stretch of scrolling with nothing to follow.
      const hintEnd = pEnter * (isMobile ? 0.9 : 0.35);
      hintRef.current.style.opacity = (1 - ramp(p, 0, hintEnd)).toFixed(3);
    }

    if (revealRef.current) {
      // Lands just before the card enters and covers it.
      const t = ramp(p, pEnter * 0.5, pEnter * 0.95);
      revealRef.current.style.opacity = t.toFixed(3);
      revealRef.current.style.transform = `translateY(${((1 - t) * 30).toFixed(1)}px)`;
    }
  }, [isMobile]);

  return (
    <div className="hero-scroll-zone" ref={zoneRef}>
      <section className="hero" id="hero">
        <div className="hero-bg-zoom" ref={bgRef}>
          <div className="hero-mandala" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-om" aria-hidden="true">ॐ</div>
          <div className="hero-kolam" aria-hidden="true" />
        </div>

        <div className="hero-content" ref={contentRef}>
          <p className="hero-eyebrow">Holistic Health Coaching</p>
          <h1 className="hero-headline">
            <span className="hero-hindi">स्मार्टवर्क</span>
            <br />
            over Hardwork
          </h1>
          <p className="hero-sub">
            Be the difference between <em>looking fit</em> and <em>actually being fit</em>.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary ripple-btn" onClick={addRipple}>
              Get Free Consultation
            </Link>
            <button type="button" className="btn btn-ghost" onClick={() => goToSection('tatvas')}>
              Explore the Tatvas ↓
            </button>
          </div>
        </div>

        <div className="hero-tatvas-reveal" ref={revealRef} aria-hidden="true">
          <span className="section-eyebrow">The Ancient Blueprint</span>
          <h2 className="section-title">
            The 7 Tatvas of
            <br />
            Transformation
          </h2>
          <p className="section-desc">
            <em>&lsquo;Tatva&rsquo;</em> is the Sanskrit word for <em>core essence</em>. Scroll
            through the seven pillars that govern your health, energy, and purpose.
          </p>
          <div className="tatvas-scroll-hint">↓ Scroll to explore each Tatva</div>
        </div>

        <div className="hero-scroll-hint" ref={hintRef} aria-hidden="true">
          <span className="scroll-line" />
          <span className="scroll-label">scroll</span>
        </div>
      </section>
    </div>
  );
};

export default Hero;
