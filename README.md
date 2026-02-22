# Owen Howe - Personal Platform

A meticulously designed, interactive personal portfolio website showcasing professional experience, intellectual interests, independent reading, and a curated vintage library. Built with modern web technologies and optimized for immersive 3D aesthetics.

### Live Site
[owenhowe.com](https://owenhowe.com/) *(or Vercel generated URL)*

---

## 🏗️ Architecture & Tech Stack

This project deliberately avoids heavy UI component libraries (like Tailwind or Material UI) in favor of bespoke, hand-crafted vanilla CSS to achieve highly specific visual aesthetics—particularly the glassmorphism, 3D shadows, and organic textures present on the site.

- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (`src/index.css`) & Inline React Styles
- **Animations**: Framer Motion (`motion.div`, `whileHover`, `spring` physics, and `AnimatePresence` for mobile drawer navigation)
- **Deployment**: Vercel (CI/CD connected to the `main` branch)

---

## 📁 Project Structure

The codebase is organized to separate reusable logical components from full-page layouts, with a centralized data store for easy content management.

```text
personal-website/
├── public/                 # Static assets (images, fonts, book covers)
├── src/
│   ├── components/         # Reusable UI elements (Navigation includes Hamburger Menu, Bento Cards, Footer)
│   ├── data/
│   │   └── content.json    # 🎯 CENTRAL CONTENT STORE (Edit this to update the site!)
│   ├── pages/              # Full page container routes (Home, Interests, Readings, Library)
│   ├── App.jsx             # React Router setup & global layout wrapping
│   └── index.css           # Global design tokens, CSS variables, and root styles
└── package.json            # Project dependencies and npm scripts
```


---

## 📝 Content Management Editor's Guide

This project is built on a **headless logic** architecture. You **do not need to know React or HTML to update the website's content**. 

Almost all text, lists, and links are pulled dynamically from `src/data/content.json`. 

### Updating the Homepage / Experience
To add a new job or change the hero banner, locate the `hero` or `sections` object in `content.json`. 
*Note:* The homepage heavily utilizes CSS Grid ("Bento Box" design). Reordering items in the JSON will change their render position in the grid.

### Updating Interests
The `/interests` page maps over the `interests` array in `content.json`.
1. Add a new object to the list with a `title` (e.g., `"Fly Fishing"`).
2. Save the matching background image to `public/images/fly_fishing.jpg`. *The logic will automatically convert the title to a snake_case filename to find the image.* If it fails to find an image, it uses a deterministically generated color block fallback.

### Updating Readings
The `/readings` page is a chronological masonry layout of essays and articles.
Simply add a new object to the `readings` array in `content.json` with the `title`, `author`, `url`, and `date`. The application will automatically format the date (e.g., "Aug 2023").

### Updating the Library
The `/library` page is a dynamic 19th-century bookshelf. Books are given varied, deterministic spine widths, heights, and colors based on a hash of their title characters.
1. Add the book object to the `library` array in `content.json` (`title` and `author`).
2. *Optional Custom Cover:* Save a `.jpg` or `.png` of the book cover into `public/images/covers/`. It must precisely match the formatted title. For example, "The Way of Kings" becomes `the_way_of_kings.jpg`. If no cover is found, a textured vintage book spine is automatically generated.

---

## 🚀 Getting Started (Local Development)

To run this project locally, you need [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/howeitis/personalsite.git
   cd personalsite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the site:**
   Open your browser to `http://localhost:5173` (or the port specified by Vite in your terminal).

---

## ☁️ Deployment

This project is configured for seamless deployment on **Vercel**. 

Vercel listens to the `main` branch of this GitHub repository. Anytime code is pushed or merged into `main`, Vercel will automatically run `npm run build` and deploy the new bundle to production. 

To deploy changes manually:
```bash
# Add changes
git add .
git commit -m "feat: added new reading link"

# Push to the main branch to trigger a Vercel build
git push origin main
```
