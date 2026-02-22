# Owen Howe - Personal Platform

A meticulously designed, interactive personal portfolio website showcasing professional experience, intellectual interests, and a curated vintage library. Built with React 19, Framer Motion, and bespoke CSS — optimized for both desktop and mobile with a brutalist editorial design system.

### Live Site
[owenhowe.com](https://owenhowe.com/)

---

## Architecture & Tech Stack

This project deliberately avoids heavy UI component libraries (like Tailwind or Material UI) in favor of hand-crafted vanilla CSS to achieve specific visual aesthetics — the brutalist borders, editorial typography, parallax moodboard, and wooden bookshelf.

- **Framework**: React 19 + Vite 7
- **Routing**: React Router v7 (SPA with client-side navigation)
- **Styling**: Vanilla CSS (`src/index.css`) with CSS custom properties + inline React styles
- **Animations**: Framer Motion (`motion.div`, `useScroll`, `useTransform`, `useSpring`, `AnimatePresence`)
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel (CI/CD connected to the `main` branch)

---

## Project Structure

```text
personal-website/
├── public/
│   └── images/              # Static assets (interest photos, book covers, logos)
│       ├── covers/          # Book cover images (auto-matched by title)
│       └── spines/          # Fallback spine textures for books without covers
├── src/
│   ├── components/
│   │   ├── Navigation.jsx   # Sticky nav with hamburger menu (mobile) + auto-hide on scroll
│   │   ├── HeroBento.jsx    # Homepage hero bento grid
│   │   ├── MoodBoard.jsx    # Parallax interest collage with CSS-based responsive positioning
│   │   ├── ExperienceBento.jsx  # Resume career timeline grid
│   │   ├── CustomCursor.jsx # Custom cursor (desktop only, uses useMotionValue)
│   │   ├── ErrorBoundary.jsx    # React error boundary with fallback UI
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   ├── data/
│   │   └── content.json     # CENTRAL CONTENT STORE (edit this to update the site)
│   ├── pages/
│   │   ├── Home.jsx         # Hero + MoodBoard + Sycamore Creek card
│   │   ├── Interests.jsx    # Interest cards with auto-matched images
│   │   ├── Library.jsx      # Bookshelf (shelf view) + card view toggle
│   │   ├── Resume.jsx       # Career timeline + Sycamore Creek banner
│   │   └── NotFound.jsx     # 404 page
│   ├── utils/
│   │   └── colorHash.js     # Shared deterministic color utility for books
│   ├── App.jsx              # Router setup, error boundary, lazy loading
│   └── index.css            # Design tokens, CSS variables, responsive overrides
├── index.html               # Entry point with OG metadata
└── package.json
```

---

## Key Design Decisions

### Responsive System
- **Breakpoint**: 768px (single breakpoint, mobile-first overrides in `index.css`)
- **Navigation**: Desktop shows inline links; mobile shows a hamburger menu with an animated drawer (`AnimatePresence`). Nav auto-hides on scroll down and reappears on scroll up.
- **MoodBoard**: Desktop uses absolute positioning with `clamp()` widths for fluid overlap. Mobile uses CSS class overrides (`mb-fashion`, `mb-flora`, `mb-food`, `mb-cars`) with tighter positions and smaller widths for a dense collage feel.
- **Library Shelf**: Dynamically calculates books-per-shelf based on actual viewport width. Uses `flexWrap: nowrap` to guarantee books never float below their shelf.
- **Sycamore Creek Card**: Full layout with heading on desktop; compact logo + CTA on mobile.

### Performance
- Custom cursor uses `useMotionValue` + `useSpring` instead of React state to avoid ~60 re-renders/second
- Lazy loading on all images
- Error boundary wraps routes with a styled fallback
- `overflow-x: hidden` on body and key containers to prevent horizontal scroll

---

## Content Management Guide

All text, lists, and links are pulled dynamically from `src/data/content.json`. You do not need to know React to update content.

### Updating the Homepage / Experience
Locate the `personal` or `experience` objects in `content.json`. The homepage uses a CSS Grid ("Bento Box") layout — reordering items in JSON changes their grid position.

### Updating Interests
The `/interests` page maps over the `interests` array in `content.json`.
1. Add a new object with a `title` (e.g., `"Fly Fishing"`).
2. Save the matching image to `public/images/fly_fishing.jpg`. The code converts the title to snake_case to find the image. If no image is found, a deterministic color block fallback is used.

### Updating the Library
The `/library` page displays books as a wooden bookshelf (default) or card view (toggle). Books get deterministic heights, widths, and colors based on a hash of their title.
1. Add the book to the `books` array in `content.json` (`title` and `author`).
2. **Optional custom cover**: Save a `.jpg` to `public/images/covers/`. The filename must match the formatted title — e.g., "The Way of Kings" becomes `the_way_of_kings.jpg`. If no cover is found, a textured vintage spine is generated.

### Updating Consulting Info
The Sycamore Creek card (homepage) and banner (resume) pull from the `consulting` object in `content.json` (`name`, `tagline`, `url`).

---

## Getting Started (Local Development)

Requires [Node.js](https://nodejs.org/) (v18+).

```bash
git clone https://github.com/howeitis/personalsite.git
cd personalsite
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Testing
```bash
npm test
```

---

## Deployment

This project deploys automatically via **Vercel**. Any push or merge to `main` triggers a build and deploy to production.

```bash
git add .
git commit -m "feat: description of change"
git push origin main
```
