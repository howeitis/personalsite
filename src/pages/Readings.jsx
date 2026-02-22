import { motion } from 'framer-motion';

export const Readings = ({ data }) => {
    const books = data || [];

    const colors = [
        'var(--mustard)',
        'var(--br-green)',
        'var(--sky-blue)',
        'var(--lavender)',
        'var(--terracotta)',
        'var(--bg-color)'
    ];

    return (
        <div style={{ padding: '2rem 0', paddingBottom: '2rem' }}>
            {/* Page Header */}
            <div className="bento-card" style={{ padding: '4rem', backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--text-primary)', marginBottom: '4rem' }}>
                <h1 className="serif-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1 }}>
                    The Bookshelf.
                </h1>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', maxWidth: '600px', fontWeight: 500 }}>
                    A scattered collection of the most impactful, engaging, and mind-bending books I've read recently.
                    Fiction, non-fiction, scifi, and history thrown together in no particular order.
                </p>
            </div>

            {/* Scattered Books Grid */}
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
                    // Create a deterministic but pseudo-random hash based on both the string length and character codes
                    // so the same book always gets the same color, but adjacent books look random.
                    const charSum = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const hashIndex = (title.length + charSum + index * 17) % colors.length;

                    const bgColor = colors[hashIndex];
                    const isDarkBg = bgColor === 'var(--br-green)' || bgColor === 'var(--terracotta)';
                    const textColor = isDarkBg ? 'var(--bg-color)' : 'var(--text-primary)';

                    // Generate pseudo-random rotations to make the books look tossed onto a table
                    const rotation = index % 2 === 0 ? (index % 3 === 0 ? 3 : -2) : (index % 4 === 0 ? -4 : 2);

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
                            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, cursor: 'none' }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bento-card"
                            style={{
                                backgroundColor: bgColor,
                                padding: '1.5rem 2rem',
                                border: '2px solid var(--text-primary)', // Thinner border for density
                                borderRadius: '12px', // Slightly sharper for book feel
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '100px',
                                maxWidth: '350px',
                                textAlign: 'center',
                                zIndex: 1,
                                boxShadow: '4px 4px 0px 0px var(--text-primary)' // Tighter shadow
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
                        </motion.div>
                    );
                })}
            </div>
        </div >
    );
};
