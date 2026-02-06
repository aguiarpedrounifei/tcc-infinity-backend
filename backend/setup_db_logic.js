const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function setupDatabase() {
    console.log('🔄 Iniciando configuração do banco de dados...');

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 4000,
        multipleStatements: true,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        // Embedded Schema to avoid file reading issues
        const schema = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ativa BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    enunciado TEXT NOT NULL,
    alternativa_a TEXT NOT NULL,
    alternativa_b TEXT NOT NULL,
    alternativa_c TEXT NOT NULL,
    alternativa_d TEXT NOT NULL,
    correta ENUM('alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d') NOT NULL,
    dificuldade ENUM('facil', 'medio', 'dificil') DEFAULT 'medio',
    FOREIGN KEY (category_id) REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    score INT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categorias(id)
);

INSERT IGNORE INTO categorias (id, nome) VALUES 
(1, 'Tecnologia'),
(2, 'Ciências'),
(3, 'História'),
(4, 'Conhecimentos Gerais');
`;

        console.log('🛠️  Criando tabelas...');
        await connection.query(schema);
        console.log('✅ Tabelas criadas com sucesso!');

        // Only insert questions if table is empty
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM questions');
        if (rows[0].count === 0) {
            console.log('🌱 Populando banco com perguntas...');
            // Minimal set of questions to verify functionality
            const questions = `
INSERT INTO questions (category_id, enunciado, dificuldade, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta) VALUES
(1, 'Qual linguagem é conhecida como a "linguagem da web"?', 'facil', 'Python', 'JavaScript', 'Java', 'C++', 'alternativa_b'),
(1, 'O que significa HTML?', 'facil', 'HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Language', 'alternativa_a'),
(2, 'Qual é o planeta mais próximo do Sol?', 'facil', 'Vênus', 'Mercúrio', 'Terra', 'Marte', 'alternativa_b'),
(3, 'Em que ano foi descoberto o Brasil?', 'facil', '1492', '1500', '1510', '1498', 'alternativa_b');
`;
            await connection.query(questions);
            console.log('✅ Perguntas inseridas com sucesso!');
        } else {
            console.log('ℹ️ Perguntas já existem, pulando inserção.');
        }

        return 'Banco de dados configurado com sucesso! Tabelas criadas.';
    } catch (err) {
        console.error('❌ Erro ao configurar banco de dados:', err.message);
        throw err;
    } finally {
        await connection.end();
    }
}

module.exports = setupDatabase;
