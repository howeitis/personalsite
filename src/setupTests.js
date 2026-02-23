import '@testing-library/jest-dom';

// Mock IntersectionObserver for Framer Motion's whileInView
class MockIntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() { return null; }
    unobserve() { return null; }
    disconnect() { return null; }
}

if (typeof window !== 'undefined') {
    window.IntersectionObserver = MockIntersectionObserver;
}

// Mock matchMedia for Framer Motion
if (typeof window !== 'undefined' && !window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
    });
}
