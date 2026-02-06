const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mysql = require('mysql2/promise');
const fs = require('fs');


async function run() {
    console.log('🔄 Iniciando configuração do banco de dados...');

    // Create a connection without database selected to ensure DB exists
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: 4000,
        multipleStatements: true,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('📂 Lendo arquivos SQL...');
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        const questions = fs.readFileSync(path.join(__dirname, 'sample_questions.sql'), 'utf8');

        console.log('🛠️  Criando tabelas...');
        await connection.query(schema);
        console.log('✅ Tabelas criadas com sucesso!');

        console.log('🌱 Populando banco com perguntas...');
        await connection.query(questions);
        console.log('✅ Perguntas inseridas com sucesso!');

        console.log('🎉 Banco de dados configurado e pronto para uso!');
    } catch (err) {
        console.error('❌ Erro ao configurar banco de dados:', err.message);
    } finally {
        await connection.end();
        process.exit();
    }
}

run();
