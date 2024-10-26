const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// POST endpoint for adding a function
router.post("/functions", (req, res) => {
  const { heading, description } = req.body;

  const sql = "INSERT INTO functions (heading, description) VALUES (?, ?)";
  db.query(sql, [heading, description], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to add function" });
    }
    res.status(201).json({ id: result.insertId, heading, description });
  });
});

// GET endpoint for fetching all functions
router.get("/functions", (req, res) => {
  const sql = "SELECT * FROM functions";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Failed to fetch functions" });
    }
    res.json(results);
  });
});

// DELETE endpoint for deleting a function by ID
router.delete("/functions/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM functions WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ error: "Failed to delete function" });
    }
    res.json({ message: "Function deleted successfully" });
  });
});

// PUT endpoint for updating a function by ID
router.put("/functions/:id", (req, res) => {
  const { id } = req.params;
  const { heading, description } = req.body;
  const sql = "UPDATE functions SET heading = ?, description = ? WHERE id = ?";
  db.query(sql, [heading, description, id], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).json({ error: "Failed to update function" });
    }
    res.json({ message: "Function updated successfully" });
  });
});

module.exports = router;
