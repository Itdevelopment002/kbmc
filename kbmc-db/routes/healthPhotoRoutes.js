const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const db = require('../config/db.js');  // Make sure the database connection is set up properly

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Directory where the files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Generate unique filename based on timestamp
    },
});

const upload = multer({ storage });

// API to upload an image and create a new slider
router.post('/health_photo_gallery', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = `/uploads/${req.file.filename}`;  // Storing only the file path
    const heading = req.body.heading;  // Slider name from frontend

    if (!heading) {
        return res.status(400).json({ message: 'Heading is required' });
    }

    const sql = 'INSERT INTO health_photo_gallery (heading, img_path) VALUES (?, ?)';
    db.query(sql, [heading, filePath], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({
            message: 'Photo created successfully',
            imageUrl: filePath,
        });
    });
});

// API to fetch all sliders
router.get('/health_photo_gallery', (req, res) => {
    const sql = 'SELECT * FROM health_photo_gallery';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        // Format results with custom ID format (example: IN/0001/25-10-24)
        const formattedResults = results.map((row, index) => {
            const date = new Date(row.uploaded_at);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);

            const formattedId = `IN/${String(index + 1).padStart(4, '0')}/${day}-${month}-${year}`;
            return {
                id: row.id,
                heading: row.heading,
                img_path: row.img_path,
                uploaded_at: row.uploaded_at,
                formattedId: formattedId,
            };
        });

        res.status(200).json(formattedResults);
    });
});

// API to fetch a specific slider by ID
router.get('/health_photo_gallery/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM health_photo_gallery WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        const photo = result[0];
        res.status(200).json(photo);
    });
});

// API to delete a slider by ID (also deletes the file)
router.delete('/health_photo_gallery/:id', (req, res) => {
    const { id } = req.params;
    const selectSql = 'SELECT img_path FROM health_photo_gallery WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        const filePath = result[0].img_path;
        const deleteSql = 'DELETE FROM health_photo_gallery WHERE id = ?';
        db.query(deleteSql, [id], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // Delete the file from the uploads directory
            fs.unlink(path.join(__dirname, '..', filePath), (fsErr) => {
                if (fsErr) {
                    console.error('Error deleting file:', fsErr);
                }
            });

            res.status(200).json({ message: 'Photo deleted successfully' });
        });
    });
});

// API to update a slider by ID (optionally updates image)
// API to update a photo by ID (optionally updates image)
router.put('/health_photo_gallery/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { heading } = req.body;

    let updateSql = 'UPDATE health_photo_gallery SET';
    const updateParams = [];

    if (heading) {
        updateSql += ' heading = ?';
        updateParams.push(heading);
    }

    if (req.file) {
        const newFilePath = `/uploads/${req.file.filename}`;
        updateSql += updateParams.length > 0 ? ', img_path = ?' : ' img_path = ?';
        updateParams.push(newFilePath);
    }

    if (updateParams.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    updateSql += ' WHERE id = ?';
    updateParams.push(id);

    const selectSql = 'SELECT img_path FROM health_photo_gallery WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        const oldFilePath = result[0].img_path;

        db.query(updateSql, updateParams, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            if (req.file && oldFilePath) {
                // Only try to delete the old image if it exists
                fs.unlink(path.join(__dirname, '..', oldFilePath), (fsErr) => {
                    if (fsErr) {
                        console.error('Error deleting old file:', fsErr);
                    }
                });
            }

            res.status(200).json({ message: 'Photo updated successfully' });
        });
    });
});


module.exports = router;
