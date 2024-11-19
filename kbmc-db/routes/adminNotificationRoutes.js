const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// Middleware to parse JSON request bodies
router.use(express.json());

// GET all notifications
router.get("/admin-notifications", (req, res) => {
    const query = "SELECT * FROM admin_notification";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// POST a new notification
router.post("/admin-notifications", (req, res) => {
    const { description, date, time } = req.body;

    if (!description || !date || !time) {
        return res.status(400).json({ error: "All fields are required (description, date, time)" });
    }

    const query = "INSERT INTO admin_notification (description, date, time) VALUES (?, ?, ?)";
    db.query(query, [description, date, time], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: "Notification added successfully",
            id: results.insertId,
        });
    });
});

// DELETE a notification by ID
router.delete("/admin-notifications/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM admin_notification WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({ message: "Notification deleted successfully" });
    });
});

// UPDATE a notification's remark
router.put("/admin-notifications/:id", (req, res) => {
    const { id } = req.params;
    const { remark } = req.body;

    if (!remark) {
        return res.status(400).json({ error: "Remark field is required" });
    }

    const query = "UPDATE admin_notification SET remark = ? WHERE id = ?";
    db.query(query, [remark, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json({ message: "Remark updated successfully" });
    });
});

module.exports = router;
