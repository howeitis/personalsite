import { useState, useEffect } from 'react';

const ARSENAL_TEAM_ID = 57;

/**
 * Fetches the next scheduled Arsenal fixture via the /api/arsenal-fixture proxy.
 * Falls back to the hardcoded fixture from content.json on error.
 */
export function useArsenalFixture(fallback) {
    const [fixture, setFixture] = useState(fallback ?? null);

    useEffect(() => {
        let cancelled = false;

        async function fetchFixture() {
            try {
                const res = await fetch('/api/arsenal-fixture');
                if (!res.ok) return;
                const data = await res.json();
                const match = data.matches?.[0];
                if (!match || cancelled) return;

                const utcDate = new Date(match.utcDate);
                const isHome = match.homeTeam.id === ARSENAL_TEAM_ID;
                const opponent = isHome ? match.awayTeam.name : match.homeTeam.name;
                // Strip "FC" / "AFC" suffix for display cleanliness
                const opponentShort = opponent.replace(/\s+(F\.?C\.?|A\.?F\.?C\.?)$/i, '').trim();

                setFixture({
                    opponent: opponentShort,
                    date: utcDate.toISOString().split('T')[0],
                    time: utcDate.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                        timeZone: 'America/New_York',
                    }),
                    competition: match.competition?.name ?? 'Premier League',
                    home: isHome,
                });
            } catch {
                // network error — stay on fallback
            }
        }

        fetchFixture();
        return () => { cancelled = true; };
    }, []);

    return fixture;
}
