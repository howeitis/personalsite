export const FollowingCard = ({ text }) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.5, flex: 1 }}>{text}</p>
        <img
            src="/images/now/dcrow.png"
            alt="D.C. rowhome"
            width={240}
            height={240}
            loading="lazy"
            style={{ width: 'clamp(140px, 20vw, 240px)', height: 'auto', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
        />
    </div>
);
