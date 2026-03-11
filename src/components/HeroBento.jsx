import { m } from 'framer-motion';
import { CopyEmailLink } from './CopyEmailLink';

export const HeroBento = ({ data }) => {
    return (
        <div className="bento-card bg-green" style={{ gridColumn: 'span 12', padding: '3rem', display: 'flex', flexWrap: 'wrap-reverse', gap: '3rem', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative', zIndex: 10 }}>

            <div style={{ flex: 1, minWidth: '300px', zIndex: 1 }}>
                {/* Playful greeting */}
                <m.div
                    initial={{ opacity: 0, rotate: -5 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    style={{ display: 'inline-block', marginBottom: '2rem' }}
                >
                    <span className="pill-tag bg-mustard" style={{ transform: 'rotate(-5deg)', color: 'var(--text-primary)' }}>
                        👋 Hello!
                    </span>
                </m.div>

                <m.h1
                    className="serif-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '1.5rem' }}
                >
                    I'm {data.name.split(' ')[0]}.
                </m.h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '500px', marginBottom: '1rem' }}>
                            {data.about[0]} {data.about[1]}
                        </p>
                        <div style={{ marginTop: '1.5rem' }}>
                            <span className="pill-tag bg-terracotta" style={{ color: 'white', display: 'inline-block' }}>
                                {data.about[2]}
                            </span>
                        </div>
                    </m.div>

                    <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", delay: 0.5, bounce: 0.5 }}
                        style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}
                    >
                        <CopyEmailLink
                            email={data.email}
                            toastBg="var(--mustard)"
                            toastColor="var(--text-primary)"
                            style={{
                                display: 'inline-flex',
                                padding: '1rem 2rem',
                                backgroundColor: 'var(--terracotta)',
                                color: 'white',
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                borderRadius: 'var(--border-radius-pill)',
                                border: 'var(--border-thick)',
                                boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.5)',
                                cursor: 'none',
                                textDecoration: 'none'
                            }}
                            whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px rgba(0,0,0,0.5)' }}
                            transition={{ duration: 0.15 }}
                        >
                            Say Hello ↗
                        </CopyEmailLink>
                    </m.div>
                </div>
            </div>

            {/* Profile Image */}
            <m.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ flex: 1, minWidth: '280px', display: 'flex', justifyContent: 'center', zIndex: 1 }}
            >
                <img
                    src="images/hero_profile.webp"
                    alt="Owen's Profile"
                    width={600}
                    height={600}
                    fetchpriority="high"
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '600px',
                        borderRadius: '12px',
                        border: 'var(--border-thick)',
                        boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
                        transform: 'rotate(2deg)'
                    }}
                />
            </m.div>

            {/* Organic absolute shape */}
            <m.div
                animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="blob-container bg-mustard"
                style={{
                    position: 'absolute',
                    right: '-5%',
                    top: '-20%',
                    width: '400px',
                    height: '400px',
                    opacity: 0.1,
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};
