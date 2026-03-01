/**
 * Postinstall patch: adds react-router-dom/server.js shim for vite-react-ssg.
 *
 * vite-react-ssg dynamically imports 'react-router-dom/server.js' at SSG render time.
 * React Router v7 moved those APIs (StaticRouterProvider, createStaticHandler,
 * createStaticRouter) to the 'react-router' package and removed the server.js
 * subpath export from react-router-dom. This script creates a thin shim that
 * re-exports the APIs from 'react-router', plus patches the package.json exports
 * map so Node.js resolves the subpath.
 *
 * This patch is safe to remove once vite-react-ssg adds native React Router v7
 * support, or if the project migrates to React Router framework mode.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rrDomDir = join(__dirname, '..', 'node_modules', 'react-router-dom');

if (!existsSync(rrDomDir)) {
    console.log('[patch] react-router-dom not found, skipping.');
    process.exit(0);
}

// 1. Create CJS shim
const cjsShim = `// Auto-generated shim — see scripts/patch-react-router-dom.js
// Re-exports react-router server APIs for vite-react-ssg compatibility with RR v7
module.exports = require('react-router');
`;
writeFileSync(join(rrDomDir, 'server.js'), cjsShim);

// 2. Create ESM shim
const esmShim = `// Auto-generated shim — see scripts/patch-react-router-dom.js
// Re-exports react-router server APIs for vite-react-ssg compatibility with RR v7
export { StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router';
`;
writeFileSync(join(rrDomDir, 'server.mjs'), esmShim);

// 3. Patch package.json exports map
const pkgPath = join(rrDomDir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

const serverExport = { import: './server.mjs', default: './server.js' };
pkg.exports = pkg.exports || {};
pkg.exports['./server.js'] = serverExport;
pkg.exports['./server'] = serverExport;

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log('[patch] react-router-dom/server.js shim installed for vite-react-ssg.');
