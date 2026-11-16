// "Build" sederhana: memastikan semua modul di src/ dapat dimuat tanpa error.
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.js'));

for (const file of files) {
  require(path.join(srcDir, file));
  console.log(`OK  src/${file}`);
}
console.log(`Build check selesai: ${files.length} modul berhasil dimuat.`);
