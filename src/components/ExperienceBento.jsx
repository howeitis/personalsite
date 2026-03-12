import { Download } from 'lucide-react';
import { m } from 'framer-motion';
import { CopyEmailLink } from './CopyEmailLink';

export const ExperienceBento = ({ data }) => {
    return (
        <>
            <div className="bento-card" style={{ gridColumn: 'span 12', padding: '1.5rem 2.5rem', backgroundColor: 'var(--lavender)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 className="serif-text" aria-label="Career Journey" style={{ fontSize: '2rem', margin: 0, display: 'inline-flex', flexWrap: 'wrap' }}>
                    {'Career Journey'.split('').map((char, i) => (
                        <m.span
                            key={i}
                            initial={{ opacity: 0, scale: 1.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 15,
                                delay: 0.15 + i * 0.04
                            }}
                            style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
                            aria-hidden="true"
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </m.span>
                    ))}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <CopyEmailLink
                        email="owen@howe.app"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', delay: 0.05 }}
                        className="pill-tag"
                        style={{ textDecoration: 'none' }}
                    >
                        Email
                    </CopyEmailLink>
                    <m.a
                        href="https://www.linkedin.com/in/owen-howe-wm2016/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', delay: 0.08 }}
                        className="pill-tag"
                        style={{ textDecoration: 'none' }}
                    >
                        LinkedIn
                    </m.a>
                    <m.a
                        href="/resume.pdf"
                        download
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', delay: 0.11 }}
                        className="pill-tag"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                    >
                        Download PDF <Download size={16} />
                    </m.a>
                </div>
            </div>

            {data.map((job, index) => {
                // Stagger the layout: alternate between span-8 and span-4
                const isWide = index % 2 === 0;
                const colSpan = isWide ? 'span 8' : 'span 4';

                // Rotate background colors — terracotta last to break up before green W&M + Sycamore cards
                const bgColors = ['var(--bg-color)', 'var(--mustard)', 'var(--terracotta)'];
                const bgColor = bgColors[index % bgColors.length];

                // Ensure text is legible on each background
                const titleColor = bgColor === 'var(--terracotta)' ? 'white' : (bgColor === 'var(--mustard)' ? 'var(--text-primary)' : 'var(--br-green)');
                const textColor = bgColor === 'var(--terracotta)' ? 'rgba(255,255,255,0.9)' : undefined;

                return (
                    <m.div
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ type: "spring", delay: 0.1 * index }}
                        className="bento-card"
                        style={{
                            gridColumn: colSpan,
                            backgroundColor: bgColor,
                            minHeight: '350px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h3 className="serif-text" style={{ fontSize: '1.8rem', color: titleColor, marginBottom: '0.25rem' }}>{job.company}</h3>
                                <p style={{ fontWeight: 600, color: textColor || 'var(--terracotta)' }}>{job.title}</p>
                                {job.secondTitle && <p style={{ fontWeight: 600, color: textColor || 'var(--terracotta)', opacity: 0.8 }}>{job.secondTitle}</p>}
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span className="pill-tag" style={{ border: '2px solid var(--separator-color)', background: 'transparent', marginBottom: '0.5rem' }}>{job.period}</span>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{job.location}</p>
                            </div>
                        </div>

                        <ul style={{ listStyle: 'none', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {/* Only show top 3 highlights to keep the bento box clean, or all if we have space */}
                            {(isWide ? job.highlights.slice(0, 4) : job.highlights.slice(0, 2)).map((highlight, idx) => (
                                <li key={idx} style={{ position: 'relative', paddingLeft: '1.5rem', fontSize: '0.95rem', color: textColor || 'inherit' }}>
                                    <span style={{ position: 'absolute', left: 0, top: '10px', width: '8px', height: '8px', backgroundColor: 'var(--mustard)', borderRadius: '2px', transform: 'rotate(45deg)' }}></span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </m.div>
                );
            })}

            {/* Education Card */}
            <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", delay: 0.1 * data.length }}
                className="bento-card"
                style={{
                    gridColumn: 'span 4',
                    backgroundColor: 'var(--br-green)',
                    minHeight: '350px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '2rem'
                }}
            >
                <h3 className="serif-text" style={{ fontSize: '2.2rem', color: 'var(--mustard)', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                    The College of<br />William & Mary
                </h3>
                <p style={{ color: 'var(--mustard)', fontWeight: 600, fontSize: '1.4rem', marginBottom: '0.25rem' }}>B.A. Government</p>
                <p style={{ color: 'var(--mustard)', fontWeight: 500, fontSize: '1.1rem', opacity: 0.9 }}>Class of 2016</p>
                <div style={{ marginTop: '2rem', width: '40px', height: '4px', backgroundColor: 'var(--mustard)', borderRadius: '2px' }}></div>
            </m.div>
        </>
    );
};
