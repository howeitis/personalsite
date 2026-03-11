export const WatchingCard = ({ text, fixture, formattedDate, formattedTime, compAbbr }) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
            <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{text}</p>
            {fixture && (
                <a href="https://www.arsenal.com/fixtures" target="_blank" rel="noopener noreferrer"
                   style={{ display: 'inline-block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        padding: '0.6rem 1rem',
                        backgroundColor: 'rgba(0,0,0,0.08)',
                        borderRadius: '12px',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600
                    }}>
                        <img src="images/now/arsenal_logo.webp" alt="Arsenal" loading="lazy" style={{ height: '20px', width: 'auto', objectFit: 'contain' }} />
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
            <img src="images/now/arsenal_logo.webp" alt="Arsenal FC" width={72} height={84} loading="lazy" style={{ width: '72px', height: 'auto', objectFit: 'contain' }} />
        </a>
    </div>
);
