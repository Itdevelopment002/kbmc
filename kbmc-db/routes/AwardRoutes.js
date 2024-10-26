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

// API to upload award and add entry
router.post('/awards', upload.single('awardimage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = `/uploads/${req.file.filename}`;  // Only storing file path
    const heading = req.body.heading;  // Get heading from frontend
    const description = req.body.description;  // Get description from frontend

    if (!heading || !description) {
        return res.status(400).json({ message: 'Heading and description are required' });
    }

    const sql = 'INSERT INTO awards (heading, description, awardimage) VALUES (?, ?, ?)';  // Saving award details
    db.query(sql, [heading, description, filePath], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({
            message: 'Award and image uploaded successfully',
            imageUrl: filePath,
        });
    });
});

// API to get all awards
router.get('/awards', (req, res) => {
    const sql = 'SELECT * FROM awards';  // Ensure correct table
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});

// API to get award by ID
router.get('/awards/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM awards WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Award not found' });
        }

        const award = result[0];
        res.status(200).json({
            id: award.id,
            heading: award.heading,
            description: award.description,
            awardimage: award.awardimage,
            created_at: award.created_at,
            updated_at: award.updated_at,
        });
    });
});


// API to delete an award by ID
router.delete('/awards/:id', (req, res) => {
    const { id } = req.params;

    // First, get the file path of the award image
    const selectSql = 'SELECT awardimage FROM awards WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Award not found' });
        }

        const filePath = result[0].awardimage;

        // Delete the award from the database
        const deleteSql = 'DELETE FROM awards WHERE id = ?';
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

            res.status(200).json({ message: 'Award deleted successfully' });
        });
    });
});

// API to update an award by ID (heading, description, and optional image)
router.put('/awards/:id', upload.single('awardimage'), (req, res) => {
    const { id } = req.params;
    const { heading, description } = req.body; // Get heading and description from the request body

    let updateSql = 'UPDATE awards SET';
    const updateParams = [];

    // Add heading and description to the update if provided
    if (heading) {
        updateSql += ' heading = ?';
        updateParams.push(heading);
    }
    if (description) {
        updateSql += updateParams.length > 0 ? ', description = ?' : ' description = ?';
        updateParams.push(description);
    }

    // Handle the uploaded file (new image)
    let newFilePath = null;
    if (req.file) {
        newFilePath = `/uploads/${req.file.filename}`;
        updateSql += updateParams.length > 0 ? ', awardimage = ?' : ' awardimage = ?'; // Properly handle commas
        updateParams.push(newFilePath);
    }

    // If neither heading, description nor image was provided, return an error
    if (updateParams.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    // Add the WHERE clause to update the correct award
    updateSql += ' WHERE id = ?';
    updateParams.push(id);

    // First, get the current file path to delete the old image if needed
    const selectSql = 'SELECT awardimage FROM awards WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Award not found' });
        }

        const oldFilePath = result[0].awardimage;

        // Update the award details in the database
        db.query(updateSql, updateParams, (err, updateResult) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // If a new file was uploaded, delete the old image
            if (newFilePath) {
                fs.unlink(path.join(__dirname, '..', oldFilePath), (fsErr) => {
                    if (fsErr) {
                        console.error('Error deleting old file:', fsErr);
                    }
                });
            }

            res.status(200).json({ message: 'Award updated successfully' });
        });
    });
});

module.exports = router;
