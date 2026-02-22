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

    // We keep parallax shifts relatively small so things don't fly off the screen
    // on mobile, making the floating layout tight and cohesive.
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [-25, 100]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const yTxt = useTransform(scrollYProgress, [0, 1], [100, -50]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                height: isMobile ? 'clamp(750px, 120vh, 1100px)' : 'clamp(600px, 90vh, 1000px)',
                width: '100%',
                margin: '-4rem 0 4rem 0', // Tucks under hero, pushes Sycamore down
                borderTop: '1px solid var(--text-primary)',
                backgroundColor: 'var(--bg-color)',
                overflow: 'hidden',
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
                        top: isMobile ? '2%' : '5%',
                        right: isMobile ? '-5%' : '0%',
                        width: isMobile ? '65vw' : 'clamp(315px, 60vw, 525px)',
                        zIndex: 5
                    }}
                    className="bento-card"
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
                        top: isMobile ? '18%' : '35%',
                        left: isMobile ? '-8%' : '0%',
                        width: isMobile ? '75vw' : 'clamp(360px, 75vw, 675px)',
                        zIndex: 2
                    }}
                    className="bento-card"
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
                        top: isMobile ? '35%' : '50%',
                        right: isMobile ? '-3%' : '5%',
                        width: isMobile ? '70vw' : 'clamp(330px, 65vw, 600px)',
                        zIndex: 8
                    }}
                    className="bento-card bg-terracotta"
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
                        top: isMobile ? '55%' : '65%',
                        left: isMobile ? '-3%' : '5%',
                        width: isMobile ? '80vw' : 'clamp(380px, 80vw, 750px)',
                        zIndex: 7
                    }}
                    className="bento-card"
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
