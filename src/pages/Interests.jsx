import { motion } from 'framer-motion';

const IMAGES = [
    { src: "images/art.jpg", alt: "Portrait Art", tag: "Art", bg: "var(--mustard)", width: 600, height: 400, description: "Fauvism—because you can never have too much color." },
    { src: "images/cars.jpg", alt: "Porsche 911", tag: "Cars", bg: "var(--br-green)", width: 600, height: 400, description: "Proudly driving a car that's older than some of the interns I hire." },
    { src: "images/cycling.jpg", alt: "Cycling", tag: "Cycling", bg: "var(--sky-blue)", width: 600, height: 400, description: "Cycling: because walking is too slow and city driving is boring" },
    { src: "images/fashion.jpg", alt: "Fashion", tag: "Fashion", bg: "var(--lavender)", width: 600, height: 400, description: "Dressing like someone who has spent too many weekends at thrift stores" },
    { src: "images/flora.jpg", alt: "Anime Bike in Forest", tag: "Flora", bg: "var(--bg-color)", width: 600, height: 400, description: "Trying to recreate a botanical garden in my apartment." },
    { src: "images/food.jpg", alt: "Korean Stew", tag: "Food", bg: "var(--terracotta)", width: 600, height: 400, description: "I take restaurant recommendations seriously; tell me what I should try next." },
    { src: "images/history.jpg", alt: "Korean History", tag: "History", bg: "var(--mustard)", width: 600, height: 400, description: "I enjoy exploring the past, mostly so I can feel better about how long it takes us to do things in the present." },
    { src: "images/international relations.jpg", alt: "Diplomacy", tag: "International Relations", bg: "var(--br-green)", width: 600, height: 400, description: "Applying my IR degree to the complex geopolitical landscape of 'which neighborhood has the best soup dumplings.'" },
    { src: "images/music.jpg", alt: "Music Studio", tag: "Music", bg: "var(--lavender)", width: 600, height: 400, description: "Always seeking the perfect soundtrack—currently accepting applications for 'Song of the Summer' 2026." },
    { src: "images/soccer.jpg", alt: "Arsenal Football", tag: "Soccer", bg: "var(--sky-blue)", width: 600, height: 400, description: "My weekend mood is entirely dependent on Arsenal's form" },
    { src: "images/tech.jpg", alt: "Technology", tag: "Technology", bg: "var(--bg-color)", width: 600, height: 400, description: "Ask me about the future of AI, or just how to get your resume past a recruiter who spends too much time thinking about it." },
    { src: "images/travel.jpg", alt: "Travel Photography", tag: "Travel", bg: "var(--terracotta)", width: 600, height: 400, description: "London is up next 🛫" }
];

export const Interests = () => {

    return (
        <div style={{ padding: '2rem 0', paddingBottom: '2rem' }}>

            {/* Collage Header */}
            <div className="bento-card" style={{ padding: '4rem', backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--text-primary)', marginBottom: '4rem' }}>
                <h1 className="serif-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1 }}>
                    The Full Picture.
                </h1>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', maxWidth: '600px', fontWeight: 500 }}>
                    Take a look at what I'm into.
                </p>
            </div>

            {/* Masonry Image Collage */}
            <div style={{
                columns: '3 300px', // Responsive 3 column masonry
                columnGap: '2rem',
                width: '100%',
                marginBottom: '4rem'
            }}>
                {IMAGES.map((img, index) => {
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
                                width={img.width}
                                height={img.height}
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
                                {img.description && (
                                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.85, lineHeight: 1.4, color: textColor }}>
                                        {img.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

        </div>
    );
};
