import { useState, useEffect } from 'react';
import { HeroBento } from '../components/HeroBento';
import { MoodBoard } from '../components/MoodBoard';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return isMobile;
};

export const Home = ({ data }) => {
    const isMobile = useIsMobile();

    return (
        <div>
            {/* The Get To Know Me Intro */}
            <HeroBento data={data.personal} />

            {/* The V4 Organic Mood Board Parallax */}
            <MoodBoard />

            <div className="bento-card sycamore-home-card" style={{
                maxWidth: isMobile ? '220px' : '600px',
                margin: isMobile ? '-3rem auto 0' : '4rem auto 0 calc(50% - 200px)',
                textAlign: 'center',
                padding: isMobile ? '1.25rem 1.25rem' : '2rem',
                backgroundImage: 'linear-gradient(rgba(17, 75, 47, 0.85), rgba(17, 75, 47, 0.95)), url("images/sycamore_bg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isMobile ? '0.75rem' : '0',
                position: 'relative',
                zIndex: 10
            }}>
                <img src="images/sycamore_logo.jpg" alt="Sycamore Creek Consulting" style={{
                    width: isMobile ? '60px' : '100px',
                    marginBottom: isMobile ? '0' : '1rem',
                    borderRadius: '50%',
                    flexShrink: 0
                }} />
                {!isMobile && (
                    <>
                        <h2 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--bg-color)', marginBottom: '0.25rem' }}>Interested in hiring leadership?</h2>
                        <p style={{ color: 'var(--bg-color)', fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.9 }}>
                            I also run a talent advisory practice.
                        </p>
                    </>
                )}
                <a href={data.consulting.url} target="_blank" rel="noopener noreferrer" className="pill-tag bg-mustard" style={{
                    border: 'var(--border-thick)',
                    cursor: 'none',
                    color: 'var(--text-primary)',
                    fontSize: isMobile ? '0.75rem' : '0.9rem',
                    padding: isMobile ? '0.4rem 0.75rem' : '0.5rem 1rem',
                    whiteSpace: 'nowrap'
                }}>
                    {isMobile ? `${data.consulting.name} ↗` : `Visit ${data.consulting.name} ↗`}
                </a>
            </div>
        </div >
    );
};
