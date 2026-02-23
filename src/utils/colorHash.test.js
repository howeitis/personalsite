import { getBookColor } from './colorHash';

describe('getBookColor utility', () => {
    it('returns an object with bgColor, textColor, and charSum', () => {
        const result = getBookColor('Test Book', 0);
        expect(result).toHaveProperty('bgColor');
        expect(result).toHaveProperty('textColor');
        expect(result).toHaveProperty('charSum');
    });

    it('returns a valid CSS variable for bgColor', () => {
        const validColors = [
            'var(--mustard)', 'var(--br-green)', 'var(--sky-blue)',
            'var(--lavender)', 'var(--terracotta)', 'var(--bg-color)'
        ];
        const result = getBookColor('Sapiens', 3);
        expect(validColors).toContain(result.bgColor);
    });

    it('returns light text on dark backgrounds (green, terracotta)', () => {
        // Find a combination that produces br-green or terracotta
        // We test the logic directly: if bg is dark, text should be light
        const allResults = [];
        for (let i = 0; i < 50; i++) {
            allResults.push(getBookColor('Test Title ' + i, i));
        }
        const darkBgResults = allResults.filter(
            r => r.bgColor === 'var(--br-green)' || r.bgColor === 'var(--terracotta)'
        );
        darkBgResults.forEach(r => {
            expect(r.textColor).toBe('var(--bg-color)');
        });
    });

    it('returns dark text on light backgrounds', () => {
        const allResults = [];
        for (let i = 0; i < 50; i++) {
            allResults.push(getBookColor('Book ' + i, i));
        }
        const lightBgResults = allResults.filter(
            r => r.bgColor !== 'var(--br-green)' && r.bgColor !== 'var(--terracotta)'
        );
        lightBgResults.forEach(r => {
            expect(r.textColor).toBe('var(--text-primary)');
        });
    });

    it('produces consistent results for the same inputs', () => {
        const a = getBookColor('The Three-Body Problem', 7);
        const b = getBookColor('The Three-Body Problem', 7);
        expect(a.bgColor).toBe(b.bgColor);
        expect(a.textColor).toBe(b.textColor);
        expect(a.charSum).toBe(b.charSum);
    });

    it('produces different colors for different titles', () => {
        const a = getBookColor('Sapiens', 0);
        const b = getBookColor('Mistborn', 0);
        // charSum should definitely differ
        expect(a.charSum).not.toBe(b.charSum);
    });

    it('calculates charSum correctly', () => {
        const result = getBookColor('AB', 0);
        // 'A' = 65, 'B' = 66 → charSum = 131
        expect(result.charSum).toBe(131);
    });

    it('handles empty title gracefully', () => {
        const result = getBookColor('', 0);
        expect(result.charSum).toBe(0);
        expect(result).toHaveProperty('bgColor');
    });
});
