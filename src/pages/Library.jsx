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
        <div style={{ padding: '2rem 0', paddingBottom: '2rem' }}>
            {/* Page Header */}
            <div className="bento-card" style={{ padding: '4rem', backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--text-primary)', marginBottom: '4rem' }}>
                <h1 className="serif-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1 }}>
                    The Shelf.
                </h1>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', maxWidth: '600px', fontWeight: 500 }}>
                    A collection of my recent reads. Rendered as physical spines on a shelf.
                </p>
            </div>

            {/* Bookshelves Container */}
            <div style={{ padding: '0 2rem' }}>
                {shelfChunks.map((chunk, shelfIndex) => (
                    <div key={shelfIndex} style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '1.5rem', // Wider gap since these are front-facing covers on display
                        alignItems: 'flex-end', // Crucial: sit on the bottom string
                        borderBottom: '16px solid var(--text-primary)', // The thick shelf wood for this specific row
                        marginBottom: '4rem', // Space between vertical shelves
                        minHeight: '350px', // Enough space for the tallest book
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
                                            border: '1px solid rgba(0,0,0,0.2)',
                                            borderBottom: 'none', // Sit flush
                                            borderRadius: '2px 6px 6px 2px', // Mimic a book cover (spine on the left, pages on the right)
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 1,
                                            boxShadow: 'inset 6px 0px 8px rgba(0,0,0,0.15), 2px 0 10px rgba(0,0,0,0.2)', // Spine hinge shadow + drop shadow
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

                                        {/* Text Label Overlay (Only visible if image fails or blends) */}
                                        <div style={{ zIndex: 2, position: 'relative', pointerEvents: 'none' }}>
                                            <h3 className="serif-text" style={{
                                                color: 'white',
                                                textShadow: '0px 2px 4px rgba(0,0,0,0.8), 0px 0px 10px rgba(0,0,0,0.5)',
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                marginBottom: '0.5rem',
                                                lineHeight: 1.1
                                            }}>
                                                {title}
                                            </h3>
                                            <p style={{
                                                color: 'rgba(255,255,255,0.9)',
                                                textShadow: '0px 1px 3px rgba(0,0,0,0.8)',
                                                fontSize: '0.8rem',
                                                fontWeight: 500
                                            }}>
                                                {author}
                                            </p>
                                        </div>
                                    </motion.div>
                                </a>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
