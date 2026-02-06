const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const quizController = require('../controllers/quizController');
const userController = require('../controllers/userController');
const rankingController = require('../controllers/rankingController');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const aiRoutes = require('./aiRoutes');
const db = require('../db');

// Rotas públicas
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Rota de categorias (pública)
router.get('/categorias', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
});

// Rotas protegidas (requerem autenticação)
router.get('/quiz/:categoriaId', authMiddleware, quizController.getQuestions);
router.post('/quiz/submit', authMiddleware, quizController.submitQuiz);
// router.get('/quiz/respostas', authMiddleware, quizController.getCorrectAnswers); // Not implemented

router.get('/user/profile', authMiddleware, userController.getProfile);
router.put('/user/profile', authMiddleware, userController.updateProfile);
router.delete('/user/account', authMiddleware, userController.deleteAccount);

router.get('/ranking/categoria/:categoriaId', authMiddleware, rankingController.getCategoryRanking);
router.get('/ranking/global', authMiddleware, rankingController.getGlobalRanking);

// Stats endpoint for dashboard
router.get('/user/stats', authMiddleware, async (req, res) => {
    const userId = req.userData.userId;
    try {
        // Get stats per category for the logged-in user
        const [stats] = await db.query(`
            SELECT 
                c.id as category_id,
                c.nome as category_name,
                COUNT(s.id) as total_quizzes,
                SUM(s.score) as total_correct,
                COUNT(s.id) * 10 as total_questions
            FROM categorias c
            LEFT JOIN scores s ON s.category_id = c.id AND s.user_id = ?
            GROUP BY c.id
        `, [userId]);

        // Calculate percentages
        const result = stats.map(s => ({
            categoryId: s.category_id,
            categoryName: s.category_name,
            totalQuizzes: s.total_quizzes || 0,
            totalCorrect: s.total_correct || 0,
            totalQuestions: s.total_questions || 0,
            correctPercent: s.total_questions > 0 ? Math.round((s.total_correct / s.total_questions) * 100) : 0,
            wrongPercent: s.total_questions > 0 ? Math.round(((s.total_questions - s.total_correct) / s.total_questions) * 100) : 0
        }));

        res.json(result);
    } catch (err) {
        console.error('Stats error:', err);
        res.status(500).json({ error: err.message });
    }
});

// AI routes (protected + admin check)
router.use('/ai', aiRoutes);

// Admin routes (protected + admin check)
router.get('/admin/questions', authMiddleware, adminController.isAdmin, adminController.getQuestions);
router.post('/admin/questions', authMiddleware, adminController.isAdmin, adminController.addQuestion);
router.put('/admin/questions/:id', authMiddleware, adminController.isAdmin, adminController.updateQuestion);
router.delete('/admin/questions/:id', authMiddleware, adminController.isAdmin, adminController.deleteQuestion);
router.get('/admin/stats', authMiddleware, adminController.isAdmin, adminController.getStats);

module.exports = router;
