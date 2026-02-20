import { motion } from 'framer-motion';

export const Experience = ({ data }) => {
    return (
        <section className="experience-section" style={{ padding: '6rem 0', backgroundColor: 'var(--sand-dark)' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: '3rem', marginBottom: '4rem', color: 'var(--br-green)' }}
                >
                    Selected Experience
                </motion.h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {data.map((job, index) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{
                                display: 'flex',
                                gap: '2rem',
                                flexWrap: 'wrap',
                                borderBottom: '1px solid rgba(0,0,0,0.1)',
                                paddingBottom: '2rem'
                            }}
                        >
                            <div style={{ flex: '1 1 250px' }}>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--br-green)' }}>{job.company}</h3>
                                <p style={{ color: 'var(--terracotta)', fontWeight: 600 }}>{job.period}</p>
                            </div>
                            <div style={{ flex: '2 1 400px' }}>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{job.title}</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {job.highlights.map((highlight, idx) => (
                                        <li key={idx} style={{ marginBottom: '0.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                                            <span style={{ position: 'absolute', left: 0, top: '8px', width: '6px', height: '6px', backgroundColor: 'var(--terracotta)', borderRadius: '50%' }}></span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
