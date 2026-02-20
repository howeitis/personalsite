import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import contentData from './data/content.json';

// Pages
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';
import { Interests } from './pages/Interests';
import { Readings } from './pages/Readings';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CustomCursor />
        <Navigation />

        <main className="container" style={{ flex: 1, paddingBottom: '4rem', paddingTop: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home data={contentData} />} />
            <Route path="/resume" element={<Resume data={contentData.experience} />} />
            <Route path="/interests" element={<Interests data={contentData.interests} />} />
            <Route path="/readings" element={<Readings />} />
          </Routes>
        </main>

        <Footer personal={contentData.personal} />
      </div>
    </Router>
  );
}

export default App;
