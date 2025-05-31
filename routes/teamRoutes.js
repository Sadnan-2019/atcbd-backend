const express = require("express");
const router = express.Router();
const multer = require("multer");

const Team = require("../models/Team");

// Storage config

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/team/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// POST route
router.post("/add", upload.single("file"), async (req, res) => {
  try {
    const { membername, memberdesignation } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const newMember = new Team({
      membername,
      memberdesignation,
      image: image.path, // or image.path
    });

    await newMember.save();
    res.status(201).json({ message: "Team member added successfully" });
  } catch (error) {
    console.error("Error adding team member:", error);
    res.status(500).json({ error: "Server error" });
  }
});

 

// Route: GET all services
router.get("/all", async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedService = await Team.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
});


module.exports = router;
