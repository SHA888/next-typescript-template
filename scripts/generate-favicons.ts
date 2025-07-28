import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define favicon sizes
const sizes = [16, 32, 180];

// Create a simple gradient image
const createGradientImage = async (width: number, height: number) => {
  const buffer = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
  `);

  return sharp(buffer)
    .png()
    .toBuffer();
};

async function main() {
  // Generate favicons for different sizes
  for (const size of sizes) {
    const buffer = await createGradientImage(size, size);
    const outputPath = path.join(__dirname, '../public', `favicon-${size}x${size}.png`);
    await sharp(buffer).resize(size, size).png().toFile(outputPath);
    console.log(`Generated favicon-${size}x${size}.png`);
  }

  // Generate apple-touch-icon
  const appleTouchIconPath = path.join(__dirname, '../public', 'apple-touch-icon.png');
  const appleTouchIconBuffer = await createGradientImage(180, 180);
  await sharp(appleTouchIconBuffer).resize(180, 180).png().toFile(appleTouchIconPath);
  console.log('Generated apple-touch-icon.png');
}

main().catch(console.error);
