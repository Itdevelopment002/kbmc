const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// Update the status of a dynamic table entry
router.put('/edit_:name/:id', (req, res) => {
    const { name, id } = req.params; // Get the dynamic table name and ID from the route parameters
    const { status } = req.body; // Ensure 'status' is being passed in the request body

    if (!status && status !== 0) { // Validate the 'status' value
        return res.status(400).json({ message: 'Status is required' });
    }

    // Construct the SQL query dynamically based on the table name
    const sql = `UPDATE ?? SET status = ? WHERE id = ?`; 
    db.query(sql, [name, status, id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.status(200).json({ message: `Status updated successfully in ${name} table` });
    });
});

module.exports = router;
