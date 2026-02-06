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

const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`📡 API disponível em: http://localhost:${PORT}/api`);
    });
}

module.exports = app;