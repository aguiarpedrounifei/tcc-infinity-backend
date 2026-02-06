require('dotenv').config();
const db = require('./db');

async function addCategory() {
    try {
        console.log('🔄 Adicionando categoria "Conhecimentos Gerais"...');

        // Insert the new category (IGNORE if already exists)
        await db.query(
            'INSERT IGNORE INTO categorias (id, nome) VALUES (?, ?)',
            [4, 'Conhecimentos Gerais']
        );

        console.log('✅ Categoria "Conhecimentos Gerais" adicionada com sucesso!');

        // Show all categories
        const [categories] = await db.query('SELECT * FROM categorias');
        console.log('\n📋 Categorias disponíveis:');
        categories.forEach(cat => {
            console.log(`   ${cat.id}. ${cat.nome}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao adicionar categoria:', error.message);
        process.exit(1);
    }
}

addCategory();
