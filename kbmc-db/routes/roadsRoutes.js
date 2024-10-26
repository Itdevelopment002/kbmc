const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

// Get all roads
router.get('/roads', (req, res) => {
  db.query('SELECT * FROM roads', (err, results) => {
    if (err) {
      console.error('Error fetching roads:', err);
      return res.status(500).json({ error: 'Server Error' });
    }
    res.json(results);
  });
});

// Add a new road
router.post('/roads', (req, res) => {
  const { heading, description, length } = req.body; // Ensure these match your form fields
  if (!heading || !description || !length) {
    return res.status(400).json({ error: 'Heading, description, and length are required' });
  }

  const sql = 'INSERT INTO roads (heading, description, length) VALUES (?, ?, ?)';
  db.query(sql, [heading, description, length], (err, result) => {
    if (err) {
      console.error('Error adding road:', err);
      return res.status(500).json({ error: 'Server Error' });
    }
    res.status(201).json({ id: result.insertId, heading, description, length });
  });
});

// Update a road
router.put('/roads/:id', (req, res) => {
  const { id } = req.params;
  const { heading, description, length } = req.body; // Ensure these match your form fields
  
  const sql = 'UPDATE roads SET heading = ?, description = ?, length = ? WHERE id = ?';
  db.query(sql, [heading, description, length, id], (err, result) => {
    if (err) {
      console.error('Error updating road:', err);
      return res.status(500).json({ error: 'Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Road not found' });
    }
    res.json({ message: 'Road updated successfully' });
  });
});

// Delete a road
router.delete('/roads/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM roads WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting road:', err);
      return res.status(500).json({ error: 'Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Road not found' });
    }
    res.status(204).send();
  });
});

module.exports = router;
