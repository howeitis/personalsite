import { m, useReducedMotion } from 'framer-motion';

export const TypewriterHeading = ({ text, className = 'serif-text', style = {}, tag: Tag = 'h1' }) => {
    const prefersReduced = useReducedMotion();

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

    // Split into words to prevent mid-word line breaks
    const words = text.split(' ');
    let charIndex = 0;

    return (
        <Tag
            className={className}
            aria-label={text}
            style={{ ...style, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}
        >
            {words.map((word, wi) => {
                const startIndex = charIndex;
                charIndex += word.length + 1; // +1 for the space
                return (
                    <span key={wi} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
                        {word.split('').map((char, ci) => (
                            <m.span
                                key={ci}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.01,
                                    delay: 0.3 + (startIndex + ci) * 0.07
                                }}
                                style={{ display: 'inline-block' }}
                                aria-hidden="true"
                            >
                                {char}
                            </m.span>
                        ))}
                        {wi < words.length - 1 && (
                            <m.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.01,
                                    delay: 0.3 + (startIndex + word.length) * 0.07
                                }}
                                style={{ display: 'inline-block' }}
                                aria-hidden="true"
                            >
                                {'\u00A0'}
                            </m.span>
                        )}
                    </span>
                );
            })}
            {/* Blinking cursor */}
            <m.span
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: 3,
                    delay: 0.3 + text.length * 0.07,
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
