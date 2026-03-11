import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useResponsive';

export const CopyEmailLink = ({ email, children, className, style, toastBg = 'var(--br-green)', toastColor = 'white', ...rest }) => {
    const isMobile = useIsMobile();
    const [copied, setCopied] = useState(false);

    const handleClick = (e) => {
        if (!isMobile) {
            e.preventDefault();
            navigator.clipboard.writeText(email).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <span style={{ position: 'relative', display: 'inline-block' }}>
            <AnimatePresence>
                {copied && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        transformTemplate={(_, generated) => `translateX(-50%) ${generated}`}
                        style={{
                            position: 'absolute',
                            bottom: 'calc(100% + 6px)',
                            left: '50%',
                            backgroundColor: toastBg,
                            color: toastColor,
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '999px',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            zIndex: 100
                        }}
                    >
                        Copied!
                    </motion.span>
                )}
            </AnimatePresence>
            <motion.a
                href={`mailto:${email}`}
                onClick={handleClick}
                className={className}
                style={style}
                {...rest}
            >
                {children}
            </motion.a>
        </span>
    );
};
