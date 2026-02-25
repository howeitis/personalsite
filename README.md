# Owen Howe - Personal Platform

A personal portfolio site with a brutalist editorial design system. Built with React 19, Framer Motion, and hand-crafted CSS. Deployed on Vercel.

### Live Site
[howe.app](https://howe.app)

---

## Architecture & Tech Stack

This project uses vanilla CSS over component libraries (Tailwind, Material UI, etc.) to achieve specific visual aesthetics — brutalist borders, editorial serif typography, parallax moodboard, and wooden bookshelf.

- **Framework**: React 19 + Vite 7
- **Routing**: React Router v7 (SPA, client-side navigation)
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
│   └── sitemap.xml          # Sitemap for SEO (4 routes)
├── src/
│   ├── components/
│   │   ├── Navigation.jsx   # Sticky nav: hamburger (mobile) + inline links (desktop), auto-hides on scroll
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
│   │   ├── Resume.jsx       # Career timeline + Sycamore Creek banner (teal accents)
│   │   └── NotFound.jsx
│   ├── utils/
│   │   └── colorHash.js     # Deterministic color hashing for books
│   ├── App.jsx              # Router, error boundary, lazy loading
│   ├── index.css            # Design tokens, CSS variables, all responsive overrides
│   └── setupTests.js        # Test setup: IntersectionObserver + matchMedia mocks
├── index.html               # SEO meta tags, JSON-LD Person schema, canonical URL
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
| **Navigation** | Inline links, visible always | Hamburger menu, auto-hides on scroll down |
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

Mobile shelves use `justify-content: space-evenly` with zero padding for full-bleed layout. Desktop uses `justify-content: center` with `2rem` padding. Book sizing uses `clamp()` for fluid scaling.

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
3. **Currently Reading**: Set `"currentlyReading": true` on a book to show a "Reading Now" badge in shelf view.

### Update Consulting Info
The Sycamore Creek card (homepage) and banner (resume) pull from `consulting` in `content.json` — fields: `name`, `tagline`, `url`.

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

## Roadmap

| Priority | Feature | Goal |
|---|---|---|
| Next | **`/now` page** | Living snapshot of what Owen is currently reading, listening, watching, eating, traveling, thinking about. Drives return visits and adds personality. |
| Next | **Social card (`og-image`)** | Replace square logo with a proper 1200×630 landscape image (name + tagline + logo). Better link previews on LinkedIn, Slack, iMessage. |
| Later | **Writing section** | Thought leadership posts on talent acquisition, AI, tech hiring. Primary driver of organic search traffic and return visits. |
| Later | **Contact form** | Lower-friction lead capture for Sycamore Creek — replaces external link with an embedded form. |

---

## Version History

| Version | Summary |
|---|---|
| v48 | Dead code removal, Library/Readings merge with shelf/card toggle |
| v49 | Hamburger nav (mobile), auto-hide on scroll, Sycamore Creek cards |
| v50 | Compact Sycamore card, book cover clipping fix, resume tree background |
| v51 | Sycamore vertical layout, bookshelf floating-books fix (`flexWrap: nowrap`) |
| v52 | Mobile moodboard overlap (CSS class positioning), library centering |
| v53 | Desktop overflow fix (`overflow: visible` on desktop, `hidden` on mobile) |
| v54 | Strip moodboard card padding on mobile, dampen parallax, library shelf gap reduction |
| v55 | Compress moodboard container height, tighter card positions, dampened parallax ranges |
| v56 | Full-bleed library shelves on mobile, Sycamore overlap, space-evenly book distribution |
| v57 | Moodboard hero tuck / Sycamore overlap tuning, Interests copy update, docs overhaul |
| v58 | Resume: Sycamore teal accents, Chungdahm terracotta card, moodboard margin tuning |
| v59 | Sycamore card right-offset on mobile to mirror desktop positioning |
| v60 | Soccer replaces fashion in moodboard, text updated to "Soccer/Tech/Food/Flora", captions removed, typography hidden on mobile, code cleanup + test updates |
| v61 | SEO infrastructure (robots.txt, sitemap.xml, JSON-LD Person schema, canonical URL, og:url fix), shared debounced hooks (useIsMobile/useViewportWidth), test coverage expanded to 53 tests across 10 files, img width/height for CLS prevention, accessibility (aria-labels, prefers-reduced-motion, contrast audit), "Currently Reading" tag for Library, Interests description-ready, footer credit line |
| v62 | Fix hero profile and Sycamore logo aspect ratio distortion caused by explicit width/height without `height: auto` |
| v63 | Add captions to all interests: Soccer, Books, Music, Cars, Food, Art (Fauvism), Travel (London next) |
