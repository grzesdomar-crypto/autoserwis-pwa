// Konwersja SVG → PNG (wymaga sharp)
// Instalacja: npm install sharp
// Uruchom: node convert-to-png.js

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('❌ Brak modułu "sharp"');
  console.log('   Zainstaluj: npm install sharp');
  console.log('   Potem uruchom ponownie: node convert-to-png.js');
  process.exit(1);
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, 'icons');

async function convert() {
  for (const size of sizes) {
    const svgPath = path.join(iconsDir, `icon-${size}.svg`);
    const pngPath = path.join(iconsDir, `icon-${size}.png`);
    
    if (!fs.existsSync(svgPath)) {
      console.log(`⚠ Brak: icon-${size}.svg - uruchom najpierw generate-icons.js`);
      continue;
    }
    
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(pngPath);
    
    console.log(`✓ Przekonwertowano: icon-${size}.png`);
  }
  
  console.log('\n🎉 Gotowe! Ikony PNG zostały wygenerowane.');
}

convert().catch(err => {
  console.error('Błąd:', err.message);
});
