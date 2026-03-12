// Generate a 200x200 noise texture PNG for dark mode bento cards
// Replaces the GPU-intensive inline SVG feTurbulence filter

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// We'll create the noise via a headless approach:
// Generate a small HTML file that uses canvas, then screenshot it.
// But even simpler: create a base64-encoded PNG directly.

// Minimal PNG encoder for grayscale noise
function createNoisePNG(width, height, opacity) {
    const pixels = [];
    for (let y = 0; y < height; y++) {
        pixels.push(0); // filter byte (none)
        for (let x = 0; x < width; x++) {
            const v = Math.floor(Math.random() * 256);
            pixels.push(v, v, v, Math.floor(opacity * 255)); // RGBA
        }
    }

    const rawData = Buffer.from(pixels);

    // Deflate the raw data
    const zlib = require('zlib');
    const deflated = zlib.deflateSync(rawData);

    // Build PNG
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    function chunk(type, data) {
        const len = Buffer.alloc(4);
        len.writeUInt32BE(data.length, 0);
        const typeBuf = Buffer.from(type, 'ascii');
        const crc = require('zlib');
        const combined = Buffer.concat([typeBuf, data]);
        const crcVal = Buffer.alloc(4);
        // CRC32
        let c = 0xffffffff;
        for (let i = 0; i < combined.length; i++) {
            c ^= combined[i];
            for (let j = 0; j < 8; j++) {
                c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
            }
        }
        crcVal.writeUInt32BE((c ^ 0xffffffff) >>> 0, 0);
        return Buffer.concat([len, combined, crcVal]);
    }

    // IHDR
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    ihdr[8] = 8; // bit depth
    ihdr[9] = 6; // color type: RGBA
    ihdr[10] = 0; // compression
    ihdr[11] = 0; // filter
    ihdr[12] = 0; // interlace

    const png = Buffer.concat([
        signature,
        chunk('IHDR', ihdr),
        chunk('IDAT', deflated),
        chunk('IEND', Buffer.alloc(0))
    ]);

    return png;
}

const png = createNoisePNG(200, 200, 0.06);
const outPath = path.join(__dirname, '..', 'public', 'images', 'noise.png');
fs.writeFileSync(outPath, png);
console.log(`Noise texture written to ${outPath} (${png.length} bytes)`);
