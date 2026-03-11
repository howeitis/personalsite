export const ThinkingAboutCard = ({ text }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.5, color: 'white' }}>{text}</p>
        <img
            src="images/now/ring.webp"
            alt=""
            loading="lazy"
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', maxHeight: '160px', flexShrink: 0 }}
        />
    </div>
);
