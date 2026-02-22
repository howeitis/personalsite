import { motion } from 'framer-motion';
import { HeroBento } from '../components/HeroBento';
import { MoodBoard } from '../components/MoodBoard';

export const Home = ({ data }) => {
    return (
        <div>
            {/* The Get To Know Me Intro */}
            <HeroBento data={data.personal} />

            {/* Narrative bridge */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="serif-text"
                style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                    padding: '3rem 2rem 0 2rem',
                    maxWidth: '700px',
                    margin: '0 auto'
                }}
            >
                Outside the office, these are the things that keep me going.
            </motion.p>

            {/* The V4 Organic Mood Board Parallax */}
            <MoodBoard />

            <div className="bento-card" style={{
                maxWidth: '600px',
                margin: '4rem auto 0 auto',
                textAlign: 'center',
                padding: '2rem',
                backgroundImage: 'linear-gradient(rgba(17, 75, 47, 0.85), rgba(17, 75, 47, 0.95)), url("images/sycamore_bg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10
            }}>
                <img src="images/sycamore_logo.jpg" alt="Sycamore Creek Consulting" style={{ width: '100px', marginBottom: '1rem', borderRadius: '50%' }} />
                <h2 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--bg-color)', marginBottom: '0.25rem' }}>Interested in hiring leadership?</h2>
                <p style={{ color: 'var(--bg-color)', fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.9 }}>
                    I also run a talent advisory practice.
                </p>
                <a href={data.consulting.url} target="_blank" rel="noopener noreferrer" className="pill-tag bg-mustard" style={{ border: 'var(--border-thick)', cursor: 'none', color: 'var(--text-primary)' }}>
                    Visit {data.consulting.name} ↗
                </a>
            </div>
        </div >
    );
};
