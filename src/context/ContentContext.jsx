import { createContext, useContext, useMemo } from 'react';
import personal from '../data/personal.json';
import consulting from '../data/consulting.json';
import experience from '../data/experience.json';
import interests from '../data/interests.json';
import now from '../data/now.json';
import books from '../data/books.json';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
    // Memoize the value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        personal,
        consulting,
        experience,
        interests,
        now,
        books
    }), []);

    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
