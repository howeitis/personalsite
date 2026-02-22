import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBookColor } from '../utils/colorHash';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return isMobile;
};

const useViewportWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
};

const ShelfView = ({ books }) => {
    const isMobile = useIsMobile();
    const viewportWidth = useViewportWidth();

    const spineTextures = [
        `${import.meta.env.BASE_URL}images/spine_1.png`,
        `${import.meta.env.BASE_URL}images/spine_2.png`,
        `${import.meta.env.BASE_URL}images/spine_3.png`
    ];

    // On mobile, calculate how many books actually fit on one shelf
    // based on viewport width, book width, gaps, and padding
    const mobileBookWidth = 130; // base width for mobile books
    const mobileGap = 12;
    const shelfPadding = isMobile ? 16 : 64; // total horizontal padding (both sides)
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
                    marginBottom: isMobile ? '4rem' : '8rem',
                    padding: isMobile ? '0 0.5rem' : '0 2rem'
                }}>
                    {/* The Books */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'center',
                        gap: isMobile ? `${mobileGap}px` : '2rem',
                        alignItems: 'flex-end',
                        position: 'relative',
                        zIndex: 10,
                        paddingBottom: '16px'
                    }}>
                        {chunk.map((book, bookIndex) => {
                            const { title, author } = book;
                            const index = (shelfIndex * booksPerShelf) + bookIndex;
                            const { bgColor, charSum } = getBookColor(title, index);

                            const heightValue = 240 + ((charSum * index) % 40);
                            const widthValue = heightValue * 0.65;

                            const safeName = title.replace(/ /g, "_").replace(/'/g, "").toLowerCase();
                            const primarySrc = `${import.meta.env.BASE_URL}images/covers/${safeName}.jpg`;
                            const fallbackSrc = spineTextures[index % spineTextures.length];

                            return (
                                <a
                                    key={index}
                                    href={`https://www.goodreads.com/search?q=${encodeURIComponent(title + " " + author)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', display: 'block', flexShrink: 0 }}
                                >
                                    <motion.div
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
                                    </motion.div>
                                </a>
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
                            background: '#c8874a',
                            borderTop: '16px solid #b97a40',
                            borderBottom: '6px solid #8e5520',
                            borderRadius: '2px',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0px 4px 6px rgba(255,255,255,0.1)',
                            zIndex: 6,
                            position: 'relative'
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
                const { title, author } = book;
                const { bgColor, textColor } = getBookColor(title, index);
                const rotation = index % 2 === 0 ? (index % 3 === 0 ? 3 : -2) : (index % 4 === 0 ? -4 : 2);

                return (
                    <motion.a
                        key={index}
                        href={`https://www.goodreads.com/search?q=${encodeURIComponent(title + " " + author)}`}
                        target="_blank"
                        rel="noopener noreferrer"
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
                    </motion.a>
                );
            })}
        </div>
    );
};

export const Library = ({ data }) => {
    const [view, setView] = useState('shelf');
    const books = data || [];

    const isShelf = view === 'shelf';

    return (
        <div style={{
            padding: '2rem 0',
            paddingBottom: '4rem',
            background: isShelf ? `
                repeating-linear-gradient(
                    to right,
                    rgba(0,0,0,0.03) 0px,
                    rgba(0,0,0,0.03) 2px,
                    transparent 2px,
                    transparent 40px
                ),
                linear-gradient(to bottom, #f2eadf 0%, #e0d0ba 100%)
            ` : 'none',
            backgroundColor: isShelf ? '#f2eadf' : 'var(--bg-color)',
            minHeight: '100vh',
            color: isShelf ? '#4a3018' : 'var(--text-primary)',
            overflowX: 'hidden',
            transition: 'background-color 0.4s ease'
        }}>
            {/* Page Header */}
            <div className="container" style={{ padding: '4rem 2rem', marginBottom: '4rem', textAlign: 'center' }}>
                <h1 className="serif-text" style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    color: isShelf ? '#4a3018' : 'var(--text-primary)',
                    marginBottom: '1rem',
                    lineHeight: 1,
                    textShadow: isShelf ? '0px 2px 4px rgba(0,0,0,0.1)' : 'none'
                }}>
                    The Library.
                </h1>
                <p style={{
                    color: isShelf ? '#6e5033' : 'var(--text-secondary)',
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
