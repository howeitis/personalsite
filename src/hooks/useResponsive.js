import { useState, useEffect } from 'react';

/**
 * Returns true when viewport width is <= 768px.
 * Used across components for mobile-specific rendering and styling.
 */
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        let timeout;
        const handler = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => setIsMobile(window.innerWidth <= 768), 100);
        };
        window.addEventListener('resize', handler);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', handler);
        };
    }, []);
    return isMobile;
};

/**
 * Returns the current viewport width in pixels.
 * Used in Library for calculating books-per-shelf.
 */
export const useViewportWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        let timeout;
        const handler = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => setWidth(window.innerWidth), 100);
        };
        window.addEventListener('resize', handler);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', handler);
        };
    }, []);
    return width;
};
