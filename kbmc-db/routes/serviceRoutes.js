const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Use the promise-based fs
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

// Helper function to delete a file if it exists
const deleteFileIfExists = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error(`Error deleting file ${filePath}:`, err);
        }
    }
};

// API to add a new service
// API to update a service by ID (name and optional icons)
router.put('/services/:id', upload.fields([{ name: 'mainIcon' }, { name: 'hoverIcon' }]), async (req, res) => {
    const { id } = req.params;
    const { serviceHeading, serviceLink } = req.body;
  
    let updateSql = 'UPDATE services SET';
    const updateParams = [];
  
    // Update the service heading if it's provided
    if (serviceHeading) {
        updateSql += ' service_heading = ?';
        updateParams.push(serviceHeading);
    }

    // Add a comma if there's a previous field to separate the assignments
    if (serviceLink) {
        updateSql += updateParams.length > 0 ? ', service_link = ?' : ' service_link = ?';
        updateParams.push(serviceLink);
    }
  
    // Handle the uploaded files (new icons)
    if (req.files['mainIcon']) {
        const newMainIconPath = path.join('uploads', req.files['mainIcon'][0].filename);
        updateSql += updateParams.length > 0 ? ', main_icon_path = ?' : ' main_icon_path = ?';
        updateParams.push(newMainIconPath);
    }
  
    if (req.files['hoverIcon']) {
        const newHoverIconPath = path.join('uploads', req.files['hoverIcon'][0].filename);
        updateSql += updateParams.length > 0 ? ', hover_icon_path = ?' : ' hover_icon_path = ?';
        updateParams.push(newHoverIconPath);
    }
  
    // Ensure we have at least one field to update
    if (updateParams.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }
  
    updateSql += ' WHERE id = ?';
    updateParams.push(id);

    // First, get the current file paths to delete the old images if needed
    const selectSql = 'SELECT main_icon_path, hover_icon_path FROM services WHERE id = ?';
    db.query(selectSql, [id], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const { main_icon_path: oldMainIconPath, hover_icon_path: oldHoverIconPath } = result[0];

        // Update the service
        db.query(updateSql, updateParams, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // If new files were uploaded, delete the old images
            if (req.files['mainIcon']) {
                await deleteFileIfExists(path.join(__dirname, '../', oldMainIconPath));
            }

            if (req.files['hoverIcon']) {
                await deleteFileIfExists(path.join(__dirname, '../', oldHoverIconPath));
            }

            res.status(200).json({ message: 'Service updated successfully' });
        });
    });
});


// API to get all services
router.get('/services', (req, res) => {
    const sql = 'SELECT * FROM services';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
});

// API to get service by ID
router.get('/services/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM services WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(result[0]);
    });
});

// API to update a service by ID (name and optional icons)
router.put('/services/:id', upload.fields([{ name: 'mainIcon' }, { name: 'hoverIcon' }]), async (req, res) => {
    const { id } = req.params;
    const { serviceHeading, serviceLink } = req.body;
  
    let updateSql = 'UPDATE services SET';
    const updateParams = [];
  
    // Update the service heading if it's provided
    if (serviceHeading) {
      updateSql += ' service_heading = ?';
      updateParams.push(serviceHeading);
    }

    if (serviceLink) {
        updateSql += ' service_link = ?';
        updateParams.push(serviceLink);
      }
  
    // Handle the uploaded files (new icons)
    if (req.files['mainIcon']) {
      const newMainIconPath = path.join('uploads', req.files['mainIcon'][0].filename);
      updateSql += updateParams.length > 0 ? ', main_icon_path = ?' : ' main_icon_path = ?';
      updateParams.push(newMainIconPath);
    }
  
    if (req.files['hoverIcon']) {
      const newHoverIconPath = path.join('uploads', req.files['hoverIcon'][0].filename);
      updateSql += updateParams.length > 0 ? ', hover_icon_path = ?' : ' hover_icon_path = ?';
      updateParams.push(newHoverIconPath);
    }
  
    // Ensure we have at least one field to update
    if (updateParams.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }
  
    updateSql += ' WHERE id = ?';
    updateParams.push(id);
  
    // First, get the current file paths to delete the old images if needed
    const selectSql = 'SELECT main_icon_path, hover_icon_path FROM services WHERE id = ?';
    db.query(selectSql, [id], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      const { main_icon_path: oldMainIconPath, hover_icon_path: oldHoverIconPath } = result[0];
  
      // Update the service
      db.query(updateSql, updateParams, async (err) => {
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
  
        // If new files were uploaded, delete the old images
        if (req.files['mainIcon']) {
          await deleteFileIfExists(path.join(__dirname, '../', oldMainIconPath));
        }
  
        if (req.files['hoverIcon']) {
          await deleteFileIfExists(path.join(__dirname, '../', oldHoverIconPath));
        }
  
        res.status(200).json({ message: 'Service updated successfully' });
      });
    });
  });
  
// API to delete a service by ID
router.delete('/services/:id', async (req, res) => {
    const { id } = req.params;

    // First, get the file paths of the service
    const selectSql = 'SELECT main_icon_path, hover_icon_path FROM services WHERE id = ?';
    db.query(selectSql, [id], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const { main_icon_path: mainIconPath, hover_icon_path: hoverIconPath } = result[0];

        // Delete the service from the database
        const deleteSql = 'DELETE FROM services WHERE id = ?';
        db.query(deleteSql, [id], async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            // Check and delete the image files from the uploads directory
            await deleteFileIfExists(path.join(__dirname, '../', mainIconPath));
            await deleteFileIfExists(path.join(__dirname, '../', hoverIconPath));

            res.status(200).json({ message: 'Service deleted successfully' });
        });
    });
});

module.exports = router;
