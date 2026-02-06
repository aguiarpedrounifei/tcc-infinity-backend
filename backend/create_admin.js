// Script para criar usuário administrador
// Execute com: node create_admin.js

const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function createAdmin() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'infinity_quiz',
        port: 4000,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        // Primeiro, verificar se a coluna is_admin existe
        const [columns] = await pool.query(`
            SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'is_admin'
        `, [process.env.DB_NAME || 'infinity_quiz']);

        if (columns.length === 0) {
            console.log('Adicionando coluna is_admin à tabela users...');
            await pool.query('ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE');
            console.log('Coluna is_admin adicionada!');
        }

        // Verificar se admin já existe
        const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', ['admin123@gmail.com']);

        if (existing.length > 0) {
            // Atualizar para admin
            await pool.query('UPDATE users SET is_admin = TRUE WHERE email = ?', ['admin123@gmail.com']);
            console.log('✅ Usuário admin123@gmail.com atualizado para administrador!');
        } else {
            // Criar novo admin
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await pool.query(
                'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, TRUE)',
                ['Administrador', 'admin123@gmail.com', hashedPassword]
            );
            console.log('✅ Usuário administrador criado com sucesso!');
        }

        console.log('\n📋 Credenciais do Admin:');
        console.log('   Email: admin123@gmail.com');
        console.log('   Senha: admin123');
        console.log('\n🔗 Após login, acesse /admin para gerenciar perguntas.');

    } catch (error) {
        console.error('❌ Erro:', error.message);
    } finally {
        await pool.end();
    }
}

createAdmin();
