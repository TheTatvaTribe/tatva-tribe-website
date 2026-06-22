/**
 * The Tatva Tribe — scripts.js
 * Micro-interactions: Navbar | Reveal | Ripple | Tilt | Carousel | Stack scroll | Active nav
 * Vanilla JS only. Zero dependencies.
 */

(function () {
  'use strict';

  const NAV_H = 68; // matches --nav-h in CSS

  /* ── 0. HERO ZOOM-IN SCROLL ──────────────────────────────
     As the user scrolls through the 300vh hero-scroll-zone,
     the background layers zoom in (1x → 3x) while the hero
     text content fades out. When the zone is fully scrolled,
     the first Tatva stacking card naturally takes over.
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
    // Card enters viewport bottom at p≈0.67, so text is complete before card appears
    if (heroTatvasReveal) {
      const inStart = 0.45, inEnd = 0.65;
      const revealIn = p < inStart ? 0 : p > inEnd ? 1 : (p - inStart) / (inEnd - inStart);
      const revealTY = (1 - revealIn) * 30;
      heroTatvasReveal.style.opacity   = revealIn.toFixed(3);
      heroTatvasReveal.style.transform = `translateY(${revealTY.toFixed(1)}px)`;
    }
  }

  /* ── 1. NAVBAR scroll glass + scroll-top button ──────── */
  const navbar      = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    scrollTopBtn.classList.toggle('visible', y > 400);
    updateHeroZoom();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 2. MOBILE nav toggle ─────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );

  /* ── 3. SCROLL TO TOP ─────────────────────────────────── */
  scrollTopBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ── 4. REVEAL ON SCROLL (IntersectionObserver) ─────────
     Elements with .reveal-up / .reveal-left / .reveal-right
     fade + slide in when they enter the viewport.
  ─────────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => revealObs.observe(el));

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
    });
  });

  /* ── 6. TATVA CARD 3D TILT (desktop hover) ──────────────
     Removed from full-stack cards (they're now full-page).
     Applied to any remaining small .tatva-card if present.
  ─────────────────────────────────────────────────────── */
  document.querySelectorAll('.tatva-card').forEach(card => {
    const S = 6;
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const dx = (e.clientX - left - width / 2) / (width / 2);
      const dy = (e.clientY - top - height / 2) / (height / 2);
      card.style.transform = `perspective(700px) rotateX(${-dy*S}deg) rotateY(${dx*S}deg) translateY(-8px) scale(1.01)`;
    });
    card.addEventListener('mouseenter', () => { card.style.transition = 'transform .1s ease'; });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
    });
  });

  /* ── 7. STACKING TATVA CARDS ─────────────────────────────
     As the user scrolls through .tatvas-stack, each card
     becomes the "active" (top) card. Cards underneath scale
     down and dim to give a depth / deck-of-cards feel.
     Progress dots in the corner update accordingly.
  ─────────────────────────────────────────────────────── */
  const stack         = document.getElementById('tatvasStack');
  const stackProgress = document.getElementById('stackProgress');
  const servicesWash  = document.getElementById('servicesWash');
  const spDots        = stackProgress ? [...stackProgress.querySelectorAll('.sp-dot')] : [];
  let   lastActiveIdx = -1;
  let   handoffWashProgress = 0;
  let   washTarget = 0;
  let   washCurrent = 0;
  let   washRafId = 0;

  function clamp01(v) {
    return Math.max(0, Math.min(v, 1));
  }

  function liquidEase(t) {
    const x = clamp01(t);
    const eased = 1 - Math.pow(1 - x, 3);
    const momentum = Math.sin(Math.PI * x) * 0.08;
    return clamp01(eased + momentum * (1 - x * 0.45));
  }

  function renderWashBlob(ts) {
    washCurrent += (washTarget - washCurrent) * 0.18;
    const p = clamp01(washCurrent);

    if (!servicesWash) return;

    if (p < 0.003 && washTarget < 0.003) {
      servicesWash.classList.remove('is-active');
      servicesWash.style.opacity = '0';
      washRafId = 0;
      return;
    }

    servicesWash.classList.add('is-active');
    servicesWash.style.opacity = String(Math.min(0.72, p * 0.9));

    const w = window.innerWidth;
    const h = Math.max(1, window.innerHeight);
    const cx = w * 0.48;
    const cy = h * 0.56;
    const maxR = Math.hypot(w, h) * 1.14;
    const wobbleAmp = maxR * (0.018 + (1 - p) * 0.05);

    for (let i = 0; i < 12; i++) {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / 12;
      const directionalBias = 1 + 0.32 * ((-Math.cos(a) - Math.sin(a)) * 0.5);
      const localP = clamp01(p * 1.08 * directionalBias);
      const growth = liquidEase(localP);
      const ripple = Math.sin(ts * 0.0038 + i * 0.95 + p * 8.5) * wobbleAmp;
      const r = maxR * growth + ripple;

      const px = ((cx + r * Math.cos(a)) / w) * 100;
      const py = ((cy + r * Math.sin(a)) / h) * 100;
      servicesWash.style.setProperty(`--w${i + 1}x`, `${px.toFixed(2)}%`);
      servicesWash.style.setProperty(`--w${i + 1}y`, `${py.toFixed(2)}%`);
    }

    washRafId = requestAnimationFrame(renderWashBlob);
  }

  function setWashProgress(nextProgress) {
    washTarget = clamp01(nextProgress);
    if (!washRafId) washRafId = requestAnimationFrame(renderWashBlob);
  }

  function updateStack() {
    if (!stack) return;

    const stackRect = stack.getBoundingClientRect();
    // px scrolled past the top of the stack into the sticky zone
    const scrolled  = Math.max(0, NAV_H - stackRect.top);
    const vh        = window.innerHeight - NAV_H;  // scroll unit per card
    const cards     = [...stack.querySelectorAll('.tatva-card-full')];
    const n         = cards.length;

    // Active card index (clamped to last card)
    const activeIdx = Math.min(Math.floor(scrolled / vh), n - 1);

    // Show/hide the progress dots when stack is in view
    const inStack = stackRect.top < window.innerHeight && stackRect.bottom > NAV_H;
    stackProgress.classList.toggle('active', inStack && scrolled > 0);

    // Update dots
    if (activeIdx !== lastActiveIdx) {
      spDots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));
      lastActiveIdx = activeIdx;
    }

    // Apply scale + brightness to each card based on depth
    cards.forEach((card, i) => {
      if (scrolled < i * vh) {
        // Not yet reached — reset
        card.style.transform = '';
        card.style.filter    = '';
        return;
      }
      // How many cards are piled on top of card i?
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

    const stackUnits = scrolled / vh;
    handoffWashProgress = inStack && activeIdx === n - 1
      ? clamp01((stackUnits - (n - 1) - 0.58) / 0.5)
      : 0;
  }

  window.addEventListener('scroll', updateStack, { passive: true });
  updateStack();

  /* ── 8. PROGRAMS ORBIT ZOOM TRANSITION ───────────────────
     After Tatvas, cards zoom out and settle into a circle,
     with center copy appearing as the orbit locks in place.
  ─────────────────────────────────────────────────────── */
  const programsOrbit = document.querySelector('.programs-orbit-section');
  const orbitCards    = programsOrbit ? [...programsOrbit.querySelectorAll('.orbit-card')] : [];
  const orbitCenter   = document.getElementById('orbitCenterCopy');
  const servicesRail  = document.getElementById('servicesRail');
  const servicesRailViewport = document.getElementById('servicesRailViewport');
  let servicesRailST = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function initServicesRailScrollTrigger() {
    if (!programsOrbit || !servicesRail || !servicesRailViewport) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    const stickyWrap = programsOrbit.querySelector('.programs-orbit-sticky');
    if (!stickyWrap) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    const cards = [...servicesRail.querySelectorAll('.service-mini-card')];
    if (cards.length < 2) return;

    function buildRailTrigger() {
      if (servicesRailST) {
        servicesRailST.kill();
      }

      const first = servicesRail.querySelector('.service-mini-card[data-service-card="1"]') || cards[0];
      const last = servicesRail.querySelector('.service-mini-card[data-service-card="5"]') || cards[cards.length - 1];
      gsap.set(servicesRail, { x: 0 });
      const vpRect = servicesRailViewport.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const vpCenter = vpRect.left + vpRect.width / 2;
      const firstCenter = firstRect.left + firstRect.width / 2;
      const lastCenter = lastRect.left + lastRect.width / 2;
      const startX = vpCenter - firstCenter;
      const endX = vpCenter - lastCenter;
      const travel = Math.abs(endX - startX);
      gsap.set(servicesRail, { x: startX });

      servicesRailST = ScrollTrigger.create({
        trigger: programsOrbit,
        start: 'top top',
        end: `+=${Math.max(2200, travel * 2.6)}`,
        pin: programsOrbit,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const moveProgress = clamp01((self.progress - 0.84) / 0.16);
          const nextX = startX + (endX - startX) * moveProgress;
          gsap.set(servicesRail, { x: nextX });
        },
        onRefresh: () => {
          gsap.set(servicesRail, { x: startX });
        }
      });
      ScrollTrigger.refresh();
    }

    buildRailTrigger();

    window.addEventListener('load', () => {
      buildRailTrigger();
    }, { once: true });

    let railResizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(railResizeTimer);
      railResizeTimer = window.setTimeout(buildRailTrigger, 130);
    });
  }

  function updateProgramsOrbit() {
    if (!programsOrbit || orbitCards.length === 0) return;

    const rect      = programsOrbit.getBoundingClientRect();
    const stageH    = window.innerHeight - NAV_H;
    const maxScroll = Math.max(1, programsOrbit.offsetHeight - stageH);
    const scrolled  = Math.max(0, NAV_H - rect.top);
    const p         = Math.min(scrolled / maxScroll, 1);
    const eased     = easeOutCubic(p);

    const circleR   = Math.min(window.innerWidth, stageH) * 0.22;
    const xStep     = Math.min(window.innerWidth * 0.16, 170);
    const yStep     = Math.min(stageH * 0.13, 88);
    const startY    = [0.07, -0.06, 0.10, -0.03, 0.08];
    const startRot  = [-14, 10, -7, 12, -10];

    orbitCards.forEach((card, i) => {
      const startX       = (i - 2) * xStep;
      const startYOffset = startY[i] * stageH + yStep * 0.2;

      const angle   = -Math.PI / 2 + (i * (2 * Math.PI / orbitCards.length));
      const targetX = Math.cos(angle) * circleR;
      const targetY = Math.sin(angle) * circleR;

      const x = startX + (targetX - startX) * eased;
      const y = startYOffset + (targetY - startYOffset) * eased;
      const s = 1.05 + (0.62 - 1.05) * eased;
      const r = startRot[i] * (1 - eased);
      const cardVisible = 1 - clamp01((p - 0.2) / 0.16);
      const topLiftPhase = 1 - clamp01((p - 0.32) / 0.2);
      const topLift = (i === 1 || i === 3) ? -Math.min(stageH * 0.18, 130) * topLiftPhase : 0;

      card.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${(y + topLift).toFixed(1)}px) scale(${s.toFixed(3)}) rotate(${r.toFixed(2)}deg)`;
      card.style.opacity = cardVisible.toFixed(3);
      card.style.visibility = cardVisible < 0.03 ? 'hidden' : 'visible';
    });

    if (orbitCenter) {
      const centerIn  = Math.max(0, Math.min((p - 0.32) / 0.14, 1));
      const centerOut = 1 - Math.max(0, Math.min((p - 0.64) / 0.14, 1));
      const centerOp  = centerIn * centerOut;
      orbitCenter.style.opacity = centerOp.toFixed(3);
      orbitCenter.style.transform = `translate(-50%, -50%) scale(${(0.92 + centerIn * 0.08).toFixed(3)})`;
    }

    if (servicesRail) {
      const railIn = clamp01((p - 0.78) / 0.08);
      servicesRail.style.opacity = railIn.toFixed(3);
      const moveRaw = clamp01((p - 0.86) / 0.14);
      const moveProgress = moveRaw * moveRaw * moveRaw;
      const first = servicesRail.querySelector('.service-mini-card[data-service-card="1"]');
      const last = servicesRail.querySelector('.service-mini-card[data-service-card="5"]');
      const viewportW = servicesRailViewport ? servicesRailViewport.clientWidth : window.innerWidth;
      const startX = first
        ? (viewportW / 2) - (first.offsetLeft + first.offsetWidth / 2)
        : -window.innerWidth * 0.42;
      const endX = last
        ? (viewportW / 2) - (last.offsetLeft + last.offsetWidth / 2)
        : -window.innerWidth * 0.03;
      const railX = startX + (endX - startX) * moveProgress;
      servicesRail.style.transform = `translate3d(${railX.toFixed(1)}px, -50%, 0)`;
    }

    const servicesInView = rect.top < window.innerHeight && rect.bottom > NAV_H;
    const servicesWashProgress = servicesInView ? clamp01((p - 0.34) / 0.52) : 0;
    setWashProgress(servicesWashProgress);
  }

  // Keep services progression tied to section scroll math for stable sequencing.
  window.addEventListener('scroll', updateProgramsOrbit, { passive: true });
  window.addEventListener('resize', updateProgramsOrbit);
  updateProgramsOrbit();

  /* ── 9. TESTIMONIAL CAROUSEL ─────────────────────────────
     4 slides, auto-advances every 5 s, pauses on hover.
     Prev / Next buttons + dot navigation.
  ─────────────────────────────────────────────────────── */
  const track     = document.getElementById('carouselTrack');
  const prevBtn   = document.getElementById('carouselPrev');
  const nextBtn   = document.getElementById('carouselNext');
  const dotsWrap  = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn && dotsWrap) {
    const slides    = [...track.querySelectorAll('.testimonial-slide')];
    const dots      = [...dotsWrap.querySelectorAll('.c-dot')];
    const total     = slides.length;
    let   current   = 0;
    let   autoTimer = null;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
        d.setAttribute('aria-selected', String(i === current));
      });
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    }
    function stopAuto() {
      clearInterval(autoTimer);
    }

    prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach(d => d.addEventListener('click', () => { stopAuto(); goTo(+d.dataset.index); startAuto(); }));

    // Pause auto-play on hover
    const carouselEl = document.getElementById('carousel');
    carouselEl.addEventListener('mouseenter', stopAuto);
    carouselEl.addEventListener('mouseleave', startAuto);

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { stopAuto(); goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
    });

    goTo(0);
    startAuto();
  }

  /* ── 10. ACTIVE NAV HIGHLIGHT on scroll ─────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(s => { if (s.getBoundingClientRect().top <= 100) current = s.id; });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--cream)' : '';
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
