import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { m, AnimatePresence, useSpring } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { MagneticElement } from './MagneticElement';

const links = [
    { name: 'Home', path: '/' },
    { name: 'Now', path: '/now' },
    { name: 'Interests', path: '/interests' },
    { name: 'Library', path: '/library' },
    { name: 'Resume', path: '/resume' }
];

export const Navigation = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [navHeight, setNavHeight] = useState(72);
    const lastScrollY = useRef(0);
    const navRef = useRef(null);
    const navY = useSpring(0, { stiffness: 300, damping: 30 });

    useEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.offsetHeight);
        }
    }, []);

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

    const handleHamburgerClick = () => {
        setHidden(false);
        setIsOpen(prev => !prev);
    };

    return (
        <>
        <m.nav
            ref={navRef}
            style={{
                padding: '1.5rem 0',
                borderBottom: '1px solid var(--separator-color)',
                backgroundColor: 'var(--bg-color)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                y: navY
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                <NavLink to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--br-green)', marginRight: 'auto' }} className="serif-text">
                    {isHome ? 'Owen Howe' : 'OH'}
                </NavLink>

                {/* Desktop Links */}
                <div className="nav-desktop" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
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
                            <MagneticElement scaleOnHover={1.1}>
                                <m.span style={{ display: 'inline-block' }}>
                                    {link.name}
                                </m.span>
                            </MagneticElement>
                        </NavLink>
                    ))}
                </div>

                {/* Dark Mode Toggle — always visible, far right */}
                <MagneticElement scaleOnHover={1.2}>
                    <button
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        className="theme-toggle"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'none',
                            padding: '0.5rem',
                            marginLeft: '1.5rem',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </MagneticElement>

                {/* Hamburger Button (mobile only) */}
                <button
                    className="nav-hamburger"
                    onClick={handleHamburgerClick}
                    aria-expanded={isOpen}
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
        </m.nav>

        {/* Mobile Drawer — fixed overlay so it's unaffected by the nav's y-transform */}
        <AnimatePresence>
            {isOpen && (
                <m.div
                    className="nav-mobile-drawer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ top: navHeight }}
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
                                    borderBottom: '1px solid var(--separator-color)'
                                })}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </m.div>
            )}
        </AnimatePresence>
        </>
    );
};
