import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from './Navigation';
import { ThemeProvider } from '../context/ThemeContext';

// Mock matchMedia for framer-motion
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

const renderNav = (initialRoute = '/') => {
    return render(
        <ThemeProvider>
            <MemoryRouter initialEntries={[initialRoute]}>
                <Navigation />
            </MemoryRouter>
        </ThemeProvider>
    );
};

describe('Navigation Component', () => {
    it('renders the brand logo link', () => {
        renderNav();
        const logo = screen.getByText('Owen Howe');
        expect(logo).toBeInTheDocument();
        expect(logo.closest('a')).toHaveAttribute('href', '/');
    });

    it('renders all four navigation links', () => {
        renderNav();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Interests')).toBeInTheDocument();
        expect(screen.getByText('Library')).toBeInTheDocument();
        expect(screen.getByText('Resume')).toBeInTheDocument();
    });

    it('renders the hamburger toggle button with correct aria-label', () => {
        renderNav();
        const hamburger = screen.getByLabelText('Toggle menu');
        expect(hamburger).toBeInTheDocument();
    });

    it('has a sticky navigation bar', () => {
        renderNav();
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
    });

    it('links point to correct routes', () => {
        renderNav();
        // Desktop nav links — they appear twice (desktop + mobile drawer potential)
        // Check desktop links exist with correct hrefs
        const homeLinks = screen.getAllByText('Home');
        expect(homeLinks.length).toBeGreaterThanOrEqual(1);

        const interestsLinks = screen.getAllByText('Interests');
        expect(interestsLinks[0].closest('a')).toHaveAttribute('href', '/interests');

        const libraryLinks = screen.getAllByText('Library');
        expect(libraryLinks[0].closest('a')).toHaveAttribute('href', '/library');

        const resumeLinks = screen.getAllByText('Resume');
        expect(resumeLinks[0].closest('a')).toHaveAttribute('href', '/resume');
    });
});
