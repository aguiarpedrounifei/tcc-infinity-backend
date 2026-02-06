require('dotenv').config();
const db = require('./db');

async function checkCategories() {
    try {
        console.log('🔍 Verificando categorias no banco de dados...\n');

        const [categories] = await db.query('SELECT * FROM categorias ORDER BY id');

        if (categories.length === 0) {
            console.log('❌ Nenhuma categoria encontrada!');
        } else {
            console.log(`✅ ${categories.length} categorias encontradas:\n`);
            categories.forEach(cat => {
                console.log(`   ID: ${cat.id} | Nome: ${cat.nome}`);
            });
        }

        // Check if "Conhecimentos Gerais" exists
        const hasKnowledge = categories.some(cat =>
            cat.nome.toLowerCase().includes('conhecimentos gerais')
        );

        if (!hasKnowledge) {
            console.log('\n⚠️  Categoria "Conhecimentos Gerais" não encontrada!');
            console.log('📝 Adicionando categoria "Conhecimentos Gerais"...');

            await db.query(
                'INSERT INTO categorias (nome, descricao) VALUES (?, ?)',
                ['Conhecimentos Gerais', 'Perguntas sobre cultura geral e conhecimentos diversos']
            );

            console.log('✅ Categoria "Conhecimentos Gerais" adicionada com sucesso!');
        } else {
            console.log('\n✅ Categoria "Conhecimentos Gerais" já existe!');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Erro:', error.message);
        process.exit(1);
    }
}

checkCategories();
