import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring-following for the ring
    const ringX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
    const ringY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });
    const ringSize = useSpring(32, { stiffness: 400, damping: 25, mass: 0.5 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                ringSize.set(64);
            } else {
                ringSize.set(32);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY, ringSize]);

    return (
        <>
            {/* Dot - follows mouse directly */}
            <motion.div
                className="cursor-dot"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: 8,
                    height: 8,
                    backgroundColor: 'var(--terracotta)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Ring - spring-follows with expansion on hover */}
            <motion.div
                className="cursor-outline"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: ringSize,
                    height: ringSize,
                    border: '2px solid var(--terracotta)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    );
};
