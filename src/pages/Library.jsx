import { motion } from 'framer-motion';

export const Library = ({ data }) => {
    const books = data || [];

    const colors = [
        'var(--mustard)',
        'var(--br-green)',
        'var(--sky-blue)',
        'var(--lavender)',
        'var(--terracotta)',
        'var(--bg-color)'
    ];

    const spineTextures = [
        `${import.meta.env.BASE_URL}images/spine_1.png`,
        `${import.meta.env.BASE_URL}images/spine_2.png`,
        `${import.meta.env.BASE_URL}images/spine_3.png`
    ];

    // Calculate dynamic chunk size to evenly distribute books across shelves
    // Aim for around 6-7 books per shelf since we are showing full front covers now
    const targetPerShelf = 6;
    const numShelves = Math.ceil(books.length / targetPerShelf);
    const chunkSize = Math.ceil(books.length / numShelves);

    const shelfChunks = [];
    for (let i = 0; i < books.length; i += chunkSize) {
        shelfChunks.push(books.slice(i, i + chunkSize));
    }

    return (
        <div style={{
            padding: '2rem 0',
            paddingBottom: '4rem',
            // Vertical Wood Paneling/Beadboard Wall
            background: `
                repeating-linear-gradient(
                    to right,
                    rgba(0,0,0,0.03) 0px,
                    rgba(0,0,0,0.03) 2px,
                    transparent 2px,
                    transparent 40px
                ),
                linear-gradient(to bottom, #f2eadf 0%, #e0d0ba 100%)
            `,
            backgroundColor: '#f2eadf',
            minHeight: '100vh',
            color: '#4a3018', // Warm dark wood text
            overflowX: 'hidden' // Prevent any horizontal scroll from the wide shelf
        }}>
            {/* Page Header */}
            <div className="container" style={{ padding: '4rem 2rem', marginBottom: '4rem', textAlign: 'center' }}>
                <h1 className="serif-text" style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    color: '#4a3018', // Warm brown wood tone
                    marginBottom: '1rem',
                    lineHeight: 1,
                    textShadow: '0px 2px 4px rgba(0,0,0,0.1)' // Softer natural shadow
                }}>
                    The Library.
                </h1>
                <p style={{ color: '#6e5033', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
                    Grab a book off my shelf.
                </p>
            </div>

            {/* Bookshelves Container */}
            <div style={{ padding: '0 2vw' }}>
                {shelfChunks.map((chunk, shelfIndex) => (
                    <div key={shelfIndex} style={{
                        position: 'relative',
                        marginBottom: '8rem', // More space for the ornate corbels
                        padding: '0 2rem'
                    }}>
                        {/* The Books (Sitting on the shelf) */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '2rem', // Wider gap since these are front-facing covers on display
                            alignItems: 'flex-end', // Ensure all books, regardless of height, rest on the bottom padding
                            position: 'relative',
                            zIndex: 10,
                            paddingBottom: '16px' // Push books up so they sit on the shelf's top surface plane
                        }}>
                            {chunk.map((book, bookIndex) => {
                                // Destructure the new object format
                                const { title, author } = book;

                                // Calculate global index to keep deterministic sizing consistent
                                const index = (shelfIndex * chunkSize) + bookIndex;
                                const charSum = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                                const hashIndex = (title.length + charSum + index * 17) % colors.length;

                                const bgColor = colors[hashIndex];
                                const isDarkBg = bgColor === 'var(--br-green)' || bgColor === 'var(--terracotta)';
                                const textColor = isDarkBg ? 'var(--bg-color)' : 'var(--text-primary)';

                                // Standard Book Proportions (approx 2:3 ratio) with slight deterministic variance
                                const heightValue = 240 + ((charSum * index) % 40); // 240px to 280px tall
                                const widthValue = heightValue * 0.65; // ~standard paperback ratio

                                // Create safe filename for the scraped cover
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
                                            whileHover={{ y: -10, scale: 1.02, cursor: 'none' }} // Pop up and slightly enlarge
                                            viewport={{ once: true, margin: "-20px" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: (index % 15) * 0.05 }}
                                            className="bento-card"
                                            style={{
                                                backgroundColor: bgColor,
                                                height: `${heightValue}px`,
                                                width: `${widthValue}px`,
                                                border: '1px solid rgba(0,0,0,0.15)', // Lighter natural border
                                                borderLeft: '4px solid rgba(255,255,255,0.2)', // Soft highlight on the spine edge
                                                borderBottom: '1px solid rgba(0,0,0,0.2)', // Thin, realistic bottom
                                                borderRadius: '2px 8px 8px 2px', // Mimic a book cover (spine on the left, pages on the right)
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 1,
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.1)', // Soft, naturally-lit drop shadow
                                                margin: '0',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                padding: '1rem',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {/* Background Texture Art - Try specific scraped front cover first */}
                                            <img
                                                src={primarySrc}
                                                alt={`${title} Book Cover`}
                                                onError={(e) => {
                                                    // If specific cover 404s, swap to generic texture and apply blend filters
                                                    e.target.src = fallbackSrc;
                                                    e.target.style.opacity = '0.9';
                                                    e.target.style.mixBlendMode = 'multiply';
                                                    e.target.style.filter = 'grayscale(20%) contrast(150%) brightness(0.9)';
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

                                        </motion.div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* The Physical Wooden Shelf (Warm, Flat Built-In Style with Top Ledge) */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '0',
                            right: '0',
                            zIndex: 5,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* The Flat Wooden Face (Solid Oak) & Top Surface */}
                            <div style={{
                                height: '26px',
                                background: '#c8874a', // Warm oak/caramel wood tone
                                borderTop: '16px solid #b97a40', // Deeper top shelf plane that the books sit on
                                borderBottom: '6px solid #8e5520', // Underside lip shadow
                                borderRadius: '2px',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0px 4px 6px rgba(255,255,255,0.1)', // Cast shadow & inner highlight on the edge
                                zIndex: 6,
                                position: 'relative'
                            }}>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
