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
    it('renders all four main images with descriptive alt text', () => {
        render(<MoodBoard />);
        expect(screen.getByRole('img', { name: /soccer/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /anime bike in forest/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /korean stew/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /vintage porsche/i })).toBeInTheDocument();
    });
});
