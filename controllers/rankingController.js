const db = require('../db');

exports.getGlobalRanking = async (req, res) => {
    try {
        // Sum of all scores per user
        const [ranking] = await db.query(`
            SELECT u.name, SUM(s.score) as total_score
            FROM scores s
            JOIN users u ON s.user_id = u.id
            GROUP BY u.id
            ORDER BY total_score DESC
            LIMIT 10
        `);
        res.json(ranking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCategoryRanking = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const [ranking] = await db.query(`
            SELECT u.name, MAX(s.score) as max_score
            FROM scores s
            JOIN users u ON s.user_id = u.id
            WHERE s.category_id = ?
            GROUP BY u.id
            ORDER BY max_score DESC
            LIMIT 10
        `, [categoryId]);
        res.json(ranking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
