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
    // Aim for around 9-11 books per shelf for a balanced look
    const targetPerShelf = 10;
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
                        gap: '2px', // Books sitting tightly next to each other
                        alignItems: 'flex-end', // Crucial: sit on the bottom string
                        borderBottom: '16px solid var(--text-primary)', // The thick shelf wood for this specific row
                        marginBottom: '4rem', // Space between vertical shelves
                        minHeight: '350px', // Enough space for the tallest book
                    }}>
                        {chunk.map((book, bookIndex) => {
                            // Calculate global index to keep deterministic sizing consistent
                            const index = (shelfIndex * chunkSize) + bookIndex;
                            const charSum = book.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                            const hashIndex = (book.length + charSum + index * 17) % colors.length;

                            const bgColor = colors[hashIndex];
                            const isDarkBg = bgColor === 'var(--br-green)' || bgColor === 'var(--terracotta)';
                            const textColor = isDarkBg ? 'var(--bg-color)' : 'var(--text-primary)';

                            // Deterministic Height from 220px to 340px
                            const heightValue = 220 + ((charSum * index) % 120);
                            // Deterministic Width (thickness) from 35px to 55px
                            const widthValue = 35 + ((book.length * 7) % 20);

                            // Create safe filename for the scraped spine
                            const safeName = book.replace(/ /g, "_").replace(/'/g, "").toLowerCase();
                            const primarySrc = `${import.meta.env.BASE_URL}images/spines/${safeName}.jpg`;
                            const fallbackSrc = spineTextures[index % spineTextures.length];

                            return (
                                <a
                                    key={index}
                                    href={`https://www.goodreads.com/search?q=${encodeURIComponent(book)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', display: 'block', flexShrink: 0 }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -10, cursor: 'none' }} // Pop up slightly like pulling it out of the shelf
                                        viewport={{ once: true, margin: "-20px" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: (index % 15) * 0.05 }}
                                        className="bento-card"
                                        style={{
                                            backgroundColor: bgColor,
                                            height: `${heightValue}px`,
                                            width: `${widthValue}px`,
                                            border: '2px solid var(--text-primary)',
                                            borderBottom: 'none', // Let it sit perfectly flush on the shelf border
                                            borderRadius: '4px 4px 0 0', // Rounded top spine
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 1,
                                            boxShadow: 'inset -4px 0px 6px rgba(0,0,0,0.1)', // Gives the spine a slight 3D curve depth
                                            margin: '0',
                                            position: 'relative',
                                            overflow: 'hidden' // Keep text inside thickness bounds
                                        }}
                                    >
                                        {/* Background Texture Art - Try specific scraped spine first */}
                                        <img
                                            src={primarySrc}
                                            alt=""
                                            onError={(e) => {
                                                // If specific spine 404s, swap to generic texture and apply blend filters
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
                                                opacity: 1, // Real covers should be fully opaque
                                                mixBlendMode: 'normal', // Real covers have their own colors
                                                filter: 'none'
                                            }}
                                        />

                                        {/* Text Label Overlay */}
                                        <span className="serif-text" style={{
                                            color: 'white', // Force white text for readability over dense cover art
                                            textShadow: '0px 2px 4px rgba(0,0,0,0.8), 0px 0px 10px rgba(0,0,0,0.5)', // Heavy shadow to pop off background art
                                            fontSize: '0.9rem',
                                            fontWeight: 'bold',
                                            whiteSpace: 'nowrap',
                                            writingMode: 'vertical-rl', // Read top to bottom
                                            textOrientation: 'mixed',
                                            transform: 'rotate(180deg)', // Ensure it reads top-down correctly
                                            zIndex: 2,
                                            position: 'relative',
                                            padding: '1rem 0'
                                        }}>
                                            {book}
                                        </span>
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
