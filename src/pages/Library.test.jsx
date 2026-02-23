import { render, screen } from '@testing-library/react';
import { Library } from './Library';

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

const mockBooks = [
    { title: 'Sapiens', author: 'Yuval Noah Harari' },
    { title: 'Mistborn', author: 'Brandon Sanderson' },
    { title: 'The Jungle', author: 'Upton Sinclair' },
    { title: 'James', author: 'Percival Everett' },
    { title: 'Homo Deus', author: 'Yuval Noah Harari' },
    { title: 'The Body', author: 'Bill Bryson' },
    { title: 'The Anarchy', author: 'William Dalrymple' },
];

describe('Library Page', () => {
    it('renders the page heading', () => {
        render(<Library data={mockBooks} />);
        expect(screen.getByText('The Library.')).toBeInTheDocument();
    });

    it('renders the Shelf and Cards toggle buttons', () => {
        render(<Library data={mockBooks} />);
        expect(screen.getByText('Shelf')).toBeInTheDocument();
        expect(screen.getByText('Cards')).toBeInTheDocument();
    });

    it('renders shelf view by default with correct subtitle', () => {
        render(<Library data={mockBooks} />);
        expect(screen.getByText('Grab a book off my shelf.')).toBeInTheDocument();
    });

    it('renders book links to Goodreads', () => {
        render(<Library data={mockBooks} />);
        const links = screen.getAllByRole('link');
        const goodreadsLinks = links.filter(l => l.href && l.href.includes('goodreads.com'));
        expect(goodreadsLinks.length).toBe(mockBooks.length);
    });

    it('renders book cover images with correct alt text', () => {
        render(<Library data={mockBooks} />);
        expect(screen.getByAltText('Sapiens by Yuval Noah Harari')).toBeInTheDocument();
        expect(screen.getByAltText('Mistborn by Brandon Sanderson')).toBeInTheDocument();
    });

    it('handles empty data gracefully', () => {
        render(<Library data={[]} />);
        expect(screen.getByText('The Library.')).toBeInTheDocument();
    });

    it('handles undefined data gracefully', () => {
        render(<Library data={undefined} />);
        expect(screen.getByText('The Library.')).toBeInTheDocument();
    });
});
