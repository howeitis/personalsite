import { motion } from 'framer-motion';

export const Hero = ({ data }) => {
    return (
        <section className="hero-section" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.02em', marginBottom: '1rem', color: 'var(--br-green)' }}
                >
                    {data.name}
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 400, color: 'var(--text-secondary)', marginBottom: '2rem' }}
                >
                    {data.title} based in {data.location}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    style={{ maxWidth: '600px', fontSize: '1.2rem', marginBottom: '3rem' }}
                >
                    {data.about.map((paragraph, index) => (
                        <p key={index} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                    ))}
                </motion.div>

                <motion.a
                    href={`mailto:${data.email}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--terracotta)' }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        display: 'inline-block',
                        padding: '1rem 2.5rem',
                        backgroundColor: 'var(--br-green)',
                        color: 'var(--bg-color)',
                        borderRadius: 'var(--border-radius)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        cursor: 'none'
                    }}
                >
                    Let's connect
                </motion.a>
            </div>

            {/* Decorative Blob */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    right: '10%',
                    top: '20%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(226,114,91,0.1) 0%, rgba(226,114,91,0) 70%)',
                    borderRadius: '50%',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />
        </section>
    );
};
