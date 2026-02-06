const db = require('../db');

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
    if (!req.userData.isAdmin) {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores.' });
    }
    next();
};

// Get all questions (with pagination)
exports.getQuestions = async (req, res) => {
    const { page = 1, limit = 20, category, difficulty } = req.query;
    const offset = (page - 1) * limit;

    try {
        let query = `
            SELECT q.*, c.nome as category_name 
            FROM questions q 
            JOIN categorias c ON q.category_id = c.id 
            WHERE 1=1
        `;
        const params = [];

        if (category) {
            query += ' AND q.category_id = ?';
            params.push(category);
        }
        if (difficulty) {
            query += ' AND q.dificuldade = ?';
            params.push(difficulty);
        }

        query += ' ORDER BY q.id DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [questions] = await db.query(query, params);

        // Get total count
        let countQuery = 'SELECT COUNT(*) as total FROM questions WHERE 1=1';
        const countParams = [];
        if (category) {
            countQuery += ' AND category_id = ?';
            countParams.push(category);
        }
        if (difficulty) {
            countQuery += ' AND dificuldade = ?';
            countParams.push(difficulty);
        }
        const [countResult] = await db.query(countQuery, countParams);

        res.json({
            questions,
            total: countResult[0].total,
            page: parseInt(page),
            totalPages: Math.ceil(countResult[0].total / limit)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add new question
exports.addQuestion = async (req, res) => {
    const { category_id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta, dificuldade } = req.body;

    // Validation
    if (!category_id || !enunciado || !alternativa_a || !alternativa_b || !alternativa_c || !alternativa_d || !correta || !dificuldade) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    if (!['alternativa_a', 'alternativa_b', 'alternativa_c', 'alternativa_d'].includes(correta)) {
        return res.status(400).json({ message: 'Resposta correta inválida' });
    }

    if (!['facil', 'medio', 'dificil'].includes(dificuldade)) {
        return res.status(400).json({ message: 'Dificuldade inválida' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO questions (category_id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta, dificuldade) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [category_id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta, dificuldade]
        );

        res.status(201).json({
            message: 'Pergunta adicionada com sucesso',
            questionId: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update question
exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { category_id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta, dificuldade } = req.body;

    try {
        await db.query(
            `UPDATE questions SET category_id = ?, enunciado = ?, alternativa_a = ?, alternativa_b = ?, 
             alternativa_c = ?, alternativa_d = ?, correta = ?, dificuldade = ? WHERE id = ?`,
            [category_id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta, dificuldade, id]
        );

        res.json({ message: 'Pergunta atualizada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM questions WHERE id = ?', [id]);
        res.json({ message: 'Pergunta deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get dashboard stats
exports.getStats = async (req, res) => {
    try {
        const [totalQuestions] = await db.query('SELECT COUNT(*) as count FROM questions');
        const [totalUsers] = await db.query('SELECT COUNT(*) as count FROM users');
        const [totalQuizzes] = await db.query('SELECT COUNT(*) as count FROM scores');
        const [questionsByCategory] = await db.query(`
            SELECT c.nome as category, COUNT(q.id) as count 
            FROM categorias c 
            LEFT JOIN questions q ON c.id = q.category_id 
            GROUP BY c.id
        `);
        const [questionsByDifficulty] = await db.query(`
            SELECT dificuldade, COUNT(*) as count 
            FROM questions 
            GROUP BY dificuldade
        `);

        res.json({
            totalQuestions: totalQuestions[0].count,
            totalUsers: totalUsers[0].count,
            totalQuizzes: totalQuizzes[0].count,
            questionsByCategory,
            questionsByDifficulty
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
