// server.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas da API
app.use('/api', routes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'Infinity Quiz API - Rodando!' });
});

// Rota temporária para criar admin em produção
const createAdminScript = require('./create_admin_logic'); // Vamos extrair a lógica
app.get('/setup-admin', async (req, res) => {
    try {
        await createAdminScript();
        res.send('Admin criado/atualizado com sucesso! Tente logar agora.');
    } catch (error) {
        res.status(500).send('Erro ao criar admin: ' + error.message);
    }
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`📡 API disponível em: http://localhost:${PORT}/api`);
    });
}

// Rota de diagnóstico do Banco de Dados
app.get('/debug-db', async (req, res) => {
    try {
        const db = require('./db');
        const [result] = await db.query('SELECT 1 + 1 AS "result"');
        const [tables] = await db.query('SHOW TABLES');
        res.json({
            status: 'Conexão OK',
            test: result[0].result,
            tables: tables
        });
    } catch (error) {
        res.status(500).json({
            status: 'Erro na conexão',
            message: error.message,
            stack: error.stack
        });
    }
});

module.exports = app;