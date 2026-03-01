import { HeroBento } from '../components/HeroBento';
import { MoodBoard } from '../components/MoodBoard';

export const Home = ({ data }) => {
    return (
        <div>
            <title>Owen Howe — Finding the people who aren't looking.</title>
            <meta name="description" content="Talent Acquisition leader based in Washington, D.C. Explore my professional background, projects, and personal interests in soccer, tech, food, and music." />
            <link rel="canonical" href="https://howe.app/" />
            {/* The Get To Know Me Intro */}
            <HeroBento data={data.personal} />

            {/* The V4 Organic Mood Board Parallax */}
            <MoodBoard />

            <div className="bento-card sycamore-home-card" style={{
                textAlign: 'center',
                backgroundImage: 'linear-gradient(rgba(17, 75, 47, 0.85), rgba(17, 75, 47, 0.95)), url("images/sycamore_bg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10
            }}>
                <img src="images/sycamore_logo.jpg" alt="Sycamore Creek Consulting" width={100} height={100} className="sycamore-logo" style={{
                    height: 'auto',
                    borderRadius: '50%',
                    flexShrink: 0
                }} />
                <div className="sycamore-text-block">
                    <h2 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--text-on-overlay)', marginBottom: '0.25rem' }}>Interested in hiring leadership?</h2>
                    <p style={{ color: 'var(--text-on-overlay)', fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.9 }}>
                        I also run a talent advisory practice.
                    </p>
                </div>
                <a href={data.consulting.url} target="_blank" rel="noopener noreferrer" className="pill-tag bg-mustard sycamore-cta-link" style={{
                    border: 'var(--border-thick)',
                    cursor: 'none',
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap'
                }}>
                    <span className="sycamore-cta-short">{data.consulting.name} ↗</span>
                    <span className="sycamore-cta-full">Visit {data.consulting.name} ↗</span>
                </a>
            </div>
        </div>
    );
};
