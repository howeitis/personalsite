import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navigation = () => {
    return (
        <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(0,0,0,0.1)', backgroundColor: 'var(--bg-color)', position: 'sticky', top: 0, zIndex: 100 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <NavLink to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--br-green)' }} className="serif-text">
                    owenhowe.
                </NavLink>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    {[
                        { name: 'Home', path: '/' },
                        { name: 'Interests', path: '/interests' },
                        { name: 'Readings', path: '/readings' },
                        { name: 'Resume', path: '/resume' }
                    ].map((link) => (
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
            </div>
        </nav>
    );
};
