const express = require("express");
const multer = require("multer");
const News = require("../models/News");
const router = express.Router();


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Add News API
router.post("/add-news", upload.single("file"), async (req, res) => {
  try {
    const { newsHeadline, publishDate, newsDescription } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const news = new News({
      newsHeadline,
      publishDate,
      newsDescription,
      image: imageUrl,
    });

    await news.save();
    res.status(201).json({ message: "News added", news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add news" });
  }
});

module.exports = router;
