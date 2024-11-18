const express = require('express');
const router = express.Router();
const db = require('../config/db.js'); // Ensure you have your database connection setup
const multer = require('multer');
const path = require('path');

// Set up storage for PDF uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Initialize multer
const upload = multer({ storage: storage });

// API to add a new entry with PDF
router.post('/department-data-year', upload.single('pdf'), (req, res) => {
    const { department_id, department_heading, year, pdfheading } = req.body; // Ensure these names match your client-side form
    const pdfPath = req.file ? req.file.path : null; // Path to the uploaded PDF

    // Check if required fields are provided
    if (!department_id || !department_heading || !year || !pdfheading || !pdfPath) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'INSERT INTO deptdatayear (department_id, department_heading, year, pdfheading, pdf) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [department_id, department_heading, year, pdfheading, pdfPath], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'Entry added successfully', entryId: result.insertId });
    });
});

// API to get all entries
router.get('/department-data-year', (req, res) => {
    const sql = 'SELECT * FROM deptdatayear';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});

// API to get an entry by ID
router.get('/department-data-year/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM deptdatayear WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json(result[0]);
    });
});

// API to update an entry by ID
router.put('/department-data-year/:id', upload.single('pdf'), (req, res) => {
    const { id } = req.params;
    const { year, pdfheading } = req.body;
    const pdfPath = req.file ? req.file.path : null; // Check if a new PDF is uploaded

    // Check if required fields are provided
    if (!year || !pdfheading) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Prepare the SQL query
    let sql = 'UPDATE deptdatayear SET year = ?, pdfheading = ?';
    const params = [year, pdfheading];

    // If a new PDF is uploaded, include it in the query
    if (pdfPath) {
        sql += ', pdf = ?';
        params.push(pdfPath);
    }
    sql += ' WHERE id = ?';
    params.push(id);

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json({ message: 'Entry updated successfully' });
    });
});

// API to delete an entry by ID
router.delete('/department-data-year/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM deptdatayear WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        res.status(200).json({ message: 'Entry deleted successfully' });
    });
});

module.exports = router;
