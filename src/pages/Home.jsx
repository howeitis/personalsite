import { HeroBento } from '../components/HeroBento';
import { MoodBoard } from '../components/MoodBoard';

export const Home = ({ data }) => {
    return (
        <div>
            {/* The Get To Know Me Intro */}
            <HeroBento data={data.personal} />

            {/* The V4 Organic Mood Board Parallax (Replaces the Grid) */}
            <MoodBoard />

            {/* The Subtle Side-Hustle Plug */}
            <div className="bento-card" style={{
                maxWidth: '600px',
                margin: '4rem auto 0 auto',
                textAlign: 'center',
                padding: '2rem',
                backgroundImage: 'linear-gradient(rgba(17, 75, 47, 0.85), rgba(17, 75, 47, 0.95)), url("/images/sycamore_bg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <img src="/images/sycamore_logo.jpg" alt="Sycamore Creek Consulting" style={{ width: '100px', marginBottom: '1rem', borderRadius: '50%' }} />
                <h2 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--bg-color)', marginBottom: '0.25rem' }}>Interested in hiring leadership?</h2>
                <p style={{ color: 'var(--bg-color)', fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.9 }}>
                    I also run a talent advisory practice.
                </p>
                <a href={data.consulting.url} target="_blank" rel="noopener noreferrer" className="pill-tag bg-mustard" style={{ border: 'var(--border-thick)', cursor: 'none', color: 'var(--text-primary)' }}>
                    Visit {data.consulting.name} ↗
                </a>
            </div>
        </div>
    );
};
