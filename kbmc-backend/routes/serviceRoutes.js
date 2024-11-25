const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const router = express.Router();
const db = require("../config/db.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const deleteFileIfExists = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`Error deleting file ${filePath}:`, err);
    }
  }
};

router.put(
  "/services/:id",
  upload.fields([{ name: "mainIcon" }, { name: "hoverIcon" }]),
  async (req, res) => {
    const { id } = req.params;
    const { serviceHeading, serviceLink } = req.body;

    let updateSql = "UPDATE services SET";
    const updateParams = [];

    if (serviceHeading) {
      updateSql += " service_heading = ?";
      updateParams.push(serviceHeading);
    }

    if (serviceLink) {
      updateSql +=
        updateParams.length > 0 ? ", service_link = ?" : " service_link = ?";
      updateParams.push(serviceLink);
    }

    if (req.files["mainIcon"]) {
      const newMainIconPath = path.join(
        "uploads",
        req.files["mainIcon"][0].filename
      );
      updateSql +=
        updateParams.length > 0
          ? ", main_icon_path = ?"
          : " main_icon_path = ?";
      updateParams.push(newMainIconPath);
    }

    if (req.files["hoverIcon"]) {
      const newHoverIconPath = path.join(
        "uploads",
        req.files["hoverIcon"][0].filename
      );
      updateSql +=
        updateParams.length > 0
          ? ", hover_icon_path = ?"
          : " hover_icon_path = ?";
      updateParams.push(newHoverIconPath);
    }

    if (updateParams.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    updateSql += " WHERE id = ?";
    updateParams.push(id);

    const selectSql =
      "SELECT main_icon_path, hover_icon_path FROM services WHERE id = ?";
    db.query(selectSql, [id], async (err, result) => {
      if (err) {
        console.error("Database Selection Error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Service not found" });
      }

      const {
        main_icon_path: oldMainIconPath,
        hover_icon_path: oldHoverIconPath,
      } = result[0];

      db.query(updateSql, updateParams, async (err) => {
        if (err) {
          console.error("Database Update Error:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }

        if (req.files["mainIcon"]) {
          await deleteFileIfExists(
            path.join(__dirname, "../", oldMainIconPath)
          );
        }

        if (req.files["hoverIcon"]) {
          await deleteFileIfExists(
            path.join(__dirname, "../", oldHoverIconPath)
          );
        }

        res.status(200).json({ message: "Service updated successfully" });
      });
    });
  }
);

router.get("/services", (req, res) => {
  const sql = "SELECT * FROM services";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json(results);
  });
});

router.get("/services/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM services WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(result[0]);
  });
});

router.post(
  "/services",
  upload.fields([{ name: "mainIcon" }, { name: "hoverIcon" }]),
  async (req, res) => {
    const { serviceHeading, serviceLink } = req.body;
    if (!serviceHeading || !serviceLink) {
      return res
        .status(400)
        .json({ message: "Service heading and link are required" });
    }

    let mainIconPath = null;
    let hoverIconPath = null;

    if (req.files["mainIcon"]) {
      mainIconPath = path.join("uploads", req.files["mainIcon"][0].filename);
    }

    if (req.files["hoverIcon"]) {
      hoverIconPath = path.join("uploads", req.files["hoverIcon"][0].filename);
    }

    const insertSql =
      "INSERT INTO services (service_heading, service_link, main_icon_path, hover_icon_path) VALUES (?, ?, ?, ?)";
    const insertParams = [
      serviceHeading,
      serviceLink,
      mainIconPath,
      hoverIconPath,
    ];

    db.query(insertSql, insertParams, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res
        .status(201)
        .json({
          message: "Service added successfully",
          serviceId: result.insertId,
        });
    });
  }
);

router.delete("/services/:id", async (req, res) => {
  const { id } = req.params;

  const selectSql =
    "SELECT main_icon_path, hover_icon_path FROM services WHERE id = ?";
  db.query(selectSql, [id], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    const { main_icon_path: mainIconPath, hover_icon_path: hoverIconPath } =
      result[0];

    const deleteSql = "DELETE FROM services WHERE id = ?";
    db.query(deleteSql, [id], async (err) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      await deleteFileIfExists(path.join(__dirname, "../", mainIconPath));
      await deleteFileIfExists(path.join(__dirname, "../", hoverIconPath));

      res.status(200).json({ message: "Service deleted successfully" });
    });
  });
});

module.exports = router;
