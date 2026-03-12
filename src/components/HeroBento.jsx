import { useRef } from 'react';
import { m, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { CopyEmailLink } from './CopyEmailLink';
import { useIsMobile } from '../hooks/useResponsive';

export const HeroBento = ({ data }) => {
    const cardRef = useRef(null);
    const isMobile = useIsMobile();
    const prefersReduced = useReducedMotion();
    const shouldAnimate = !isMobile && !prefersReduced;

    // Mouse tracking for card tilt + image parallax
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Card tilt (±2 degrees)
    const rawRotateX = useTransform(mouseY, [0, 1], [2, -2]);
    const rawRotateY = useTransform(mouseX, [0, 1], [-2, 2]);
    const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 });
    const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 });

    // Image counter-parallax
    const rawImgX = useTransform(mouseX, [0, 1], [8, -8]);
    const rawImgY = useTransform(mouseY, [0, 1], [5, -5]);
    const imgX = useSpring(rawImgX, { stiffness: 120, damping: 20 });
    const imgY = useSpring(rawImgY, { stiffness: 120, damping: 20 });

    const handleMouseMove = (e) => {
        if (!shouldAnimate || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    // Character stagger for name
    const nameText = `I'm ${data.name.split(' ')[0]}.`;
    const characters = nameText.split('');

    return (
        <m.div
            ref={cardRef}
            className="bento-card bg-green"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                gridColumn: 'span 12',
                padding: '3rem',
                display: 'flex',
                flexWrap: 'wrap-reverse',
                gap: '3rem',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 10,
                perspective: shouldAnimate ? 800 : undefined,
                rotateX: shouldAnimate ? rotateX : 0,
                rotateY: shouldAnimate ? rotateY : 0,
                transformStyle: shouldAnimate ? 'preserve-3d' : undefined
            }}
        >
            <div style={{ flex: 1, minWidth: '300px', zIndex: 1 }}>
                {/* Playful greeting */}
                <m.div
                    initial={{ opacity: 0, rotate: -5 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    style={{ display: 'inline-block', marginBottom: '1.5rem' }}
                >
                    <span className="pill-tag bg-mustard" style={{ transform: 'rotate(-5deg)', color: 'var(--text-primary)' }}>
                        👋 Hello!
                    </span>
                </m.div>

                {/* Name — staggered character reveal */}
                {prefersReduced ? (
                    <m.h1
                        className="serif-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '1rem' }}
                    >
                        {nameText}
                    </m.h1>
                ) : (
                    <h1
                        className="serif-text"
                        aria-label={nameText}
                        style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: '1rem', display: 'flex', flexWrap: 'wrap' }}
                    >
                        {characters.map((char, i) => (
                            <m.span
                                key={i}
                                initial={{ opacity: 0, y: 40, rotate: -8 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.1 + i * 0.04
                                }}
                                style={{ display: 'inline-block' }}
                                aria-hidden="true"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </m.span>
                        ))}
                    </h1>
                )}

                {/* Role line */}
                <m.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        fontWeight: 600,
                        fontFamily: "'Space Grotesk', sans-serif",
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        opacity: 0.8,
                        marginBottom: '0.75rem'
                    }}
                >
                    {data.role}
                </m.p>

                {/* Tagline */}
                <m.p
                    className="serif-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    style={{
                        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                        fontStyle: 'italic',
                        lineHeight: 1.3,
                        opacity: 0.9,
                        marginBottom: '1.5rem',
                        maxWidth: '500px'
                    }}
                >
                    {data.tagline}
                </m.p>

                {/* About + location + CTA */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: '500px', marginBottom: '1rem' }}>
                        {data.about[1]}
                    </p>
                    <span className="pill-tag bg-terracotta" style={{ color: 'white', display: 'inline-block' }}>
                        {data.about[2]}
                    </span>
                </m.div>

                <m.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", delay: 0.5, bounce: 0.5 }}
                    style={{ marginTop: '1.5rem' }}
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

            {/* Profile Image — with counter-parallax */}
            <m.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                    flex: 1,
                    minWidth: '280px',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 1,
                    x: shouldAnimate ? imgX : 0,
                    y: shouldAnimate ? imgY : 0
                }}
            >
                <img
                    src="images/hero_profile.webp"
                    alt="Owen's Profile"
                    width={600}
                    height={600}
                    fetchPriority="high"
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
        </m.div>
    );
};
