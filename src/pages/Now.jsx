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
                <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.2 }}>{now.listening.title}</div>
                    <div style={{ fontSize: '1rem', opacity: 0.75, marginTop: '0.4rem' }}>{now.listening.artist}</div>
                </div>
            ),
            bg: 'var(--lavender)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Watching',
            content: (
                <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.2 }}>{now.watching.title}</div>
                    <div style={{ fontSize: '1rem', opacity: 0.6, marginTop: '0.4rem' }}>{now.watching.platform}</div>
                </div>
            ),
            bg: 'var(--sky-blue)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Reading',
            content: currentBook ? (
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    {bookCoverSrc && (
                        <img
                            src={bookCoverSrc}
                            alt={currentBook.title}
                            width={60}
                            height={90}
                            style={{ width: '60px', height: 'auto', borderRadius: '4px', border: 'var(--border-thin)', flexShrink: 0 }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    )}
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3 }}>{currentBook.title}</div>
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
            content: now.eating,
            bg: 'var(--bg-color)',
            textColor: 'var(--text-primary)',
            span: 1
        },
        {
            label: 'Working On',
            content: now.workingOn,
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
            content: now.growing,
            bg: 'var(--br-green)',
            textColor: 'white',
            span: 1
        },
        {
            label: 'Following',
            content: (
                <div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{now.following.name}</div>
                    <div style={{ fontSize: '1rem', opacity: 0.8, marginTop: '0.4rem' }}>{now.following.description}</div>
                </div>
            ),
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
