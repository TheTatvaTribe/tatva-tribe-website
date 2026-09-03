import { useEffect, useRef, useState } from 'react';
import { useFrameScroll } from '../../hooks/useReveal';
import { tatvas } from '../../data/site';

/**
 * Deck-of-cards scroll: each Tatva sticks under the navbar while the next
 * one rises over it, and buried cards scale down and dim.
 *
 * The step size is measured off the cards themselves rather than
 * `window.innerHeight - navH`. The cards are sized in `svh`, which does
 * not equal `innerHeight` on mobile once the browser chrome collapses —
 * that mismatch used to drift the active card out of sync and clip the
 * last one.
 */
const TatvaStack = () => {
  const stackRef = useRef(null);
  const barRef = useRef(null);
  const cardsRef = useRef(null);
  const navHRef = useRef(68);
  const stepRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [inStack, setInStack] = useState(false);
  const [failedIcons, setFailedIcons] = useState({});

  useFrameScroll(() => {
    const stack = stackRef.current;
    if (!stack) return;

    // Cache the card list and the nav height: querySelectorAll plus a
    // getComputedStyle on the root every frame was a forced style recalc
    // on every scroll event, for values that only change on resize.
    if (!cardsRef.current) {
      cardsRef.current = Array.from(stack.querySelectorAll('.tatva-card-full'));
      navHRef.current = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        10
      ) || 68;
      // One slot is the card plus the dwell margin beneath it. Measured
      // once here because getComputedStyle forces a style recalc and this
      // only changes on resize. Note offsetTop is unusable for this: a
      // stuck sticky card reports its shifted position, so the moment the
      // deck starts stacking every card returns the same offsetTop and the
      // gap between two of them reads 0.
      const first = cardsRef.current[0];
      stepRef.current = first
        ? first.offsetHeight + (parseFloat(getComputedStyle(first).marginBottom) || 0)
        : 0;
    }
    const cards = cardsRef.current;
    if (!cards.length) return;
    const navH = navHRef.current;

    const rect = stack.getBoundingClientRect();
    const scrolled = Math.max(0, navH - rect.top);
    const step = stepRef.current || cards[0].offsetHeight || (window.innerHeight - navH);
    const idx = Math.min(Math.floor(scrolled / step), cards.length - 1);

    // These change a handful of times across the whole stack, so React
    // bails out on the repeats.
    setActiveIdx(idx);
    setInStack(rect.top < window.innerHeight && rect.bottom > navH && scrolled > 0);

    // The progress bar changes on essentially every scrolled pixel. Held
    // in a ref and written straight to the DOM — as state it re-rendered
    // the whole stack 60 times a second while scrolling.
    if (barRef.current) {
      const progress = Math.min(Math.max(scrolled / (step * cards.length), 0), 1);
      barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    cards.forEach((card, i) => {
      const buried = Math.floor((scrolled - i * step) / step);
      if (scrolled < i * step || buried <= 0) {
        card.style.transform = '';
        card.style.filter = '';
        return;
      }
      const scale = Math.max(0.84, 1 - buried * 0.04);
      const brightness = Math.max(0.25, 1 - buried * 0.2);
      card.style.transform = `scale(${scale.toFixed(3)})`;
      card.style.filter = `brightness(${brightness.toFixed(2)})`;
    });
  });

  // Re-measure on resize (the cached values are viewport-dependent).
  useEffect(() => {
    const invalidate = () => { cardsRef.current = null; };
    window.addEventListener('resize', invalidate);
    return () => window.removeEventListener('resize', invalidate);
  }, []);

  // Clamped: an out-of-range index here would blank the whole page,
  // since the HUD below reads `active.name` unconditionally.
  const active = tatvas[Math.min(Math.max(activeIdx, 0), tatvas.length - 1)] ?? tatvas[0];

  return (
    <section className="tatvas-section" id="tatvas" aria-label="The 7 Tatvas">
      {/* Mobile position indicator. The dot rail is hidden at phone widths
          because it sat over the card copy, which left seven full-screen
          cards with no sense of where you are or how many remain. */}
      <div className={`stack-hud${inStack ? ' is-visible' : ''}`} aria-hidden="true">
        <span className="stack-hud-label">Tatva</span>
        <span className="stack-hud-name">{active.name}</span>
        <span className="stack-hud-count">
          {String(activeIdx + 1).padStart(2, '0')} / {String(tatvas.length).padStart(2, '0')}
        </span>
        <span className="stack-hud-bar">
          <span ref={barRef} style={{ transform: 'scaleX(0)' }} />
        </span>
      </div>

      <div className="tatvas-stack" ref={stackRef}>
        {tatvas.map((tatva, i) => (
          <article
            className="tatva-card-full"
            key={tatva.name}
            style={{ '--card-col': tatva.color, '--card-bg': tatva.bg }}
          >
            <div className="tcf-visual">
              <div className="tcf-big-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              {failedIcons[tatva.name] ? (
                <div className="tcf-icon-fallback" aria-hidden="true">{tatva.devan}</div>
              ) : (
                <img
                  src={tatva.image}
                  alt=""
                  className="tcf-icon"
                  loading="lazy"
                  onError={() =>
                    setFailedIcons((prev) => ({ ...prev, [tatva.name]: true }))
                  }
                />
              )}
            </div>
            <div className="tcf-content" data-devan={tatva.devan}>
              <span className="tcf-devan">{tatva.devan}</span>
              <h3 className="tcf-name">
                <span className="visually-hidden">Tatva {i + 1} of {tatvas.length}: </span>
                {tatva.name}
              </h3>
              <p className="tcf-desc">{tatva.desc}</p>
              <div className="tcf-tags">
                {tatva.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={`stack-progress${inStack ? ' active' : ''}`} aria-hidden="true">
        {tatvas.map((tatva, i) => (
          <span key={tatva.name} className={`sp-dot${i === activeIdx ? ' active' : ''}`} />
        ))}
      </div>
    </section>
  );
};

export default TatvaStack;
