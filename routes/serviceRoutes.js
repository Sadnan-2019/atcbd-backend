const express = require("express");
const router = express.Router();
const multer = require("multer");
const Service = require("../models/Service");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST route
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { servicename, servicedescription } = req.body;
    const newService = new Service({
      servicename,
      servicedescription,
      image: req.file.path
    });
    await newService.save();
    console.log(newService)
    res.status(200).json({ message: "Service added successfully" });
  } catch (error) {
    console.error("Error saving service:", error);
    res.status(500).json({ message: "Server error" });
  }
});




// Route: GET all services
router.get("/all", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services", error });
  }
});



module.exports = router;
