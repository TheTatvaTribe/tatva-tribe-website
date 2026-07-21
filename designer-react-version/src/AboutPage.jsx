import { useEffect, useRef, useState } from 'react';

// Deploy base ('/' locally, '/sub-path/' when published under one) so the
// links back to the home page resolve correctly wherever this is hosted.
const BASE = import.meta.env.BASE_URL;

function AboutPage() {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const [revealed, setRevealed] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('[data-about-card]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const key = entry.target.getAttribute('data-about-card');
        setRevealed((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
      });
    }, { threshold: 0.15 });

    cards.forEach((el) => observer.observe(el));

    const updateProgress = () => {
      const timeline = timelineRef.current;
      const line = progressRef.current;
      if (!timeline || !line) return;
      const rect = timeline.getBoundingClientRect();
      const total = Math.max(1, rect.height);
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.8 - rect.top) / total));
      line.style.transform = `scaleY(${progress})`;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <main className="about-mobile-page">
      <nav className="navbar" id="navbar">
        <div className="nav-inner">
          <a href={BASE} className="nav-logo" aria-label="The Tatva Tribe Home">
            <span className="logo-devanagari">तत्व</span>
            <span className="logo-text">TRIBE</span>
          </a>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={navOpen ? 'true' : 'false'}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
          <ul className={['nav-links', navOpen ? 'open' : ''].join(' ')} role="list">
            <li><a href={`${BASE}#tatvas`} className="nav-link" onClick={() => setNavOpen(false)}>The 7 Tatvas</a></li>
            <li><a href={`${BASE}#services`} className="nav-link" onClick={() => setNavOpen(false)}>Plans</a></li>
            <li><a href={`${BASE}about`} className="nav-link" onClick={() => setNavOpen(false)}>About</a></li>
            <li><a href={`${BASE}#testimonials`} className="nav-link" onClick={() => setNavOpen(false)}>Stories</a></li>
            <li><a href={`${BASE}#contact`} className="nav-link nav-cta" onClick={() => setNavOpen(false)}>Free Consult</a></li>
          </ul>
        </div>
      </nav>

      <section className="about-mobile-hero">
        <p className="about-mobile-dev">अनुशासन</p>
        <h1>My fitness journey</h1>
        <p className="about-mobile-sub">My fitness journey, told the way it actually happened.</p>
      </section>

      <section className="about-mobile-timeline-wrap" ref={timelineRef}>
        <div className="about-mobile-line-bg" />
        <div className="about-mobile-line-progress" ref={progressRef} />

        <div className="about-mobile-beat beat-prarambha" data-about-card="c1">
          <div className="about-mobile-node" />
          <article className={revealed.c1 ? 'about-mobile-card is-visible' : 'about-mobile-card'}>
            <div className="about-mobile-card-head">
              <span className="about-mobile-tag">AGE 14</span>
            </div>
            <h3>Where it started</h3>
            <p>I had absolutely no idea what I was doing - but I was fascinated by the weights, the machines, and let's be honest, flexing in the mirror.</p>
          </article>
        </div>

        <div className="about-mobile-beat beat-shakti" data-about-card="c2">
          <div className="about-mobile-node" />
          <article className={revealed.c2 ? 'about-mobile-card is-visible' : 'about-mobile-card'}>
            <div className="about-mobile-photo">Drop a cricket action photo</div>
            <div className="about-mobile-card-body">
              <div className="about-mobile-card-head">
                <span className="about-mobile-tag">TURNING POINT</span>
              </div>
              <h3>Then everything changed</h3>
              <p>Everything changed with professional cricket. Fitness wasn't about how I looked anymore - it was how I performed, recovered, and felt on days I wasn't training.</p>
            </div>
          </article>
        </div>

        <div className="about-mobile-beat beat-tapasya" data-about-card="c3">
          <div className="about-mobile-node" />
          <article className={revealed.c3 ? 'about-mobile-card is-visible' : 'about-mobile-card'}>
            <h3>Fitness has layers</h3>
            <p>Real fitness is more than a mirror check. It's science, mental discipline, and a holistic approach to taking care of your body.</p>
          </article>
        </div>

        <div className="about-mobile-beat beat-ghor" data-about-card="c4">
          <div className="about-mobile-node" />
          <div className={revealed.c4 ? 'about-mobile-lenses is-visible' : 'about-mobile-lenses'}>
            <div className="about-mobile-lenses-title">12-13 YEARS, TWO LENSES</div>
            <article className="about-mobile-card lens lens-prarambha">
              <p className="lens-head">THE REGULAR GUY</p>
              <p>Someone who just wanted to feel strong, energized, and confident walking into any room.</p>
            </article>
            <article className="about-mobile-card lens alt lens-ghor">
              <p className="lens-head alt">THE ATHLETE</p>
              <p>Someone who had to learn the exact science, grit, and structure it takes to perform at the highest level.</p>
            </article>
            <p className="about-mobile-bridge">I brought these two worlds together to become the coach I am today.</p>
          </div>
        </div>
      </section>

      <section className="about-mobile-quote">
        <p className="about-mobile-quote-dev">एकता</p>
        <p className="about-mobile-quote-text">
          "Real progress doesn't come from doing more; it comes from doing what truly matters - with the right guidance and intent."
        </p>
      </section>

      <section className="about-mobile-tribe">
        <h2>Not a 30-day challenge. A permanent lifestyle.</h2>
        <p>I'm not here to sell you a quick fix. My goal is to build a tribe - people ready to redefine what fitness means to them.</p>
        <p>A strong, capable body through a lifestyle you actually enjoy and can sustain for life.</p>
        <div className="about-mobile-photo">Drop a coaching moment photo</div>
      </section>

      <section className="about-mobile-join" id="join">
        <h2>Ready to stop chasing temporary goals?</h2>
        <p>Let's build a strong, permanent you.</p>
        {submitted ? (
          <div className="about-mobile-success">
            <p className="ok">You're in.</p>
            <p>Expect an email soon - saath milkar, let's build it together.</p>
          </div>
        ) : (
          <form className="about-mobile-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <input type="text" required placeholder="Your name" />
            <input type="email" required placeholder="Your email" />
            <button type="submit">LET'S BUILD IT TOGETHER</button>
          </form>
        )}
      </section>

      <footer className="about-mobile-footer">© 2026 - Built one honest rep at a time.</footer>
    </main>
  );
}

export default AboutPage;
