# Designer Interaction Prototype — Review

| | |
|---|---|
| **What this is** | A standalone static prototype (HTML/CSS/JS + GSAP) sent by the designer, demonstrating a scrollytelling redesign of the site. |
| **Branch** | `claude/designer-interactions-review` (off `main`) — **testing only, NOT merged, NOT deployed.** |
| **Location** | `design-prototype/` (`index.html`, `styles.css`, `scripts.js`, `MICRO_INTERACTIONS.md`) |
| **Relationship to the live site** | **None yet.** This is a *separate* vanilla codebase, not a change to the React/Vite app. It does not touch `src/`. "Integrating" it later is a separate, larger effort — see §6. |

## How to run the demo

```bash
npx vite design-prototype --port 5174
# open http://localhost:5174
```

(GSAP and fonts load from CDNs; the 7 Tatva images hot-link from `https://thetatvatribe.com`, so an internet connection is needed.)

---

## 1. Verdict

The prototype is **ambitious and largely works** — the headline scrollytelling sequence (hero zoom → stacking Tatva cards → orbiting service cards → horizontal rail) is genuinely impressive and runs smoothly. Core interactions are functional.

However, it is a **prototype, not production-ready**, and the accompanying `MICRO_INTERACTIONS.md` is **significantly out of sync** with the actual code (it documents 19 interactions; several don't exist in the files, and several that *do* exist aren't documented). There's also dead code (GSAP), one visibly broken affordance (service-card "tap for more info"), and a couple of robustness/accessibility gaps.

**Nothing here is wired into the real website. No decision to ship is implied.**

---

## 2. Interaction-by-interaction results

Verified by driving the served page in a headless browser (scroll position + dispatched scroll events, class/transform/opacity assertions). ✅ works · ⚠️ works with caveat · ❌ broken/dead · ⬚ documented but not present.

| # (per designer doc) | Interaction | Status | Notes |
|---|---|---|---|
| — | **Hero zoom-in on scroll** (undocumented) | ✅ | bg scales 1→3×, content fades out. Smooth. The marquee effect of the prototype. |
| 1 | Navbar glass on scroll | ✅ | `.scrolled` added past 60px; backdrop-blur applies. |
| 2 | Logo Devanagari wobble | ✅ | CSS hover transform present. |
| 3 | Nav links sliding underline | ✅ | CSS `::after` width 0→60%. |
| 4 | Buttons scale + ripple | ✅ | Ripple span created at click point (verified). |
| 5 | Hero mandala rings | ✅ | `mandala-spin` running. |
| 6 | Hero headline shimmer | ✅ | `shimmer-text` running on स्मार्टवर्क. |
| 7 | Scroll-hint bob | ✅ | `scroll-bob` running. |
| 8 | Ticker / marquee | ⬚ | **Not in the prototype.** No `.ticker` in HTML or CSS. |
| 9 | Stat cards counter (200+/7/3+/100%) | ⬚ | **Not present.** No stats section or counter JS. |
| 10 | Tatva 3D tilt | ❌ | JS targets `.tatva-card`, which **doesn't exist** (HTML uses `.tatva-card-full`). Replaced by the stacking deck below; the tilt code is dead. |
| — | **Tatva stacking deck** (undocumented) | ✅ | 7 cards stack/scale/dim; progress dots track active card (verified 1→…→7). Excellent. |
| 11 | Section reveal on scroll | ⚠️ | Works (IntersectionObserver adds `.visible`). Caveat: content is `opacity:0` until JS runs — see §3.4. |
| 12 | About pillars slide | ⬚ | **Not present.** `.about-*` CSS exists but there is no About section in the HTML (orphan CSS). |
| 13 | Badge pulse | ⬚ | **Not present.** `.about-badge` CSS is orphan. |
| 14 | Services orbit → rail transition | ✅ | Staged sequence verified: orbit cards fly into formation → center copy fades in → rail appears. |
| 15 | Services rail horizontal scroll | ⚠️ | Visually works, BUT the rail is **non-interactive** (`pointer-events:none`) and card flip is dead — see §3.2. |
| 16 | Footer link underline | ✅ | CSS present. |
| 17 | Social icon scale/lift | ✅ | CSS present. |
| 18 | Scroll-to-top button | ✅ | Appears past 400px; click handler correct. |
| 19 | Active nav highlight | ✅ | Correct link highlights per section (verified "Stories" in testimonials). |
| — | Testimonial carousel (undocumented) | ✅ | Prev/next/dots/wraparound + autoplay + swipe all work. |
| — | Service-card front/back flip (in HTML) | ❌ | Back face is `display:none`, no flip JS — see §3.2. |

**Headline finding:** the prototype's *real* showpieces (hero zoom, stacking deck, orbit→rail, carousel) aren't in the designer's doc at all, while ~5 documented interactions (#8, #9, #10, #12, #13) aren't in the prototype. The doc appears to describe an **earlier, different version**.

---

## 3. Bugs & issues to fix

### 3.1 GSAP is loaded but never used (dead weight) — Medium
`index.html` loads `gsap` + `ScrollTrigger` (~70 KB, two render-blocking CDN scripts). The function that uses them, `initServicesRailScrollTrigger()`, **is defined but never called** — the rail actually runs on a hand-written scroll handler (`updateProgramsOrbit`). The doc claims "GSAP + ScrollTrigger are used." → Either delete GSAP and the dead function, or switch the rail to actually use it. As-is it's pure overhead.

### 3.2 Services rail looks interactive but isn't — Medium
Each service card shows **"TAP FOR MORE INFO"** and has a fully built back face ("Book a session", stats, etc.), but:
- `.service-face-back { display: none }` and there is **no flip JS**, so the back is unreachable.
- `.services-rail-viewport { pointer-events: none }`, so the cards and their buttons aren't clickable at all.

Net effect: a prominent call-to-action that does nothing. Either wire up the flip/tap, or remove the "tap for more info" prompt and the back faces.

### 3.3 Documentation ↔ code mismatch + orphan CSS — Medium (cleanup)
`MICRO_INTERACTIONS.md` should be rewritten to match what's actually built. Several CSS blocks have no corresponding HTML and can be deleted: `.about-*`, `.pillar-item`, `.service-row`/`.sr-*`, `.tatva-tag`/`.tatva-tooltip`, ticker styles. This is a meaningful chunk of the 912-line stylesheet.

### 3.4 Reveal content is invisible if JS fails — Medium (robustness)
All `.reveal-up` content (testimonials, CTA) starts at `opacity:0` and only appears when JS adds `.visible`. If `scripts.js` throws before the observer is set up (or is blocked), those sections stay **permanently invisible**. Safer pattern: reveal *from* a visible baseline, or add a `<noscript>`/no-JS fallback that sets opacity to 1. (The mechanism itself works — all 3 reveal elements received `.visible` in testing.)

### 3.5 Reduced-motion only half-honored — Medium (accessibility)
The doc claims `prefers-reduced-motion` "disables all animations." It disables **CSS** animations/transitions, but the big **JS scroll-driven transforms** (hero zoom, card stacking, orbit) set inline styles directly and keep running. For motion-sensitive users the most intense effects still fire. → Gate the scroll handlers on `matchMedia('(prefers-reduced-motion: reduce)')` too.

### 3.6 Prototype isn't self-contained — Low
The 7 Tatva images hot-link `https://thetatvatribe.com/images/tatvas/*.png`. The demo breaks offline or if those paths change. For a portable prototype, copy the images in locally. (They do load correctly when online — verified 7/7.)

### 3.7 Minor
- **Stale theme comment:** CSS header says "Lemon Yellow #D4E84A + Forest Green," but `--yellow` is actually the brand gold `#D4AF37`. The lemon/green only appears as per-card accents. Harmless but confusing.
- **Active-nav inline color:** `updateActiveNav` sets `style.color` on links; if the yellow "Free Consult" CTA ever becomes "active" it'd get low-contrast cream-on-yellow text. Cosmetic.

---

## 4. What works well

- The **scroll choreography** is the standout — hero zoom into the stacking deck into the orbit→rail is genuinely premium and ran without jank in testing.
- **Carousel** is solid: autoplay, hover-pause, prev/next, dots, wraparound, and touch-swipe all work.
- **Accessibility basics** are present: `:focus-visible` rings, `aria-expanded` on the mobile toggle, `aria-label`s, semantic landmarks.
- **Responsive**: mobile nav (hamburger → drawer → closes on link tap) works; dedicated breakpoints at 960px and 640px for the heavy sections.
- **No console errors**, no failed requests (besides one benign aborted initial navigation), all fonts + images load.

---

## 5. Testing method & caveats

- Driven via the live dev server in a headless browser: scroll positions set programmatically with `scroll` events dispatched (this engine doesn't emit them on programmatic scroll), then asserted on classes/transforms/opacity.
- The preview tab renders **hidden** (`document.visibilityState === 'hidden'`), which pauses some compositor-driven CSS transitions — the CTA's fade-in couldn't be visually confirmed for that reason, though its `.visible` class is correctly applied. Best confirmed on a real device.
- The sandbox screenshot tool is unreliable (tiles/letterboxes); layout was therefore verified mostly via DOM geometry. **Recommend a real-device pass** (especially iOS Safari) before any decision, since pinned/sticky scroll math is the most device-sensitive part.

---

## 6. If you decide to move forward (later)

This prototype is a **separate vanilla codebase**, not a drop-in change. Options, roughly in order of effort:

1. **Keep as a standalone marketing page** served at a path — least work, but two codebases to maintain.
2. **Port the interactions into the React app** — rebuild hero/tatvas/services/testimonials as React components using the existing Tailwind tokens. Most work, but one codebase and keeps the contact form, routing, favicons, domain, etc.
3. **Cherry-pick individual interactions** (e.g. just the stacking Tatva cards) into the current site.

My recommendation: treat this as a **design reference** to validate the direction with the client first; the fixes in §3 (especially the dead GSAP, the broken rail tap, and the reduced-motion gap) should be resolved *before* any port so they don't get baked in.
