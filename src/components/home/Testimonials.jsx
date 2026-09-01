import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import { stories } from '../../data/stories';

/* Teaser for the full stories page: each slide is one member's pull quote.
   This used to carry four invented testimonials from the design hand-off;
   these are the three real stories, so the site tells one story only once. */
const testimonials = stories.map((s) => ({
  text: s.quote,
  name: s.name,
  color: s.accent,
  portrait: s.portrait,
  initials: s.initials,
}));

/** Display picture, falling back to initials if there is no photo. */
const Avatar = ({ item }) => {
  const [failed, setFailed] = useState(false);

  if (!item.portrait || failed) {
    return (
      <span className="ts-avatar" style={{ '--av': item.color }} aria-hidden="true">
        {item.initials}
      </span>
    );
  }
  return (
    <img
      className="ts-avatar"
      src={item.portrait}
      alt=""
      width="96"
      height="96"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 50;

const Testimonials = () => {
  const rootRef = useRef(null);
  const touchStartX = useRef(0);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useReveal(rootRef);

  const total = testimonials.length;
  const goTo = useCallback((idx) => setCurrent(((idx % total) + total) % total), [total]);

  // Autoplay. The interval is cleared on unmount and while hovered/focused,
  // instead of the original's un-cleared setInterval.
  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, total, current]);

  return (
    <section className="testimonials-section" id="testimonials" ref={rootRef}>
      <div className="container">
        <div className="section-header reveal-up">
          <span className="section-eyebrow">Real Stories</span>
          <h2 className="section-title">From the Tribe</h2>
        </div>

        <div
          className="carousel reveal-up"
          style={{ '--delay': '0.15s' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="carousel-viewport"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > SWIPE_PX) goTo(current + (diff > 0 ? 1 : -1));
            }}
          >
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((item, i) => (
                <div
                  className="testimonial-slide"
                  key={item.name}
                  aria-hidden={i !== current}
                >
                  <div className="ts-inner">
                    <div className="ts-quote" aria-hidden="true">&ldquo;</div>
                    <p
                      className="ts-text"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                    <div className="ts-author">
                      <Avatar item={item} />
                      <div>
                        <strong>{item.name}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-btn"
              aria-label="Previous testimonial"
              onClick={() => goTo(current - 1)}
            >
              ←
            </button>
            <div className="carousel-dots" role="tablist" aria-label="Testimonials">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  className={`c-dot${i === current ? ' active' : ''}`}
                  aria-selected={i === current}
                  aria-label={`Story ${i + 1} of ${total}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="carousel-btn"
              aria-label="Next testimonial"
              onClick={() => goTo(current + 1)}
            >
              →
            </button>
          </div>
          <p className="swipe-hint">Swipe to browse</p>
        </div>

        <p className="testimonials-more reveal-up" style={{ '--delay': '.2s' }}>
          <Link to="/stories" className="btn btn-ghost">Read the full stories</Link>
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
