export const TravelingCard = ({ current, next }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
            <div style={{ fontSize: 'var(--text-sm)', opacity: 0.75, marginBottom: '0.15rem' }}>Currently</div>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{current}</div>
            <div style={{ fontSize: 'var(--text-sm)', opacity: 0.75, marginTop: '0.75rem', marginBottom: '0.15rem' }}>Most Recent</div>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{next} ✈</div>
        </div>
        <img
            src="images/now/stadium.webp"
            alt="Emirates Stadium"
            loading="lazy"
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: '160px', flexShrink: 0 }}
        />
    </div>
);
