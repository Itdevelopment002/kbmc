const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const db = require('../config/db.js');

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where the files will be saved
    },
    filename: (req, file, cb) => {
        // Generate unique filename using timestamp and original extension
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// API to create a new website link
router.post('/websitelinks', upload.single('websitelogo'), (req, res) => {
    const { websitelink } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    if (!websitelink) {
        return res.status(400).json({ message: 'Website link is required' });
    }

    const filePath = `/uploads/${req.file.filename}`; // Storing file path
    const sql = 'INSERT INTO websitelink (websitelink, websitelogo) VALUES (?, ?)';

    db.query(sql, [websitelink, filePath], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({
            message: 'Website link and logo uploaded successfully',
            logoUrl: filePath,
        });
    });
});

// API to get all website links
router.get('/websitelinks', (req, res) => {
    const sql = 'SELECT * FROM websitelink'; // Ensure correct table

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});

// API to get website link by ID
router.get('/websitelinks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM websitelink WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Website link not found' });
        }

        const link = result[0];
        res.status(200).json({
            id: link.id,
            websitelink: link.websitelink,
            websitelogo: link.websitelogo,
        });
    });
});

// API to delete a website link by ID
router.delete('/websitelinks/:id', (req, res) => {
    const { id } = req.params;

    // First, get the file path of the website logo
    const selectSql = 'SELECT websitelogo FROM websitelink WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Website link not found' });
        }

        const filePath = result[0].websitelogo;

        // Delete the website link from the database
        const deleteSql = 'DELETE FROM websitelink WHERE id = ?';
        db.query(deleteSql, [id], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // Delete the image file from the uploads directory
            fs.unlink(path.join(__dirname, '..', filePath), (fsErr) => {
                if (fsErr) {
                    console.error('Error deleting file:', fsErr);
                }
            });

            res.status(200).json({ message: 'Website link deleted successfully' });
        });
    });
});

// API to update a website link by ID (websitelink and optional logo)
router.put('/websitelinks/:id', upload.single('websitelogo'), (req, res) => {
    const { id } = req.params;
    const { websitelink } = req.body;

    let updateSql = 'UPDATE websitelink SET';
    const updateParams = [];

    // Add websitelink to the update if provided
    if (websitelink) {
        updateSql += ' websitelink = ?';
        updateParams.push(websitelink);
    }

    // Handle the uploaded file (new logo)
    let newFilePath = null;
    if (req.file) {
        newFilePath = `/uploads/${req.file.filename}`;
        updateSql += updateParams.length > 0 ? ', websitelogo = ?' : ' websitelogo = ?'; // Properly handle commas
        updateParams.push(newFilePath);
    }

    // If neither websitelink nor logo was provided, return an error
    if (updateParams.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    // Add the WHERE clause to update the correct website link
    updateSql += ' WHERE id = ?';
    updateParams.push(id);

    // First, get the current file path to delete the old logo if needed
    const selectSql = 'SELECT websitelogo FROM websitelink WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Website link not found' });
        }

        const oldFilePath = result[0].websitelogo;

        // Update the website link details in the database
        db.query(updateSql, updateParams, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // If a new file was uploaded, delete the old logo
            if (newFilePath) {
                fs.unlink(path.join(__dirname, '..', oldFilePath), (fsErr) => {
                    if (fsErr) {
                        console.error('Error deleting old file:', fsErr);
                    }
                });
            }

            res.status(200).json({ message: 'Website link updated successfully' });
        });
    });
});

module.exports = router;
