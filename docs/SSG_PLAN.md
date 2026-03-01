# SSG Implementation Plan: Static Site Generation for howe.app

**Document status:** Pre-implementation — awaiting code review approval
**Target approach:** `vite-react-ssg`
**Prepared:** February 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Scope: What Changes and What Stays](#2-scope-what-changes-and-what-stays)
3. [The Three SSR-Unsafe Problems](#3-the-three-ssr-unsafe-problems)
4. [Phase 1 — Fix SSR-Unsafe Code](#4-phase-1--fix-ssr-unsafe-code)
5. [Phase 2 — Migrate JS-Driven Responsive Layouts to CSS](#5-phase-2--migrate-js-driven-responsive-layouts-to-css)
6. [Phase 3 — Integrate vite-react-ssg](#6-phase-3--integrate-vite-react-ssg)
7. [Phase 4 — Adapt Page-Level Data Sourcing](#7-phase-4--adapt-page-level-data-sourcing)
8. [Phase 5 — Vercel and Build Pipeline](#8-phase-5--vercel-and-build-pipeline)
9. [Phase 6 — Validation and Testing](#9-phase-6--validation-and-testing)
10. [Risk Register](#10-risk-register)
11. [Rollback Plan](#11-rollback-plan)
12. [Implementation Order Summary](#12-implementation-order-summary)

---

## 1. Executive Summary

The site currently deploys as a single-page application (SPA). Vercel serves a blank `<div id="root"></div>` and JavaScript builds the page in the browser. This means:

- Search engine crawlers get empty HTML for all routes until JavaScript runs.
- First Contentful Paint is delayed by JS parse and React mount time.
- Social unfurl previews (Twitter/LinkedIn/Slack) get no metadata for sub-pages.

Static Site Generation (SSG) pre-renders every page to full HTML at build time. Vercel then serves real HTML instantly. React still hydrates on top of it in the browser, so all interactivity is preserved.

**Chosen tool: `vite-react-ssg`**

The project uses React Router v7 (`react-router-dom` 7.13.0) in "declarative" mode — `<BrowserRouter>` + `<Routes>` — not the framework mode with `routes.ts`. The official React Router v7 SSG support requires its "framework mode," which would be a much larger migration. `vite-react-ssg` supports component-style routes with React Router v6-compatible patterns and works cleanly for this site's scope. The tradeoff is explicitly noted in the Risk Register.

---

## 2. Scope: What Changes and What Stays

### Files that change

| File | Why it changes |
|------|---------------|
| `src/context/ThemeContext.jsx` | Reads `localStorage` and `window.matchMedia` in `useState` initializer — crashes Node.js |
| `src/hooks/useResponsive.js` | Reads `window.innerWidth` in `useState` initializer — crashes Node.js |
| `src/components/MoodBoard.jsx` | Uses `useIsMobile()` for container height and overflow; inline values cause hydration mismatch |
| `src/pages/Home.jsx` | Uses `useIsMobile()` for Sycamore card layout — 8+ inline style values diverge between SSR and hydration |
| `src/pages/Library.jsx` | Uses `useIsMobile()` + `useViewportWidth()` for `booksPerShelf` calculation |
| `src/main.jsx` | Entry point must export `createRoot` via `ViteReactSSG` instead of calling `createRoot` directly |
| `src/App.jsx` | Routes become a `RouteRecord[]` export; wrapper structure moves into a `Layout` component |
| `vite.config.js` | Add `ssgOptions`; all existing keys (`base`, `define`, `plugins`, `test`) stay |
| `package.json` | Install `vite-react-ssg`, change build script, update test for MoodBoard |
| `vercel.json` | Remove catch-all rewrite; add `cleanUrls: true` and `trailingSlash: false` |
| `src/index.css` | New CSS classes for all responsive values migrated out of `isMobile` inline styles |
| `src/components/MoodBoard.test.jsx` | Update "hides typography on mobile" test to match new CSS-driven approach |

### Files that do NOT change

| File | Why it is already SSR-safe |
|------|--------------------------|
| `src/components/Navigation.jsx` | Uses only CSS classes for mobile/desktop; all `window` access is inside `useEffect` |
| `src/components/CustomCursor.jsx` | All browser APIs inside `useEffect` |
| `src/components/HeroBento.jsx` | Pure props-driven rendering, no browser API at render time |
| `src/components/ScrollToTop.jsx` | `window.scrollTo` is inside `useEffect` |
| `src/components/ErrorBoundary.jsx` | `window.location.reload` is inside a click handler |
| `src/pages/Resume.jsx` | No browser API reads at render time |
| `src/pages/Interests.jsx` | Fully static `IMAGES` array, no `useIsMobile` |
| `src/pages/NotFound.jsx` | Fully static |
| `src/hooks/useArsenalFixture.js` | Network call is inside `useEffect`; `useState(fallback)` initializer is safe |
| `src/data/content.json` | Static JSON, no changes |
| `src/components/Footer.jsx` | No `useIsMobile` usage |
| `api/arsenal-fixture.js` | Serverless function, not part of the client bundle |

---

## 3. The Three SSR-Unsafe Problems

### Problem A — `ThemeContext.jsx` lines 6–10

```jsx
const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');                            // ReferenceError in Node
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches         // ReferenceError in Node
        ? 'dark' : 'light';
});
```

During pre-render, React calls this component in Node.js where neither `localStorage` nor `window` exist. The initializer function runs immediately (not deferred), so the crash happens at render time.

### Problem B — `useResponsive.js` lines 8 and 29

```jsx
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);  // ReferenceError in Node
const [width, setWidth] = useState(window.innerWidth);               // ReferenceError in Node
```

Same class of crash. The `useState` initializer is evaluated synchronously during the Node.js pre-render pass.

### Problem C — Hydration mismatch from responsive JS values

Even after fixing Problems A and B by returning safe defaults (`isMobile = false`, `width = 1200`), a second-order problem exists: if the SSR default is `isMobile = false` (desktop) and a real mobile visitor loads the page, the pre-rendered HTML will have desktop values baked in. React's hydration pass detects that the pre-rendered DOM doesn't match what the client wants to render, producing a hydration error and a visible layout jump.

This is resolved by Phase 2: moving responsive differences from JS-computed inline styles to CSS media queries, so the SSR output is layout-neutral. CSS handles the visual differences correctly regardless of viewport — no mismatch possible.

---

## 4. Phase 1 — Fix SSR-Unsafe Code

Two files. Surgical changes — no behavioral change on the client.

### 4.1 — `src/context/ThemeContext.jsx`

Add a `typeof window` guard. Return `'light'` as the safe server-side default. The anti-flash inline script in `index.html` already handles theme before React mounts, so there is no visible flash on real browsers.

**Change lines 6–10 from:**
```jsx
const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
});
```

**To:**
```jsx
const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
});
```

The `useEffect` on lines 12–15 is already SSR-safe (`useEffect` never runs in Node.js). No change there.

**Anti-flash script compatibility:** The existing inline script in `index.html` runs before React and re-sets `data-theme` from `localStorage` or `prefers-color-scheme`. With SSG, the pre-rendered HTML has `data-theme="light"` as a static attribute on `<html>`. The inline script immediately corrects it before the page is visible. Zero regression.

### 4.2 — `src/hooks/useResponsive.js`

Use a `typeof` guard in both hooks. Defaults (`false`, `1200`) are only used during the Node.js pre-render pass; the browser immediately replaces them on hydration.

**`useIsMobile` — change line 8 from:**
```jsx
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
```
**To:**
```jsx
const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
);
```

**`useViewportWidth` — change line 29 from:**
```jsx
const [width, setWidth] = useState(window.innerWidth);
```
**To:**
```jsx
const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
);
```

The resize event listeners inside `useEffect` in both hooks are already SSR-safe and require no changes.

---

## 5. Phase 2 — Migrate JS-Driven Responsive Layouts to CSS

### Why this phase exists

When `vite-react-ssg` pre-renders `Home.jsx`, `isMobile` is `false` (the SSR default). The Sycamore card pre-renders with `max-width: 600px; margin: 4rem auto 0 calc(50% - 200px)`. A real mobile visitor loads this HTML. React hydrates. Now `isMobile` is `true`. React wants to render `max-width: 220px; margin: -11rem 1rem 0 auto`. React detects a DOM mismatch → hydration error → layout jump.

The fix: assign CSS class names to these elements and use `@media (max-width: 768px)` rules. Both the pre-rendered HTML and the hydrated HTML produce the same DOM (`<div class="sycamore-home-card">`), and CSS handles the visual differences. No mismatch possible.

---

### 5.1 — `src/components/MoodBoard.jsx`

**`isMobile`-dependent values:**

| Value | Current | Fix |
|-------|---------|-----|
| Container `height` | `isMobile ? 'clamp(520px,80vh,700px)' : 'clamp(600px,90vh,1000px)'` | Move to CSS class `mb-container` |
| Container `margin` | `isMobile ? '-1rem 0 0 0' : '-4rem 0 4rem 0'` | Move to CSS class `mb-container` |
| Container `overflow` | `isMobile ? 'hidden' : 'visible'` | Move to CSS class `mb-container` |
| Typography conditional | `{!isMobile && <motion.div>...</motion.div>}` | Render unconditionally with class `mb-text`; CSS hides it on mobile |
| Parallax ranges `y1`–`y4` | `isMobile ? [0,-40] : [0,-100]` etc. | **Keep as JS** — motion values are runtime-only and don't produce static HTML. No hydration mismatch. |

**New container JSX** (non-responsive values only in `style`):
```jsx
<div
    ref={containerRef}
    className="mb-container"
    style={{
        position: 'relative',
        width: '100%',
        borderTop: '1px solid var(--text-primary)',
        backgroundColor: 'var(--bg-color)',
        zIndex: 1
    }}
>
```

**Typography** — remove conditional, add class:
```jsx
<motion.div
    className="mb-text"
    style={{ y: yTxt, position: 'absolute', top: '10%', left: '5%', zIndex: 10 }}
>
    <h2 className="serif-text" style={{ ... }}>Soccer.<br />Tech.<br />Food.<br />Flora.</h2>
</motion.div>
```

**New CSS** (base styles block):
```css
.mb-container {
    height: clamp(600px, 90vh, 1000px);
    margin: -4rem 0 4rem 0;
    overflow: visible;
}
```

**New CSS** (inside existing `@media (max-width: 768px)` block):
```css
.mb-container {
    height: clamp(520px, 80vh, 700px) !important;
    margin: -1rem 0 0 0 !important;
    overflow: hidden !important;
}

.mb-text {
    display: none !important;
}
```

**`isMobile` import**: Remove from `MoodBoard.jsx`. Keep `useIsMobile` only for the parallax ranges.

**Test update** (`MoodBoard.test.jsx`): The existing test "hides typography on mobile" checks that `queryByRole('heading', { level: 2 })` returns `null` on mobile. After this change, the heading is always in the DOM (CSS hides it visually). Update the test to assert the heading exists and has the `mb-text` class.

---

### 5.2 — `src/pages/Home.jsx` — Sycamore Card

**All `isMobile`-dependent values:**

| Element | Values differ by viewport |
|---------|--------------------------|
| Card div | `maxWidth`, `margin`, `padding`, `gap` |
| Logo img | `width`, `marginBottom` |
| CTA link | `fontSize`, `padding` |
| `<h2>` + `<p>` | Conditionally rendered (`{!isMobile && ...}`) |
| Link text | `'Name ↗'` vs `'Visit Name ↗'` |

**Strategy:** The `.sycamore-home-card` class already exists in `index.css` with some mobile overrides. Extend it to cover all `isMobile`-driven values. Remove the `useIsMobile` call entirely from `Home.jsx`.

**New base CSS** (extend existing `.sycamore-home-card` or add alongside it):
```css
.sycamore-home-card {
    max-width: 600px;
    margin: 4rem auto 0 calc(50% - 200px);
    padding: 2rem;
    gap: 0;
}

.sycamore-logo {
    width: 100px;
    margin-bottom: 1rem;
}

.sycamore-text-block { display: block; }

.sycamore-cta-link {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
}

.sycamore-cta-short { display: none; }
.sycamore-cta-full  { display: inline; }
```

**New mobile CSS** (inside `@media (max-width: 768px)`):
```css
.sycamore-home-card {
    max-width: 220px !important;
    margin: -11rem 1rem 0 auto !important;
    padding: 1.25rem !important;
    gap: 0.75rem !important;
}

.sycamore-logo {
    width: 60px !important;
    margin-bottom: 0 !important;
}

.sycamore-text-block { display: none !important; }

.sycamore-cta-link {
    font-size: 0.75rem !important;
    padding: 0.4rem 0.75rem !important;
}

.sycamore-cta-short { display: inline !important; }
.sycamore-cta-full  { display: none !important; }
```

**New JSX for the conditional text block** (render unconditionally, CSS hides):
```jsx
<div className="sycamore-text-block">
    <h2 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--text-on-overlay)', marginBottom: '0.25rem' }}>
        Interested in hiring leadership?
    </h2>
    <p style={{ color: 'var(--text-on-overlay)', fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.9 }}>
        I also run a talent advisory practice.
    </p>
</div>
```

**New JSX for the CTA link text** (both spans always in DOM, CSS shows the right one):
```jsx
<a href={data.consulting.url} ... className="pill-tag bg-mustard sycamore-cta-link">
    <span className="sycamore-cta-short">{data.consulting.name} ↗</span>
    <span className="sycamore-cta-full">Visit {data.consulting.name} ↗</span>
</a>
```

---

### 5.3 — `src/pages/Library.jsx` — ShelfView

The `booksPerShelf` calculation is unique: it's not just a style value but determines the structural DOM (how many shelf-row `<div>` elements exist). If SSR renders 6-per-shelf and mobile hydrates with 3-per-shelf, the number of shelf `<div>` elements differs — a structural hydration mismatch.

**Strategy: `ClientOnly` wrapper from `vite-react-ssg`**

`vite-react-ssg` exports a `ClientOnly` component designed exactly for this case. It renders a fallback during SSG pre-rendering, then renders the real component only after client-side hydration.

```jsx
import { ClientOnly } from 'vite-react-ssg'

// In Library.jsx:
{isShelf
    ? <ClientOnly fallback={<ShelfViewDesktop books={books} />}>
          {() => <ShelfView books={books} />}
      </ClientOnly>
    : <CardView books={books} />
}
```

Where `ShelfViewDesktop` is a simplified version that always renders 6 books per shelf (identical to the SSG pre-render output). `ShelfView` is the existing component with full `useIsMobile()` + `useViewportWidth()` logic. After hydration, `ClientOnly` swaps `ShelfViewDesktop` for `ShelfView`.

**Tradeoff:** Mobile visitors see 6-per-shelf for ~100ms until hydration completes. At a typical 3G connection speed, this is barely perceptible. The shelf plank renders correctly in both versions. This is acceptable for the Library page.

**The remaining `isMobile` style props in `ShelfView`** (shelfPadding, marginBottom, shelf padding/gap, justifyContent) should also move to CSS classes (`shelf-row`, `shelf-books-wrapper`) following the same pattern as above. These do not cause structural mismatches (they're style-only), but fixing them makes the code consistent and avoids runtime style recalculation.

---

## 6. Phase 3 — Integrate vite-react-ssg

### 6.1 — Install

```bash
npm install vite-react-ssg
```

Pin the exact version to prevent surprise breakage (the package is pre-1.0):
```json
"vite-react-ssg": "x.y.z"
```

### 6.2 — Update `package.json` scripts

```json
"scripts": {
    "dev": "vite",
    "prebuild": "node scripts/generate-sitemap.js",
    "build": "vite-react-ssg build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest run"
}
```

Keep `"dev": "vite"` — the plain Vite dev server stays fast and familiar. SSG pre-rendering only runs during `npm run build`.

### 6.3 — Update `vite.config.js`

Add `ssgOptions`. All existing keys stay unchanged.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.VERCEL ? '/' : '/personalsite/',
  plugins: [react()],
  define: {
    __NOW_UPDATED__: JSON.stringify(
      new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    ),
  },
  ssgOptions: {
    script: 'defer',
    formatting: 'minify',
    // Exclude the wildcard route — it has no meaningful pre-renderable URL
    includedRoutes(paths) {
      return [...paths.filter(p => !p.includes('*')), '/404'];
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  }
})
```

The `/404` addition causes `vite-react-ssg` to pre-render `dist/404.html` (the NotFound component). Vercel serves this for any unmatched URL.

### 6.4 — Rewrite `src/main.jsx`

From imperative `createRoot` call to an exported function that `vite-react-ssg` controls during both pre-render and client hydration.

```jsx
import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './App.jsx'

export const createRoot = ViteReactSSG({ routes })
```

### 6.5 — Rewrite `src/App.jsx`

The routing structure changes from `<BrowserRouter>` + `<Routes>` to an exported `routes` array. The shell (ThemeProvider, Navigation, Footer) becomes a `Layout` component rendered at the root route. All nested pages become children.

```jsx
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { ScrollToTop } from './components/ScrollToTop'
import { ErrorBoundary } from './components/ErrorBoundary'
import contentData from './data/content.json'

import { Home } from './pages/Home'
import { Resume } from './pages/Resume'
import { Interests } from './pages/Interests'
import { Library } from './pages/Library'
import { Now } from './pages/Now'
import { NotFound } from './pages/NotFound'

const Layout = () => (
    <ThemeProvider>
        <div className="app-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <a href="#main-content" className="skip-link">Skip to content</a>
            <CustomCursor />
            <Navigation />
            <main id="main-content" className="container" style={{ flex: 1, paddingBottom: '4rem', paddingTop: '2rem' }}>
                <ErrorBoundary>
                    <ScrollToTop />
                    <Outlet />
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    </ThemeProvider>
)

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true,          element: <Home data={contentData} /> },
            { path: 'resume',       element: <Resume data={contentData.experience} consulting={contentData.consulting} /> },
            { path: 'interests',    element: <Interests /> },
            { path: 'library',      element: <Library data={contentData.books} /> },
            { path: 'now',          element: <Now now={contentData.now} books={contentData.books} /> },
            { path: '*',            element: <NotFound /> },
        ],
    },
]
```

**Key notes:**
- Data is still passed as props from the routes array — page component interfaces don't change.
- `basename` was previously set on `<BrowserRouter>`; `vite-react-ssg` respects Vite's `base` config automatically.
- `<BrowserRouter>` is gone. The data router `vite-react-ssg` creates internally provides identical routing API (`useNavigate`, `useLocation`, `NavLink`, etc.) — no changes needed in any component that uses these.
- `ScrollToTop` moves inside `<Outlet>` wrapper because it uses `useLocation`, which requires the router context to be established.

---

## 7. Phase 4 — Adapt Page-Level Data Sourcing

No changes required. Data is passed as inline props in the routes array (`<Home data={contentData} />`). `contentData` is imported at the top of `App.jsx` from the static JSON file. Node.js can import JSON files during pre-render. The page components' interfaces (what props they accept) do not change.

**`useArsenalFixture` in `Now.jsx`:** The `useEffect` never runs in Node.js. The `useState(fallback)` initializer receives `now.nextFixture` from `content.json` as the pre-render value. The pre-rendered HTML shows the hardcoded fixture. After hydration, `useEffect` fires and optionally updates to live API data. No changes needed.

**`__NOW_UPDATED__` define:** `vite-react-ssg build` uses Vite under the hood and respects all existing Vite config. The build-time string replacement works identically.

---

## 8. Phase 5 — Vercel and Build Pipeline

### 8.1 — `vercel.json`

With SSG, each route gets its own HTML file:
```
dist/index.html              ← /
dist/resume/index.html       ← /resume
dist/interests/index.html    ← /interests
dist/library/index.html      ← /library
dist/now/index.html          ← /now
dist/404.html                ← unmatched routes
```

The SPA catch-all rewrite (`"source": "/(.*)", "destination": "/index.html"`) is no longer needed for known routes. Vercel automatically serves `[path]/index.html` for directory-style URLs.

**New `vercel.json`:**
```json
{
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
        {
            "source": "/assets/(.*)",
            "headers": [
                { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
            ]
        },
        {
            "source": "/(.*)",
            "headers": [
                { "key": "X-Content-Type-Options", "value": "nosniff" },
                { "key": "X-Frame-Options", "value": "DENY" },
                { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
                { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
            ]
        }
    ]
}
```

`cleanUrls: true` tells Vercel to serve `/resume/index.html` for requests to `/resume`. `trailingSlash: false` prevents `/resume/` redirecting to `/resume`. Vercel automatically serves `404.html` for all unmatched paths.

### 8.2 — Build pipeline

The `prebuild` script (`node scripts/generate-sitemap.js`) runs before `vite-react-ssg build`. Order is correct. Vercel's build command and output directory (`dist`) remain unchanged — no Vercel project setting changes needed.

---

## 9. Phase 6 — Validation and Testing

### 9.1 — Local build check

```bash
npm run build
```

`vite-react-ssg` prints:
```
Rendering... /
Rendering... /resume
Rendering... /interests
Rendering... /library
Rendering... /now
Rendering... /404
```

Inspect `dist/`:
- Each route has its own `index.html`
- Each HTML file contains real rendered content (not `<div id="root"></div>`)
- Each file contains the correct `<title>` and `<meta name="description">`

### 9.2 — Hydration error check

```bash
npm run preview
```

Open browser DevTools console. Look for:
- `Warning: Prop 'xxx' did not match` → hydration mismatch
- `Error: Hydration failed because the server rendered HTML didn't match the client`

If either appears, identify the component in the React error stack trace and trace it back to a remaining `isMobile` or browser-API usage in a render path.

### 9.3 — Test suite

```bash
npm test
```

All existing tests should pass except `MoodBoard.test.jsx`. Update the "hides typography on mobile" test:

**Before:**
```jsx
// Expected heading not to be in the DOM at all
expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
```

**After:**
```jsx
// Heading is always in the DOM; CSS class controls visibility
const heading = screen.getByRole('heading', { level: 2 });
expect(heading).toBeInTheDocument();
expect(heading.closest('.mb-text')).not.toBeNull();
```

### 9.4 — Pre-deployment checklist

After deploying to a Vercel preview branch (not main):

- [ ] View page source of `/`, `/resume`, `/now` — confirm rendered HTML content
- [ ] Test a nonexistent URL (e.g., `/foo`) — should show NotFound component, not a Vercel 404
- [ ] Open on mobile Safari (iOS) — check Home and Library pages for layout shift on load
- [ ] Open on Chrome desktop — check dark mode toggle works correctly on first load
- [ ] Run Lighthouse on `/`, `/resume`, `/now` in mobile emulation — target LCP < 2.5s
- [ ] Paste `/resume` into Twitter Card Validator — should show page-specific title and description
- [ ] Paste `/now` into LinkedIn post preview — same check

---

## 10. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| `vite-react-ssg` incompatibility with React Router v7 | Medium | High | The library targets v6 component-route patterns. Test locally before any push. If it fails, see Rollback B (React Router framework mode). |
| Hydration mismatch not caught locally | Medium | Medium | Always test with `npm run preview`, not `npm run dev`. The mismatch only appears when pre-rendered HTML is served. |
| `ThemeContext` pre-renders `light`, causing flash for dark-mode users | Low | Low | The existing anti-flash script in `index.html` corrects this before the page is visible. No regression from current behavior. |
| Library shelf layout shift on mobile (6→3 books per shelf) | Low | Low | `ClientOnly` wrapper limits this to the fraction of a second before hydration on the Library page only. |
| `vite-react-ssg` version instability (pre-1.0) | Medium | Low | Pin the exact version in `package.json`. No urgency to upgrade after this implementation. |
| Vercel routing breaks for unknown paths | Medium | Medium | The pre-rendered `dist/404.html` + Vercel's built-in fallback handles this. Verify with a nonexistent URL after deployment. |
| Framer Motion animations show `initial` state briefly before hydration | Low | Low | This is how all SSR+Framer Motion sites work. `whileInView` and `initial` states are designed for this. Not a crash; a brief invisible-content frame. |
| Sitemap `prebuild` timing | Low | Low | `prebuild` runs before `vite-react-ssg build`. Sitemap writes to `public/`, which is copied to `dist/` during the build. Order is correct. |

---

## 11. Rollback Plan

**This work should be done on a feature branch, not directly on `main`, to make rollback trivial.**

### Rollback A — Revert to SPA (immediate, < 5 minutes)

Three changes restore the SPA:
1. `package.json`: change `"build": "vite-react-ssg build"` back to `"build": "vite build"`
2. `src/main.jsx`: restore `createRoot(document.getElementById('root')).render(...)`
3. `src/App.jsx`: restore `<BrowserRouter>` + `<Routes>`
4. `vercel.json`: restore the catch-all rewrite `{ "source": "/(.*)", "destination": "/index.html" }`

Push to main. Vercel auto-deploys in ~90 seconds.

The Phase 1 SSR safety fixes and Phase 2 CSS migrations are all backward-compatible — they don't need to be reverted. The site works correctly as an SPA with those changes in place.

### Rollback B — Migrate to React Router v7 Framework Mode (if vite-react-ssg fails)

If `vite-react-ssg` proves incompatible with React Router v7 in ways that can't be resolved, the alternative is React Router v7's first-class SSG via framework mode:

- Install `@react-router/dev`
- Create `routes.ts` + `react-router.config.ts`
- Rename `src/main.jsx` → `src/entry.client.jsx`
- Use `hydrateRoot` with `HydratedRouter`

This is a larger migration fully documented in the React Router v7 official guides. **All Phase 1 and Phase 2 work done in this plan remains valid** for framework mode — none of it is wasted effort regardless of which tool is used.

---

## 12. Implementation Order

### Reordering note

The original order (Phase 1 → Phase 2 → Phase 3) front-loads the bulk of the CSS migration work before validating that `vite-react-ssg` is compatible with React Router v7. Since this library targets v6 patterns and the project runs v7, compatibility is the highest-impact unknown. **Validate it first, before Phase 2.** If it fails, Rollback B (React Router framework mode) is the correct path — and all Phase 1 work remains valid for that path too.

**Revised order:**

1. Do Phase 1 (two `typeof window` guards — ~10 minutes).
2. Skip ahead and do Phase 3 immediately: install `vite-react-ssg`, rewrite `main.jsx` and `App.jsx`, run `npm run build`.
3. If the build produces real per-route HTML in `dist/` and `npm run preview` shows no hydration errors → compatibility confirmed. Proceed with Phase 2, then Phases 4–6.
4. If the build fails due to React Router v7 incompatibility → stop, assess. Rollback B (React Router framework mode) is the fallback; all Phase 1 work is still valid.

This reordering costs nothing if `vite-react-ssg` works (Phase 2 still runs in full), but saves several hours of CSS migration effort if it doesn't.

---

### Full sequence

Execute in this order after applying the reordering note above.

```
Phase 1a:  src/context/ThemeContext.jsx     — add typeof window guard      (5 min)
Phase 1b:  src/hooks/useResponsive.js       — add typeof window guards     (5 min)
           → npm test — all tests pass

Phase 3a:  npm install vite-react-ssg (pin version)          ← moved up: validate compatibility first
Phase 3b:  package.json                     — update build script
Phase 3c:  vite.config.js                   — add ssgOptions
Phase 3d:  src/main.jsx                     — ViteReactSSG export
Phase 3e:  src/App.jsx                      — routes array + Layout component
           → npm run build
           → confirm dist/ contains per-route HTML files with real content
           → npm run preview — check console for hydration errors
           → IF BUILD FAILS: stop and assess Rollback B before continuing

Phase 2a:  src/index.css                    — add mb-container, mb-text classes
Phase 2b:  src/components/MoodBoard.jsx     — remove isMobile from container style; render text unconditionally
Phase 2c:  src/components/MoodBoard.test.jsx — update "hides typography" test
           → npm test

Phase 2d:  src/index.css                    — add sycamore-* classes
Phase 2e:  src/pages/Home.jsx               — remove useIsMobile; apply CSS classes
           → npm test

Phase 2f:  src/index.css                    — add shelf-row, shelf-books-wrapper classes
Phase 2g:  src/pages/Library.jsx            — add ClientOnly wrapper; move style props to CSS classes
           → npm test

Phase 4:   Verify data sourcing (no changes expected; confirm with a build pass)

Phase 5:   vercel.json                      — cleanUrls, remove catch-all rewrite
           → deploy to Vercel preview branch (not main)
           → view-source each page, test /foo, run Lighthouse

Phase 6:   Full test suite, manual cross-browser checks, pre-deployment checklist
           → merge to main on green
```

**Total estimated time:** 4–6 hours of focused implementation and testing.

---

## 13. Code Review Amendments (February 2026)

The following amendments were identified during code review and are incorporated into the implementation.

### Amendment A — Avoid `!important` Where Unnecessary

The original Phase 2 CSS uses `!important` on all mobile overrides (`.mb-container`, `.mb-text`, `.sycamore-*`). This inherits the pattern from existing `index.css` mobile overrides. However, since we are simultaneously **removing** the competing inline `style` attributes from JSX, the new CSS classes won't need `!important` to win specificity — they'll be the only source of truth for those values.

**Rule:** Only use `!important` when the CSS class must override an inline style that intentionally remains in the JSX (e.g., Framer Motion's `style={{ y }}` props). For values migrated entirely to CSS, omit `!important`.

### Amendment B — Simpler Library Fallback (replaces `ShelfViewDesktop`)

The original plan creates a `ShelfViewDesktop` component as a simplified 6-per-shelf fallback for `ClientOnly`. This duplicates book rendering logic and creates a maintenance burden.

**Replacement:** Use `ClientOnly` with a minimal placeholder instead:

```jsx
import { ClientOnly } from 'vite-react-ssg'

{isShelf
    ? <ClientOnly fallback={<div className="shelf-placeholder" style={{ minHeight: '400px' }} />}>
          {() => <ShelfView books={books} />}
      </ClientOnly>
    : <CardView books={books} />
}
```

The placeholder renders as empty space during SSG pre-render. After hydration (~100ms), the full `ShelfView` mounts with correct viewport-aware layout. This avoids:
- Duplicating shelf rendering logic in two components
- A structural 6→3 shift that's more visually jarring than a fade-in
- Maintaining two components that must stay in sync

### Amendment C — Verify `<title>` and `<meta>` Hoisting

Several page components (Home, Library, Now, Resume) render `<title>` and `<meta>` tags directly as JSX children — not inside a `<head>` wrapper. React 19 natively hoists `<title>`, `<meta>`, and `<link>` from component trees into `<head>`. During Phase 3 validation, confirm that:

1. `vite-react-ssg` correctly hoists these during pre-render (check the generated HTML files for per-page `<title>` values)
2. The `index.html` template's existing `<head>` content (OG tags, JSON-LD, fonts, anti-flash script) is preserved in all generated pages

If React 19 hoisting doesn't work during SSG pre-render, add `react-helmet-async` as a fallback.

### Amendment D — Confirm `index.html` Template Preservation

`vite-react-ssg` uses the existing `index.html` as a template for all generated pages. The following must survive in every generated HTML file:

- Google Fonts preconnect + stylesheet link
- Anti-flash theme script (lines 18–24)
- Favicon and apple-touch-icon links
- Open Graph and Twitter Card meta tags
- JSON-LD structured data (`Person` and `WebSite` schemas)

Verify during Phase 3 validation by inspecting `dist/resume/index.html` (or any sub-page).

### Amendment E — `base` Path Local Preview

`vite.config.js` sets `base: process.env.VERCEL ? '/' : '/personalsite/'`. During `npm run preview`, assets will be served under `/personalsite/`. Confirm that:
1. The preview server correctly resolves routes and assets with this base path
2. If preview is broken locally due to the base path, consider setting `VERCEL=1` during local preview: `VERCEL=1 npm run preview`
