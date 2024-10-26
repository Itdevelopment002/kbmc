const express = require('express');
const router = express.Router();
const db = require('../config/db.js'); // Ensure you have your database connection setup

// API to add a new department
router.post('/generaladmindepartment', (req, res) => {
    const { departments_heading } = req.body;

    // Check if departments_heading is provided
    if (!departments_heading) {
        return res.status(400).json({ message: 'Department heading is required' });
    }

    const sql = 'INSERT INTO Generaladmindepartment (departments_heading) VALUES (?)';
    db.query(sql, [departments_heading], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Department added successfully', departmentId: result.insertId });
    });
});

// API to get all departments
router.get('/generaladmindepartment', (req, res) => {
    const sql = 'SELECT * FROM Generaladmindepartment';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});

// API to get a department by ID
router.get('/generaladmindepartment/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Generaladmindepartment WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(result[0]);
    });
});

// API to update a department by ID
router.put('/generaladmindepartment/:id', (req, res) => {
    const { id } = req.params;
    const { departments_heading } = req.body;

    // Check if departments_heading is provided
    if (!departments_heading) {
        return res.status(400).json({ message: 'Department heading is required' });
    }

    const sql = 'UPDATE Generaladmindepartment SET departments_heading = ? WHERE id = ?';
    db.query(sql, [departments_heading, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json({ message: 'Department updated successfully' });
    });
});

// API to delete a department by ID
router.delete('/generaladmindepartment/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM Generaladmindepartment WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json({ message: 'Department deleted successfully' });
    });
});

module.exports = router;
