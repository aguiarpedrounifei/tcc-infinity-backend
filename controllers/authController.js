const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(409).json({ message: 'Email já cadastrado' });

        const hash = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ message: 'Falha na autenticação' });

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Falha na autenticação' });

        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name, isAdmin: user.is_admin === 1 },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '24h' }
        );
        res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email, isAdmin: user.is_admin === 1 }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
