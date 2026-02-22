import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const links = [
    { name: 'Home', path: '/' },
    { name: 'Interests', path: '/interests' },
    { name: 'Library', path: '/library' },
    { name: 'Resume', path: '/resume' }
];

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollY = useRef(0);
    const navY = useSpring(0, { stiffness: 300, damping: 30 });

    useEffect(() => {
        const threshold = 10;
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastScrollY.current;

            if (delta > threshold && currentY > 80) {
                // Scrolling down past threshold — hide
                setHidden(true);
                setIsOpen(false); // close drawer if open
            } else if (delta < -threshold) {
                // Scrolling up — show
                setHidden(false);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        navY.set(hidden ? -100 : 0);
    }, [hidden, navY]);

    return (
        <motion.nav
            style={{
                padding: '1.5rem 0',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: 'var(--bg-color)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                y: navY
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <NavLink to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--br-green)' }} className="serif-text">
                    owenhowe.
                </NavLink>

                {/* Desktop Links */}
                <div className="nav-desktop" style={{ display: 'flex', gap: '2rem' }}>
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            style={({ isActive }) => ({
                                color: isActive ? 'var(--terracotta)' : 'var(--text-primary)',
                                fontWeight: isActive ? 700 : 500,
                                textDecoration: 'none',
                                position: 'relative'
                            })}
                        >
                            <motion.span whileHover={{ y: -2 }} style={{ display: 'inline-block' }}>
                                {link.name}
                            </motion.span>
                        </NavLink>
                    ))}
                </div>

                {/* Hamburger Button (mobile only) */}
                <button
                    className="nav-hamburger"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        cursor: 'none',
                        padding: '0.5rem',
                        zIndex: 110
                    }}
                >
                    <div style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: 'var(--text-primary)',
                        transition: 'all 0.3s ease',
                        transform: isOpen ? 'rotate(45deg) translateY(4px)' : 'none',
                        marginBottom: isOpen ? '0' : '6px'
                    }} />
                    <div style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: 'var(--text-primary)',
                        transition: 'all 0.3s ease',
                        opacity: isOpen ? 0 : 1,
                        marginBottom: isOpen ? '0' : '6px'
                    }} />
                    <div style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: 'var(--text-primary)',
                        transition: 'all 0.3s ease',
                        transform: isOpen ? 'rotate(-45deg) translateY(-4px)' : 'none'
                    }} />
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="nav-mobile-drawer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{
                            overflow: 'hidden',
                            borderTop: '1px solid rgba(0,0,0,0.05)'
                        }}
                    >
                        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.5rem 2rem' }}>
                            {links.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    style={({ isActive }) => ({
                                        color: isActive ? 'var(--terracotta)' : 'var(--text-primary)',
                                        fontWeight: isActive ? 700 : 500,
                                        textDecoration: 'none',
                                        fontSize: '1.25rem',
                                        padding: '0.75rem 0',
                                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                                    })}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
