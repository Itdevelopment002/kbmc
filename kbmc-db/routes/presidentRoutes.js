const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const db = require('../config/db.js');  // Ensure your database connection setup is correct

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Directory for officer images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Generate unique filename
    },
});

const upload = multer({ storage });

// API to add a new chief officer
const convertToMySQLDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`; // Converts dd-mm-yyyy to yyyy-mm-dd
};

// POST route to add a new chief officer
router.post('/presidents', upload.single('presidentImage'), (req, res) => {
    const { presidentName, startDate, endDate } = req.body;

    // Convert the received dates from dd-mm-yyyy to yyyy-mm-dd
    const formattedStartDate = convertToMySQLDate(startDate);
    const formattedEndDate = convertToMySQLDate(endDate);

    // Check if required fields are provided
    if (!presidentName || !startDate || !endDate) {
        return res.status(400).json({ message: 'President name, start date, and end date are required' });
    }

    // Handle the officer image path
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // SQL query to insert into the database
    const sql = 'INSERT INTO presidents (president_name, start_date, end_date, image_path) VALUES (?, ?, ?, ?)';
    db.query(sql, [presidentName, formattedStartDate, formattedEndDate, imagePath], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ message: 'President added successfully', presidentId: result.insertId });
    });
});

// API to get all chief officers
router.get('/presidents', (req, res) => {
    const sql = 'SELECT * FROM presidents';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});

// API to get chief officer by ID
router.get('/presidents/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM presidents WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'President not found' });
        }
        res.status(200).json(result[0]);
    });
});

// API to update a chief officer by ID (with optional image update)

router.put('/presidents/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    let { president_name, start_date, end_date } = req.body;

    // Convert dates to MySQL format if they exist
    if (start_date) {
        start_date = convertToMySQLDate(start_date);
    }
    if (end_date) {
        end_date = convertToMySQLDate(end_date);
    }

    let updateSql = 'UPDATE presidents SET';
    const updateParams = [];

    if (president_name) {
        updateSql += ' president_name = ?';
        updateParams.push(president_name);
    }
    if (start_date) {
        updateSql += ', start_date = ?';
        updateParams.push(start_date);
    }
    if (end_date) {
        updateSql += ', end_date = ?';
        updateParams.push(end_date);
    }

    let imagePath;
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
        updateSql += ', image_path = ?';
        updateParams.push(imagePath);
    }

    updateSql += ' WHERE id = ?';
    updateParams.push(id);

    const selectSql = 'SELECT image_path FROM presidents WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'President not found' });
        }

        const oldImagePath = result[0].image_path;

        db.query(updateSql, updateParams, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // Delete old image if a new one is uploaded
            if (req.file && oldImagePath) {
                const fullPath = path.join(__dirname, '..', oldImagePath.replace(/^\//, ''));
                fs.unlink(fullPath, (fsErr) => {
                    if (fsErr) {
                        console.error('Error deleting old image:', fsErr);
                    }
                });
            }

            res.status(200).json({ message: 'President updated successfully' });
        });
    });
});

// API to delete a chief officer by ID
router.delete('/presidents/:id', (req, res) => {
    const { id } = req.params;

    // First, get the file path of the chief officer image
    const selectSql = 'SELECT image_path FROM presidents WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'President not found' });
        }

        const imagePath = result[0].image_path;

        // Delete the chief officer from the database
        const deleteSql = 'DELETE FROM presidents WHERE id = ?';
        db.query(deleteSql, [id], (err, deleteResult) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            if (imagePath) {
                fs.unlink(path.join(__dirname, '..', imagePath), (fsErr) => {
                    if (fsErr) {
                        console.error('Error deleting image:', fsErr);
                    }
                });
            }

            res.status(200).json({ message: 'President deleted successfully' });
        });
    });
});

module.exports = router;
