import { motion } from 'framer-motion';

export const Interests = ({ data }) => {
    // Collect all provided images for the visual collage
    const images = [
        { src: "images/art.jpg", alt: "Portrait Art", tag: "Art", bg: "var(--mustard)" },
        { src: "images/cars.jpg", alt: "Porsche 911", tag: "Cars", bg: "var(--br-green)" },
        { src: "images/cycling.jpg", alt: "Cycling", tag: "Cycling", bg: "var(--sky-blue)" },
        { src: "images/fashion.jpg", alt: "Fashion", tag: "Fashion", bg: "var(--lavender)" },
        { src: "images/flora.jpg", alt: "Anime Bike in Forest", tag: "Flora", bg: "var(--bg-color)" },
        { src: "images/food.jpg", alt: "Korean Stew", tag: "Food", bg: "var(--terracotta)" },
        { src: "images/history.jpg", alt: "Korean History", tag: "History", bg: "var(--mustard)" },
        { src: "images/international relations.jpg", alt: "Diplomacy", tag: "International Relations", bg: "var(--br-green)" },
        { src: "images/music.jpg", alt: "Music Studio", tag: "Music", bg: "var(--lavender)" },
        { src: "images/soccer.jpg", alt: "Arsenal Football", tag: "Soccer", bg: "var(--sky-blue)" },
        { src: "images/tech.jpg", alt: "Technology", tag: "Technology", bg: "var(--bg-color)" },
        { src: "images/travel.jpg", alt: "Travel Photography", tag: "Travel", bg: "var(--terracotta)" }
    ];

    return (
        <div style={{ padding: '2rem 0', paddingBottom: '2rem' }}>

            {/* Collage Header */}
            <div className="bento-card" style={{ padding: '4rem', backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--text-primary)', marginBottom: '4rem' }}>
                <h1 className="serif-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1 }}>
                    The Full Picture.
                </h1>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', maxWidth: '600px', fontWeight: 500 }}>
                    A visual deep-dive into the things that keep me busy when I'm not building teams.
                    From vintage machinery to the perfect bowl of stew, this is what occupies the rest of my time.
                </p>
            </div>

            {/* Masonry Image Collage */}
            <div style={{
                columns: '3 300px', // Responsive 3 column masonry
                columnGap: '2rem',
                width: '100%',
                marginBottom: '4rem'
            }}>
                {images.map((img, index) => {
                    const textColor = (img.bg === 'var(--br-green)' || img.bg === 'var(--terracotta)') ? 'white' : 'var(--text-primary)';
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, rotate: 0 }}
                            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
                            whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? -1 : 1, zIndex: 10 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bento-card"
                            style={{
                                breakInside: 'avoid',
                                marginBottom: '2rem',
                                position: 'relative',
                                padding: '1rem',
                                backgroundColor: img.bg,
                                display: 'inline-block', // Crucial for column breaks
                                width: '100%',
                                zIndex: 1
                            }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    borderRadius: '8px',
                                    border: 'var(--border-thin)',
                                    marginBottom: '1rem'
                                }}
                            />
                            <div style={{ color: textColor, padding: '0 0.5rem' }}>
                                <span className="serif-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: textColor }}>{img.tag}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

        </div>
    );
};
