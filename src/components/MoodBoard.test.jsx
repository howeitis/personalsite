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
    it('renders the main typography correctly', () => {
        render(<MoodBoard />);
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent(/Soccer/i);
        expect(heading).toHaveTextContent(/Tech/i);
        expect(heading).toHaveTextContent(/Food/i);
        expect(heading).toHaveTextContent(/Fashion/i);
        expect(screen.getByText(/I am not just a resume. I'm built by the things I pursue off the clock./i)).toBeInTheDocument();
    });

    it('renders all four main images with descriptive alt text', () => {
        render(<MoodBoard />);
        expect(screen.getByRole('img', { name: /fashion and music/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /anime bike in forest/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /korean stew/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /vintage porsche/i })).toBeInTheDocument();
    });

    it('renders the accompanying pill tags', () => {
        render(<MoodBoard />);
        expect(screen.getByText('Fashion & Music')).toBeInTheDocument();
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText('Tech & Machinery')).toBeInTheDocument();
    });
});
