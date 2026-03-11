import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

export const ImageLightbox = ({ src, alt, children, className, style, externalLink }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <m.div 
                className={className} 
                style={{ ...style, cursor: 'none' }}
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {children}
            </m.div>

            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            cursor: 'none' // Respecting global cursor setup
                        }}
                        onClick={() => setIsOpen(false)}
                    >
                        <m.img
                            src={src}
                            alt={alt}
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        {externalLink && (
                            <m.a 
                                href={externalLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                    position: 'absolute',
                                    bottom: '2rem',
                                    backgroundColor: 'var(--terracotta)',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '999px',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    boxShadow: 'var(--box-shadow-brutal)'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.1 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                View Details ↗
                            </m.a>
                        )}
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};
