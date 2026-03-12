import { useState } from 'react';
import { m } from 'framer-motion';
import { getBookColor } from '../utils/colorHash';
import { toImageFilename } from '../utils/bookFilename';
import { useIsMobile, useViewportWidth } from '../hooks/useResponsive';
import { ImageLightbox } from '../components/ImageLightbox';
import { useContent } from '../context/ContentContext';
import { useTheme } from '../context/ThemeContext';
import { Helmet } from 'react-helmet-async';

const ShelfView = ({ books }) => {
    const isMobile = useIsMobile();
    const viewportWidth = useViewportWidth();
    const { theme } = useTheme();

    const spineTextures = [
        `${import.meta.env.BASE_URL}images/spine_1.webp`,
        `${import.meta.env.BASE_URL}images/spine_2.webp`,
        `${import.meta.env.BASE_URL}images/spine_3.webp`
    ];

    // On mobile, calculate how many books actually fit on one shelf
    // based on viewport width, book width, gaps, and padding
    const mobileBookWidth = 130; // base width for mobile books
    const mobileGap = 12;
    const shelfPadding = isMobile ? 0 : 64; // total horizontal padding (both sides)
    const availableWidth = viewportWidth - shelfPadding;
    const booksPerShelf = isMobile
        ? Math.max(2, Math.floor((availableWidth + mobileGap) / (mobileBookWidth + mobileGap)))
        : 6;

    const shelfChunks = [];
    for (let i = 0; i < books.length; i += booksPerShelf) {
        shelfChunks.push(books.slice(i, i + booksPerShelf));
    }

    return (
        <div style={{ padding: isMobile ? '0' : '0 2vw' }}>
            {shelfChunks.map((chunk, shelfIndex) => (
                <div key={shelfIndex} style={{
                    position: 'relative',
                    marginBottom: isMobile ? '2rem' : '8rem',
                    padding: isMobile ? '0' : '0 2rem'
                }}>
                    {/* The Books */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: isMobile ? 'space-evenly' : 'center',
                        gap: isMobile ? '0px' : '2rem',
                        alignItems: 'flex-end',
                        position: 'relative',
                        zIndex: 10,
                        paddingBottom: '16px'
                    }}>
                        {chunk.map((book, bookIndex) => {
                            const { title, author, url } = book;
                            const index = (shelfIndex * booksPerShelf) + bookIndex;
                            const { bgColor, charSum } = getBookColor(title, index);

                            const heightValue = 240 + ((charSum * index) % 40);
                            const widthValue = heightValue * 0.65;

                            const primarySrc = `${import.meta.env.BASE_URL}images/covers/${toImageFilename(title)}.webp`;
                            const fallbackSrc = spineTextures[index % spineTextures.length];

                            const isCurrentlyReading = book.currentlyReading;

                            return (
                                <ImageLightbox
                                    key={index}
                                    src={primarySrc}
                                    alt={`${title} by ${author}`}
                                    externalLink={url || `https://www.goodreads.com/search?q=${encodeURIComponent(title + " " + author)}`}
                                    style={{ display: 'block', flexShrink: 0, position: 'relative' }}
                                >
                                    {isCurrentlyReading && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '-10px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            backgroundColor: 'var(--terracotta)',
                                            color: 'white',
                                            fontSize: '0.6rem',
                                            fontWeight: 700,
                                            padding: '2px 8px',
                                            borderRadius: '999px',
                                            whiteSpace: 'nowrap',
                                            zIndex: 20,
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase'
                                        }}>
                                            Reading Now
                                        </span>
                                    )}
                                    <m.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -10, scale: 1.02, cursor: 'none' }}
                                        viewport={{ once: true, margin: "-20px" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: (index % 15) * 0.05 }}
                                        className="bento-card"
                                        style={{
                                            backgroundColor: bgColor,
                                            height: `clamp(160px, 45vw, ${heightValue}px)`,
                                            width: `clamp(104px, 29.25vw, ${widthValue}px)`,
                                            border: '1px solid rgba(0,0,0,0.15)',
                                            borderLeft: '4px solid rgba(255,255,255,0.2)',
                                            borderBottom: '1px solid rgba(0,0,0,0.2)',
                                            borderRadius: '2px 8px 8px 2px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 1,
                                            boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1)',
                                            margin: '0',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            padding: '1rem',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <img
                                            src={primarySrc}
                                            alt={`${title} by ${author}`}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = fallbackSrc;
                                                e.target.style.opacity = '0.9';
                                                e.target.style.mixBlendMode = 'multiply';
                                                e.target.style.filter = 'grayscale(20%) contrast(150%) brightness(0.9)';
                                                // Show the fallback text overlay
                                                const overlay = e.target.nextElementSibling;
                                                if (overlay) overlay.style.display = 'flex';
                                                e.target.onerror = (e2) => { e2.target.style.display = 'none'; };
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                opacity: 1,
                                                mixBlendMode: 'normal',
                                                filter: 'none',
                                                zIndex: 0
                                            }}
                                        />
                                        {/* Fallback title/author overlay - hidden by default, shown on image error */}
                                        <div style={{
                                            display: 'none',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '1rem',
                                            zIndex: 1,
                                            textAlign: 'center'
                                        }}>
                                            <span className="serif-text" style={{
                                                fontSize: '0.95rem',
                                                fontWeight: 'bold',
                                                color: '#4a3018',
                                                lineHeight: 1.2,
                                                textShadow: '0 1px 2px rgba(255,255,255,0.3)'
                                            }}>
                                                {title}
                                            </span>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                color: '#6e5033',
                                                marginTop: '0.25rem',
                                                fontWeight: 500
                                            }}>
                                                {author}
                                            </span>
                                        </div>
                                    </m.div>
                                </ImageLightbox>
                            );
                        })}
                    </div>

                    {/* The Physical Wooden Shelf */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '0',
                        right: '0',
                        zIndex: 5,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            height: '26px',
                            background: `
                                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"),
                                repeating-linear-gradient(
                                    to bottom,
                                    ${theme === 'dark' ? 'transparent' : 'transparent'},
                                    ${theme === 'dark' ? 'rgba(0,0,0,0.1) 2px' : 'rgba(0,0,0,0.05) 2px'}
                                ),
                                ${theme === 'dark' ? '#3e2714' : '#c8874a'}
                            `,
                            borderTop: `16px solid ${theme === 'dark' ? '#331f0f' : '#b97a40'}`,
                            borderBottom: `6px solid ${theme === 'dark' ? '#1f1309' : '#8e5520'}`,
                            borderRadius: '2px',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0px 4px 6px rgba(255,255,255,0.05)',
                            zIndex: 0,
                            position: 'relative',
                            backgroundBlendMode: 'overlay, normal, normal'
                        }}>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const CardView = ({ books }) => {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 1rem'
        }}>
            {books.map((book, index) => {
                const { title, author, url } = book;
                const { bgColor, textColor } = getBookColor(title, index);
                const rotation = index % 2 === 0 ? (index % 3 === 0 ? 3 : -2) : (index % 4 === 0 ? -4 : 2);

                const primarySrc = `${import.meta.env.BASE_URL}images/covers/${toImageFilename(title)}.webp`;

                return (
                    <ImageLightbox
                        key={index}
                        src={primarySrc}
                        alt={`${title} by ${author}`}
                        externalLink={url || `https://www.goodreads.com/search?q=${encodeURIComponent(title + " " + author)}`}
                        style={{ display: 'block' }}
                    >
                    <m.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, cursor: 'none' }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bento-card"
                        style={{
                            backgroundColor: bgColor,
                            padding: '1.5rem 2rem',
                            border: '2px solid var(--text-primary)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100px',
                            maxWidth: '350px',
                            textAlign: 'center',
                            zIndex: 1,
                            boxShadow: '4px 4px 0px 0px var(--text-primary)',
                            textDecoration: 'none'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <span className="serif-text" style={{
                                color: textColor,
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                lineHeight: 1.2
                            }}>
                                {title}
                            </span>
                            <span style={{
                                color: textColor,
                                fontSize: '0.85rem',
                                opacity: 0.8,
                                fontWeight: 500
                            }}>
                                {author}
                            </span>
                        </div>
                    </m.div>
                    </ImageLightbox>
                );
            })}
        </div>
    );
};

export const Library = () => {
    const [view, setView] = useState('shelf');
    const { books: data } = useContent();
    const { theme } = useTheme();
    const books = [...(data || [])].sort((a, b) => (b.currentlyReading ? 1 : 0) - (a.currentlyReading ? 1 : 0));

    const isShelf = view === 'shelf';
    const isDark = theme === 'dark';

    return (
        <div style={{
            padding: '2rem 0',
            paddingBottom: '4rem',

            background: isShelf ? `
                repeating-linear-gradient(
                    to right,
                    ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} 0px,
                    ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)'} 2px,
                    transparent 2px,
                    transparent 40px
                ),
                linear-gradient(to bottom, ${isDark ? '#2a2520 0%, #1f1b17 100%' : '#e6d3ba 0%, #d8c3a9 100%'})
            ` : 'none',
            backgroundColor: isShelf ? (isDark ? '#2a2520' : '#e6d3ba') : 'var(--bg-color)',
            minHeight: '100vh',
            color: isShelf ? (isDark ? 'var(--text-primary)' : '#4a3018') : 'var(--text-primary)',
            overflowX: 'hidden',
            transition: 'background-color 0.4s ease'
        }}>
            <Helmet>
                <title>Library — Owen Howe</title>
                <meta name="description" content="Owen Howe's reading list — a mix of fiction, non-fiction, sci-fi, and history spanning continents and centuries." />
                <link rel="canonical" href="https://howe.app/library" />
                <meta property="og:title" content="Library — Owen Howe" />
                <meta property="og:description" content="Owen Howe's reading list — a mix of fiction, non-fiction, sci-fi, and history spanning continents and centuries." />
                <meta property="og:url" content="https://howe.app/library" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": books.slice(0, 15).map((book, idx) => ({
                            "@type": "ListItem",
                            "position": idx + 1,
                            "item": {
                                "@type": "Book",
                                "name": book.title,
                                "author": {
                                    "@type": "Person",
                                    "name": book.author
                                }
                            }
                        }))
                    })}
                </script>
            </Helmet>
            {/* Page Header */}
            <div className="container" style={{ padding: '4rem 2rem', marginBottom: '4rem', textAlign: 'center' }}>
                <h1 className="serif-text" aria-label="The Library." style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    color: isShelf ? (isDark ? 'var(--text-primary)' : '#4a3018') : 'var(--text-primary)',
                    marginBottom: '1rem',
                    lineHeight: 1,
                    textShadow: isShelf ? (isDark ? '0px 2px 4px rgba(0,0,0,0.5)' : '0px 2px 4px rgba(0,0,0,0.1)') : 'none',
                    display: 'inline-flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {'The Library.'.split('').map((char, i) => (
                        <m.span
                            key={i}
                            initial={{ opacity: 0, y: 40, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 18,
                                delay: 0.2 + i * 0.05
                            }}
                            style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
                            aria-hidden="true"
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </m.span>
                    ))}
                </h1>
                <p style={{
                    color: isShelf ? (isDark ? 'var(--text-secondary)' : '#6e5033') : 'var(--text-secondary)',
                    fontSize: '1.25rem',
                    maxWidth: '600px',
                    margin: '0 auto 2rem auto',
                    fontWeight: 500
                }}>
                    {isShelf
                        ? 'Grab a book off my shelf.'
                        : 'Fiction, non-fiction, sci-fi, and history \u2014 thrown together in no particular order.'}
                </p>

                {/* View Toggle */}
                <div style={{
                    display: 'inline-flex',
                    border: '2px solid var(--text-primary)',
                    borderRadius: 'var(--border-radius-pill)',
                    overflow: 'hidden'
                }}>
                    <button
                        onClick={() => setView('shelf')}
                        style={{
                            padding: '0.5rem 1.25rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            fontFamily: 'inherit',
                            border: 'none',
                            cursor: 'none',
                            backgroundColor: isShelf ? 'var(--text-primary)' : 'transparent',
                            color: isShelf ? 'var(--bg-color)' : 'var(--text-primary)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Shelf
                    </button>
                    <button
                        onClick={() => setView('cards')}
                        style={{
                            padding: '0.5rem 1.25rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            fontFamily: 'inherit',
                            border: 'none',
                            borderLeft: '2px solid var(--text-primary)',
                            cursor: 'none',
                            backgroundColor: !isShelf ? 'var(--text-primary)' : 'transparent',
                            color: !isShelf ? 'var(--bg-color)' : 'var(--text-primary)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Cards
                    </button>
                </div>
            </div>

            {/* Conditional View */}
            {isShelf ? <ShelfView books={books} /> : <CardView books={books} />}
        </div>
    );
};
