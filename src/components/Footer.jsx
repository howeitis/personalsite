import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Chrome } from 'lucide-react';

export const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--bg-color)', padding: '2rem 0', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                <div>
                    <h3 className="serif-text" style={{ fontSize: '2rem', margin: 0, color: 'var(--br-green)' }}>OH</h3>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <motion.a
                        href="mailto:owen@howe.app"
                        whileHover={{ y: -3, color: 'var(--terracotta)' }}
                        style={{ color: 'var(--text-primary)', transition: 'color 0.3s', cursor: 'none', fontWeight: 500 }}
                    >
                        Email
                    </motion.a>
                    <motion.a
                        href="https://www.linkedin.com/in/owen-howe-wm2016/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, color: 'var(--terracotta)' }}
                        style={{ color: 'var(--text-primary)', transition: 'color 0.3s', cursor: 'none', fontWeight: 500 }}
                    >
                        LinkedIn
                    </motion.a>
                </div>
            </div>
        </footer>
    );
};
