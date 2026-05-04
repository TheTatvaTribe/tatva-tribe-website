# The Tatva Tribe — Website

Marketing site for **The Tatva Tribe**, a holistic fitness coaching brand founded by Advay Shidhaye. The site introduces the brand's "7 Tatvas" philosophy, presents coaching plans, and routes prospects to a free consultation.

> **Brand voice in one line:** *SMARTWORK over Hardwork.*

**Live**: https://thetatvatribe.github.io/tatva-tribe-website/  *(custom domain `thetatvatribe.in` planned)*

---

## Table of contents

1. [Stack](#stack)
2. [Quick start](#quick-start)
3. [npm scripts](#npm-scripts)
4. [Folder structure](#folder-structure)
5. [Architecture](#architecture)
6. [How to do common things](#how-to-do-common-things)
7. [UI primitives](#ui-primitives)
8. [Styling system](#styling-system)
9. [Routing & GitHub Pages SPA fallback](#routing--github-pages-spa-fallback)
10. [Deploy pipeline](#deploy-pipeline)
11. [Conventions](#conventions)
12. [Common gotchas](#common-gotchas)
13. [Known limitations / roadmap](#known-limitations--roadmap)

---

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **React 19** | Industry-standard, big ecosystem |
| Bundler / dev server | **Vite 7** | Sub-second HMR, simple config |
| Routing | **react-router-dom 7** | `BrowserRouter` with GH Pages SPA fallback |
| Styling | **Tailwind 3** + small `@layer components` | Utility-first; project tokens stay in `tailwind.config.js` |
| Icons | **lucide-react** | Tree-shakeable SVG icons |
| Lint | **ESLint 9** (flat config) | Wired into a flat `eslint.config.js` |
| Hosting | **GitHub Pages** | Free, fast, no server to maintain |
| Deploy | **GitHub Actions** (`.github/workflows/deploy.yml`) | Auto-deploys on push to `main` |

No TypeScript, no test runner, no CMS — yet. See [Roadmap](#known-limitations--roadmap).

---

## Quick start

You'll need **Node 20+** and **npm**.

```bash
# 1. Clone
git clone https://github.com/TheTatvaTribe/tatva-tribe-website.git
cd tatva-tribe-website

# 2. Install
npm install

# 3. Start the dev server (HMR, opens at http://localhost:5173/tatva-tribe-website/)
npm run dev

# 4. Lint (run before opening a PR)
npm run lint

# 5. Production build (output in dist/)
npm run build

# 6. Preview the production build locally
npm run preview
```

> ⚠️ The dev URL is `http://localhost:5173/tatva-tribe-website/` (with the trailing path), **not** `localhost:5173`. The trailing path comes from `vite.config.js` → `base: '/tatva-tribe-website/'`, which matches the GitHub Pages subpath. When you switch to a custom apex domain, set `base: '/'` and update `pathSegmentsToKeep` in `public/404.html` to `0`.

---

## npm scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally to verify the build |
| `npm run lint` | ESLint over the whole repo |

---

## Folder structure

```
tatva-tribe-website/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions: builds + deploys on push to main
├── public/                     ← Static files copied verbatim into dist/
│   ├── 404.html                ← GitHub Pages SPA fallback (see Routing section)
│   ├── favicon.svg
│   └── images/
│       ├── logo.png            ← Round "T" emblem (navbar/footer)
│       ├── wordmark.png        ← "The Tatva Tribe" wordmark
│       ├── trainer.jpeg        ← Master Trainer photo (About page)
│       ├── certifications/     ← Trainer credentials (carousel)
│       └── tatvas/             ← Illustrations for each of the 7 Tatvas (Home page)
├── src/
│   ├── App.jsx                 ← Router shell + ScrollToTop, mounts Navbar/Footer
│   ├── main.jsx                ← React entry point (creates root, renders <App />)
│   ├── index.css               ← Tailwind directives + @layer components + base styles
│   ├── components/
│   │   ├── Navbar.jsx          ← Fixed top nav with mobile drawer
│   │   ├── Footer.jsx          ← 4-column footer
│   │   └── ui/                 ← Reusable, presentational primitives
│   │       ├── BrandMark.jsx   ← Logo emblem + wordmark with text fallback
│   │       ├── Button.jsx      ← (Currently unused — pages use the .btn className)
│   │       ├── Card.jsx        ← Glass-style card with hover lift
│   │       ├── EyebrowPill.jsx ← Gold-on-translucent pill above hero headings
│   │       └── ExternalLink.jsx← Outbound <a> with icon + a11y hint
│   ├── content/                ← Single source of truth for non-page-specific data
│   │   └── navigation.js       ← navLinks + socialLinks (used by Navbar AND Footer)
│   └── pages/                  ← One file per route
│       ├── Home.jsx            ← Hero + 7 Tatvas grid + CTA
│       ├── About.jsx           ← Philosophy + Master Trainer + Certifications carousel
│       ├── Pricing.jsx         ← 4 plans + "Tatva-Achaar" T&Cs
│       ├── Contact.jsx         ← Google Form embed + "What to Expect" sidebar
│       └── NotFound.jsx        ← 404 page
├── index.html                  ← HTML entry; includes the SPA-fallback decoder script
├── vite.config.js              ← Vite config (sets `base` for GH Pages subpath)
├── tailwind.config.js          ← Brand color tokens + font family
├── postcss.config.js           ← PostCSS pipeline (Tailwind + autoprefixer)
├── eslint.config.js            ← ESLint 9 flat config
└── package.json
```

---

## Architecture

### Big picture

```
┌─────────────────────────────────────────────────────┐
│  index.html                                          │
│  ├─ SPA-fallback decoder (restores deep-link URL)   │
│  └─ <div id="root"></div>                            │
│       │                                              │
│       ▼                                              │
│  main.jsx → createRoot().render(<App />)             │
│       │                                              │
│       ▼                                              │
│  App.jsx                                             │
│  └─ <BrowserRouter basename="/tatva-tribe-website">  │
│      ├─ <ScrollToTop />  (resets scroll on nav)      │
│      ├─ <Navbar />        (fixed top, brand + links) │
│      ├─ <main>                                       │
│      │   └─ <Routes>                                 │
│      │       ├─ /         → <Home />                 │
│      │       ├─ /about    → <About />                │
│      │       ├─ /pricing  → <Pricing />              │
│      │       ├─ /contact  → <Contact />              │
│      │       └─ *         → <NotFound />             │
│      │   </Routes>                                   │
│      └─ <Footer />        (brand + nav + services)   │
└─────────────────────────────────────────────────────┘
```

### Data flow

The site is **fully static** — no backend, no database, no user accounts.
- **Content** lives in two places:
  - **`src/content/`** for shared data (currently just `navigation.js`)
  - **Inline in each page file** for page-specific copy (tatvas list in `Home.jsx`, plans in `Pricing.jsx`, etc.)
- **State** is local to components (`useState` / `useEffect`) — no Redux, no Context API. The largest pieces of state are the `Navbar`'s scroll/mobile-menu state and the Certifications carousel inside `About.jsx`.
- **External integrations**: a single Google Forms `<iframe>` on the Contact page; outbound Instagram links from the Footer.

### What lives where (mental model)

| Concern | Lives in |
|---|---|
| Routing | `App.jsx` (one file, all routes) |
| Layout (header/main/footer) | `App.jsx` |
| Navigation links | `src/content/navigation.js` (used by both `Navbar` and `Footer`) |
| Reusable visual primitives | `src/components/ui/` |
| Page-specific content | Inline in `src/pages/<Page>.jsx` |
| Brand tokens (colors, fonts) | `tailwind.config.js` |
| Custom Tailwind utilities (`.btn`, `.section`, `.heading-xl`, `.card`, `.glass`, `.text-gradient`) | `src/index.css` under `@layer components` |
| Static assets (images, favicon) | `public/` |

---

## How to do common things

### Edit copy on a page
Open `src/pages/<Page>.jsx`. Each page is a single component; copy is right there in JSX. No build step needed during dev — Vite's HMR reflects changes instantly.

### Add a new route
1. Create `src/pages/MyPage.jsx` (use any existing page as a template).
2. Register the route in `src/App.jsx` inside `<Routes>`.
3. Add the link to `src/content/navigation.js` — both Navbar and Footer pick it up automatically.

### Update the navigation
Edit `src/content/navigation.js`. Both `Navbar.jsx` and `Footer.jsx` read from this file, so adding/renaming a link is a one-line change.

### Edit the 7 Tatvas
Open `src/pages/Home.jsx`. The `tatvas` array (top of the component) holds Hindi label, English title, description, examples, fallback icon, and image path for each.

### Edit pricing plans
Open `src/pages/Pricing.jsx`. Two arrays at the top:
- `plans` — the 4 tier cards
- `tribeCode` — the "Tatva-Achaar" terms & conditions

### Edit Master Trainer / About page
Open `src/pages/About.jsx`. The carousel images are listed in the `certifications` array; the audience-types cards are in `audienceTypes`.

### Add an image
Drop the file into `public/images/` (or a subfolder). Reference it as:
```jsx
<img src={`${import.meta.env.BASE_URL}images/your-file.png`} alt="..." />
```
Always use `import.meta.env.BASE_URL` so the path works in both dev (`/tatva-tribe-website/...`) and any future custom-domain build (`/...`).

---

## UI primitives

Small, presentational components in `src/components/ui/`. All are free of business logic — they just render visual patterns.

| Primitive | What it does | Used in |
|---|---|---|
| `<BrandMark />` | Renders the round "T" emblem + wordmark image. Both have graceful fallbacks: emblem falls back to the gold "T", wordmark falls back to the text "The Tatva Tribe". | Navbar, Footer |
| `<EyebrowPill>` | Gold-on-translucent pill above hero headings. | Every page hero |
| `<ExternalLink>` | Outbound `<a>` with `target="_blank"`, `rel="noopener noreferrer"`, an external-link icon, and a screen-reader hint. | Footer (Instagram), About (trainer Instagram) |
| `<Card>` | Glass-style card with optional hover lift. | Tatva grid (Home), audience types (About), pricing tiers (Pricing) |
| `<Button>` | Variant-based button. **Currently unused** — pages use the `.btn` utility instead. Kept for future migration. | (none) |

When in doubt, **add a primitive** rather than copy-pasting a 100-character Tailwind class string into the third place.

---

## Styling system

### Brand tokens
Defined in `tailwind.config.js`:
- **forest** (50–900): brand green; `forest-600` (`#1B3022`) is the primary
- **gold** (50–900): brand gold; `gold-400` (`#D4AF37`) is the primary
- **cream**: `#F5F5F5` (body text on dark)
- **dark**: `#0A0A0A` (page background)

Use these names directly in classes: `bg-forest-600`, `text-gold-400`, `text-cream`, `bg-dark`. Avoid arbitrary hex values — keep the brand consistent.

### Custom utility classes
Defined in `src/index.css` under `@layer components`. Use these instead of repeating long Tailwind chains:
- `.container` — max-width + horizontal padding
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-lg`
- `.section` — vertical padding for page sections
- `.heading-xl`, `.heading-lg`, `.heading-md`, `.heading-sm`
- `.text-gradient` — gold gradient on text
- `.card`, `.card-hover`, `.glass`
- `.input` (for form fields, currently unused outside the embedded Google Form)

### Animations & motion
Custom keyframes (`fadeIn`, `slideUp`) live in `src/index.css`. Apply via `.animate-fade-in` and `.animate-slide-up`.

A global `@media (prefers-reduced-motion: reduce)` rule collapses every animation/transition to ~0ms, so users who request reduced motion get an instant page (a11y requirement).

---

## Routing & GitHub Pages SPA fallback

The site uses **`BrowserRouter`** (clean URLs like `/about`, not `/#/about`). GitHub Pages serves a static 404 page when a deep link is hit on a hard-refresh — which would normally break SPA routing.

The fix (Rafael Pedicini's `spa-github-pages` technique) lives in two files:

1. **`public/404.html`** — when GitHub Pages serves this, the script encodes the requested path into a query string and redirects to the app shell.
2. **`index.html`** — a small inline `<script>` in `<head>` runs before React mounts. It reads the encoded query string (if present), restores the real path via `history.replaceState`, then lets React Router take over.

If you change the deploy URL (e.g., move to a custom apex domain), update **`pathSegmentsToKeep`** in `public/404.html`:
- `1` for a project-page subpath like `/tatva-tribe-website/`
- `0` for an apex domain like `https://thetatvatribe.in/`

---

## Deploy pipeline

`.github/workflows/deploy.yml` runs on every push to `main`:

```
push to main → checkout → install (npm ci) → build (npm run build)
             → upload dist/ as a Pages artifact → deploy to github-pages env
```

Pages takes ~1–2 minutes to surface the new build. There is **no preview environment** for PRs — review by running `npm run dev` or `npm run build && npm run preview` locally.

### Custom domain (when ready)

1. Add `public/CNAME` containing your domain on a single line (e.g. `thetatvatribe.in`).
2. Set `base: '/'` in `vite.config.js`.
3. Set `pathSegmentsToKeep = 0` in `public/404.html`.
4. Configure DNS at your registrar:
   - Apex (`thetatvatribe.in`): four `A` records pointing to GitHub Pages IPs (`185.199.108.153` / `.109.153` / `.110.153` / `.111.153`)
   - `www`: `CNAME` to `thetatvatribe.github.io`
5. In repo Settings → Pages, enter the custom domain and tick **"Enforce HTTPS"** once DNS resolves.

---

## Conventions

### Branch naming
- Feature/copy work: `claude/<short-description>` (used by the AI workflow)
- Manual work: `feat/<description>` or `fix/<description>` is fine

### Commit style
- Present tense, imperative mood: *"Add X"*, *"Fix Y"*, *"Refactor Z"*
- First line is the subject (≤72 chars), blank line, then a short body explaining **why**
- Recent history shows the pattern — see `git log --oneline -20`

### PR flow
1. Branch off `main` → make your changes
2. Run `npm run lint` and `npm run build` locally
3. Open PR with a Summary + Test plan
4. Squash-merge or merge-commit; the workflow auto-deploys

### Code style
- 4-space indent (existing convention)
- Functional React components only
- One file per route in `src/pages/`
- Reusable JSX with no business logic → `src/components/ui/`
- Reusable JSX **with** logic → `src/components/`
- Static data shared across components → `src/content/`

---

## Common gotchas

| Gotcha | What to do |
|---|---|
| Image path doesn't load on production | Use `${import.meta.env.BASE_URL}images/...`, never a leading `/images/...` |
| Mobile menu doesn't close after navigation | The `useEffect` on `location.pathname` in Navbar handles this; check it wasn't accidentally removed |
| Carousel autoplay won't pause | Verify the `Pause` button toggles `isPaused`, and that the parent `<div>` still has `onMouseEnter` / `onFocusCapture` |
| New route added but Navbar doesn't show it | Add the route to `src/content/navigation.js`, not to `Navbar.jsx` directly |
| Custom domain still routes to old GH Pages URL | DNS propagation — wait up to a few hours; verify with `dig thetatvatribe.in +short` |
| Wordmark image renders with white background | Either replace `public/images/wordmark.png` with a transparent PNG, or keep the `invert mix-blend-screen` Tailwind classes that handle white backgrounds on the dark theme |
| Lint fails after copy edits | Most likely a stray apostrophe in JSX text — wrap the string in `{"..."}` or use `&apos;` |

---

## Known limitations / roadmap

These were flagged in a senior-engineer review pass. They each ship independently — pick one when you have a free session.

- [ ] **Page-level content extraction** — pull `tatvas`, `plans`, `tribeCode`, etc. into `src/content/` modules. Most copy edits become one-line changes to a JS object instead of touching React.
- [ ] **`<Img>` primitive** — replace the DOM-manipulation image-fallback pattern (5 instances across the codebase) with a single React-state-based component.
- [ ] **Route-level code splitting** — `React.lazy` + `Suspense` per route. A user landing on `/contact` would download ~80 KB instead of the full 270 KB.
- [ ] **Error boundary** — wrap `App.jsx` so a render error shows a friendly fallback instead of going blank.
- [ ] **Analytics** — GA4 + Microsoft Clarity (or Plausible / Cloudflare Web Analytics for a privacy-first stack). SPA pageviews need a small `useEffect` on `location.pathname`.
- [ ] **TypeScript** — half-day migration; biggest payoff on the content schemas.
- [ ] **Tests** — at minimum a smoke test that every route renders without crashing (Vitest + React Testing Library).

---

## License

All rights reserved © The Tatva Tribe.
