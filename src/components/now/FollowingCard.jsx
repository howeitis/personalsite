export const FollowingCard = ({ text }) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.5, flex: 1 }}>{text}</p>
        <img
            src="/images/now/dcrow.png"
            alt="D.C. rowhome"
            width={400}
            height={400}
            loading="lazy"
            style={{ width: 'clamp(160px, 30vw, 400px)', height: 'auto', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
        />
    </div>
);
