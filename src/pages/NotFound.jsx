import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NotFound = () => {
    return (
        <div style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.h1
                className="serif-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1, marginBottom: '1rem' }}
            >
                404.
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px' }}
            >
                This page wandered off. Let's get you back.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
            >
                <Link
                    to="/"
                    className="pill-tag bg-terracotta"
                    style={{ color: 'white', border: 'var(--border-thick)', cursor: 'none', fontSize: '1.1rem', padding: '0.75rem 1.5rem' }}
                >
                    Back Home
                </Link>
            </motion.div>
        </div>
    );
};
