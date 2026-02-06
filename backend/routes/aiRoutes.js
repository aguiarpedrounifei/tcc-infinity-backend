const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');

// All AI routes require authentication and admin privileges
router.use(authMiddleware);
router.use(adminMiddleware);

/**
 * POST /api/ai/generate-questions
 * Generate questions using AI
 * Body: { category: string, difficulty: string, quantity: number }
 */
router.post('/generate-questions', aiController.generateQuestions);

/**
 * POST /api/ai/save-questions
 * Save AI-generated questions to database
 * Body: { categoryId: number, questions: array }
 */
router.post('/save-questions', aiController.saveGeneratedQuestions);

module.exports = router;
