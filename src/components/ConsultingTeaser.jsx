import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export const ConsultingTeaser = ({ data }) => {
    return (
        <section className="consulting-teaser" style={{ padding: '8rem 0', backgroundColor: 'var(--br-green)', color: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        textAlign: 'center',
                        padding: '4rem',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        background: 'linear-gradient(145deg, rgba(0,92,54,0.1) 0%, rgba(0,66,37,0) 100%)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--bg-color)' }}>{data.name}</h2>
                    <p style={{ fontSize: '1.5rem', color: 'var(--terracotta)', marginBottom: '1.5rem', fontStyle: 'italic' }}>"{data.tagline}"</p>
                    <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.9 }}>{data.description}</p>

                    <motion.a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, backgroundColor: 'var(--bg-color)', color: 'var(--br-green)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '1rem 2rem',
                            border: '2px solid var(--bg-color)',
                            color: 'var(--bg-color)',
                            borderRadius: 'var(--border-radius)',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'background-color 0.3s, color 0.3s',
                            cursor: 'none'
                        }}
                    >
                        Visit the practice <ExternalLink size={20} />
                    </motion.a>
                </motion.div>
            </div>

            {/* Abstract background shapes */}
            <motion.div
                animate={{
                    rotate: [0, 90, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '50vw',
                    height: '50vw',
                    borderRadius: '40%',
                    background: 'radial-gradient(circle, rgba(226,114,91,0.05) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />
        </section>
    );
};
