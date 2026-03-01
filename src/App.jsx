import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { CustomCursor } from './components/CustomCursor'
import { ScrollToTop } from './components/ScrollToTop'
import { ErrorBoundary } from './components/ErrorBoundary'
import contentData from './data/content.json'

// Pages
import { Home } from './pages/Home'
import { Resume } from './pages/Resume'
import { Interests } from './pages/Interests'
import { Library } from './pages/Library'
import { Now } from './pages/Now'
import { NotFound } from './pages/NotFound'

const Layout = () => (
    <ThemeProvider>
        <div className="app-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <a href="#main-content" className="skip-link">Skip to content</a>
            <CustomCursor />
            <Navigation />
            <main id="main-content" className="container" style={{ flex: 1, paddingBottom: '4rem', paddingTop: '2rem' }}>
                <ErrorBoundary>
                    <ScrollToTop />
                    <Outlet />
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    </ThemeProvider>
)

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true,          element: <Home data={contentData} /> },
            { path: 'resume',       element: <Resume data={contentData.experience} consulting={contentData.consulting} /> },
            { path: 'interests',    element: <Interests /> },
            { path: 'library',      element: <Library data={contentData.books} /> },
            { path: 'now',          element: <Now now={contentData.now} books={contentData.books} /> },
            { path: '*',            element: <NotFound /> },
        ],
    },
]
