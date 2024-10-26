const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const db = require('../config/db.js');


// Get all tenders
router.get('/tenders', (req, res) => {
    db.query('SELECT * FROM tenders', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new tender
router.post('/tenders', (req, res) => {
    const { tenders, status } = req.body;
    const sql = 'INSERT INTO tenders (tenders, status) VALUES (?, ?)';
    db.query(sql, [tenders, status], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, tenders, status });
    });
});

// Update a tender
router.put('/tenders/:id', (req, res) => {
    const { tenders } = req.body;
    const sql = 'UPDATE tenders SET tenders = ? WHERE id = ?';
    db.query(sql, [tenders, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

// Delete a tender
router.delete('/tenders/:id', (req, res) => {
    const sql = 'DELETE FROM tenders WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

module.exports = router;
