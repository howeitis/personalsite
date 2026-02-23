import { render, screen } from '@testing-library/react';
import { ExperienceBento } from './ExperienceBento';

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

const mockExperience = [
    {
        id: 'nyt',
        company: 'The New York Times',
        title: 'Manager, Talent Acquisition',
        period: 'September 2021 - Present',
        location: 'Washington, D.C.',
        highlights: [
            'Led high volume recruitment.',
            'Directed early career program.',
            'Pioneered recruitment strategies.',
            'Trusted by senior leadership.',
            'Developed data-driven trackers.'
        ]
    },
    {
        id: 'two-six',
        company: 'Two Six Technologies',
        title: 'Sr. Talent Management Specialist',
        period: 'November 2017 - September 2021',
        location: 'Arlington, Virginia',
        secondTitle: 'Talent Management Specialist',
        secondPeriod: 'November 2017 - March 2019',
        highlights: [
            'Led Talent Acquisition team.',
            'Drove rapid workforce expansion.'
        ]
    }
];

describe('ExperienceBento Component', () => {
    it('renders the Career Journey header', () => {
        render(<ExperienceBento data={mockExperience} />);
        expect(screen.getByText('Career Journey')).toBeInTheDocument();
    });

    it('renders all company names', () => {
        render(<ExperienceBento data={mockExperience} />);
        expect(screen.getByText('The New York Times')).toBeInTheDocument();
        expect(screen.getByText('Two Six Technologies')).toBeInTheDocument();
    });

    it('renders job titles', () => {
        render(<ExperienceBento data={mockExperience} />);
        expect(screen.getByText('Manager, Talent Acquisition')).toBeInTheDocument();
        expect(screen.getByText('Sr. Talent Management Specialist')).toBeInTheDocument();
    });

    it('renders second title when provided', () => {
        render(<ExperienceBento data={mockExperience} />);
        expect(screen.getByText('Talent Management Specialist')).toBeInTheDocument();
    });

    it('renders the Education card for William & Mary', () => {
        render(<ExperienceBento data={mockExperience} />);
        expect(screen.getByText(/William & Mary/)).toBeInTheDocument();
        expect(screen.getByText('B.A. Government')).toBeInTheDocument();
        expect(screen.getByText('Class of 2016')).toBeInTheDocument();
    });

    it('renders period and location for jobs', () => {
        render(<ExperienceBento data={mockExperience} />);
        expect(screen.getByText('September 2021 - Present')).toBeInTheDocument();
        expect(screen.getByText('Washington, D.C.')).toBeInTheDocument();
    });

    it('limits highlights based on card width (wide=4, narrow=2)', () => {
        render(<ExperienceBento data={mockExperience} />);
        // First job (index 0, isWide=true) should show up to 4 highlights
        expect(screen.getByText('Led high volume recruitment.')).toBeInTheDocument();
        expect(screen.getByText('Directed early career program.')).toBeInTheDocument();
        expect(screen.getByText('Pioneered recruitment strategies.')).toBeInTheDocument();
        expect(screen.getByText('Trusted by senior leadership.')).toBeInTheDocument();
        // 5th highlight should NOT be shown (isWide shows max 4)
        expect(screen.queryByText('Developed data-driven trackers.')).not.toBeInTheDocument();
    });
});
