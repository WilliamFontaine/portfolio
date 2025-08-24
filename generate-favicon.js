// Script pour générer favicon.ico
// Exécuter avec: node generate-favicon.js

const fs = require('fs');
const path = require('path');

console.log('🎨 Favicon Generator');
console.log('==================');
console.log('');
console.log('✅ SVG source créé: favicon-source.svg');
console.log('');
console.log('Pour générer le favicon.ico, tu peux :');
console.log('');
console.log('1. 🌐 Utiliser un convertisseur en ligne (recommandé):');
console.log('   • https://favicon.io/favicon-converter/');
console.log('   • https://convertico.com/');
console.log('   • https://icoconvert.com/');
console.log('');
console.log('2. 📦 Installer Sharp pour conversion automatique:');
console.log('   npm install sharp');
console.log('   puis relancer ce script');
console.log('');

// Vérifier si Sharp est disponible
try {
  const sharp = require('sharp');
  
  console.log('✅ Sharp détecté ! Génération automatique...');
  
  // Lire le SVG
  const svgBuffer = fs.readFileSync(path.join(__dirname, 'favicon-source.svg'));
  
  // Convertir en ICO (en fait PNG multi-tailles)
  const sizes = [16, 32, 48];
  
  Promise.all(sizes.map(size => 
    sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer()
  )).then(buffers => {
    // Pour un vrai ICO, nous créerons juste un PNG 32x32
    return sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon-temp.png'));
  }).then(() => {
    console.log('✅ Favicon PNG généré: public/favicon-temp.png');
    console.log('🔄 Renommer en favicon.ico ou convertir avec un outil en ligne');
  }).catch(err => {
    console.error('❌ Erreur:', err.message);
  });
  
} catch (err) {
  console.log('ℹ️  Pour une conversion automatique, installe Sharp:');
  console.log('   npm install sharp');
}