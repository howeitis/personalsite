import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
    'src/components/now/TravelingCard.jsx',
    'src/components/now/ThinkingAboutCard.jsx',
    'src/components/now/WatchingCard.jsx',
    'src/components/now/GrowingCard.jsx',
    'src/pages/Now.jsx',
    'src/pages/Home.jsx',
    'src/pages/Interests.jsx',
    'src/pages/Library.jsx',
    'src/components/MoodBoard.jsx',
    'src/components/HeroBento.jsx',
    'src/index.css'
];

files.forEach(file => {
   let p = path.join(__dirname, '..', file);
   if (!fs.existsSync(p)) return;
   let content = fs.readFileSync(p, 'utf8');
   
   content = content.replace(/\.png/g, '.webp');
   content = content.replace(/\.jpg/g, '.webp');
   content = content.replace(/\.jpeg/g, '.webp');
   
   fs.writeFileSync(p, content);
});
console.log('Updated image references to WebP!');
