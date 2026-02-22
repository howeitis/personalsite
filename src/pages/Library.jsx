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
            background: `
                radial-gradient(circle at center, rgba(44,30,22,0.85) 0%, rgba(5,5,5,0.98) 100%),
                repeating-linear-gradient(to right, #180d08 0px, #180d08 120px, #080402 120px, #080402 126px)
            `, // Dark, moody cigar room wallpaper with Victorian wood paneling
            backgroundColor: '#0a0a0a',
            minHeight: '100vh',
            color: '#e6d5b8', // Vintage cream/gold text
            overflowX: 'hidden' // Prevent any horizontal scroll from the wide shelf
        }}>
            {/* Page Header */}
            <div className="container" style={{ padding: '4rem 2rem', marginBottom: '4rem', textAlign: 'center' }}>
                <h1 className="serif-text" style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    color: '#e6d5b8', // Gold/cream accent
                    marginBottom: '1rem',
                    lineHeight: 1,
                    textShadow: '0px 4px 12px rgba(0,0,0,0.8)' // Moody text shadow
                }}>
                    The Library.
                </h1>
                <p style={{ color: 'rgba(230, 213, 184, 0.8)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
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
                            alignItems: 'flex-end', // Crucial: sit perfectly on the bottom shelf
                            position: 'relative',
                            zIndex: 10,
                            paddingBottom: '0' // Sit perfectly flush to cast shadow down onto the shelf's receding top surface
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
                                                border: '1px solid rgba(0,0,0,0.6)', // Darker border
                                                borderLeft: '4px solid rgba(255,255,255,0.1)', // Highlight on the spine edge
                                                borderBottom: '2px solid rgba(0,0,0,0.8)', // Thick dark bottom to ground it
                                                borderRadius: '2px 8px 8px 2px', // Mimic a book cover (spine on the left, pages on the right)
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 1,
                                                boxShadow: 'inset 8px 0px 10px rgba(0,0,0,0.6), -5px 5px 15px rgba(0,0,0,0.7), 0px 25px 25px -10px rgba(0,0,0,0.95)', // Deep shadow casting down onto the shelf's receding plane
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

                        {/* The Physical 3D Wooden Shelf (Victorian Mansion Edition) */}
                        <div style={{
                            position: 'absolute',
                            bottom: -20, // Sit slightly below the books so the receding top depth goes underneath them
                            left: '-1rem', // Extend past the books a bit
                            right: '-1rem',
                            zIndex: 5,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Top Receding Surface (The Depth) */}
                            <div style={{
                                height: '50px',
                                background: 'linear-gradient(to bottom, #110804 0%, #3a1f0a 100%)',
                                transformOrigin: 'bottom center', // Base the rotation on where it touches the fascia
                                transform: 'perspective(600px) rotateX(60deg)', // Recedes strongly into the wallpaper
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                marginBottom: '-15px', // Bridge the gap caused by the heavy rotation
                                zIndex: 5
                            }} />

                            {/* The Ornate Fascia (Front Edge) */}
                            <div style={{
                                height: '35px',
                                background: 'linear-gradient(to bottom, #5a3515 0%, #3a1f0a 40%, #1c0e04 100%)',
                                borderTop: '2px solid rgba(255,255,255,0.15)', // Sharp light catching the edge
                                borderBottom: '6px solid #080301', // Deep recessed shadow underneath the lip
                                borderRadius: '3px',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.95), 0 15px 25px rgba(0,0,0,0.8)', // Massive shadow casting into the room
                                zIndex: 6,
                                position: 'relative'
                            }}>
                                {/* Decorative Carved Molding Lines */}
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: 0,
                                    right: 0,
                                    height: '6px',
                                    borderTop: '1px solid rgba(0,0,0,0.4)',
                                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                                }} />
                            </div>

                            {/* Left Corbel (Carved Bracket) */}
                            <div style={{
                                position: 'absolute',
                                top: '35px', // Immediately below fascia
                                left: '8%',
                                width: '35px',
                                height: '65px',
                                background: 'linear-gradient(to right, #110804 0%, #3a1f0a 60%, #110804 100%)',
                                borderRadius: '0 0 20px 20px',
                                borderLeft: '1px solid rgba(255,255,255,0.05)',
                                boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.6), 15px 20px 30px rgba(0,0,0,0.8)',
                                zIndex: 4
                            }} />

                            {/* Right Corbel (Carved Bracket) */}
                            <div style={{
                                position: 'absolute',
                                top: '35px',
                                right: '8%',
                                width: '35px',
                                height: '65px',
                                background: 'linear-gradient(to right, #110804 0%, #3a1f0a 40%, #110804 100%)',
                                borderRadius: '0 0 20px 20px',
                                borderRight: '1px solid rgba(255,255,255,0.05)',
                                boxShadow: 'inset 2px 0 8px rgba(0,0,0,0.6), -15px 20px 30px rgba(0,0,0,0.8)',
                                zIndex: 4
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
