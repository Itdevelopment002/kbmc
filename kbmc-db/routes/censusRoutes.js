const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.post('/tree-census', (req, res) => {
    const { description, total } = req.body;
  
    // Ensure all required fields are provided
    if (!description || !total) {
      return res.status(400).json({ message: 'Description and total are required' });
    }
  
    const sql = `
        INSERT INTO tree_census (description, total) 
        VALUES (?, ?)
    `;
  
    db.query(sql, [description, total], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'Tree Census added successfully', id: result.insertId });
    });
  });
  
  // GET API to fetch all Tree Census records
  router.get('/tree-census', (req, res) => {
    const sql = `SELECT * FROM tree_census`; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json(results);
    });
  });
  
  // PUT API to update Tree Census details
  router.put('/tree-census/:id', (req, res) => {
    const treeCensusId = req.params.id;
    const { description, total } = req.body;
  
    const sql = `
        UPDATE tree_census
        SET description = ?, total = ?
        WHERE id = ?
    `;
  
    db.query(sql, [description, total, treeCensusId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Tree Census updated successfully' });
    });
  });
  
  // DELETE API to remove a Tree Census by ID
  router.delete('/tree-census/:id', (req, res) => {
    const treeCensusId = req.params.id;
  
    const sql = 'DELETE FROM tree_census WHERE id = ?';
  
    db.query(sql, [treeCensusId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Tree Census deleted successfully' });
    });
  });

  module.exports = router;