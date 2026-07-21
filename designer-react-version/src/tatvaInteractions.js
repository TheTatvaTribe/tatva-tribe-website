/**
 * The Tatva Tribe — scroll & micro-interactions (vanilla, no dependencies).
 *
 * Sections: hero zoom · navbar glass · mobile nav · scroll-to-top · reveal ·
 * ripple · stacking Tatva cards · testimonial carousel · active-nav highlight.
 * (The pricing-card flip is owned by PlanCard.jsx via React state.)
 *
 * Returns a cleanup that removes every listener/timer/observer it created,
 * so the caller's React effect can tear it down safely.
 */
export function initTatvaInteractions() {
  const controller = new AbortController();
  const { signal } = controller;

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  const NAV_H = 68; // matches --nav-h in CSS

  /* ── 0. HERO ZOOM-IN SCROLL ──────────────────────────────
     As the user scrolls through the hero-scroll-zone, the
     background layers zoom in (1x → 3x) while the hero text
     fades out and the "7 Tatvas" reveal fades in.
  ─────────────────────────────────────────────────────── */
  const heroZone         = document.getElementById('heroScrollZone');
  const heroBgZoom       = document.getElementById('heroBgZoom');
  const heroContent      = document.getElementById('heroContent');
  const heroHint         = document.getElementById('heroScrollHint');
  const heroTatvasReveal = document.getElementById('heroTatvasReveal');

  function updateHeroZoom() {
    if (!heroZone || !heroBgZoom) return;

    const zoneTop   = heroZone.getBoundingClientRect().top;
    const scrolled  = Math.max(0, -zoneTop);                      // px into zone
    const maxScroll = heroZone.offsetHeight - window.innerHeight;  // total scroll runway
    const p         = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0; // 0→1

    // Background: zoom 1x → 3x (finishes by p=0.70, holds)
    const bgScale = 1 + Math.min(p / 0.70, 1) * 2;
    heroBgZoom.style.transform = `scale(${bgScale.toFixed(3)})`;

    // Hero content: fade out in the first 30% of scroll
    if (heroContent) {
      const op = Math.max(0, 1 - p / 0.30);
      heroContent.style.opacity   = op.toFixed(3);
      heroContent.style.transform = `translateY(${(p * -40).toFixed(1)}px)`;
    }

    // Scroll hint fades out quickly
    if (heroHint) heroHint.style.opacity = Math.max(0, 1 - p / 0.15).toFixed(3);

    // Tatvas reveal: in after a gap — fully visible at p=0.65
    if (heroTatvasReveal) {
      const inStart = 0.45, inEnd = 0.65;
      const revealIn = p < inStart ? 0 : p > inEnd ? 1 : (p - inStart) / (inEnd - inStart);
      const revealTY = (1 - revealIn) * 30;
      heroTatvasReveal.style.opacity   = revealIn.toFixed(3);
      heroTatvasReveal.style.transform = `translateY(${revealTY.toFixed(1)}px)`;
    }
  }

  /* ── 1. NAVBAR scroll glass + scroll-top button ──────── */
  const navbar       = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function onScroll() {
    const y = window.scrollY;
    if (navbar)       navbar.classList.toggle('scrolled', y > 60);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 400);
    updateHeroZoom();
  }
  window.addEventListener('scroll', onScroll, { passive: true, signal });
  onScroll();

  /* ── 2. MOBILE nav toggle ─────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    }, { signal });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }, { signal })
    );
  }

  /* ── 3. SCROLL TO TOP ─────────────────────────────────── */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' }),
    { signal });
  }

  /* ── 4. REVEAL ON SCROLL (IntersectionObserver) ───────── */
  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

  /* ── 5. RIPPLE on .ripple-btn ──────────────────────────── */
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const r    = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const rpl  = document.createElement('span');
      rpl.className = 'ripple';
      rpl.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size/2}px;top:${e.clientY - r.top - size/2}px`;
      btn.appendChild(rpl);
      rpl.addEventListener('animationend', () => rpl.remove());
    }, { signal });
  });

  /* ── 6. STACKING TATVA CARDS ─────────────────────────────
     As the user scrolls through .tatvas-stack, each card
     becomes the "active" (top) card. Cards underneath scale
     down and dim for a deck-of-cards depth effect. Progress
     dots in the corner track the active card.
  ─────────────────────────────────────────────────────── */
  const stack         = document.getElementById('tatvasStack');
  const stackProgress = document.getElementById('stackProgress');
  const spDots        = stackProgress ? [...stackProgress.querySelectorAll('.sp-dot')] : [];
  let   lastActiveIdx = -1;

  function updateStack() {
    if (!stack || !stackProgress) return;

    const stackRect = stack.getBoundingClientRect();
    const scrolled  = Math.max(0, NAV_H - stackRect.top); // px into the sticky zone
    const vh        = window.innerHeight - NAV_H;         // scroll unit per card
    const cards     = [...stack.querySelectorAll('.tatva-card-full')];
    const n         = cards.length;

    const activeIdx = Math.min(Math.floor(scrolled / vh), n - 1);

    const inStack = stackRect.top < window.innerHeight && stackRect.bottom > NAV_H;
    stackProgress.classList.toggle('active', inStack && scrolled > 0);

    if (activeIdx !== lastActiveIdx) {
      spDots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));
      lastActiveIdx = activeIdx;
    }

    cards.forEach((card, i) => {
      if (scrolled < i * vh) {
        card.style.transform = '';
        card.style.filter    = '';
        return;
      }
      const buried = Math.floor((scrolled - i * vh) / vh);
      if (buried === 0) {
        card.style.transform = '';
        card.style.filter    = '';
      } else {
        const scale      = Math.max(0.84, 1 - buried * 0.04);
        const brightness = Math.max(0.25, 1 - buried * 0.2);
        card.style.transform = `scale(${scale.toFixed(3)})`;
        card.style.filter    = `brightness(${brightness.toFixed(2)})`;
      }
    });
  }
  window.addEventListener('scroll', updateStack, { passive: true, signal });
  updateStack();

  /* ── 7. TESTIMONIAL CAROUSEL ─────────────────────────────
     4 slides, auto-advances every 5s, pauses on hover.
     Prev / Next buttons + dot navigation + touch swipe.
  ─────────────────────────────────────────────────────── */
  const track    = document.getElementById('carouselTrack');
  const prevBtn  = document.getElementById('carouselPrev');
  const nextBtn  = document.getElementById('carouselNext');
  const dotsWrap = document.getElementById('carouselDots');
  let   autoTimer = null;

  if (track && prevBtn && nextBtn && dotsWrap) {
    const slides = [...track.querySelectorAll('.testimonial-slide')];
    const dots   = [...dotsWrap.querySelectorAll('.c-dot')];
    const total  = slides.length;
    let   current = 0;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
        d.setAttribute('aria-selected', String(i === current));
      });
    }
    function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 5000); }
    function stopAuto()  { clearInterval(autoTimer); autoTimer = null; }

    prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); }, { signal });
    nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); }, { signal });
    dots.forEach(d => d.addEventListener('click', () => { stopAuto(); goTo(+d.dataset.index); startAuto(); }, { signal }));

    const carouselEl = document.getElementById('carousel');
    if (carouselEl) {
      carouselEl.addEventListener('mouseenter', stopAuto, { signal });
      carouselEl.addEventListener('mouseleave', startAuto, { signal });
    }

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true, signal });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { stopAuto(); goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
    }, { signal });

    goTo(0);
    startAuto();
  }

  /* ── 8. ACTIVE NAV HIGHLIGHT on scroll ─────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top <= 100) current = s.id; });
    navAnchors.forEach(a => {
      // Skip the CTA pill — it has its own solid background, and forcing the
      // cream text colour on it produces low-contrast cream-on-gold.
      if (a.classList.contains('nav-cta')) return;
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--cream)' : '';
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true, signal });
  updateActiveNav();

  return () => {
    controller.abort();
    if (autoTimer) clearInterval(autoTimer);
    revealObs.disconnect();
  };
}
