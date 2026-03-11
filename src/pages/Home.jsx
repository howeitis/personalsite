import { HeroBento } from '../components/HeroBento';
import { MoodBoard } from '../components/MoodBoard';
import { useIsMobile } from '../hooks/useResponsive';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../context/ContentContext';

export const Home = () => {
    const { personal, consulting } = useContent();
    const isMobile = useIsMobile();

    return (
        <div>
            <Helmet>
                <title>Owen Howe — Finding the people who aren't looking.</title>
                <meta name="description" content="Talent Acquisition leader based in Washington, D.C. Explore my professional background, projects, and personal interests in soccer, tech, food, and music." />
                <link rel="canonical" href="https://howe.app/" />
            </Helmet>
            {/* The Get To Know Me Intro */}
            <HeroBento data={personal} />

            {/* The V4 Organic Mood Board Parallax */}
            <MoodBoard />

            <div 
                className="bento-card sycamore-home-card"
                style={{ backgroundImage: `linear-gradient(rgba(17, 75, 47, 0.85), rgba(17, 75, 47, 0.95)), url("${import.meta.env.BASE_URL}images/sycamore_bg.webp")` }}
            >
                <img className="sycamore-logo" src="images/sycamore_logo.webp" alt="Sycamore Creek Consulting" width={100} height={100} loading="lazy" />
                {!isMobile && (
                    <>
                        <h2 className="serif-text" style={{ fontSize: '1.5rem', color: 'var(--text-on-overlay)', marginBottom: '0.25rem' }}>Interested in hiring leadership?</h2>
                        <p style={{ color: 'var(--text-on-overlay)', fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.9 }}>
                            I also run a talent advisory practice.
                        </p>
                    </>
                )}
                <a href={consulting.url} target="_blank" rel="noopener noreferrer" className="pill-tag bg-mustard sycamore-link">
                    {isMobile ? `${consulting.name} ↗` : `Visit ${consulting.name} ↗`}
                </a>
            </div>
        </div >
    );
};
