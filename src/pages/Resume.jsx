import { m } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ExperienceBento } from '../components/ExperienceBento';

export const Resume = ({ data, consulting }) => {
    return (
        <div style={{ padding: '2rem 0' }}>
            <title>Resume — Owen Howe</title>
            <meta name="description" content="Career journey and professional experience of Owen Howe — Talent Acquisition leader at The New York Times, with a background spanning tech, media, and executive search." />
            <link rel="canonical" href="https://howe.app/resume" />
<div className="bento-grid">
                <ExperienceBento data={data} />

                {/* Sycamore Creek Consulting Banner */}
                <m.a
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
                        backgroundImage: 'linear-gradient(rgba(17, 75, 47, 0.85), rgba(17, 75, 47, 0.92)), url("images/sycamore_bg.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
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
                        <h3 className="serif-text" style={{ fontSize: '1.5rem', color: '#7EC8B5', margin: 0 }}>
                            {consulting.name}
                        </h3>
                        <p style={{ color: 'var(--text-on-overlay)', fontSize: '0.95rem', opacity: 0.9, marginTop: '0.25rem' }}>
                            {consulting.tagline}
                        </p>
                    </div>
                    <span className="pill-tag" style={{
                        border: '2px solid #7EC8B5',
                        color: '#7EC8B5',
                        background: 'transparent',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        Visit the practice <ExternalLink size={16} />
                    </span>
                </m.a>
            </div>
        </div>
    );
};
