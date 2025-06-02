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

const upload = multer({ storage : storage });

// Add News API
router.post("/add-news", upload.single("file"), async (req, res) => {
  try {
    const { newsHeadline, publishDate, newsDescription } = req.body;

     const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    // const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const news = new News({
      newsHeadline,
      publishDate,
      newsDescription,
       image: image.path, // or image.path
    });

    await news.save();
    res.status(201).json({ message: "News added", news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add news" });
  }
});



router.get("/all", async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error });
  }
});









module.exports = router;
