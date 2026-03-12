import { m, useReducedMotion } from 'framer-motion';

export const TypewriterHeading = ({ text, className = 'serif-text', style = {}, tag: Tag = 'h1' }) => {
    const prefersReduced = useReducedMotion();
    const characters = text.split('');

    if (prefersReduced) {
        return (
            <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Tag className={className} style={style}>
                    {text}
                </Tag>
            </m.div>
        );
    }

    return (
        <Tag
            className={className}
            aria-label={text}
            style={{ ...style, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}
        >
            {characters.map((char, i) => (
                <m.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.01,
                        delay: 0.3 + i * 0.07
                    }}
                    style={{ display: 'inline-block' }}
                    aria-hidden="true"
                >
                    {char === ' ' ? '\u00A0' : char}
                </m.span>
            ))}
            {/* Blinking cursor */}
            <m.span
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: 3,
                    delay: 0.3 + characters.length * 0.07,
                    ease: 'steps(1)'
                }}
                style={{
                    display: 'inline-block',
                    width: '0.08em',
                    height: '0.85em',
                    backgroundColor: 'currentColor',
                    marginLeft: '0.05em',
                    verticalAlign: 'middle',
                    borderRadius: '2px'
                }}
                aria-hidden="true"
            />
        </Tag>
    );
};
