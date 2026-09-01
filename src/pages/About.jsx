import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PhotoCarousel from '../components/PhotoCarousel';
import {
  aboutPhotos,
  audienceTypes,
  certifications,
  DESIGNER_URL,
  trainerPhoto,
} from '../data/site';

const SWIPE_PX = 50;

/* ── Certifications carousel ─────────────────────────────── */
const CertificationsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState({});
  const touchStartX = useRef(0);
  const total = certifications.length;

  const go = useCallback(
    (dir) => setCurrent((prev) => (prev + dir + total) % total),
    [total]
  );

  useEffect(() => {
    if (paused) return undefined;
    const timer = setTimeout(() => setCurrent((prev) => (prev + 1) % total), 3500);
    return () => clearTimeout(timer);
  }, [current, paused, total]);

  return (
    <div className="about-certs">
      <p className="about-certs-label">Certifications</p>
      <div
        className="certs-frame"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Swipe matches the testimonials carousel, so both behave the same
            way on touch instead of one supporting it and the other not. */}
        <div
          className="certs-viewport"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > SWIPE_PX) go(diff > 0 ? 1 : -1);
          }}
        >
          <div className="certs-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {certifications.map((cert, i) => (
              <div className="certs-slide" key={cert.src}>
                {failed[cert.src] ? (
                  <div className="img-fallback" style={{ minHeight: 200 }}>{cert.alt}</div>
                ) : (
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    onError={() => setFailed((prev) => ({ ...prev, [cert.src]: true }))}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="certs-arrow prev"
          aria-label="Previous certificate"
          onClick={() => go(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="certs-arrow next"
          aria-label="Next certificate"
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>
      <div className="certs-dots">
        {certifications.map((cert, i) => (
          <button
            key={cert.src}
            type="button"
            className={`certs-dot${i === current ? ' active' : ''}`}
            aria-label={`Certificate ${i + 1} of ${total}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
      <p className="certs-caption">{certifications[current].alt}</p>
      <p className="swipe-hint">Swipe to browse</p>
    </div>
  );
};

/* ── Timeline beats ──────────────────────────────────────── */
const BEATS = [
  {
    key: 'c1',
    tone: 'beat-prarambha',
    tag: 'AGE 14',
    title: 'Where it started',
    body: 'I had absolutely no idea what I was doing, but I was fascinated by the weights, the machines, and let’s be honest, flexing in the mirror.',
  },
  {
    key: 'c2',
    tone: 'beat-shakti',
    tag: 'TURNING POINT',
    title: 'Then everything changed',
    body: 'Everything changed with professional cricket. Fitness wasn’t about how I looked anymore. It was how I performed, recovered, and felt on days I wasn’t training.',
    photo: aboutPhotos.cricket,
  },
  {
    key: 'c3',
    tone: 'beat-tapasya',
    tag: 'THE LAYERS',
    title: 'Fitness has layers',
    body: 'Real fitness is more than a mirror check. It’s science, mental discipline, and a holistic approach to taking care of your body.',
  },
];

const About = () => {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-about-card]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute('data-about-card');
          setRevealed((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((el) => observer.observe(el));

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const timeline = timelineRef.current;
      const line = progressRef.current;
      if (!timeline || !line) return;
      const rect = timeline.getBoundingClientRect();
      const total = Math.max(1, rect.height);
      const progress = Math.min(Math.max((window.innerHeight * 0.8 - rect.top) / total, 0), 1);
      line.style.transform = `scaleY(${progress})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };

    updateProgress();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero about-shell">
        <p className="about-dev">अनुशासन</p>
        <h1>My fitness journey</h1>
        <p className="about-sub">Told the way it actually happened.</p>
      </section>

      <section className="about-shell about-timeline" ref={timelineRef} aria-label="Journey timeline">
        <div className="about-line-bg" aria-hidden="true" />
        <div className="about-line-progress" ref={progressRef} aria-hidden="true" />

        {BEATS.map((beat) => (
          <div className={`about-beat ${beat.tone}`} data-about-card={beat.key} key={beat.key}>
            <div className="about-node" aria-hidden="true" />
            <article className={`about-card${revealed[beat.key] ? ' is-visible' : ''}`}>
              {beat.photo ? <PhotoCarousel slot={beat.photo} /> : null}
              <div className="about-card-body">
                <div className="about-card-head">
                  <span className="about-tag">{beat.tag}</span>
                </div>
                <h3>{beat.title}</h3>
                <p>{beat.body}</p>
              </div>
            </article>
          </div>
        ))}

        <div className="about-beat beat-ghor" data-about-card="c4">
          <div className="about-node" aria-hidden="true" />
          <div className={`about-lenses${revealed.c4 ? ' is-visible' : ''}`}>
            <p className="about-lenses-title">12-13 YEARS, TWO LENSES</p>
            <div className="about-lens-grid">
              <article className="about-card lens">
                <div className="about-card-body">
                  <p className="lens-head">THE REGULAR GUY</p>
                  <p>
                    Someone who just wanted to feel strong, energised, and confident walking into
                    any room.
                  </p>
                </div>
              </article>
              <article className="about-card lens alt">
                <div className="about-card-body">
                  <p className="lens-head alt">THE ATHLETE</p>
                  <p>
                    Someone who had to learn the exact science, grit, and structure it takes to
                    perform at the highest level.
                  </p>
                </div>
              </article>
            </div>
            <p className="about-bridge">
              I brought these two worlds together to become the coach I am today.
            </p>
          </div>
        </div>
      </section>

      <section className="about-quote">
        <p className="about-quote-dev">एकता</p>
        <p className="about-quote-text">
          &ldquo;Real progress doesn&rsquo;t come from doing more; it comes from doing what truly
          matters, with the right guidance and intent.&rdquo;
        </p>
      </section>

      <section className="about-trainer about-shell">
        <div className="about-trainer-grid">
          <div className="about-trainer-photo-wrap">
            <div className="about-trainer-ring" aria-hidden="true" />
            <img
              className="about-trainer-photo"
              src={trainerPhoto}
              alt="Advay Shidhaye, Master Trainer"
            />
          </div>
          <div className="about-trainer-copy">
            <span className="section-eyebrow">About the Master Trainer</span>
            <h2 className="section-title">From a curious teen to a conscious coach</h2>
            <p>
              Today, as a fitness professional, my aim is to build a tribe, a community of people
              who have discovered what fitness truly is:{' '}
              <strong>a sustainable lifestyle, not just a temporary goal.</strong>
            </p>
            <a href={DESIGNER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Connect on Instagram
            </a>
          </div>
        </div>

        <CertificationsCarousel />
      </section>

      <section className="about-why">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why join TTT?</h2>
            <p className="section-desc">
              Through years of coaching, we&rsquo;ve noticed three common types of people in fitness:
            </p>
          </div>

          <div className="about-why-grid">
            {audienceTypes.map((type) => (
              <div className="about-why-card" key={type.title}>
                <span className="num">{type.num}</span>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            ))}
          </div>

          <div className="about-solution">
            <p>
              Different journeys, same challenge: <strong>no real progress.</strong>
            </p>
            <p>
              And the missing link? <span className="accent">Professional guidance.</span>
            </p>
            <p>
              At The Tatva Tribe, our goal is to bridge that gap by providing a holistic, science-backed
              approach that helps you train smarter and live stronger. We don&rsquo;t just build
              fitter bodies; we build healthier lifestyles and stronger mindsets.
            </p>
            <div className="about-philosophy">
              <p className="about-philosophy-label">
                Because we believe in one simple philosophy:
              </p>
              <p className="about-philosophy-line">
                <span className="smart">SMARTWORK</span>
                <span className="gt">&gt;</span>
                <span>HARDWORK</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-tribe about-shell">
        <h2>Not a 30-day challenge. A permanent lifestyle.</h2>
        <p>
          I&rsquo;m not here to sell you a quick fix. My goal is to build a tribe of people ready to
          redefine what fitness means to them.
        </p>
        <p>
          A strong, capable body through a lifestyle you actually enjoy and can sustain for life.
        </p>
        <PhotoCarousel slot={aboutPhotos.coaching} className="about-photo-tribe" />
      </section>

      <section className="about-join">
        <h2>Ready to stop chasing temporary goals?</h2>
        <p>Let&rsquo;s build a strong, permanent you.</p>
        <Link to="/contact" className="btn btn-primary">
          Let&rsquo;s build it together
        </Link>
      </section>
    </div>
  );
};

export default About;
