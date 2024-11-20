const express = require('express');
const router = express.Router();
const db = require('../config/db.js'); 
const { v4: uuidv4 } = require('uuid'); 

const generateUniqueId = (req, res, next) => {
    req.uniqueId = uuidv4(); 
    next();
};

// Login route
router.post('/login', generateUniqueId, (req, res) => {
    const { department, username, password } = req.body;

    const query = 'SELECT * FROM users WHERE department = ? AND username = ? AND password = ?';
    db.query(query, [department, username, password], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (result.length > 0) {
            // Send the user data in the response
            const user = result[0]; // Get the first user from the result
            res.json({
                message: 'Login successful',
                user: {
                    department: user.department,
                },
                uniqueId: req.uniqueId, // Include the uniqueId in the response
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

module.exports = router;
