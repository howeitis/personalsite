import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const MoodBoard = () => {
    const containerRef = useRef(null);

    // Parallax scroll logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Different speeds for different elements to break the grid
    // Different speeds for different elements to break the grid
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [150, -300]);
    const y3 = useTransform(scrollYProgress, [0, 1], [-50, 200]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, -350]);
    const yTxt = useTransform(scrollYProgress, [0, 1], [200, -100]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                height: '110vh', // Shrunk container height accordingly to match the tighter density
                width: '100%',
                margin: '2rem 0', // Close to hero and footer
                overflow: 'hidden', // HARD BOUNDARIES - parallax items will be cropped instead of overlapping
                borderTop: '1px solid var(--text-primary)',
                borderBottom: '1px solid var(--text-primary)',
                backgroundColor: 'var(--bg-color)',
                zIndex: 1 // Ensure it stays behind HeroBento
            }}
        >
            <div className="container" style={{ position: 'relative', height: '100%' }}>

                {/* Giant Floating Typography */}
                <motion.div
                    style={{ y: yTxt, position: 'absolute', top: '25vh', left: '5%', zIndex: 10 }}
                >
                    <h2 className="serif-text" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9, mixBlendMode: 'difference', color: 'var(--text-primary)' }}>
                        Soccer.<br />Tech.<br />Food.<br />Fashion.
                    </h2>
                    <p style={{ marginTop: '2rem', fontSize: '1.25rem', maxWidth: '400px', fontWeight: 500, color: 'var(--terracotta)' }}>
                        I am not just a resume. I'm built by the things I pursue off the clock.
                    </p>
                </motion.div>

                {/* 1. Fashion/ALD Image */}
                <motion.div
                    style={{
                        y: y2,
                        position: 'absolute',
                        top: '5vh',
                        right: '5%',
                        width: '30vw', // Slightly shrunken
                        minWidth: '280px',
                        zIndex: 5
                    }}
                    className="bento-card"
                >
                    <img
                        src="/images/fashion.jpg"
                        alt="Fashion and Music"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                    <span className="pill-tag bg-sky" style={{ position: 'absolute', bottom: '-20px', right: '-20px', zIndex: 10 }}>Fashion & Music</span>
                </motion.div>

                {/* 2. Flora/Anime Bike Image (Floating mid-left) */}
                <motion.div
                    style={{
                        y: y1,
                        position: 'absolute',
                        top: '25vh',
                        left: '5%',
                        width: '40vw', // Slightly shrunken
                        minWidth: '320px',
                        zIndex: 2
                    }}
                    className="bento-card"
                >
                    <img
                        src="/images/flora.jpg"
                        alt="Anime bike in forest"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                </motion.div>

                {/* 3. Food / Korean Stew (Floating bottom right, overlapping) */}
                <motion.div
                    style={{
                        y: y4,
                        position: 'absolute',
                        top: '45vh',
                        right: '10%',
                        width: '35vw', // Shrunk to prevent covering Flora
                        minWidth: '300px',
                        zIndex: 8
                    }}
                    className="bento-card bg-terracotta" // Use a colored card back for pop
                >
                    <img
                        src="/images/food.jpg"
                        alt="Korean Stew"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block', transform: 'rotate(-2deg)' }}
                    />
                    <span className="pill-tag bg-mustard" style={{ position: 'absolute', top: '-15px', left: '-15px', zIndex: 10 }}>Food</span>
                </motion.div>

                {/* 4. Cars / Porsche (Floating way down low, parallaxing UP fast) */}
                <motion.div
                    style={{
                        y: y3,
                        position: 'absolute',
                        top: '50vh', // Elevated to sit directly under/beside the middle group
                        left: '15%',
                        width: '45vw',
                        minWidth: '350px',
                        zIndex: 7
                    }}
                    className="bento-card"
                >
                    <img
                        src="/images/cars.jpg"
                        alt="Vintage Porsche"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                    <span className="pill-tag bg-br-green" style={{ color: 'white', position: 'absolute', right: '20px', bottom: '-15px', zIndex: 10 }}>Tech & Machinery</span>
                </motion.div>

            </div>
        </div>
    );
};
