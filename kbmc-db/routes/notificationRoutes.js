const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// GET all notifications
router.get('/notification', (req, res) => {
    const sql = 'SELECT * FROM notification';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// GET notification by ID
router.get('/notification/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM notification WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// POST a new notification
router.post('/notification', (req, res) => {
    const { heading, description, role, readed } = req.body;

    // Debug log to check the incoming request
    console.log("Notification data received:", { heading, description, role, readed });

    // Check if the necessary fields are present
    if (!heading || !description || !role) {
        return res.status(400).json({ error: "Heading and description are required." });
    }

    const sql = 'INSERT INTO notification (heading, description, role, readed) VALUES (?, ?, ?, ?)';
    
    // Debug log for the SQL query
    console.log("Executing SQL query:", sql, [heading, description, role, readed || 0]);

    db.query(sql, [heading, description, role, readed || 0], (err, result) => {
        if (err) {
            console.error("Database error:", err); // Log the error
            return res.status(500).json({ error: err.message });
        }
        
        // Debug log for result
        console.log("Inserted notification result:", result);

        res.json({ id: result.insertId, heading, description, role, readed });
    });
});



// router.put("/notification/:id", (req, res) => {
//     const { read } = req.body;
//     const notificationId = req.params.id;

//     const query = `UPDATE notification SET read = ? WHERE id = ?`;
//     db.query(query, [read, notificationId], (err, result) => {
//       if (err) {
//         res.status(500).json({ message: "Error updating notification" });
//       } else {
//         res.status(200).json({ message: "Notification updated successfully" });
//       }
//     });
//   });

//   router.put("/notification/:id", (req, res) => {
//     const { readed } = req.body;
//     const notificationId = req.params.id;
    
//     // Update notification in the database
//     const query = `UPDATE notification SET readed = ? WHERE id = ?`;
//     db.query(query, [readed, notificationId], (err, result) => {
//       if (err) {
//         res.status(500).json({ message: "Error updating notification" });
//       } else {
//         res.status(200).json({ message: "Notification marked as read" });
//       }
//     });
//   });
  
  router.put("/update/:id", (req, res) => {
    const notificationId = req.params.id;
    const { readed } = req.body;
  
    // Update the 'readed' status of a specific notification
    const query = `UPDATE notification SET readed = ? WHERE id = ?`;
  
    db.query(query, [readed, notificationId], (err, result) => {
      if (err) {
        console.error("Error updating notification status:", err);
        return res.status(500).json({ message: "Failed to update notification status" });
      }
      res.status(200).json({ message: "Notification status updated successfully" });
    });
  });

// DELETE a notification
router.delete('/notification/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notification WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Notification deleted successfully', id });
    });
});



module.exports = router;