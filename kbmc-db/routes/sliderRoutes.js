const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const db = require('../config/db.js');

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Directory where the files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Generate unique filename
    },
});

const upload = multer({ storage });

// API to upload image and add slider
router.post('/sliders', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = `/uploads/${req.file.filename}`;  // Only storing file path
    const sliderName = req.body.sliderName;  // Get slider name from frontend

    if (!sliderName) {
        return res.status(400).json({ message: 'Slider name is required' });
    }

    const sql = 'INSERT INTO slider (slider_name, file_path) VALUES (?, ?)';  // Saving slider_name and file_path
    db.query(sql, [sliderName, filePath], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({
            message: 'Image and slider name uploaded successfully',
            imageUrl: filePath,
        });
    });
});

// API to get all images with custom ID format
router.get('/sliders', (req, res) => {
    const sql = 'SELECT * FROM slider';  // Ensure correct table
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        // Map each result to include the custom formatted ID with indexing
        const formattedResults = results.map((row, index) => {
            const date = new Date(row.uploaded_at);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);

            const formattedId = `IN/${String(index + 1).padStart(4, '0')}/${day}-${month}-${year}`;

            return {
                id: row.id,
                slider_name: row.slider_name,  // Return slider_name
                file_path: row.file_path,  // Return file path only
                uploaded_at: row.uploaded_at,
                formattedId: formattedId,
            };
        });

        res.status(200).json(formattedResults);
    });
});

// API to get slider by ID
router.get('/sliders/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM slider WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        const slider = result[0];
        res.status(200).json({
            id: slider.id,
            slider_name: slider.slider_name,
            file_path: slider.file_path,
            uploaded_at: slider.uploaded_at
        });
    });
});

// API to delete a slider by ID
router.delete('/sliders/:id', (req, res) => {
    const { id } = req.params;

    // First, get the file path of the slider
    const selectSql = 'SELECT file_path FROM slider WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        const filePath = result[0].file_path;

        // Delete the slider from the database
        const deleteSql = 'DELETE FROM slider WHERE id = ?';
        db.query(deleteSql, [id], (err, deleteResult) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // Delete the image file from the uploads directory
            fs.unlink(path.join(__dirname, '..', filePath), (fsErr) => {
                if (fsErr) {
                    console.error('Error deleting file:', fsErr);
                }
            });

            res.status(200).json({ message: 'Slider deleted successfully' });
        });
    });
});

// API to update a slider by ID (name and optional image)
router.put('/sliders/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { slider_name } = req.body; // Get slider_name from the request body

    // Check if there's something to update; no need for an explicit check for slider_name
    let updateSql = 'UPDATE slider SET';
    const updateParams = [];

    // Add slider_name to the update if provided
    if (slider_name) {
        updateSql += ' slider_name = ?';
        updateParams.push(slider_name);
    }

    // Handle the uploaded file (new image)
    if (req.file) {
        const newFilePath = `/uploads/${req.file.filename}`;
        updateSql += updateParams.length > 0 ? ', file_path = ?' : ' file_path = ?'; // Properly handle commas
        updateParams.push(newFilePath);
    }

    // If neither slider_name nor image was provided, return an error
    if (updateParams.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    // Add the WHERE clause to update the correct slider
    updateSql += ' WHERE id = ?';
    updateParams.push(id);

    // First, get the current file path to delete the old image if needed
    const selectSql = 'SELECT file_path FROM slider WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        const oldFilePath = result[0].file_path;

        // Update the slider details in the database
        db.query(updateSql, updateParams, (err, updateResult) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // If a new file was uploaded, delete the old image
            if (req.file) {
                fs.unlink(path.join(__dirname, '..', oldFilePath), (fsErr) => {
                    if (fsErr) {
                        console.error('Error deleting old file:', fsErr);
                    }
                });
            }

            res.status(200).json({ message: 'Slider updated successfully' });
        });
    });
});


module.exports = router;
