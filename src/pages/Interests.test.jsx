import { render, screen } from '@testing-library/react';
import { Interests } from './Interests';
import { ContentProvider } from '../context/ContentContext';
import { HelmetProvider } from 'react-helmet-async';

const renderWithProviders = (ui) => {
    return render(
        <HelmetProvider>
            <ContentProvider>
                {ui}
            </ContentProvider>
        </HelmetProvider>
    );
};

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

const mockInterests = ['Soccer', 'Tech', 'Food', 'Flora', 'Music', 'Travel'];

describe('Interests Page', () => {
    it('renders the page heading', () => {
        renderWithProviders(<Interests data={mockInterests} />);
        expect(screen.getByText('The Full Picture.')).toBeInTheDocument();
    });

    it('renders the subheading', () => {
        renderWithProviders(<Interests data={mockInterests} />);
        expect(screen.getByText("Take a look at what I'm into.")).toBeInTheDocument();
    });

    it('renders all 12 interest images', () => {
        renderWithProviders(<Interests data={mockInterests} />);
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(12);
    });

    it('renders interest tags for each image', () => {
        renderWithProviders(<Interests data={mockInterests} />);
        expect(screen.getByText('Art')).toBeInTheDocument();
        expect(screen.getByText('Cars')).toBeInTheDocument();
        expect(screen.getByText('Cycling')).toBeInTheDocument();
        expect(screen.getByText('Fashion')).toBeInTheDocument();
        expect(screen.getByText('Flora')).toBeInTheDocument();
        expect(screen.getByText('Food')).toBeInTheDocument();
        expect(screen.getByText('History')).toBeInTheDocument();
        expect(screen.getByText('International Relations')).toBeInTheDocument();
        expect(screen.getByText('Music')).toBeInTheDocument();
        expect(screen.getByText('Soccer')).toBeInTheDocument();
        expect(screen.getByText('Technology')).toBeInTheDocument();
        expect(screen.getByText('Travel')).toBeInTheDocument();
    });

    it('renders images with descriptive alt text', () => {
        renderWithProviders(<Interests data={mockInterests} />);
        expect(screen.getByAltText('Portrait Art')).toBeInTheDocument();
        expect(screen.getByAltText('Arsenal Football')).toBeInTheDocument();
        expect(screen.getByAltText('Korean Stew')).toBeInTheDocument();
    });

    it('uses lazy loading for all images', () => {
        renderWithProviders(<Interests data={mockInterests} />);
        const images = screen.getAllByRole('img');
        images.forEach(img => {
            expect(img).toHaveAttribute('loading', 'lazy');
        });
    });
});
