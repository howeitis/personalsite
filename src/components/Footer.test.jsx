import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

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

describe('Footer Component', () => {
    it('renders the OH brand mark', () => {
        render(<Footer />);
        expect(screen.getByText('OH')).toBeInTheDocument();
    });

    it('renders the Email link with correct href and aria-label', () => {
        render(<Footer />);
        const emailLink = screen.getByLabelText('Send email to Owen');
        expect(emailLink).toBeInTheDocument();
        expect(emailLink).toHaveAttribute('href', 'mailto:owen@howe.app');
    });

    it('renders the LinkedIn link with correct href and aria-label', () => {
        render(<Footer />);
        const linkedinLink = screen.getByLabelText('Owen Howe on LinkedIn');
        expect(linkedinLink).toBeInTheDocument();
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/owen-howe-wm2016/');
        expect(linkedinLink).toHaveAttribute('target', '_blank');
        expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders the built-with credit line', () => {
        render(<Footer />);
        expect(screen.getByText('Built with Claude Code & Gemini from scratch.')).toBeInTheDocument();
    });
});
