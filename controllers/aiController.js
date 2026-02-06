const db = require('../db');
const aiService = require('../services/aiService');

/**
 * Generate questions using AI
 * POST /api/ai/generate-questions
 * Body: { category: string, difficulty: string, quantity: number }
 */
exports.generateQuestions = async (req, res) => {
    const { category, difficulty, quantity } = req.body;

    // Validate input
    if (!category || !difficulty) {
        return res.status(400).json({
            error: 'Categoria e dificuldade são obrigatórios'
        });
    }

    if (!['facil', 'medio', 'dificil'].includes(difficulty)) {
        return res.status(400).json({
            error: 'Dificuldade deve ser: facil, medio ou dificil'
        });
    }

    const questionQuantity = parseInt(quantity) || 10;
    if (questionQuantity < 1 || questionQuantity > 20) {
        return res.status(400).json({
            error: 'Quantidade deve estar entre 1 e 20'
        });
    }

    try {
        const questions = await aiService.generateQuestions(
            category,
            difficulty,
            questionQuantity
        );

        res.json({
            success: true,
            message: `${questions.length} perguntas geradas com sucesso!`,
            questions: questions
        });

    } catch (error) {
        console.error('Error in generateQuestions:', error);
        res.status(500).json({
            error: 'Erro ao gerar perguntas com IA',
            details: error.message
        });
    }
};

/**
 * Save AI-generated questions to database
 * POST /api/ai/save-questions
 * Body: { categoryId: number, questions: array }
 */
exports.saveGeneratedQuestions = async (req, res) => {
    const { categoryId, questions } = req.body;

    // Validate input
    if (!categoryId || !questions || !Array.isArray(questions)) {
        return res.status(400).json({
            error: 'categoryId e questions (array) são obrigatórios'
        });
    }

    if (questions.length === 0) {
        return res.status(400).json({
            error: 'Nenhuma pergunta para salvar'
        });
    }

    try {
        // Verify category exists
        const [categories] = await db.query(
            'SELECT id, nome FROM categorias WHERE id = ?',
            [categoryId]
        );

        if (categories.length === 0) {
            return res.status(404).json({
                error: 'Categoria não encontrada'
            });
        }

        // Insert questions into database
        const insertPromises = questions.map(q => {
            return db.query(
                `INSERT INTO questions 
                (category_id, enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta, dificuldade) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    categoryId,
                    q.enunciado,
                    q.alternativa_a,
                    q.alternativa_b,
                    q.alternativa_c,
                    q.alternativa_d,
                    q.correta,
                    q.dificuldade
                ]
            );
        });

        await Promise.all(insertPromises);

        res.json({
            success: true,
            message: `${questions.length} perguntas salvas com sucesso na categoria "${categories[0].nome}"!`,
            savedCount: questions.length
        });

    } catch (error) {
        console.error('Error in saveGeneratedQuestions:', error);
        res.status(500).json({
            error: 'Erro ao salvar perguntas no banco de dados',
            details: error.message
        });
    }
};
