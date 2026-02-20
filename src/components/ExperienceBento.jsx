import { motion } from 'framer-motion';

export const ExperienceBento = ({ data }) => {
    return (
        <>
            <div className="bento-card" style={{ gridColumn: 'span 12', padding: '1.5rem 2.5rem', backgroundColor: 'var(--lavender)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="serif-text" style={{ fontSize: '2rem', margin: 0 }}>Career Journey</h2>
            </div>

            {data.map((job, index) => {
                // Stagger the layout: alternate between span-8 and span-4
                const isWide = index % 2 === 0;
                const colSpan = isWide ? 'span 8' : 'span 4';

                // Rotate background colors playfully
                const bgColors = ['var(--bg-color)', 'var(--mustard)', 'var(--sky-blue)'];
                const bgColor = bgColors[index % bgColors.length];

                // Ensure text is legible on sky-blue and mustard
                const titleColor = (bgColor === 'var(--sky-blue)' || bgColor === 'var(--mustard)') ? 'var(--text-primary)' : 'var(--br-green)';

                return (
                    <motion.div
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
                                <p style={{ fontWeight: 600, color: 'var(--terracotta)' }}>{job.title}</p>
                                {job.secondTitle && <p style={{ fontWeight: 600, color: 'var(--terracotta)', opacity: 0.8 }}>{job.secondTitle}</p>}
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span className="pill-tag" style={{ border: '2px solid rgba(0,0,0,0.1)', background: 'transparent', marginBottom: '0.5rem' }}>{job.period}</span>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{job.location}</p>
                            </div>
                        </div>

                        <ul style={{ listStyle: 'none', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {/* Only show top 3 highlights to keep the bento box clean, or all if we have space */}
                            {(isWide ? job.highlights.slice(0, 4) : job.highlights.slice(0, 2)).map((highlight, idx) => (
                                <li key={idx} style={{ position: 'relative', paddingLeft: '1.5rem', fontSize: '0.95rem' }}>
                                    <span style={{ position: 'absolute', left: 0, top: '10px', width: '8px', height: '8px', backgroundColor: 'var(--mustard)', borderRadius: '2px', transform: 'rotate(45deg)' }}></span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                );
            })}

            {/* Education Card */}
            <motion.div
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
            </motion.div>
        </>
    );
};
