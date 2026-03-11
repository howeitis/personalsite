export const PodcastCard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 1.2 }}>In the Feed</div>
            <div style={{ fontSize: 'var(--text-base)', opacity: 0.7, marginTop: '0.25rem' }}>Football, done differently</div>
        </div>
        <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/show/36Ynwdxjd1TC0Z2OLFtnIm?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Stadio Podcast"
        />
    </div>
);
