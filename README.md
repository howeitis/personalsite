# Owen Howe - Personal Platform

A personal portfolio site with a brutalist editorial design system. Built with React 19, Framer Motion, and hand-crafted CSS. Deployed on Vercel.

### Live Site
[howe.app](https://howe.app)

---

## Architecture & Tech Stack

This project uses vanilla CSS over component libraries (Tailwind, Material UI, etc.) to achieve specific visual aesthetics — brutalist borders, editorial serif typography, parallax moodboard, and wooden bookshelf.

- **Framework**: React 19 + Vite 7
- **Routing**: React Router v7 (SPA, client-side navigation)
- **Theming**: Dark/light mode via React Context + CSS custom properties (`[data-theme="dark"]`)
- **Styling**: Vanilla CSS (`src/index.css`) with CSS custom properties + inline React styles
- **Animations**: Framer Motion (`motion.div`, `useScroll`, `useTransform`, `useSpring`, `AnimatePresence`)
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel (auto-deploys on push to `main`)

---

## Project Structure

```text
personal-website/
├── public/
│   ├── images/              # Static assets (photos, book covers, logos)
│   │   ├── covers/          # Book cover images (auto-matched by title)
│   │   └── spine_*.png      # Fallback spine textures for books without covers
│   ├── robots.txt           # Search engine crawler directives
│   └── sitemap.xml          # Sitemap for SEO (5 routes, with lastmod dates)
├── src/
│   ├── components/
│   │   ├── Navigation.jsx   # Sticky nav: hamburger (mobile) + inline links (desktop), auto-hides on scroll, dark mode toggle
│   │   ├── HeroBento.jsx    # Homepage hero bento grid
│   │   ├── MoodBoard.jsx    # Parallax interest collage (desktop: typography + 4 images; mobile: images only)
│   │   ├── ExperienceBento.jsx  # Resume career timeline with color-rotated cards
│   │   ├── CustomCursor.jsx # Custom cursor (desktop only, useMotionValue for perf)
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx       # Brand mark + email/LinkedIn links + build credit
│   │   └── ScrollToTop.jsx
│   ├── data/
│   │   └── content.json     # ALL site content lives here (edit this to update the site)
│   ├── hooks/
│   │   └── useResponsive.js # Shared debounced useIsMobile() + useViewportWidth() hooks
│   ├── pages/
│   │   ├── Home.jsx         # Hero + MoodBoard + Sycamore Creek card (overlaps moodboard on mobile)
│   │   ├── Interests.jsx    # "The Full Picture" — masonry collage with optional descriptions
│   │   ├── Library.jsx      # Bookshelf (shelf/card toggle), "Currently Reading" tag, aria-labels
│   │   ├── Now.jsx           # /now page — bento grid with Spotify embed, Arsenal fixture, media, and external links
│   │   ├── Resume.jsx       # Career timeline + Sycamore Creek banner (teal accents)
│   │   └── NotFound.jsx
│   ├── utils/
│   │   ├── colorHash.js     # Deterministic color hashing for books
│   │   └── bookFilename.js  # Converts book title → cover image filename (matches fetch_covers.py)
│   ├── context/
│   │   └── ThemeContext.jsx  # Dark/light theme provider (localStorage + prefers-color-scheme)
│   ├── App.jsx              # Router, error boundary, ThemeProvider wrapper
│   ├── index.css            # Design tokens, CSS variables, dark mode palette, responsive overrides
│   └── setupTests.js        # Test setup: IntersectionObserver + matchMedia mocks
├── index.html               # SEO meta tags, JSON-LD Person schema, canonical URL, FOUC prevention script
└── package.json
```

---

## Key Design Patterns

### Responsive Strategy (768px breakpoint)

All responsive behavior uses a single breakpoint (`768px`) with two mechanisms:

1. **CSS media queries** in `src/index.css` — layout, grid, moodboard positioning, nav visibility
2. **`useIsMobile()` hook** in React components — conditional rendering, inline style values, parallax ranges

| Component | Desktop | Mobile |
|---|---|---|
| **Navigation** | Inline links right-aligned, "Owen Howe" brand on home / "OH" on subpages, dark mode toggle far-right | Hamburger + dark mode toggle, auto-hides on scroll down, "OH" brand |
| **MoodBoard** | Typography overlay + 4 images, full parallax, `overflow: visible` | Images only (no text), stripped padding/borders, dampened parallax, `overflow: hidden` |
| **Library** | 6 books/shelf, `2rem` gaps, centered | Viewport-calculated books/shelf, `space-evenly`, full-bleed shelves |
| **Sycamore Card** | Full card with heading + subtext + CTA, offset left | Compact logo + CTA, offset right, overlaps moodboard bottom via negative margin |

### MoodBoard

The moodboard is a parallax image collage using absolute positioning. Four images (soccer, flora, food, cars) float with Framer Motion `useTransform` parallax. On desktop, large "Soccer. Tech. Food. Flora." typography overlays the images with `mix-blend-mode: difference`.

**Desktop**: Positions via CSS classes (`.mb-fashion`, `.mb-flora`, `.mb-food`, `.mb-cars`) with `clamp()` widths.

**Mobile**: CSS media query overrides strip `.bento-card` padding/borders for edge-to-edge images. Parallax ranges are reduced ~60% via conditional `useTransform`. Typography is hidden entirely (`{!isMobile && ...}`). Container uses `overflow: hidden` to clip cards within bounds.

**CSS class note**: `.mb-fashion` is a legacy class name — it now positions the soccer image. The class names map to grid positions, not content.

### Resume Career Cards

Experience cards use a rotating color scheme: `['var(--bg-color)', 'var(--mustard)', 'var(--terracotta)']`. Text colors are computed per-card for contrast (white on terracotta, dark on mustard/cream). The Sycamore Creek banner uses teal (`#7EC8B5`) accents against a dark green background to differentiate it from the W&M education card.

### Library Bookshelf

Books-per-shelf is dynamically computed based on viewport width:

```js
const booksPerShelf = isMobile
    ? Math.max(2, Math.floor((viewportWidth + gap) / (bookWidth + gap)))
    : 6;
```

Mobile shelves use `justify-content: space-evenly` with zero padding for full-bleed layout. Desktop uses `justify-content: center` with `2rem` padding. Book sizing uses `clamp()` for fluid scaling. Clicking a book opens a full-screen React `createPortal` modal (`ImageLightbox`) overlay. The `CustomCursor` explicitly renders at `z-index: 99999` to ensure it floats above this portal. Each book maps directly to its specific canonical `goodreads.com/book/show/...` URL rather than relying on a generic search fallback.

---

## Content Management

All text, lists, and links are in `src/data/content.json`. No React knowledge needed to update content.

### Update Homepage / Experience
Edit the `personal` or `experience` objects in `content.json`. The homepage bento grid renders items in JSON order.

### Update Interests
1. Add an object with a `title` to the `interests` array in `content.json`
2. Save the image to `public/images/{snake_case_title}.jpg` — the code converts titles to snake_case to find images
3. **Optional descriptions**: To add a description below an interest tag, add a `description` field to the image object in `src/pages/Interests.jsx`. Example: `{ src: "images/soccer.jpg", ..., description: "Arsenal fan since day one." }`

### Update the Library
1. Add `{ "title": "...", "author": "..." }` to the `books` array in `content.json`
2. **Optional cover**: Save as `public/images/covers/{snake_case_title}.jpg`. If no cover exists, a textured vintage spine is generated as fallback.
3. **Explicit Goodreads URL**: Add the `"url"` field to the book object to ensure the Lightbox "View Details" button links directly to the canonical book page. If no URL is provided, the link will fall back to a title and author search query.
4. **Currently Reading**: Set `"currentlyReading": true` on a book to show a "Reading Now" badge in shelf view.

### Update Consulting Info
The Sycamore Creek card (homepage) and banner (resume) pull from `consulting` in `content.json` — fields: `name`, `tagline`, `url`.

### Update the /now Page
Edit the `now` object in `content.json` for text-only fields (`thinkingAbout`, `traveling`, `watching`, `playing`, `following`). The `nextFixture` object controls the Arsenal match pill — fields: `opponent`, `date` (YYYY-MM-DD), `hours` (0–23 ET), `minutes` (0–59), `competition`, `home` (boolean). Cards with embedded media (Music and Podcasts with Spotify embeds, Eating, Working On, Reading, Growing) have JSX in `src/pages/Now.jsx` — update the links, images, embed URLs, or header/tagline text directly in the component. Media images live in `public/images/now/`.

### Update Currently Reading
Set `"currentlyReading": true` on a book in `content.json`. Also add a `"url"` field (Goodreads or similar) — the Reading card on `/now` uses it for both the cover and title links. If no `url` is present, the links render without an `href`.

### Update MoodBoard Images
Images are hardcoded in `src/components/MoodBoard.jsx`. To swap an image, change the `src` attribute on the relevant `<img>` tag. Image files live in `public/images/`.

---

## Local Development

Requires [Node.js](https://nodejs.org/) v18+.

```bash
git clone https://github.com/howeitis/personalsite.git
cd personalsite
npm install
npm run dev        # http://localhost:5173
npm test           # Vitest (53 tests across 10 files)
npm run build      # Production build
```

---

## Deployment

Auto-deploys via **Vercel** on every push to `main`.

```bash
git add <files>
git commit -m "feat: description"
git push origin main
```

No PR required — `main` pushes go straight to production at [howe.app](https://howe.app).

---

## Troubleshooting

### Arsenal Fixture Not Showing (API Key Issues)

The Arsenal next fixture pill on the `/now` page requires a valid `VITE_FOOTBALL_API_KEY` from [football-data.org](https://www.football-data.org/).

**Symptoms**: Fixture pill is missing, blank, or shows fallback content.

**Known issue — `VITE_FOOTBALL_API_KEY` is `undefined` in the production bundle.**

Confirmed via DevTools: no request to `api.football-data.org` is ever made. This means `import.meta.env.VITE_FOOTBALL_API_KEY` is `undefined` at runtime, causing `useArsenalFixture.js:16` (`if (!apiKey) return`) to bail out silently and show the hardcoded fallback from `content.json`.

**Root cause**: Vite bakes `VITE_*` env vars into the JS bundle **at build time**, not runtime. The "Redeploy" button in Vercel **reuses the cached build** — it does NOT re-inject env vars. So updating the key in Vercel and clicking Redeploy has no effect if the same build artifact is reused.

**Checklist so far:**
1. ✅ Updated key in Vercel dashboard (Settings → Environment Variables)
2. ✅ Triggered manual redeploy from Vercel Deployments tab
3. ✅ Confirmed no network request to `api.football-data.org` (DevTools → Network)
4. ❌ Key is still not present in bundle — root cause: cached build reused

**Fix — trigger a fresh build:**
- Push any commit to `main` (even an empty one: `git commit --allow-empty -m "chore: trigger rebuild"`) — this forces Vercel to run a new build that picks up the env var
- Or in Vercel: Settings → Environment Variables → delete and re-add `VITE_FOOTBALL_API_KEY`, then go to Deployments → select latest → Redeploy → **uncheck "Use existing Build Cache"**
- Confirm the env var is set for the **Production** environment (not just Preview/Development)

**To verify the key itself is valid before rebuilding:**
```bash
curl "https://api.football-data.org/v4/teams/57/matches?status=SCHEDULED&limit=1" \
  -H "X-Auth-Token: YOUR_KEY"
```

---

## Roadmap

| Phase | Focus | Status |
|---|---|---|
| **Phase 1: Foundation** | Build the core SPA, implement `content.json` data architecture, build the base Bento grid UI. | ✅ Complete |
| **Phase 2: Tactile UI & Perf** | Refactor the `Now` and `Library` data layers into modular components. Transpile image assets to WebP for 100/100 Lighthouse scores. Implement rich CSS-driven textures for Dark/Light mode library shelves. | ✅ Complete |
| **Phase 3: The Native App Feel** | Wrap `react-router` in `framer-motion` `<AnimatePresence>` for fluid page cross-fades. Inject programmatic Schema.org/JSON-LD structures across all core routes for aggressive SEO indexing. | ✅ Complete |
| **Phase 4: Content Expansion** | Build an interactive `/uses` gear page detailing hardware, software, and desk setup. | ⏳ Pending |

---

## Recent Architectural Updates (v3.0.0+)

The platform recently underwent a massive structural refactoring to elevate it from a static portfolio into a highly performant, semantic web application:

1. **Fluid Page Transitions:** The core routing tree (`App.jsx`) is now wrapped in `framer-motion`'s `AnimatePresence`. Page navigation triggers concurrent `exit` and `initial` animation loops, creating a native iOS-like transition devoid of white-flashes.
2. **Knowledge Graph SEO:** The application dynamically generates `application/ld+json` Schema.org scripts via `react-helmet-async`. Google now explicitly understands the `Person`, `OrganizationRole`, `ItemList` (Books), and `CollectionPage` hierarchies. 
3. **Data Layer Modularization:** Huge monolithic components (ex: `Now.jsx`) were aggressively decoupled into discrete, testable `.jsx` files inside nested component directories (ex: `src/components/now/`). 
4. **Next-Gen Asset Pipeline:** All legacy `.jpg` and `.png` assets were transpiled into `.webp` artifacts, decimating the First Contentful Paint times. 
5. **Tactile Styling:** Advanced `repeating-linear-gradient` and SVG Noise filters were layered to create realistic material textures (namely the wood-grain on the Library routes), supported dynamically across Light and Dark mode Contexts.
