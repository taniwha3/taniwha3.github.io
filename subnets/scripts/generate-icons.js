import sharp from 'sharp';
import { writeFileSync } from 'fs';

// Create a simple SVG icon for our PWA
const svgIcon = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#2196F3"/>
  <text x="256" y="256" font-family="Arial, sans-serif" font-size="200" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="white">S</text>
</svg>
`;

// Generate PNG icons from SVG
async function generateIcons() {
  const svgBuffer = Buffer.from(svgIcon);
  
  // Generate 192x192 icon
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile('public/icon-192.png');
    
  // Generate 512x512 icon
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/icon-512.png');
    
  // Generate favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile('public/favicon.png');
    
  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error);