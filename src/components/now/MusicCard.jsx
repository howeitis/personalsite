export const MusicCard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.2 }}>On Rotation</div>
            <div style={{ fontSize: 'var(--text-base)', opacity: 0.7, marginTop: '0.25rem' }}>Celebrating the life stories of Ebo Taylor</div>
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
);
