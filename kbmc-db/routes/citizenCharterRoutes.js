const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db'); // Ensure this points to your actual database connection file

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
    },
});

const upload = multer({ storage });

// API to get all citizen charters
router.get('/citizen-charter', (req, res) => {
    db.query('SELECT * FROM `citizen-charter`', (err, results) => {
        if (err) {
            console.error('Error fetching citizen charters:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// API to add a new citizen charter
router.post('/citizen-charter', upload.single('pdf'), (req, res) => {
    const { name } = req.body;
    const pdfPath = req.file ? req.file.path : null; // Use req.file.path for the full path

    // Validate input
    if (!name || !pdfPath) {
        return res.status(400).json({ message: 'Name and PDF file are required.' });
    }

    const newCharter = { name, pdf: pdfPath };

    db.query('INSERT INTO `citizen-charter` (name, pdf) VALUES (?, ?)', [name, pdfPath], (err, result) => {
        if (err) {
            console.error('Error adding citizen charter:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ id: result.insertId, ...newCharter });
    });
});

// API to update a citizen charter
router.put('/citizen-charter/:id', upload.single('pdf'), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const pdfPath = req.file ? req.file.path : null; // Use req.file.path for the full path

    // Prepare updated charter
    const updatedCharter = { name, ...(pdfPath ? { pdf: pdfPath } : {}) };

    db.query('UPDATE `citizen-charter` SET name = ?, pdf = ? WHERE id = ?', [name, pdfPath || updatedCharter.pdf, id], (err) => {
        if (err) {
            console.error('Error updating citizen charter:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ id, ...updatedCharter });
    });
});

// API to delete a citizen charter
router.delete('/citizen-charter/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM `citizen-charter` WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting citizen charter:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Citizen charter deleted' });
    });
});

// Serve the uploads folder
router.use('/uploads', express.static('uploads'));

// Export the router
module.exports = router;
