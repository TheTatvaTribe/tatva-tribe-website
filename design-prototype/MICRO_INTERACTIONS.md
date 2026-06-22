# Micro-Interactions — The Tatva Tribe Website

A plain-language guide to every micro-interaction on the site: what it does, where it lives, and how it works. Designed to be easy to explain to anyone — developer or not.

---

## What is a Micro-Interaction?

A **micro-interaction** is a tiny, purposeful animation or visual response that happens when a user does something (scrolls, hovers, clicks) or when the page is loading. They make the site feel *alive* and intuitive — without adding extra weight or confusing the user.

Rule of thumb: **if you notice it, it's too much. If you miss it, it's just right.**

---

## 1. Navbar — Scroll-triggered Glass Effect

| Property | Detail |
|---|---|
| **Where** | Top navigation bar |
| **Trigger** | User scrolls more than 60px down |
| **Effect** | Background goes from transparent → dark blur (frosted glass look) |
| **Code** | JS `onScroll()` adds `.scrolled` class → CSS `backdrop-filter: blur(12px)` |

**Why:** At the top of the page the navbar blends with the hero. Once you scroll, it needs to be readable against any background — the glass effect does this without a harsh solid bar.

---

## 2. Logo — Devanagari Wobble

| Property | Detail |
|---|---|
| **Where** | "तत्व" text in the navbar logo |
| **Trigger** | Hovering over the logo |
| **Effect** | The Devanagari text rotates -4° and scales up slightly |
| **Code** | CSS `.nav-logo:hover .logo-devanagari { transform: rotate(-4deg) scale(1.15) }` |

**Why:** A playful nod to the brand's Indian identity. It rewards curious users who hover the logo, without being distracting.

---

## 3. Nav Links — Sliding Underline

| Property | Detail |
|---|---|
| **Where** | All nav links (Home, About, Services…) |
| **Trigger** | Hover |
| **Effect** | A saffron-coloured underline slides in from the centre, growing outward |
| **Code** | CSS `::after` pseudo-element with `width: 0 → 60%` on hover |

**Why:** More refined than a simple colour change. Feels native to high-quality web design and reinforces the saffron brand colour.

---

## 4. Buttons — Scale + Ripple on Click

| Property | Detail |
|---|---|
| **Where** | All CTA buttons (`.btn-primary`, `.ripple-btn`) |
| **Trigger** | Hover (scale) + Click (ripple) |
| **Effect** | Button lifts slightly on hover; a circular wave expands from click point on click |
| **Code** | CSS `transform: scale(1.04)` on hover; JS dynamically creates a `.ripple` span with CSS animation |

**Why:** The ripple mimics the feeling of pressing a physical button. The lift on hover signals "this is clickable". Together they make CTAs feel satisfying to use.

---

## 5. Hero — Rotating Mandala Rings

| Property | Detail |
|---|---|
| **Where** | Hero section background |
| **Trigger** | Always running (ambient) |
| **Effect** | Three concentric circles rotate slowly — outer CW, middle CCW, inner CW |
| **Code** | CSS `@keyframes mandala-spin` applied with different durations (60s / 40s / 25s) |

**Why:** Mandala patterns are deeply rooted in Indian spiritual culture. The slow rotation creates a meditative, calming feel that matches the brand's wellness philosophy — without being distracting.

---

## 6. Hero Headline — Sanskrit Shimmer

| Property | Detail |
|---|---|
| **Where** | "स्मार्टवर्क" in the hero headline |
| **Trigger** | Always running (ambient) |
| **Effect** | The Sanskrit text has a slow light shimmer passing through it left-to-right |
| **Code** | CSS `background: linear-gradient(90deg, saffron, light-saffron, saffron)` with `background-size: 200%` animated via `@keyframes shimmer-text` |

**Why:** Draws attention to the key brand concept. The shimmer is gold-toned, evoking the warmth of saffron — a sacred colour in Indian culture.

---

## 7. Scroll Hint Arrow — Bobbing Animation

| Property | Detail |
|---|---|
| **Where** | Bottom of the hero section |
| **Trigger** | Always running (ambient) |
| **Effect** | A vertical line + "scroll" label gently bobs up and down |
| **Code** | CSS `@keyframes scroll-bob` alternates `translateY(0)` and `translateY(8px)` every 2 seconds |

**Why:** Subtly tells new visitors that there's more below the fold. Disappears naturally as users scroll into content.

---

## 8. Ticker / Marquee — Pauseable Sanskrit Scroll

| Property | Detail |
|---|---|
| **Where** | Strip between hero and stats |
| **Trigger** | Always running; pauses on hover |
| **Effect** | The 7 Tatva names in Devanagari scroll continuously left-to-right |
| **Code** | CSS `@keyframes ticker-scroll` on `.ticker-track`; `:hover` sets `animation-play-state: paused` |

**Why:** A rhythmic, visual chant of the brand's core pillars. The pause-on-hover respects users who want to read the Sanskrit names carefully.

---

## 9. Stat Cards — Counter Animation + Hover Lift

| Property | Detail |
|---|---|
| **Where** | Stats section (200+, 7, 3+, 100%) |
| **Trigger** | Counter: fires once when cards scroll into view; Lift: hover |
| **Effect** | Numbers count up from 0 to their value with an ease-out curve; cards lift on hover with a saffron glow |
| **Code** | JS `IntersectionObserver` + `requestAnimationFrame` for counter; CSS `translateY(-5px)` + `box-shadow` on hover |

**Why:** Animated numbers grab attention and make achievements feel earned rather than static. The hover glow ties back to the saffron palette.

---

## 10. Tatva Cards — 3D Tilt + Colour Glow

| Property | Detail |
|---|---|
| **Where** | The 7 Tatvas grid cards |
| **Trigger** | Mouse move over card (tilt); hover (glow + icon rotate) |
| **Effect** | Card tilts in 3D toward the cursor (max 6°); a soft radial glow in each card's unique colour appears; the icon rotates -6° and scales up |
| **Code** | JS `mousemove` listener calculates `rotateX`/`rotateY` from cursor position; CSS `::after` with `radial-gradient` fades in on hover |

**Why:** Each Tatva has its own colour identity. The tilt makes the grid feel like physical objects — tactile and grounded. The icon rotation rewards exploration.

---

## 11. Section Entry — Fade-in from Below

| Property | Detail |
|---|---|
| **Where** | Every section heading, card, and block across the page |
| **Trigger** | Element scrolls into the viewport |
| **Effect** | Content fades in from slightly below (or left/right) its final position |
| **Code** | JS `IntersectionObserver` adds `.visible` class; CSS `opacity: 0 + translateY(40px)` → `opacity: 1 + translate(0)` with `transition-delay` via CSS variable `--delay` |

**Why:** Prevents visual overwhelm. Users absorb content section-by-section rather than having everything compete for attention at once. The staggered delays (controlled via `--delay`) create a natural reading rhythm.

---

## 12. About Pillars — Slide Right on Hover

| Property | Detail |
|---|---|
| **Where** | The four bullet points in the About section |
| **Trigger** | Hover over each row |
| **Effect** | Row slides 6px to the right with a saffron border tint |
| **Code** | CSS `transform: translateX(6px)` + `border-color` transition |

**Why:** Confirms these are interactive elements without requiring them to be links. Feels grounded and directional — forward motion suggests positive action.

---

## 13. Badge — Pulsing Glow

| Property | Detail |
|---|---|
| **Where** | "7 Tatvas" badge on the About section visual |
| **Trigger** | Always running (ambient) |
| **Effect** | The saffron badge gently pulses its shadow, like a heartbeat |
| **Code** | CSS `@keyframes badge-pulse` oscillates `box-shadow` opacity |

**Why:** Draws the eye to the core "7 Tatvas" number, which is central to the brand's identity. The heartbeat rhythm subtly connects to the health and wellness theme.

---

## 14. Services Transition — Orbit to Horizontal Rail

| Property | Detail |
|---|---|
| **Where** | Services section (`#services`) |
| **Trigger** | Scroll progression through the pinned section |
| **Effect** | Stage 1: small orbit cards fade out → Stage 2: “Programs Built Around You” fades in/out → Stage 3: horizontal services rail fades in and moves one card at a time |
| **Code** | JS `updateProgramsOrbit()` computes progress `p`; CSS/JS drive orbit opacity, center-copy opacity, and rail transform/opacity |

**Why:** The staged handoff creates a narrative transition instead of a sudden layout swap. Users first understand the service categories, then focus card-by-card.

---

## 15. Services Rail — Horizontal Scroll Illusion

| Property | Detail |
|---|---|
| **Where** | Inside `.services-rail-viewport` |
| **Trigger** | Vertical scroll while section is in view |
| **Effect** | Cards remain in a single horizontal row and slide sideways; card 1 is held fully visible before movement starts |
| **Code** | JS maps section scroll progress to rail `translate3d(...)`; CSS uses `overflow: hidden` viewport |

**Why:** The page still scrolls vertically, but users experience a controlled sideways carousel. This preserves familiar scroll behavior while adding visual depth.

---

## 16. Footer Links — Underline Grow on Hover

| Property | Detail |
|---|---|
| **Where** | All footer navigation and contact links |
| **Trigger** | Hover |
| **Effect** | A thin saffron underline grows from left to right beneath the link text |
| **Code** | CSS `::after` with `width: 0 → 100%` on hover |

**Why:** Consistent with the nav link treatment. Reinforces that footer links are navigable. The saffron colour unifies the visual language.

---

## 17. Social Icons — Scale + Colour Lift

| Property | Detail |
|---|---|
| **Where** | Footer social icon circles (Instagram, Email) |
| **Trigger** | Hover |
| **Effect** | Icon scales up, lifts slightly, border and icon colour shift to saffron |
| **Code** | CSS `transform: scale(1.15) translateY(-2px)` + `border-color` + `color` transition |

**Why:** Social links need to be easy to find and satisfying to click. The colour shift confirms they lead off-site.

---

## 18. Scroll-to-Top Button — Fade In/Out

| Property | Detail |
|---|---|
| **Where** | Fixed button at bottom-right of screen |
| **Trigger** | Appears after scrolling 400px; disappears near top |
| **Effect** | Button fades in and slides up from below; hovers lift it further |
| **Code** | JS toggles `.visible` class; CSS `opacity + translateY` transition |

**Why:** Long pages need a quick escape. The button appears only when relevant, keeping the UI clean at the start.

---

## 19. Active Nav Highlight — Scroll Tracking

| Property | Detail |
|---|---|
| **Where** | Navbar links |
| **Trigger** | Scroll — automatically detects which section is in view |
| **Effect** | The nav link corresponding to the current section turns cream/white |
| **Code** | JS `getBoundingClientRect()` on each `section[id]`; matches to nav `href` |

**Why:** Tells users where they are on the page at all times. Especially useful on long, single-page layouts.

---

## Performance Notes

- **GSAP + ScrollTrigger are used** for pinned/timeline-driven sections (Services rail behavior).
- **Most micro-interactions still use CSS transforms/transitions** (GPU-accelerated).
- **IntersectionObserver** replaces scroll event listeners for reveal animations (much cheaper).
- **`will-change: opacity, transform`** on reveal elements hints the browser to pre-optimise.
- **`prefers-reduced-motion`** media query disables all animations for users who have enabled reduced motion in their OS accessibility settings.
- **Passive scroll listeners** (`{ passive: true }`) prevent scroll jank on mobile.

---

*Animation stack: CSS transitions + GSAP ScrollTrigger where pinned progression is required.*
