const express = require("express");
const router = express.Router();
const multer = require("multer");
 

const Team = require("../models/Team");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/team/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage});

// Add team member route
router.post("/add", upload.single("file"), async (req, res) => {
  try {
    const { membername, memberdesignation } = req.body;
    const image = req.file.filename;

    const newTeamMember = new Team({ membername, memberdesignation, image });
    await newTeamMember.save();

    res.status(201).json({ message: "Team member added successfully", member: newTeamMember });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
