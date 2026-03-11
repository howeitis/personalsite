export const GrowingCard = () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.5, color: 'white' }}>
            Orchids — inspired by the exhibit at the{' '}
            <a href="https://nmaahc.si.edu/explore/exhibitions/more-flower" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Smithsonian African American Museum</a>
        </p>
        <img src="images/now/orchid.webp" alt="Phalaenopsis orchid from the Smithsonian exhibit" width={120} height={160} loading="lazy" style={{ width: '120px', height: 'auto', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
    </div>
);
