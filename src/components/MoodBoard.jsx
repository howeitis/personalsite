import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const MoodBoard = () => {
    const containerRef = useRef(null);

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
                height: 'clamp(500px, 85vh, 1000px)', // Dynamic height limits ton of space 
                width: '100%',
                margin: '2rem 0', // Close to hero and footer
                overflow: 'hidden', // HARD BOUNDARIES
                borderTop: '1px solid var(--text-primary)',
                borderBottom: '1px solid var(--text-primary)',
                backgroundColor: 'var(--bg-color)',
                zIndex: 1 // Ensure it stays behind HeroBento
            }}
        >
            <div className="container" style={{ position: 'relative', height: '100%' }}>

                {/* Giant Floating Typography */}
                <motion.div
                    style={{ y: yTxt, position: 'absolute', top: '15%', left: '5%', zIndex: 10 }}
                >
                    <h2 className="serif-text" style={{ fontSize: 'clamp(3rem, 15vw, 6rem)', lineHeight: 0.9, mixBlendMode: 'difference', color: 'var(--text-primary)' }}>
                        Soccer.<br />Tech.<br />Food.<br />Fashion.
                    </h2>
                    <p style={{ marginTop: '1rem', fontSize: 'clamp(0.9rem, 3vw, 1.25rem)', maxWidth: '400px', fontWeight: 500, color: 'var(--terracotta)' }}>
                        I am not just a resume. I'm built by the things I pursue off the clock.
                    </p>
                </motion.div>

                {/* 1. Fashion/ALD Image */}
                <motion.div
                    style={{
                        y: y2,
                        position: 'absolute',
                        top: '5%',
                        right: '5%',
                        width: 'clamp(140px, 30vw, 300px)', // Scales smoothly
                        zIndex: 5
                    }}
                    className="bento-card"
                >
                    <img
                        src="images/fashion.jpg"
                        alt="Fashion and Music"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                    <span className="pill-tag bg-sky" style={{ position: 'absolute', bottom: '-15px', right: '-15px', zIndex: 10, zoom: 0.8 }}>Fashion & Music</span>
                </motion.div>

                {/* 2. Flora/Anime Bike Image (Floating mid-left) */}
                <motion.div
                    style={{
                        y: y1,
                        position: 'absolute',
                        top: '40%',
                        left: '5%',
                        width: 'clamp(160px, 40vw, 400px)',
                        zIndex: 2
                    }}
                    className="bento-card"
                >
                    <img
                        src="images/flora.jpg"
                        alt="Anime bike in forest"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                </motion.div>

                {/* 3. Food / Korean Stew (Floating bottom right, overlapping) */}
                <motion.div
                    style={{
                        y: y4,
                        position: 'absolute',
                        top: '60%',
                        right: '5%',
                        width: 'clamp(150px, 35vw, 350px)',
                        zIndex: 8
                    }}
                    className="bento-card bg-terracotta"
                >
                    <img
                        src="images/food.jpg"
                        alt="Korean Stew"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block', transform: 'rotate(-3deg)' }}
                    />
                    <span className="pill-tag bg-mustard" style={{ position: 'absolute', top: '-15px', left: '-15px', zIndex: 10, zoom: 0.8 }}>Food</span>
                </motion.div>

                {/* 4. Cars / Porsche (Floating way down low, parallaxing UP fast) */}
                <motion.div
                    style={{
                        y: y3,
                        position: 'absolute',
                        top: '75%',
                        left: '15%',
                        width: 'clamp(170px, 45vw, 450px)',
                        zIndex: 7
                    }}
                    className="bento-card"
                >
                    <img
                        src="images/cars.jpg"
                        alt="Vintage Porsche"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
                    />
                    <span className="pill-tag bg-br-green" style={{ color: 'white', position: 'absolute', right: '10px', bottom: '-15px', zIndex: 10, zoom: 0.8 }}>Tech & Machinery</span>
                </motion.div>

            </div>
        </div>
    );
};
