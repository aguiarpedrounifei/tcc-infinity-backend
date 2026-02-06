const jwt = require('jsonwebtoken');

/**
 * Middleware to check if user is an admin
 * Must be used after authMiddleware
 */
module.exports = (req, res, next) => {
    if (!req.userData || !req.userData.isAdmin) {
        return res.status(403).json({
            error: 'Acesso negado. Apenas administradores podem acessar esta rota.'
        });
    }
    next();
};
