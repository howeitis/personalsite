const COLORS = [
    'var(--mustard)',
    'var(--br-green)',
    'var(--sky-blue)',
    'var(--lavender)',
    'var(--terracotta)',
    'var(--bg-color)'
];

export function getBookColor(title, index) {
    const charSum = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hashIndex = (title.length + charSum + index * 17) % COLORS.length;
    const bgColor = COLORS[hashIndex];
    const isDarkBg = bgColor === 'var(--br-green)' || bgColor === 'var(--terracotta)';
    const textColor = isDarkBg ? 'var(--bg-color)' : 'var(--text-primary)';
    return { bgColor, textColor, charSum };
}
