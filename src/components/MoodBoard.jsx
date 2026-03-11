import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/useResponsive';

export const MoodBoard = () => {
    const containerRef = useRef(null);
    const isMobile = useIsMobile();

    // Parallax scroll logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Tighter parallax on mobile so cards stay overlapping and dense
    const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -40] : [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [20, -60] : [50, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [-10, 30] : [-25, 100]);
    const y4 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -50] : [0, -150]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                height: isMobile ? 'clamp(520px, 80vh, 700px)' : 'clamp(600px, 90vh, 1000px)',
                width: '100%',
                margin: isMobile ? '-1rem 0 0 0' : '-4rem 0 4rem 0',
                borderTop: '1px solid var(--text-primary)',
                backgroundColor: 'var(--bg-color)',
                overflow: isMobile ? 'hidden' : 'visible',
                zIndex: 1
            }}
        >
            <div className="container" style={{ position: 'relative', height: '100%' }}>

                {/* 1. Soccer Image (top right) */}
                <m.div
                    style={{
                        y: y2,
                        position: 'absolute',
                        zIndex: 5
                    }}
                    className="bento-card mb-soccer"
                >
                    <img
                        src="images/soccer.webp"
                        alt="Soccer"
                        width={525}
                        height={350}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                </m.div>

                {/* 2. Flora/Anime Bike Image (mid-left) */}
                <m.div
                    style={{
                        y: y1,
                        position: 'absolute',
                        zIndex: 2
                    }}
                    className="bento-card mb-flora"
                >
                    <img
                        src="images/flora.webp"
                        alt="Anime bike in forest"
                        width={675}
                        height={450}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                </m.div>

                {/* 3. Food / Korean Stew (bottom right) */}
                <m.div
                    style={{
                        y: y4,
                        position: 'absolute',
                        zIndex: 8
                    }}
                    className="bento-card bg-terracotta mb-food"
                >
                    <img
                        src="images/food.webp"
                        alt="Korean Stew"
                        width={600}
                        height={400}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block', transform: 'rotate(-3deg)' }}
                    />
                </m.div>

                {/* 4. Cars / Porsche (bottom left) */}
                <m.div
                    style={{
                        y: y3,
                        position: 'absolute',
                        zIndex: 7
                    }}
                    className="bento-card mb-cars"
                >
                    <img
                        src="images/cars.webp"
                        alt="Vintage Porsche"
                        width={750}
                        height={500}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                </m.div>

            </div>
        </div>
    );
};
