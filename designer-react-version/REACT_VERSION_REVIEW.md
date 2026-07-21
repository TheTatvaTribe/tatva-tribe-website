# Designer's React Version — Review

| | |
|---|---|
| **What this is** | The designer's **second delivery**: the scrollytelling design rebuilt as a real **React 18 + Vite 5** app (`tatva-react`). |
| **Source** | `E:\The Tatva Tribe Website\Tatva\Tatva` (staged here minus `node_modules`, `dist`, and the `.zip` archives). |
| **Branch** | `claude/designer-react-version` (off `main`) — **testing only, NOT merged, NOT deployed.** |
| **Build** | ✅ `npm install` (145 pkgs) + `npm run build` succeed (Vite 5, 90 modules, 333 KB JS / 70 KB CSS). |
| **Runs** | ✅ Dev server serves HTTP 200. |

## How to run it (for presenting)

```bash
cd designer-react-version
npm install      # first time only
npm run dev      # → http://localhost:5173  (or: npm run dev -- --port 5180)
```

`/` = the scrollytelling homepage · `/about` = the About timeline page.

---

## 1. What this is — and how it relates to the current site

This is **not a change to our current website** and does not share code with it. It's a **separate, ground-up React app** that would **replace** the current site wholesale. Key differences from the live repo:

| | Current live site | Designer's React version |
|---|---|---|
| React | 19 | **18.3** |
| Routing | `react-router-dom` (SPA) | **none** — manual `window.location.pathname` check |
| Pages | Home, About, Pricing, Contact (4 routes) | Home (one long scroll page) + `/about` |
| Contact | Embedded Google Form (real submissions) | **No contact form** — Instagram links + a **fake** About signup (`setSubmitted(true)`, no backend) |
| Theme | Forest/gold, Antonio font | Dark lemon-green, Yatra One/Hind/Devanagari |
| Tailwind tokens | Full brand palette | Minimal (one font + one shadow); styling is in an 80 KB `styles.css` |
| Animation | CSS + small JS | GSAP (bundled) + `tatvaInteractions.js` |

**Bottom line:** "does it work *with* the current website" — it doesn't *integrate* with it; it's a **replacement candidate**. Adopting it means swapping the site, then re-adding what it's missing (routing fallback, real contact form, pricing parity, brand tokens). It builds and runs cleanly on its own.

## 2. What the designer improved since the vanilla prototype

Genuine progress over the previous `design-prototype/` (branch `claude/designer-interactions-review`):

- **Real React app** with a proper build, not loose HTML/CSS/JS.
- **Pricing rebuilt as React** (`PricingSection` + `PlanCard`): 4 plans with a **working flip** ("Know More" → back face via `useState`). This fixes the dead "TAP FOR MORE INFO" flip from the prototype.
- **The broken services orbit/rail is gone** — replaced by the clean pricing grid.
- **GSAP is now a real bundled dependency** (imported as ES modules, not a dead CDN script).
- **New `/about` page**: a scroll-timeline personal story with IntersectionObserver reveals and a scroll-progress line.

## 3. Issues & things to fix

### Blocking for production
1. **No real contact/lead capture.** The current site's Google Form is gone. The About page form only sets local state — submissions go nowhere. This is the site's main conversion path; it must be wired up before this could ship.
2. **Pricing changed — confirm intent.** Prices here are **₹12,499 / 29,999 / 51,999 / 91,999**; the live site has **₹9,999 / 24,999 / 37,999 / 79,999**. Plan names also differ (Prarambha/Shakti/Tapasya/Ghor Tapasya vs the live Prarambh/Shakti/Tapasya/Ghor Tapasya). Verify with the client which is correct.
3. **Routing won't survive a page refresh on GitHub Pages.** Routing is a manual `pathname` check with **no `public/404.html` SPA fallback** (the current repo has one). A direct visit or refresh on `/about` would 404 on the live host.

### Should fix
4. **Placeholder content on About.** Literal "Drop a cricket action photo" / "Drop a coaching moment photo" text stands in for images. Not client-ready.
5. **Dead code.** `initServicesRailScrollTrigger()` is defined but never called, and the orbit/rail logic in `tatvaInteractions.js` now targets elements that no longer render (the services section is replaced by `PricingSection`). The `initTatvaInteractions()` cleanup is an empty `return () => {}`, so its scroll listeners are never removed.
6. **Images hot-link production.** All 7 Tatva images load from `https://thetatvatribe.com/...`; the app isn't self-contained and breaks offline / if those paths change. No local `public/` assets.
7. **Reduced-motion.** As before, the JS scroll-driven transforms aren't gated on `prefers-reduced-motion` (worth re-checking in `tatvaInteractions.js`).

### Minor
8. React 18 vs the repo's 19; Vite 5 vs 7; Tailwind 3.4.17 vs 3.4.19 — all fine standalone, but a port would align them.

## 4. Verification method & caveat

Verified by installing deps and running the real Vite build (compiles all JSX + CSS and the `content.html?raw` import) and confirming the dev server serves HTTP 200. **Live visual/interaction testing in-tool was not possible this session** (the browser-preview tooling was disconnected), so on-screen behaviour and the scroll choreography should be eyeballed at `http://localhost:5180/` — which is running now for exactly that.

## 5. Recommendation

Strong design progress, and the pricing-flip rebuild shows the direction is becoming real. But treat it as a **redesign proposal to review with the client**, not something to merge: it would replace the whole site and currently **drops the contact form, changes prices, and can't handle a refresh on `/about`**. If the client approves the direction, the sensible path is a **planned port into the current React 19 + router repo** — bringing over the visuals/interactions while keeping routing, the Google Form, brand tokens, and asset hosting — rather than switching to this app as-is.
