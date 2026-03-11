import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoriesToScan = [
    path.join(__dirname, '..', 'public', 'images'),
    path.join(__dirname, '..', 'public', 'images', 'now'),
    path.join(__dirname, '..', 'public', 'images', 'covers'),
    path.join(__dirname, '..', 'public', 'images', 'books'),
    path.join(__dirname, '..', 'public', 'images', 'interests'),
];

async function convertImages() {
    console.log('Starting image conversion to WebP...');
    let convertedCount = 0;

    for (const dir of directoriesToScan) {
        if (!fs.existsSync(dir)) continue;
        
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
                const inputPath = path.join(dir, file);
                const outputPath = path.join(dir, path.basename(file, ext) + '.webp');
                
                // Skip if webp already exists
                if (fs.existsSync(outputPath)) continue;

                try {
                    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
                    convertedCount++;
                } catch (e) {
                    console.error(`Failed to convert ${file}:`, e);
                }
            }
        }
    }
    console.log(`Successfully converted ${convertedCount} images to WebP.`);
}

convertImages();
