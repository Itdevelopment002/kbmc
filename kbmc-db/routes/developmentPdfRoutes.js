const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const db = require('../config/db.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });

router.post('/development-plan-pdf', upload.fields([{ name: 'image' }, { name: 'pdf' }]), (req, res) => {
    const { name } = req.body; 
    const imagePath = req.files?.image ? req.files.image[0].path : null;
    const pdfPath = req.files?.pdf ? req.files.pdf[0].path : null;

    if (!name || !imagePath || !pdfPath) { 
        return res.status(400).json({ message: 'Name, image, and PDF files are required.' }); 
    }

    const sql = 'INSERT INTO development_plan_pdf (name, image_path, pdf_path) VALUES (?, ?, ?)'; 
    db.query(sql, [name, imagePath, pdfPath], (err, result) => { 
        if (err) {
            return res.status(500).json({ message: 'Database insertion failed', error: err });
        }
        res.status(201).json({ message: 'Record added successfully', data: result });
    });
});

router.get('/development-plan-pdf', (req, res) => {
    const sql = 'SELECT * FROM development_plan_pdf';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database retrieval failed', error: err });
        }
        res.json(results);
    });
});

router.put('/development_plan_pdf/:id', upload.fields([{ name: 'image' }, { name: 'pdf' }]), (req, res) => {
    const { name } = req.body; // Assuming 'name' is the description field
    const imagePath = req.files?.image ? req.files.image[0].path : null;
    const pdfPath = req.files?.pdf ? req.files.pdf[0].path : null;

    if (!name && !imagePath && !pdfPath) {
        return res.status(400).json({ message: 'No changes detected.' });
    }

    // Initialize base query
    const baseQuery = 'UPDATE development_plan_pdf SET ';
    let updateFields = [];
    let params = [];

    // Add fields to update if they are present
    if (name) {
        updateFields.push('name = ?');
        params.push(name);
    }
    if (imagePath) {
        updateFields.push('image_path = ?');
        params.push(imagePath);
    }
    if (pdfPath) {
        updateFields.push('pdf_path = ?');
        params.push(pdfPath);
    }

    const sql = `${baseQuery} ${updateFields.join(', ')} WHERE id = ?`;
    params.push(req.params.id);

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database update failed', error: err });
        }
        res.json({ success: true, message: 'Record updated successfully', data: result });
    });
});


router.delete('/development-plan-pdf/:id', (req, res) => {
    const sql = 'DELETE FROM development_plan_pdf WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database deletion failed', error: err });
        }
        res.json({ success: true });
    });
});

module.exports = router;
