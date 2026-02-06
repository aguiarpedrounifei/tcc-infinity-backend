import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputPath = path.join(__dirname, 'public/icons/icon-512x512.png');

async function generateIcons() {
    console.log('Generating PWA icons...');

    for (const size of sizes) {
        const outputPath = path.join(__dirname, `public/icons/icon-${size}x${size}.png`);

        await sharp(inputPath)
            .resize(size, size, {
                fit: 'cover',
                position: 'center'
            })
            .png()
            .toFile(outputPath);

        console.log(`✓ Generated icon-${size}x${size}.png`);
    }

    console.log('\\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
