import { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollToTop } from './components/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ContentProvider } from './context/ContentContext';

// Pages
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';
import { Interests } from './pages/Interests';
import { Library } from './pages/Library';
import { Now } from './pages/Now';
import { NotFound } from './pages/NotFound';

const ROUTE_ORDER = { '/': 0, '/now': 1, '/interests': 2, '/library': 3, '/resume': 4 };
const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: isReducedMotion ? 0 : direction * 60,
    rotate: isReducedMotion ? 0 : direction * -0.4,
  }),
  animate: {
    opacity: 1, x: 0, rotate: 0,
    transition: {
      type: 'spring', stiffness: 260, damping: 24,
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction) => ({
    opacity: 0,
    x: isReducedMotion ? 0 : direction * -40,
    scale: 0.98,
    transition: { duration: 0.15, ease: 'easeIn' }
  })
};

function AnimatedRoutes() {
  const location = useLocation();
  const currentIndex = ROUTE_ORDER[location.pathname] ?? 0;
  const prevIndex = useRef(currentIndex);
  const direction = currentIndex >= prevIndex.current ? 1 : -1;

  useEffect(() => {
    prevIndex.current = currentIndex;
  }, [currentIndex]);

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <m.div
        key={location.pathname}
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/library" element={<Library />} />
          <Route path="/now" element={<Now />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </m.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <ThemeProvider>
          <ContentProvider>
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
        </ContentProvider>
      </ThemeProvider>
    </LazyMotion>
    </HelmetProvider>
  );
}

export default App;
