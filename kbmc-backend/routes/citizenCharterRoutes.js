const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib'); // PDF processing library
const db = require('../config/db');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });

/**
 * Compress PDF using pdf-lib
 * @param {string} inputPath 
 * @param {string} outputPath 
 */
const compressPDF = async (inputPath, outputPath) => {
    try {
        const pdfBytes = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Optimize PDF structure
        pdfDoc.setTitle('Compressed PDF');
        pdfDoc.setAuthor('Your App');

        const compressedBytes = await pdfDoc.save({ useObjectStreams: false });

        // Write the compressed PDF to the output path
        fs.writeFileSync(outputPath, compressedBytes);

        // Log the size of the compressed PDF
        const originalSize = fs.statSync(inputPath).size;
        const compressedSize = fs.statSync(outputPath).size;

        console.log(`Original PDF size: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`Compressed PDF size: ${(compressedSize / 1024).toFixed(2)} KB`);
    } catch (err) {
        console.error('Error compressing PDF:', err);
        throw err;
    }
};


router.get('/citizen-charter', (req, res) => {
    db.query('SELECT * FROM `citizen-charter`', (err, results) => {
        if (err) {
            console.error('Error fetching citizen charters:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

router.post('/citizen-charter', upload.single('pdf'), async (req, res) => {
    const { name } = req.body;
    const pdfPath = req.file ? req.file.path : null;

    if (!name || !pdfPath) {
        return res.status(400).json({ message: 'Name and PDF file are required.' });
    }

    // Compress the PDF
    const compressedPdfPath = `uploads/compressed_${path.basename(pdfPath)}`;
    try {
        await compressPDF(pdfPath, compressedPdfPath);

        // Save the compressed file path to the database
        const newCharter = { name, pdf: compressedPdfPath };

        db.query('INSERT INTO `citizen-charter` (name, pdf) VALUES (?, ?)', [name, compressedPdfPath], (err, result) => {
            if (err) {
                console.error('Error adding citizen charter:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ id: result.insertId, ...newCharter });
        });
    } catch (err) {
        console.error('Error compressing PDF:', err);
        return res.status(500).json({ error: 'Error processing the PDF file.' });
    }
});


router.put('/citizen-charter/:id', upload.single('pdf'), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const pdfPath = req.file ? req.file.path : null;

    let query = 'UPDATE `citizen-charter` SET name = ?';
    const params = [name];

    if (pdfPath) {
        query += ', pdf = ?';
        params.push(pdfPath);
    }

    query += ' WHERE id = ?';
    params.push(id);

    db.query(query, params, (err) => {
        if (err) {
            console.error('Error updating citizen charter:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const response = { id, name, ...(pdfPath ? { pdf: pdfPath } : {}) };
        res.json(response);
    });
});

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

router.use('/uploads', express.static('uploads'));

module.exports = router;
