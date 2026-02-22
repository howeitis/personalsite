import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ExperienceBento } from '../components/ExperienceBento';

export const Resume = ({ data, consulting }) => {
    return (
        <div style={{ padding: '2rem 0' }}>
            <div className="bento-grid">
                <ExperienceBento data={data} />

                {/* Sycamore Creek Consulting Banner */}
                <motion.a
                    href={consulting.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="bento-card"
                    style={{
                        gridColumn: 'span 12',
                        padding: '1.5rem 2.5rem',
                        backgroundColor: 'var(--br-green)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        textDecoration: 'none',
                        cursor: 'none'
                    }}
                >
                    <div>
                        <h3 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--mustard)', margin: 0 }}>
                            {consulting.name}
                        </h3>
                        <p style={{ color: 'var(--bg-color)', fontSize: '0.95rem', opacity: 0.9, marginTop: '0.25rem' }}>
                            {consulting.tagline}
                        </p>
                    </div>
                    <span className="pill-tag" style={{
                        border: '2px solid var(--mustard)',
                        color: 'var(--mustard)',
                        background: 'transparent',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        Visit the practice <ExternalLink size={16} />
                    </span>
                </motion.a>
            </div>
        </div>
    );
};
