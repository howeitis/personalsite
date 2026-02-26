export default async function handler(req, res) {
    const apiKey = process.env.VITE_FOOTBALL_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const response = await fetch(
            'https://api.football-data.org/v4/teams/57/matches?status=SCHEDULED&limit=1',
            { headers: { 'X-Auth-Token': apiKey } }
        );
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Upstream API error' });
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch fixture' });
    }
}
