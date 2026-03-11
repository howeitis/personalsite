import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollToTop } from './components/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';
import contentData from './data/content.json';

// Pages
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';
import { Interests } from './pages/Interests';
import { Library } from './pages/Library';
import { Now } from './pages/Now';
import { NotFound } from './pages/NotFound';

const pageVariants = {
  initial: { opacity: 0, y: 30, rotate: -0.6 },
  animate: {
    opacity: 1, y: 0, rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 24 }
  },
  exit: {
    opacity: 0, y: -20, scale: 0.98,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home data={contentData} />} />
          <Route path="/resume" element={<Resume data={contentData.experience} consulting={contentData.consulting} />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/library" element={<Library data={contentData.books} />} />
          <Route path="/now" element={<Now now={contentData.now} books={contentData.books} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <div className="app-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <CustomCursor />
          <Navigation />

          <main id="main-content" className="container" style={{ flex: 1, paddingBottom: '4rem', paddingTop: '2rem' }}>
            <ErrorBoundary>
              <AnimatedRoutes />
            </ErrorBoundary>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
