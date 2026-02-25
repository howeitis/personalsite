import { motion } from 'framer-motion';

const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.07, type: 'spring', stiffness: 260, damping: 22 }
    })
};

export const Now = ({ data, books }) => {
    const now = data;
    const currentBook = books?.find((b) => b.currentlyReading);
    const bookCoverSrc = currentBook
        ? `images/covers/${currentBook.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}.jpg`
        : null;

    const cards = [
        {
            label: 'Thinking About',
            content: now.thinkingAbout,
            bg: 'var(--br-green)',
            textColor: 'white',
            span: 2,
            large: true
        },
        {
            label: 'Traveling',
            content: (
                <div>
                    <div style={{ fontSize: '1rem', opacity: 0.75, marginBottom: '0.25rem' }}>Currently</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{now.traveling.current}</div>
                    <div style={{ fontSize: '1rem', opacity: 0.75, marginTop: '1rem', marginBottom: '0.25rem' }}>Next up</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{now.traveling.next} ✈</div>
                </div>
            ),
            bg: 'var(--terracotta)',
            textColor: 'white',
            span: 1
        },
        {
            label: 'Listening',
            content: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>{now.listening}</p>
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/album/6vqY4CxUewSHoLPi2G0s99?utm_source=generator&theme=0"
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title="Spotify: Ebo Taylor - Life Stories"
                    />
                    <a href="https://open.spotify.com/show/36Ynwdxjd1TC0Z2OLFtnIm" target="_blank" rel="noopener noreferrer"
                       style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', opacity: 0.75 }}>
                        <img src="images/now/stadio.jpg" alt="Stadio podcast" width={32} height={32}
                             style={{ width: '32px', height: '32px', borderRadius: '6px' }} />
                        Stadio Podcast
                    </a>
                </div>
            ),
            bg: 'var(--lavender)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Watching',
            content: (() => {
                const fixture = now.nextFixture;
                const matchDate = fixture ? new Date(fixture.date + 'T' + fixture.time + ':00') : null;
                const formattedDate = matchDate ? matchDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '';
                return (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>{now.watching}</p>
                            {fixture && (
                                <a href="https://www.arsenal.com/fixtures" target="_blank" rel="noopener noreferrer"
                                   style={{ display: 'inline-block', textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        padding: '0.5rem 0.75rem',
                                        backgroundColor: 'rgba(0,0,0,0.08)',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600
                                    }}>
                                        <span>⚽</span>
                                        <span>{fixture.home ? 'vs' : '@'} {fixture.opponent}</span>
                                        <span style={{ opacity: 0.6 }}>·</span>
                                        <span style={{ opacity: 0.75 }}>{formattedDate}</span>
                                    </div>
                                </a>
                            )}
                        </div>
                        <a href="https://www.arsenal.com/fixtures" target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0 }}>
                            <img src="images/now/arsenal_logo.png" alt="Arsenal FC" width={72} height={84} style={{ width: '72px', height: 'auto', objectFit: 'contain' }} />
                        </a>
                    </div>
                );
            })(),
            bg: 'var(--sky-blue)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Reading',
            content: currentBook ? (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    {bookCoverSrc && (
                        <a href="https://www.goodreads.com/book/show/7235533-the-way-of-kings" target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0 }}>
                            <img
                                src={bookCoverSrc}
                                alt={currentBook.title}
                                width={85}
                                height={128}
                                style={{ width: '85px', height: 'auto', borderRadius: '4px', border: 'var(--border-thin)', flexShrink: 0 }}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        </a>
                    )}
                    <div>
                        <a href="https://www.goodreads.com/book/show/7235533-the-way-of-kings" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    <img src="images/now/orchid.jpg" alt="Phalaenopsis orchid from the Smithsonian exhibit" width={120} height={160} style={{ width: '120px', height: 'auto', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
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

            {/* Header */}
            <div
                className="bento-card"
                style={{
                    padding: '4rem',
                    backgroundColor: 'var(--bg-color)',
                    borderBottom: '1px solid var(--text-primary)',
                    marginBottom: '4rem'
                }}
            >
                <h1
                    className="serif-text"
                    style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1 }}
                >
                    Right Now.
                </h1>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', maxWidth: '600px', fontWeight: 500 }}>
                    A snapshot of what's on my mind and on my plate.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
                    Updated {now.updated}
                </p>
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
                            padding: '2rem',
                            backgroundColor: card.bg,
                            color: card.textColor,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            minHeight: card.large ? '200px' : '140px'
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
                        {card.large ? (
                            <p
                                className="serif-text"
                                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', lineHeight: 1.35, fontStyle: 'italic', color: card.textColor }}
                            >
                                "{card.content}"
                            </p>
                        ) : (
                            typeof card.content === 'string'
                                ? <p style={{ fontSize: '1.05rem', lineHeight: 1.5, color: card.textColor }}>{card.content}</p>
                                : card.content
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
