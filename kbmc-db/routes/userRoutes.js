const express = require('express');
const router = express.Router();
const db = require('../config/db.js'); // Import the database connection

// POST: Add a new user
router.post('/users', (req, res) => {
  const { username, password, department } = req.body;

  const query = 'INSERT INTO users (username, password, department) VALUES (?, ?, ?)';
  db.query(query, [username, password, department], (err, results) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).json({ message: 'Error adding user' });
    }
    res.status(201).json({ id: results.insertId, username, department });
  });
});

// GET: Fetch all users
router.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Error fetching users' });
    }
    res.json(results);
  });
});

// GET: Fetch a single user by ID
router.get('/users:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Error fetching user' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(results[0]); // Return the first user found
  });
});

// PUT: Edit an existing user
router.put('/users:id', (req, res) => {
  const { id } = req.params;
  const { username, password, department } = req.body;

  const query = 'UPDATE users SET username = ?, password = ?, department = ? WHERE id = ?';
  db.query(query, [username, password, department, id], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ message: 'Error updating user' });
    }
    res.json({ message: 'User updated successfully', username, department });
  });
});

// DELETE: Delete a user
router.delete('/users:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Error deleting user' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

module.exports = router;
