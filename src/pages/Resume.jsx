import { ExperienceBento } from '../components/ExperienceBento';

export const Resume = ({ data }) => {
    return (
        <div style={{ padding: '2rem 0' }}>
            <div className="bento-grid">
                <ExperienceBento data={data} />
            </div>
        </div>
    );
};
