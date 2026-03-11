import { motion } from 'framer-motion';
import { useArsenalFixture } from '../hooks/useArsenalFixture';
import { toImageFilename } from '../utils/bookFilename';

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

export const Now = ({ now, books }) => {
    const fixture = useArsenalFixture(now.nextFixture);
    const currentBook = books?.find((b) => b.currentlyReading);
    const bookCoverSrc = currentBook
        ? `images/covers/${toImageFilename(currentBook.title)}.jpg`
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
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.2 }}>On Rotation</div>
                        <div style={{ fontSize: '0.95rem', opacity: 0.7, marginTop: '0.25rem' }}>Celebrating the life stories of Ebo Taylor</div>
                    </div>
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/album/6vqY4CxUewSHoLPi2G0s99?utm_source=generator&theme=0"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify: Ebo Taylor - Life Stories"
                    />
                </div>
            ),
            bg: 'var(--lavender)',
            textColor: 'var(--text-primary)',
            span: 2
        },
        {
            label: 'Traveling',
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                        <div style={{ fontSize: '0.85rem', opacity: 0.75, marginBottom: '0.15rem' }}>Currently</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{now.traveling.current}</div>
                        <div style={{ fontSize: '0.85rem', opacity: 0.75, marginTop: '0.75rem', marginBottom: '0.15rem' }}>Next up</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{now.traveling.next} ✈</div>
                    </div>
                    <img
                        src="images/now/stadium.png"
                        alt="Emirates Stadium"
                        loading="lazy"
                        style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: '160px', flexShrink: 0 }}
                    />
                </div>
            ),
            bg: 'var(--terracotta)',
            textColor: 'white',
            span: 1
        },
        {
            label: 'Podcasts',
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.2 }}>In the Feed</div>
                        <div style={{ fontSize: '0.95rem', opacity: 0.7, marginTop: '0.25rem' }}>Football, done differently</div>
                    </div>
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/show/36Ynwdxjd1TC0Z2OLFtnIm?utm_source=generator&theme=0"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Stadio Podcast"
                    />
                </div>
            ),
            bg: 'var(--sky-blue)',
            textColor: 'var(--text-primary)',
            span: 2
        },
        {
            label: 'Thinking About',
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.5, color: 'white' }}>{now.thinkingAbout}</p>
                    <img
                        src="images/now/ring.png"
                        alt=""
                        loading="lazy"
                        style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: '160px', flexShrink: 0 }}
                    />
                </div>
            ),
            bg: 'var(--br-green)',
            textColor: 'white',
            span: 1
        },
        {
            label: 'Watching',
            content: (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{now.watching}</p>
                        {fixture && (
                            <a href="https://www.arsenal.com/fixtures" target="_blank" rel="noopener noreferrer"
                               style={{ display: 'inline-block', textDecoration: 'none', color: 'inherit' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                                    padding: '0.6rem 1rem',
                                    backgroundColor: 'rgba(0,0,0,0.08)',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    fontWeight: 600
                                }}>
                                    <img src="images/now/arsenal_logo.png" alt="Arsenal" loading="lazy" style={{ height: '20px', width: 'auto', objectFit: 'contain' }} />
                                    <span>{fixture.home ? 'vs' : '@'} {fixture.opponent}</span>
                                    <span style={{ opacity: 0.6 }}>·</span>
                                    <span style={{ opacity: 0.75 }}>{formattedDate} · {formattedTime}</span>
                                    <span style={{ opacity: 0.6 }}>·</span>
                                    <span style={{ opacity: 0.75 }}>{compAbbr}</span>
                                </div>
                            </a>
                        )}
                    </div>
                    <a href="https://www.arsenal.com/fixtures" target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0 }}>
                        <img src="images/now/arsenal_logo.png" alt="Arsenal FC" width={72} height={84} loading="lazy" style={{ width: '72px', height: 'auto', objectFit: 'contain' }} />
                    </a>
                </div>
            ),
            bg: 'var(--sky-blue)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Eating',
            content: (
                <p style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
                    Lots of miso dishes lately. Also, plenty from good ole{' '}
                    <a href="https://cooking.nytimes.com/search?q=miso&include_content=articles" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>NYT Cooking</a>
                </p>
            ),
            bg: 'var(--bg-color)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Reading',
            content: currentBook ? (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    {bookCoverSrc && (
                        <a href={currentBook.url} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0 }}>
                            <img
                                src={bookCoverSrc}
                                alt={currentBook.title}
                                width={85}
                                height={128}
                                loading="lazy"
                                style={{ width: '85px', height: 'auto', borderRadius: '4px', border: 'var(--border-thin)', flexShrink: 0 }}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        </a>
                    )}
                    <div>
                        <a href={currentBook.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3 }}>{currentBook.title}</div>
                        </a>
                        <div style={{ fontSize: '0.95rem', opacity: 0.7, marginTop: '0.3rem' }}>{currentBook.author}</div>
                    </div>
                </div>
            ) : '—',
            bg: 'var(--mustard)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Working On',
            content: (
                <p style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
                    Hiring at{' '}
                    <a href="https://www.nytimes.com/athletic/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>The Athletic</a>
                    {' '}and constant projects with Claude Code
                </p>
            ),
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
            content: (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.5, color: 'white' }}>
                        Orchids — inspired by the exhibit at the{' '}
                        <a href="https://nmaahc.si.edu/explore/exhibitions/more-flower" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Smithsonian African American Museum</a>
                    </p>
                    <img src="images/now/orchid.jpg" alt="Phalaenopsis orchid from the Smithsonian exhibit" width={120} height={160} loading="lazy" style={{ width: '120px', height: 'auto', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                </div>
            ),
            bg: 'var(--br-green)',
            textColor: 'white',
            span: 1
        },
        {
            label: 'Following',
            content: now.following,
            bg: 'var(--lavender)',
            textColor: 'var(--text-primary)',
            span: 2
        }
    ];

    return (
        <div style={{ padding: '2rem 0', paddingBottom: '2rem' }}>
            <title>Right Now — Owen Howe</title>
            <meta name="description" content="A living snapshot of what Owen Howe is reading, listening to, watching, and thinking about right now." />
            <link rel="canonical" href="https://howe.app/now" />

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
                    style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1 }}
                >
                    Right Now.
                </h1>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', maxWidth: '600px', fontWeight: 500 }}>
                    The current starting lineup.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
                    <motion.span
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block', flexShrink: 0 }}
                    />
                    <span className="pill-tag" style={{ fontSize: '0.8rem', fontWeight: 700, backgroundColor: 'var(--mustard)', border: '2px solid var(--text-primary)', letterSpacing: '0.04em' }}>
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
                    <motion.div
                        key={card.label}
                        custom={i}
                        variants={cardVariant}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        className="bento-card"
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
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                opacity: 0.6,
                                color: card.textColor
                            }}
                        >
                            {card.label}
                        </span>
                        {typeof card.content === 'string'
                            ? <p style={{ fontSize: '1.05rem', lineHeight: 1.5, color: card.textColor }}>{card.content}</p>
                            : card.content
                        }
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
