import { render, screen, act } from '@testing-library/react';
import { MoodBoard } from './MoodBoard';

// Mock matchMedia for framer-motion if needed
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe('MoodBoard Component', () => {
    it('renders the main typography correctly on desktop', () => {
        // Default window.innerWidth > 768, so text is visible
        render(<MoodBoard />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent(/Soccer/i);
        expect(heading).toHaveTextContent(/Tech/i);
        expect(heading).toHaveTextContent(/Food/i);
        expect(heading).toHaveTextContent(/Flora/i);
    });

    it('renders all four main images with descriptive alt text', () => {
        render(<MoodBoard />);
        expect(screen.getByRole('img', { name: /soccer/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /anime bike in forest/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /korean stew/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /vintage porsche/i })).toBeInTheDocument();
    });

    it('typography is always in the DOM with mb-text class (CSS hides on mobile)', () => {
        // After SSG migration, typography is always rendered — CSS controls visibility
        render(<MoodBoard />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
        expect(heading.closest('.mb-text')).not.toBeNull();
    });
});
