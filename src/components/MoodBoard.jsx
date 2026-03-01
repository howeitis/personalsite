import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    // (kept as JS — motion values are runtime-only, no hydration mismatch)
    const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -40] : [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [20, -60] : [50, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [-10, 30] : [-25, 100]);
    const y4 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -50] : [0, -150]);
    const yTxt = useTransform(scrollYProgress, [0, 1], [100, -50]);

    return (
        <div
            ref={containerRef}
            className="mb-container"
            style={{
                position: 'relative',
                width: '100%',
                borderTop: '1px solid var(--text-primary)',
                backgroundColor: 'var(--bg-color)',
                zIndex: 1
            }}
        >
            <div className="container" style={{ position: 'relative', height: '100%' }}>

                {/* Giant Floating Typography — CSS hides on mobile */}
                <motion.div
                    className="mb-text"
                    style={{ y: yTxt, position: 'absolute', top: '10%', left: '5%', zIndex: 10 }}
                >
                    <h2 className="serif-text" style={{ fontSize: 'clamp(4rem, 18vw, 7rem)', lineHeight: 0.9, mixBlendMode: 'difference', color: 'var(--text-primary)' }}>
                        Soccer.<br />Tech.<br />Food.<br />Flora.
                    </h2>
                </motion.div>

                {/* 1. Soccer Image (top right) */}
                <motion.div
                    style={{
                        y: y2,
                        position: 'absolute',
                        zIndex: 5
                    }}
                    className="bento-card mb-soccer"
                >
                    <img
                        src="images/soccer.jpg"
                        alt="Soccer"
                        width={525}
                        height={350}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                </motion.div>

                {/* 2. Flora/Anime Bike Image (mid-left) */}
                <motion.div
                    style={{
                        y: y1,
                        position: 'absolute',
                        zIndex: 2
                    }}
                    className="bento-card mb-flora"
                >
                    <img
                        src="images/flora.jpg"
                        alt="Anime bike in forest"
                        width={675}
                        height={450}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                </motion.div>

                {/* 3. Food / Korean Stew (bottom right) */}
                <motion.div
                    style={{
                        y: y4,
                        position: 'absolute',
                        zIndex: 8
                    }}
                    className="bento-card bg-terracotta mb-food"
                >
                    <img
                        src="images/food.jpg"
                        alt="Korean Stew"
                        width={600}
                        height={400}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block', transform: 'rotate(-3deg)' }}
                    />
                </motion.div>

                {/* 4. Cars / Porsche (bottom left) */}
                <motion.div
                    style={{
                        y: y3,
                        position: 'absolute',
                        zIndex: 7
                    }}
                    className="bento-card mb-cars"
                >
                    <img
                        src="images/cars.jpg"
                        alt="Vintage Porsche"
                        width={750}
                        height={500}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                </motion.div>

            </div>
        </div>
    );
};
