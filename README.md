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
│   └── images/              # Static assets (photos, book covers, logos)
│       ├── covers/          # Book cover images (auto-matched by title)
│       └── spine_*.png      # Fallback spine textures for books without covers
├── src/
│   ├── components/
│   │   ├── Navigation.jsx   # Sticky nav: hamburger (mobile) + inline links (desktop), auto-hides on scroll
│   │   ├── HeroBento.jsx    # Homepage hero bento grid
│   │   ├── MoodBoard.jsx    # Parallax interest collage with CSS positioning + Framer Motion
│   │   ├── ExperienceBento.jsx  # Resume career timeline
│   │   ├── CustomCursor.jsx # Custom cursor (desktop only, useMotionValue for perf)
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   ├── data/
│   │   └── content.json     # ALL site content lives here (edit this to update the site)
│   ├── pages/
│   │   ├── Home.jsx         # Hero + MoodBoard + Sycamore Creek card
│   │   ├── Interests.jsx    # "The Full Picture" — masonry image collage
│   │   ├── Library.jsx      # Bookshelf (shelf/card toggle), viewport-aware layout
│   │   ├── Resume.jsx       # Career timeline + Sycamore Creek banner
│   │   └── NotFound.jsx
│   ├── utils/
│   │   └── colorHash.js     # Deterministic color hashing for books
│   ├── App.jsx              # Router, error boundary, lazy loading
│   └── index.css            # Design tokens, CSS variables, all responsive overrides
├── index.html
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
| **MoodBoard** | Large `clamp()` widths, full parallax, `overflow: visible` | Stripped padding/borders, tight positions, dampened parallax, `overflow: hidden` |
| **Library** | 6 books/shelf, `2rem` gaps, centered | Viewport-calculated books/shelf, `space-evenly`, full-bleed shelves |
| **Sycamore Card** | Full card with heading + subtext + CTA | Compact: logo + CTA only, overlaps moodboard bottom |

### MoodBoard Positioning

Desktop positions are defined in base CSS classes (`.mb-fashion`, `.mb-flora`, `.mb-food`, `.mb-cars`).
Mobile overrides live in the `@media (max-width: 768px)` block of `index.css` with `!important` to override inline styles from Framer Motion.

**Mobile-specific tweaks:**
- `padding: 0` — removes the `.bento-card` base padding so images fill the frame
- `border-radius: 8px`, `border-width: 2px` — lighter card chrome
- Parallax ranges reduced ~60% via conditional `useTransform` values in `MoodBoard.jsx`
- Container height: `clamp(520px, 80vh, 700px)` vs desktop `clamp(600px, 90vh, 1000px)`

### Library Bookshelf

Books-per-shelf is dynamically computed based on viewport width:

```js
const booksPerShelf = isMobile
    ? Math.max(2, Math.floor((viewportWidth + gap) / (bookWidth + gap)))
    : 6;
```

Mobile shelves use `justify-content: space-evenly` with zero padding for full-bleed layout. Desktop uses `justify-content: center` with `2rem` padding.

Book sizing uses `clamp()` for fluid scaling: `height: clamp(160px, 45vw, ${computed}px)`.

---

## Content Management

All text, lists, and links are in `src/data/content.json`. No React knowledge needed to update content.

### Update Homepage / Experience
Edit the `personal` or `experience` objects in `content.json`. The homepage bento grid renders items in JSON order.

### Update Interests
1. Add an object with a `title` to the `interests` array in `content.json`
2. Save the image to `public/images/{snake_case_title}.jpg` — the code converts titles to snake_case to find images

### Update the Library
1. Add `{ "title": "...", "author": "..." }` to the `books` array in `content.json`
2. **Optional cover**: Save as `public/images/covers/{snake_case_title}.jpg`. If no cover exists, a textured vintage spine is generated as fallback.

### Update Consulting Info
The Sycamore Creek card (homepage) and banner (resume) pull from `consulting` in `content.json` — fields: `name`, `tagline`, `url`.

---

## Local Development

Requires [Node.js](https://nodejs.org/) v18+.

```bash
git clone https://github.com/howeitis/personalsite.git
cd personalsite
npm install
npm run dev        # http://localhost:5173
npm test           # Vitest
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
