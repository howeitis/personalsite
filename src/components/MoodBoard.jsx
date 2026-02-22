import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return isMobile;
};

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
    const yTxt = useTransform(scrollYProgress, [0, 1], isMobile ? [40, -20] : [100, -50]);

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
                zIndex: 1 // Ensure it stays behind HeroBento
            }}
        >
            <div className="container" style={{ position: 'relative', height: '100%' }}>

                {/* Giant Floating Typography */}
                <motion.div
                    style={{ y: yTxt, position: 'absolute', top: '10%', left: '5%', zIndex: 10 }}
                >
                    <h2 className="serif-text" style={{ fontSize: 'clamp(4rem, 18vw, 7rem)', lineHeight: 0.9, mixBlendMode: 'difference', color: 'var(--text-primary)' }}>
                        Soccer.<br />Tech.<br />Food.<br />Fashion.
                    </h2>
                </motion.div>

                {/* 1. Fashion/ALD Image */}
                <motion.div
                    style={{
                        y: y2,
                        position: 'absolute',
                        zIndex: 5
                    }}
                    className="bento-card mb-fashion"
                >
                    <img
                        src="images/fashion.jpg"
                        alt="Fashion and Music"
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                    <span className="pill-tag bg-sky" style={{ position: 'absolute', bottom: '-15px', right: '-15px', zIndex: 10, zoom: 0.8 }}>Fashion & Music</span>
                </motion.div>

                {/* 2. Flora/Anime Bike Image (Floating mid-left) */}
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
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                </motion.div>

                {/* 3. Food / Korean Stew (Floating bottom right, overlapping) */}
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
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block', transform: 'rotate(-3deg)' }}
                    />
                    <span className="pill-tag bg-mustard" style={{ position: 'absolute', top: '-15px', left: '-15px', zIndex: 10, zoom: 0.8 }}>Food</span>
                </motion.div>

                {/* 4. Cars / Porsche (Floating way down low, parallaxing UP fast) */}
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
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                    <span className="pill-tag bg-br-green" style={{ color: 'white', position: 'absolute', right: '10px', bottom: '-15px', zIndex: 10, zoom: 0.8 }}>Tech & Machinery</span>
                </motion.div>

            </div>
        </div>
    );
};
