import { writeFileSync } from 'fs';

const BASE_URL = 'https://howe.app';
const today = new Date().toISOString().split('T')[0];

const routes = [
    { path: '/',          priority: '1.0', changefreq: 'monthly' },
    { path: '/resume',    priority: '0.9', changefreq: 'monthly' },
    { path: '/now',       priority: '0.8', changefreq: 'weekly'  },
    { path: '/interests', priority: '0.7', changefreq: 'monthly' },
    { path: '/library',   priority: '0.7', changefreq: 'monthly' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(({ path, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync('public/sitemap.xml', xml);
console.log(`Sitemap generated: ${routes.length} routes, lastmod ${today}`);
