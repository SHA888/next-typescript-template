const faviconGenerator = require('favicon-generator');
const path = require('path');

// Define favicon sizes and types
const sizes = [
  { size: 16, type: 'png' },
  { size: 32, type: 'png' },
  { size: 180, type: 'png' }, // For Apple Touch Icon
];

// Generate favicons
sizes.forEach((size) => {
  const filename = `favicon-${size.size}x${size.size}.${size.type}`;
  const outputPath = path.join(__dirname, '../public', filename);

  // Generate a simple square favicon with a gradient
  const svg = `
    <svg width="${size.size}" height="${size.size}" viewBox="0 0 ${size.size} ${size.size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="url(#gradient)"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
  `;

  // Convert SVG to PNG
  faviconGenerator.generate(svg, size.size, outputPath);
});

// Generate apple-touch-icon
const appleTouchIconPath = path.join(__dirname, '../public', 'apple-touch-icon.png');
const appleTouchIconSvg = `
  <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="url(#gradient)"/>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
      </linearGradient>
    </defs>
  </svg>
`;
faviconGenerator.generate(appleTouchIconSvg, 180, appleTouchIconPath);
