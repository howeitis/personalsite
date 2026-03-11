import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'src/components/ConsultingTeaser.jsx',
    'src/components/CopyEmailLink.jsx',
    'src/components/CustomCursor.jsx',
    'src/components/ExperienceBento.jsx',
    'src/components/Footer.jsx',
    'src/components/HeroBento.jsx',
    'src/components/MoodBoard.jsx',
    'src/components/Navigation.jsx',
    'src/pages/Interests.jsx',
    'src/pages/Library.jsx',
    'src/pages/NotFound.jsx',
    'src/pages/Now.jsx',
    'src/pages/Resume.jsx'
];

files.forEach(file => {
   let p = path.join(__dirname, '..', file);
   if (!fs.existsSync(p)) return;
   let content = fs.readFileSync(p, 'utf8');
   
   content = content.replace(/import\s+\{([^}]*)\bmotion\b([^}]*)\}\s+from\s+['"]framer-motion['"]/, (match, p1, p2) => {
       return `import {${p1}m${p2}} from 'framer-motion'`;
   });
   
   content = content.replace(/<motion\./g, '<m.');
   content = content.replace(/<\/motion\./g, '</m.');
   
   fs.writeFileSync(p, content);
});
console.log('Refactored framer-motion!');
