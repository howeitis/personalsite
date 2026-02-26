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
│   │   └── colorHash.js     # Deterministic color hashing for books
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

### Update the /now Page
Edit the `now` object in `content.json` for text-only fields (`thinkingAbout`, `traveling`, `watching`, `playing`, `following`). The `nextFixture` object controls the Arsenal match pill (opponent, date, time, competition, home/away). Cards with embedded media (Listening with Spotify embed, Eating, Working On, Reading, Growing) have JSX in `src/pages/Now.jsx` — update the links, images, or text directly in the component. Media images live in `public/images/now/`.

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

**Known issue — Vercel env var not taking effect after update**: Even after updating `VITE_FOOTBALL_API_KEY` in the Vercel dashboard and triggering a redeploy, the fixture may still fail. This needs further investigation.

**Checklist so far:**
1. ✅ Updated key in Vercel dashboard (Settings → Environment Variables)
2. ✅ Triggered manual redeploy from Vercel Deployments tab
3. ❌ Fixture still not loading — root cause TBD

**Next steps to debug:**
- Open DevTools → Network tab on live site, filter by `api.football-data` — check the response status and error message
- Confirm the env var is set for **Production** environment (not just Preview/Development) in Vercel
- Check if the key itself is valid by testing directly: `curl "https://api.football-data.org/v4/teams/57/matches?status=SCHEDULED&limit=1" -H "X-Auth-Token: YOUR_KEY"`
- Check Vercel build logs to confirm the env var was injected at build time (Vite bakes `VITE_*` vars in at build, not runtime)
- If the key is valid but the build still uses the old key, try deleting and re-adding the env var (not just editing) before redeploying

---

## Roadmap

| Priority | Feature | Goal |
|---|---|---|
| ✅ Done | **`/now` page** | Living snapshot — bento grid with media, images, and hyperlinks to Spotify, Goodreads, Arsenal fixtures, NYT Cooking, The Athletic, and Smithsonian NMAAHC. |
| ✅ Done | **Social card (`og-image`)** | 1200×630 landscape card with logo, name, tagline, and terracotta accent. Proper previews on LinkedIn, Slack, iMessage. |
| ✅ Done | **Dark mode** | Full light/dark toggle with editorial dark palette, FOUC prevention, localStorage persistence, `prefers-color-scheme` detection. |
| ✅ Done | **Interactive embeds** | Spotify album embed on Listening card, Arsenal next fixture pill on Watching card. |
| Next | **Writing section** | Thought leadership posts on talent acquisition, AI, tech hiring. Primary driver of organic search traffic and return visits. |
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
| v64 | `/now` page: bento grid with media images (Stadio, Ebo Taylor, Arsenal logo, orchid photo), Spotify/Goodreads/Arsenal/NYT Cooking/Athletic/Smithsonian hyperlinks, updated listening content |
| v65 | Social card: 1200×630 og-image with logo, name, and tagline. Sitemap lastmod dates. `/now` page: side-by-side image layouts for Listening, Watching, and Growing cards |
| v66 | Dark mode: ThemeContext with localStorage persistence + `prefers-color-scheme` detection, FOUC prevention script, editorial dark palette (`[data-theme="dark"]`), Sun/Moon toggle in nav. `/now` page: Spotify album embed replaces static images on Listening card, Arsenal next fixture pill on Watching card |
| v67 | Nav: right-aligned links with dark mode toggle in far-right corner, route-aware brand ("Owen Howe" on home, "OH" on subpages), mobile toggle next to hamburger. `/now` page: Listening promoted to hero card (span 2) with side-by-side Spotify embed, Thinking About demoted to regular card, tighter padding across all cards, larger Arsenal fixture pill |
