const db = require('../db');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
    const userId = req.userData.userId;
    try {
        const [user] = await db.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [userId]);
        const [history] = await db.query(
            `SELECT s.score, s.date, c.nome as category_name
             FROM scores s
             JOIN categorias c ON s.category_id = c.id
             WHERE s.user_id = ?
             ORDER BY s.date DESC
             LIMIT 10`,
            [userId]
        );

        if (user.length === 0) return res.status(404).json({ message: 'User not found' });

        res.json({ ...user[0], history });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    const userId = req.userData.userId;
    const { name, email, currentPassword, newPassword } = req.body;

    try {
        // Get current user data
        const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = users[0];

        // If changing password, verify current password first
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ message: 'Current password is required to change password' });
            }
            const match = await bcrypt.compare(currentPassword, user.password);
            if (!match) {
                return res.status(401).json({ message: 'Current password is incorrect' });
            }
        }

        // Check if email is being changed and if it's already taken
        if (email && email !== user.email) {
            const [existing] = await db.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId]);
            if (existing.length > 0) {
                return res.status(409).json({ message: 'Email already in use' });
            }
        }

        // Build update query dynamically
        const updates = [];
        const values = [];

        // Update name if provided
        if (name) {
            updates.push('name = ?');
            values.push(name);
        }
        // Update email if provided (and not taken by another user)
        if (email) {
            updates.push('email = ?');
            values.push(email);
        }
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updates.push('password = ?');
            values.push(hashedPassword);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: 'Nenhuma alteração fornecida' });
        }

        values.push(userId);
        await db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);

        // Return updated user info
        const [updatedUser] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [userId]);
        res.json({ message: 'Profile updated successfully', user: updatedUser[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    const userId = req.userData.userId;
    const { password } = req.body;

    try {
        // Verify password before deletion
        const [users] = await db.query('SELECT password FROM users WHERE id = ?', [userId]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const match = await bcrypt.compare(password, users[0].password);
        if (!match) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }

        // Delete user's scores first (foreign key constraint)
        await db.query('DELETE FROM scores WHERE user_id = ?', [userId]);

        // Delete user
        await db.query('DELETE FROM users WHERE id = ?', [userId]);

        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
