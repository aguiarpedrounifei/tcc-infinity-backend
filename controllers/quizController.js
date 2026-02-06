const db = require('../db');

exports.getQuestions = async (req, res) => {
    const { categoriaId } = req.params;
    const { dificuldade } = req.query; // 'facil', 'medio', 'dificil', or undefined for all

    try {
        let query = 'SELECT id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, dificuldade FROM questions WHERE category_id = ?';
        const params = [categoriaId];

        if (dificuldade && ['facil', 'medio', 'dificil'].includes(dificuldade)) {
            query += ' AND dificuldade = ?';
            params.push(dificuldade);
        }

        query += ' ORDER BY RAND() LIMIT 10';

        const [questions] = await db.query(query, params);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.submitQuiz = async (req, res) => {
    const { categoryId, answers } = req.body;
    const userId = req.userData.userId; // Get from auth token for security
    try {
        let score = 0;
        const correctAnswers = [];

        // Validate answers
        // Optimization: Fetch all correct answers for these questions in one go
        const questionIds = Object.keys(answers);
        if (questionIds.length === 0) return res.json({ score: 0, total: 0 });

        const [dbQuestions] = await db.query(
            `SELECT id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta FROM questions WHERE id IN (?)`,
            [questionIds]
        );

        const feedback = [];
        dbQuestions.forEach(q => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correta;
            if (isCorrect) score++;

            feedback.push({
                questionId: q.id,
                enunciado: q.enunciado,
                userAnswer: userAnswer,
                userAnswerText: q[userAnswer],
                correctAnswer: q.correta,
                correctAnswerText: q[q.correta],
                isCorrect: isCorrect,
                alternativa_a: q.alternativa_a,
                alternativa_b: q.alternativa_b,
                alternativa_c: q.alternativa_c,
                alternativa_d: q.alternativa_d
            });
        });

        // Save score
        await db.query(
            'INSERT INTO scores (user_id, category_id, score, date) VALUES (?, ?, ?, NOW())',
            [userId, categoryId, score]
        );

        res.json({ score, total: questionIds.length, feedback });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
