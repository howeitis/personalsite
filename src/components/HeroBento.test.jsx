import { render, screen } from '@testing-library/react';
import { HeroBento } from './HeroBento';

describe('HeroBento Component', () => {
    const mockData = {
        name: "Test User",
        email: "test@example.com",
        about: ["Line 1.", "Line 2.", "Washington, D.C."]
    };

    it('renders the greeting correctly', () => {
        render(<HeroBento data={mockData} />);
        expect(screen.getByText('👋 Hello!')).toBeInTheDocument();
    });

    it('renders the first name from the data', () => {
        render(<HeroBento data={mockData} />);
        expect(screen.getByText(/I'm Test/i)).toBeInTheDocument();
    });

    it('renders the location paragraph as an orange pill', () => {
        render(<HeroBento data={mockData} />);
        const locationPill = screen.getByText('Washington, D.C.');
        expect(locationPill).toBeInTheDocument();
        expect(locationPill).toHaveClass('pill-tag', 'bg-terracotta');
    });

    it('renders the profile image', () => {
        render(<HeroBento data={mockData} />);
        const image = screen.getByAltText(/owen's profile/i);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'images/hero_profile.jpg');
    });

    it('renders the Say Hello email button with correct mailto link', () => {
        render(<HeroBento data={mockData} />);
        const button = screen.getByRole('link', { name: /say hello ↗/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('href', 'mailto:test@example.com');
    });
});
