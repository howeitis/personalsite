export const ReadingCard = ({ currentBook, bookCoverSrc }) => {
    if (!currentBook) return '—';
    return (
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
                    <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.3 }}>{currentBook.title}</div>
                </a>
                <div style={{ fontSize: 'var(--text-base)', opacity: 0.7, marginTop: '0.3rem' }}>{currentBook.author}</div>
            </div>
        </div>
    );
};
