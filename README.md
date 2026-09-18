# The Tatva Tribe

Marketing site for **The Tatva Tribe**, a holistic fitness coaching practice run by Advay Shidhaye. The site explains the 7 Tatvas philosophy, presents the four coaching plans, carries member stories, and routes prospects to a free consultation form.

> **Brand line:** *SMARTWORK over Hardwork.*

**Live:** https://thetatvatribe.com
**Repo:** https://github.com/TheTatvaTribe/tatva-tribe-website

---

## Contents

1. [Stack](#stack)
2. [Quick start](#quick-start)
3. [Scripts](#scripts)
4. [Project structure](#project-structure)
5. [Architecture](#architecture)
6. [Editing content](#editing-content)
7. [Styling system](#styling-system)
8. [Routing and the GitHub Pages SPA fallback](#routing-and-the-github-pages-spa-fallback)
9. [Deploy](#deploy)
10. [Conventions](#conventions)
11. [Gotchas](#gotchas)
12. [Open items](#open-items)

---

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **React 19** | Function components only |
| Build tool | **Vite 7** | `base: '/'`, because the site runs on an apex domain |
| Routing | **react-router-dom 7** | `BrowserRouter` plus a GitHub Pages SPA fallback |
| Styling | **Hand-written CSS** | Custom properties in `src/styles/tokens.css`, nine files imported by `src/index.css`. No Tailwind, no CSS-in-JS |
| Icons | **Inline SVG** | No icon package. Icons live in the component that draws them |
| Lint | **ESLint 9** flat config | `eslint.config.js` |
| Hosting | **GitHub Pages** | Custom apex domain via `public/CNAME` |
| CI/CD | **GitHub Actions** | `.github/workflows/deploy.yml`, deploys on push to `main` |

Runtime dependencies are only `react`, `react-dom` and `react-router-dom`. Everything else is a dev dependency.

No TypeScript, no test runner, no CMS, no analytics.

---

## Quick start

Requires **Node 20+** (the deploy workflow pins Node 20) and npm.

```bash
git clone https://github.com/TheTatvaTribe/tatva-tribe-website.git
```

```bash
npm install && npm run dev
```

The dev server runs at **http://localhost:5173/** with no path suffix. `vite.config.js` sets `base: '/'` to match the apex domain, so local and production paths are identical.

Before opening a PR:

```bash
npm run lint && npm run build
```

---

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the built `dist/` locally |
| `npm run lint` | ESLint over the repo (see the caveat in Gotchas) |

A clean production build currently emits:

```
dist/index.html                    2.55 kB | gzip:  1.12 kB
dist/assets/index-*.css           52.24 kB | gzip: 11.05 kB
dist/assets/index-*.js           267.94 kB | gzip: 86.35 kB   <- shell + Home
dist/assets/About-*.js            11.38 kB | gzip:  3.89 kB
dist/assets/Contact-*.js           1.94 kB | gzip:  0.89 kB
dist/assets/Stories-*.js           1.75 kB | gzip:  0.74 kB
dist/assets/NotFound-*.js          0.46 kB | gzip:  0.31 kB
```

---

## Project structure

```
tatva-tribe-website/
├── .github/workflows/deploy.yml   Builds and deploys on push to main
├── public/                        Copied verbatim into dist/
│   ├── CNAME                      thetatvatribe.com
│   ├── 404.html                   SPA fallback (pathSegmentsToKeep = 0)
│   ├── favicon-32.png
│   ├── favicon-192.png
│   ├── apple-touch-icon.png
│   └── images/
│       ├── trainer.jpeg           Trainer portrait (About)
│       ├── tatvas/                7 illustrations, one per Tatva (Home)
│       ├── certifications/        6 credential images (About carousel)
│       ├── stories/               3 member portraits (Stories, Home carousel)
│       └── about/
│           ├── cricket/           5 playing-career photos (About carousel)
│           └── coaching/          6 coaching photos (About carousel)
├── src/
│   ├── main.jsx                   React entry point
│   ├── App.jsx                    Router, layout shell, lazy routes
│   ├── index.css                  Imports the nine stylesheets, in order
│   ├── data/
│   │   ├── site.js                Tatvas, plans, terms, certifications, photos, contact
│   │   └── stories.js             The six questions and three member stories
│   ├── pages/
│   │   ├── Home.jsx               Composes six home sections, nothing else
│   │   ├── About.jsx              Journey timeline, photo carousels, certifications
│   │   ├── Stories.jsx            Portrait, name, six questions and answers
│   │   ├── Contact.jsx            Embedded Google Form plus direct contact details
│   │   └── NotFound.jsx
│   ├── components/
│   │   ├── Navbar.jsx             Fixed bar, scroll spy, mobile drawer
│   │   ├── Footer.jsx             Three equal columns plus build credit
│   │   ├── ScrollTopButton.jsx
│   │   ├── PhotoCarousel.jsx      Adapts to 0, 1, or many images
│   │   ├── home/
│   │   │   ├── Hero.jsx           Sticky 100svh stage, scroll-driven zoom
│   │   │   ├── TatvaStack.jsx     Sticky deck-of-cards for the 7 Tatvas
│   │   │   ├── Testimonials.jsx   Member carousel, links to /stories
│   │   │   └── CtaSection.jsx
│   │   └── pricing/
│   │       ├── PricingSection.jsx Grid of the four plans
│   │       ├── PlanCard.jsx       Flippable card
│   │       ├── PlanIcon.jsx       Inline SVG per plan
│   │       └── TribeCode.jsx      "The Tatva-Achaar" terms disclosure
│   ├── hooks/
│   │   ├── useMediaQuery.js       useMediaQuery, useIsMobile, useIsTouch
│   │   ├── useReveal.js           useReveal, useFrameScroll
│   │   └── useSectionNav.js       scrollToSection, useSectionNav
│   ├── utils/
│   │   ├── scroll.js              smoothScrollTo, jumpTo
│   │   └── ripple.js              addRipple (touch feedback on primary CTAs)
│   └── styles/                    tokens, base, layout, home, pricing,
│                                  about, pages, stories, mobile
├── scripts/
│   └── gen-favicon.cjs            Regenerates the favicon set (untracked, see below)
├── index.html                     Fonts, meta tags, SPA decoder script
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Architecture

### Routes

All routing lives in `src/App.jsx`.

| Path | Renders | Loading |
|---|---|---|
| `/` | `Home` | Eager. It is the landing page and should not flash a fallback |
| `/about` | `About` | Lazy |
| `/stories` | `Stories` | Lazy |
| `/contact` | `Contact` | Lazy |
| `/pricing` | `Home`, then scrolls to `#services` | Kept alive so old links and bookmarks still land on the plans |
| `*` | `NotFound` | Lazy |

`Home` is a composition of six sections rather than a page with its own markup:

```
Hero  ->  TatvaStack  ->  PricingSection  ->  TribeCode  ->  Testimonials  ->  CtaSection
#hero     #tatvas         #services          #tatva-achaar   #testimonials    #start
```

Those section IDs are the anchors the navbar and footer scroll to.

### Data flow

The site is fully static. No backend, no database, no accounts.

- **Content** lives in `src/data/`. Components import from it and render. Copy changes are edits to a plain JS object, not to JSX.
- **State** is local to each component. There is no Redux and no Context. The largest pieces of state are the navbar's scroll spy and drawer, the plan card flips, and the three carousels.
- **The only external call** is the Google Forms iframe on `/contact`.

### Section navigation

Links to home sections are `<button>` elements calling `useSectionNav()`, not `#anchor` hrefs. The hook navigates home first if you are on another route, then scrolls with an offset for the fixed navbar read from the `--nav-h` custom property. Doing it programmatically keeps that offset consistent from every route, which a raw anchor href cannot.

---

## Editing content

Almost every content change is a one-line edit in `src/data/`.

### The 7 Tatvas

`src/data/site.js`, the `tatvas` array. Each entry has a Devanagari name, an English name, a description, tags, an image path, and the accent and background colours that card uses.

Current order: शरीर Body Discipline, आहार Nutrition, मानस Mental Toughness, निद्रा Rest & Recovery, समाज Community, प्रकृति Nature, उद्देश्य Purpose.

### Plans and prices

`src/data/site.js`, the `plans` array.

| Plan | Duration | Price | Badge |
|---|---|---|---|
| Prarambh (प्रारंभ) | 1 month | ₹12,499 | |
| Shakti (शक्ति) | 3 months | ₹29,999 | Most Popular |
| Tapasya (तपस्या) | 6 months | ₹51,999 | High Value |
| Ghor Tapasya (घोर तपस्या) | 12 months | ₹91,999 | |

`savings` on the longer plans is derived from the ₹12,499 monthly rate. If a price changes, recompute the savings figure too, since nothing recalculates it at runtime.

### Terms

`src/data/site.js`, the `tribeCode` array. Rendered by `TribeCode.jsx` as "The Tatva-Achaar", a `<details>` disclosure that is open by default on desktop and collapsed on mobile.

### Member stories

`src/data/stories.js`. `STORY_QUESTIONS` holds the six questions, in order. Each entry in `stories` holds a name, portrait, the six answers in matching order, plus a `quote` and `accent` used only by the home page carousel.

Answers are members' own words. The file header records that the only edits made were orthographic. Keep it that way, and get consent before adding anyone.

### Contact details, socials, build credit

Top of `src/data/site.js`: `INSTAGRAM_URL`, `EMAIL`, `DESIGNER_URL`, `DESIGNED_BY`, `BUILT_BY`. The footer's credit line reads "Designed by Manasi · Site built by Rahul Patil", and each name is a link: `DESIGNED_BY.url` and `BUILT_BY.github`. `BUILT_BY.linkedin` is optional and only renders once filled in, so leaving it blank never produces a dead link.

Note that `DESIGNER_URL` is not the designer's link, despite the name. It is the Master Trainer's Instagram, used by the "Connect on Instagram" button on the About page.

### About page photos

`src/data/site.js`, `aboutPhotos`. Two slots, `cricket` and `coaching`, each with a `label` and an `images` array of `{ src, alt }`.

`PhotoCarousel` scales to whatever it is handed:

- **0 images** renders a labelled placeholder that holds the same space
- **1 image** renders just the photo, no controls
- **2 or more** renders a carousel with arrows, dots, and swipe

Advancing is manual by design. These sit inside a page the reader is already scrolling, so they should not move on their own. Photos use `object-fit: contain`, because the set mixes portrait and landscape and cropping would cut off faces and trophies.

### Regenerating the favicons

`scripts/gen-favicon.cjs` builds the whole favicon set from
`public/images/logo-favicon-source.png`: it detects the content bounding box,
pads it to a square, masks it with an anti-aliased circle, then writes the 32,
180 and 192 pixel versions.

```bash
npm i -D sharp && node scripts/gen-favicon.cjs
```

It needs `sharp`, which is not in `package.json` because nothing else uses it.
The script is currently untracked, recovered from an old worktree. Commit it if
you want it to survive a fresh clone.

### Adding an image

Drop the file into `public/images/`, then reference it through the `asset()` helper at the top of the data file:

```js
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
// ...
image: asset('images/tatvas/your-file.png'),
```

Always go through `asset()` or `import.meta.env.BASE_URL`. A hard-coded `/images/...` happens to work today because `base` is `/`, but it would break silently if the site ever moved back to a subpath.

---

## Styling system

### The import chain

`src/index.css` imports nine stylesheets in a deliberate order:

```
tokens -> base -> layout -> home -> pricing -> about -> pages -> stories -> mobile
```

`mobile.css` is last so its rules win ties. Every rule in it is gated to phone widths or coarse pointers, so desktop is untouched. That file is the result of a pass against the Toptal mobile heuristic principles: 44px touch targets, `:active` feedback gated to touch devices, accordions instead of long scrolls, and a visible loading state on the contact form.

### Tokens

`src/styles/tokens.css` holds every colour, font, easing curve and layout constant as a custom property. Use the token, not a raw hex value.

| Token | Value | Role |
|---|---|---|
| `--yellow` | `#D4AF37` | Brand gold |
| `--green` | `#2D5A3A` | Brand forest green |
| `--dark` | `#0A0A0A` | Page background |
| `--cream` | `#F5F5F5` | Body text |
| `--text-muted` | `#9CA3AF` | Secondary text |
| `--nav-h` | `68px`, `60px` under 640px | Navbar height |
| `--shell` | `min(1200px, 90vw)` | Content column width |
| `--font-serif` | Yatra One | Display |
| `--font-sans` | Hind | Body |
| `--font-devan` | Noto Serif Devanagari | Sanskrit |

`--nav-h` is a fixed height in both navbar states. The sticky Tatva cards offset themselves by it, so a navbar that resized on scroll would make them jump. Only the background changes on scroll.

### Motion

`useReveal(rootRef)` adds `.visible` to any `.reveal-up` element once it scrolls into view, then unobserves it and disconnects on unmount.

`useFrameScroll(handler, deps)` batches scroll and resize reads into a single `requestAnimationFrame`, fires once on mount, and cleans up after itself. Use it for anything scroll-linked rather than adding a raw listener.

A global `prefers-reduced-motion` rule collapses animations, and `smoothScrollTo` falls back to an instant jump when that preference is set.

---

## Routing and the GitHub Pages SPA fallback

The site uses `BrowserRouter`, so URLs are clean (`/about`, not `/#/about`). GitHub Pages serves static files and knows nothing about client-side routes, so a hard refresh on `/about` would normally 404.

The fix is Rafael Pedicini's `spa-github-pages` technique, in two halves:

1. **`public/404.html`** catches the miss, encodes the requested path into a query string, and redirects to the app shell.
2. **An inline script in `index.html`** runs before React mounts, reads that query string, and restores the real path with `history.replaceState`.

React Router then boots at the correct route and the user sees a clean URL. Note that the HTTP status for such a deep link is still 404 even though the page renders correctly. That is inherent to the technique, not a bug.

Three settings must agree. If any one of them changes, change all three:

| Setting | Current value | Meaning |
|---|---|---|
| `base` in `vite.config.js` | `'/'` | Apex domain, no subpath |
| `pathSegmentsToKeep` in `public/404.html` | `0` | Apex domain, no subpath |
| `public/CNAME` | `thetatvatribe.com` | The custom domain itself |

Deleting `CNAME` detaches the custom domain on the next deploy. Setting `base` to a subpath while `pathSegmentsToKeep` stays `0` breaks every deep link, and every asset URL along with it.

`ROUTER_BASENAME` in `App.jsx` derives the router basename from `import.meta.env.BASE_URL`, so the router follows `base` automatically and needs no separate edit.

---

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main`, and can also be triggered manually from the Actions tab.

```
push to main -> checkout -> setup Node 20 -> npm ci -> npm run build
             -> upload dist/ as a Pages artifact -> deploy to the github-pages environment
```

Pages usually surfaces a new build in one to two minutes. There is no preview environment for pull requests, so review locally with `npm run dev`, or with `npm run build && npm run preview` to check the real bundle.

### DNS

The apex domain points at the four GitHub Pages A records (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`). Verify with:

```bash
dig thetatvatribe.com +short
```

The custom domain and "Enforce HTTPS" are set in Settings, then Pages.

---

## Conventions

**Branches.** `claude/<description>` for AI-assisted work, `feat/<description>` or `fix/<description>` otherwise. Branch from `main`.

**Commits.** Imperative subject under 72 characters, blank line, then a body explaining why rather than what.

**Code style.**

- Two-space indent, single quotes, semicolons
- Function components only
- One file per route in `src/pages/`
- A section that Home composes goes in `src/components/home/` or `src/components/pricing/`
- Anything shared across pages goes directly in `src/components/`
- Content goes in `src/data/`, never inline in JSX
- Comments explain *why*, especially where a rule looks odd. Several rules in this codebase are load-bearing and non-obvious, and the comments are the only thing protecting them

---

## Gotchas

**`npm run lint` suddenly reports hundreds of errors in files you did not write.** ESLint walks `.claude/worktrees/`, and an agent worktree there can hold a built bundle. `.gitignore` does not apply, because it is not an ESLint config. This happened once already and was cleared by removing the stale worktrees. If it returns, either remove them with `git worktree remove`, or make it permanent:

```js
globalIgnores(['dist', '.claude'])
```

**Do not add `scroll-behavior: smooth` to `html` or `:root`.** It was there once and caused a reported bug where scrolling stopped partway. It makes *every* programmatic scroll animate, including the route-change reset, so a navigation would fight whatever scroll the user had already started. `src/utils/scroll.js` is the only place that decides: `smoothScrollTo` animates deliberate jumps, `jumpTo` is instant and is what route changes use.

**Sticky sections need `--nav-h` to stay constant.** The Hero and the Tatva stack position themselves against it. Making the navbar shrink on scroll would make both jump.

**`aspect-ratio` on a carousel slide needs the image absolutely positioned.** Flex `align-items: stretch` on the track, and the intrinsic height of an eagerly-loaded image, will both override it. `src/styles/about.css` sets `align-items: flex-start` on the track and pins the slide contents with `position: absolute; inset: 0` for exactly this reason.

**New route not appearing in the navigation.** Add it to `src/App.jsx` for the route, then to the link lists in both `Navbar.jsx` and `Footer.jsx`. There is no shared navigation config file at the moment.

**Bundle suddenly much larger.** Check that the `lazy()` imports at the top of `App.jsx` were not converted back to static imports, which would fold every page into the main chunk.

---

## Open items

Known, deliberate, and unfinished. None of them break the live site.

- **Around 2.5 MB of unreferenced images ship in the build.** `public/images/logo.png` (1.8 MB), `wordmark-gold.png`, `wordmark-white.png` and `public/vite.svg` are not referenced by any source file. They are Pages-hosted static files, so they cost transfer only if requested directly, but they should be removed or put to use. Note that `logo-favicon-source.png` looks unreferenced too but is not: it is the input to `scripts/gen-favicon.cjs`. Keep it.
- **No `og:image` or `twitter:card`.** Shared links show a title and description with no preview image.
- **`BUILT_BY.linkedin` is empty**, so that link does not render.
- **No tests.** A smoke test asserting every route renders would be the highest-value first one.
- **No error boundary.** A render error currently produces a blank page.
- **No analytics.**

---

© The Tatva Tribe. All rights reserved.
