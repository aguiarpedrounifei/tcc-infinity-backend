const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'controllers', 'aiController.js');

console.log('🔧 Corrigindo aiController.js...');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Replace the incorrect field reference
content = content.replace(
    'categories[0].name',
    'categories[0].nome'
);

// Write back to file
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Arquivo corrigido com sucesso!');
console.log('   Alteração: categories[0].name → categories[0].nome');
