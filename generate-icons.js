// Generator ikon PWA dla AutoSerwis
// Uruchom: node generate-icons.js

const fs = require('fs');
const path = require('path');

// SVG ikony samochodu (pomarańczowa na ciemnym tle)
const generateSVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="#0a0a0e"/>
  <g transform="translate(${size * 0.15}, ${size * 0.25}) scale(${size / 100})">
    <path d="M12 10L8 20H62L58 10H12Z" fill="#f59e0b" opacity="0.3"/>
    <path d="M5 35H65V50C65 53 62 56 59 56H11C8 56 5 53 5 50V35Z" fill="#f59e0b"/>
    <circle cx="18" cy="56" r="8" fill="#1a1a22" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="52" cy="56" r="8" fill="#1a1a22" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="18" cy="56" r="4" fill="#f59e0b"/>
    <circle cx="52" cy="56" r="4" fill="#f59e0b"/>
    <rect x="10" y="40" width="8" height="5" rx="1" fill="#fcd34d"/>
    <rect x="52" y="40" width="8" height="5" rx="1" fill="#fcd34d"/>
    <path d="M15 20L12 30H58L55 20H15Z" fill="#1a1a22" stroke="#f59e0b" stroke-width="1"/>
  </g>
</svg>`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, 'icons');

// Upewnij się, że folder istnieje
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generuj SVG dla każdego rozmiaru
sizes.forEach(size => {
  const svg = generateSVG(size);
  const filename = path.join(iconsDir, `icon-${size}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✓ Wygenerowano: icon-${size}.svg`);
});

console.log('\n📱 Ikony SVG zostały wygenerowane!');
console.log('');
console.log('Aby przekonwertować na PNG (opcjonalnie):');
console.log('1. Zainstaluj: npm install sharp');
console.log('2. Uruchom: node convert-to-png.js');
console.log('');
console.log('Lub użyj online konwertera: https://cloudconvert.com/svg-to-png');
