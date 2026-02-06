const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

async function createAdmin() {
    // Configuração manual da conexão para garantir que pegue o ENV correto no Render
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 4000,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        // Verificar se admin já existe
        const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', ['admin123@gmail.com']);

        if (existing.length > 0) {
            // Atualizar para admin e resetar senha para garantir
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await pool.query('UPDATE users SET is_admin = TRUE, password = ? WHERE email = ?', [hashedPassword, 'admin123@gmail.com']);
            console.log('✅ Usuário admin123@gmail.com atualizado!');
        } else {
            // Criar novo admin
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await pool.query(
                'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, TRUE)',
                ['Administrador', 'admin123@gmail.com', hashedPassword]
            );
            console.log('✅ Usuário administrador criado!');
        }
    } catch (error) {
        console.error('❌ Erro:', error.message);
        throw error;
    } finally {
        await pool.end();
    }
}

module.exports = createAdmin;
