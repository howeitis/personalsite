import { m } from 'framer-motion';
import { useArsenalFixture } from '../hooks/useArsenalFixture';
import { toImageFilename } from '../utils/bookFilename';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../context/ContentContext';

// Import new card components
import { MusicCard } from '../components/now/MusicCard';
import { TravelingCard } from '../components/now/TravelingCard';
import { PodcastCard } from '../components/now/PodcastCard';
import { ThinkingAboutCard } from '../components/now/ThinkingAboutCard';
import { WatchingCard } from '../components/now/WatchingCard';
import { EatingCard } from '../components/now/EatingCard';
import { ReadingCard } from '../components/now/ReadingCard';
import { WorkingOnCard } from '../components/now/WorkingOnCard';
import { GrowingCard } from '../components/now/GrowingCard';
import { FollowingCard } from '../components/now/FollowingCard';

const getCompAbbr = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('premier league')) return 'PL';
    if (n.includes('champions league')) return 'CL';
    if (n.includes('fa cup')) return 'FAC';
    if (n.includes('efl cup') || n.includes('carabao')) return 'EFL';
    if (n.includes('europa league')) return 'UEL';
    if (n.includes('conference league')) return 'UECL';
    return name.split(/\s+/).map(w => w[0]).join('').toUpperCase();
};

const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }
    })
};

export const Now = () => {
    const { now, books } = useContent();
    const fixture = useArsenalFixture(now.nextFixture);
    const currentBook = books?.find((b) => b.currentlyReading);
    const bookCoverSrc = currentBook
        ? `images/covers/${toImageFilename(currentBook.title)}.webp`
        : null;

    // Fixture display values — derived once, used in the Watching card
    const matchDate = fixture ? new Date(fixture.date + 'T00:00:00') : null;
    const formattedDate = matchDate
        ? matchDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        : '';
    const formattedTime = fixture
        ? (() => {
            const ampm = fixture.hours >= 12 ? 'PM' : 'AM';
            const hour = fixture.hours % 12 || 12;
            return `${hour}:${String(fixture.minutes).padStart(2, '0')} ${ampm} ET`;
        })()
        : '';
    const compAbbr = getCompAbbr(fixture?.competition);

    const cards = [
        {
            label: 'Music',
            content: <MusicCard />,
            bg: 'var(--lavender)',
            textColor: 'var(--text-primary)',
            span: 2
        },
        {
            label: 'Traveling',
            content: <TravelingCard current={now.traveling.current} next={now.traveling.next} />,
            bg: 'var(--terracotta)',
            textColor: 'white',
            span: 1
        },
        {
            label: 'Podcasts',
            content: <PodcastCard />,
            bg: 'var(--sky-blue)',
            textColor: 'var(--text-primary)',
            span: 2
        },
        {
            label: 'Thinking About',
            content: <ThinkingAboutCard text={now.thinkingAbout} />,
            bg: 'var(--br-green)',
            textColor: 'white',
            span: 1
        },
        {
            label: 'Watching',
            content: <WatchingCard text={now.watching} fixture={fixture} formattedDate={formattedDate} formattedTime={formattedTime} compAbbr={compAbbr} />,
            bg: 'var(--sky-blue)',
            textColor: 'var(--text-primary)',
            span: 1,
            mobileSpan: 2
        },
        {
            label: 'Eating',
            content: <EatingCard />,
            bg: 'var(--bg-color)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Reading',
            content: <ReadingCard currentBook={currentBook} bookCoverSrc={bookCoverSrc} />,
            bg: 'var(--mustard)',
            textColor: 'var(--text-primary)',
            span: 1,
            mobileSpan: 2
        },
        {
            label: 'Working On',
            content: <WorkingOnCard />,
            bg: 'var(--mustard)',
            textColor: 'var(--text-primary)',
            span: 2
        },
        {
            label: 'Playing',
            content: now.playing,
            bg: 'var(--sky-blue)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Growing',
            content: <GrowingCard />,
            bg: 'var(--br-green)',
            textColor: 'white',
            span: 1,
            mobileSpan: 2
        },
        {
            label: 'Following',
            content: <FollowingCard text={now.following} />,
            bg: 'var(--lavender)',
            textColor: 'var(--text-primary)',
            span: 2
        }
    ];

    return (
        <div style={{ padding: '2rem 0', paddingBottom: '2rem' }}>
            <Helmet>
                <title>Right Now — Owen Howe</title>
                <meta name="description" content="A living snapshot of what Owen Howe is reading, listening to, watching, and thinking about right now." />
                <link rel="canonical" href="https://howe.app/now" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ProfilePage",
                        "name": "Right Now — Owen Howe",
                        "description": "A living snapshot of what Owen Howe is reading, listening to, watching, and thinking about right now.",
                        "mainEntity": {
                            "@type": "Person",
                            "name": "Owen Howe",
                            "abstract": now.thinkingAbout
                        }
                    })}
                </script>
            </Helmet>

            {/* Header */}
            <div
                className="bento-card"
                style={{
                    padding: '3rem',
                    backgroundColor: 'var(--bg-color)',
                    borderBottom: '1px solid var(--text-primary)',
                    marginBottom: '2.5rem'
                }}
            >
                <h1
                    className="serif-text"
                    style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1 }}
                >
                    Right Now.
                </h1>
                <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-xl)', maxWidth: '600px', fontWeight: 500 }}>
                    The current starting lineup.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
                    <m.span
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block', flexShrink: 0 }}
                    />
                    <span className="pill-tag" style={{ fontSize: 'var(--text-sm)', fontWeight: 700, backgroundColor: 'var(--mustard)', border: '2px solid var(--text-primary)', letterSpacing: '0.04em' }}>
                        Updated {__NOW_UPDATED__}
                    </span>
                </div>
            </div>

            {/* Bento Grid */}
            <div
                className="now-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem'
                }}
            >
                {cards.map((card, i) => (
                    <m.div
                        key={card.label}
                        custom={i}
                        variants={cardVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        className="bento-card"
                        data-span={card.span}
                        {...(card.mobileSpan && { 'data-mobile-span': card.mobileSpan })}
                        style={{
                            gridColumn: `span ${card.span}`,
                            ...(card.rowSpan && { gridRow: `span ${card.rowSpan}` }),
                            padding: '1.5rem',
                            backgroundColor: card.bg,
                            color: card.textColor,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}
                    >
                        <span
                            style={{
                                fontSize: 'var(--text-sm)',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                opacity: 0.8,
                                color: card.textColor
                            }}
                        >
                            {card.label}
                        </span>
                        {typeof card.content === 'string'
                            ? <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.5, color: card.textColor }}>{card.content}</p>
                            : card.content
                        }
                    </m.div>
                ))}
            </div>
        </div>
    );
};

