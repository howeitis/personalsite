import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ContentProvider } from './context/ContentContext';
import { ThemeProvider } from './context/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import { Home } from './pages/Home';

Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
    },
});

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

it('renders home page without crashing', () => {
    const errorSpy = vi.spyOn(console, 'error');
    render(
        <HelmetProvider>
            <ThemeProvider>
                <ContentProvider>
                    <MemoryRouter initialEntries={['/']}>
                        <ErrorBoundary>
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </ErrorBoundary>
                    </MemoryRouter>
                </ContentProvider>
            </ThemeProvider>
        </HelmetProvider>
    );

    if (errorSpy.mock.calls.length > 0) {
        console.log("CRASH LOGS: ", errorSpy.mock.calls);
    }
    
    expect(errorSpy).not.toHaveBeenCalled();
});
