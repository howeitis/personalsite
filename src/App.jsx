import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="app-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <CustomCursor />
        <Navigation />

        <main id="main-content" className="container" style={{ flex: 1, paddingBottom: '4rem', paddingTop: '2rem' }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home data={contentData} />} />
              <Route path="/resume" element={<Resume data={contentData.experience} consulting={contentData.consulting} />} />
              <Route path="/interests" element={<Interests data={contentData.interests} />} />
              <Route path="/library" element={<Library data={contentData.books} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>

        <Footer personal={contentData.personal} />
      </div>
    </Router>
  );
}

export default App;
