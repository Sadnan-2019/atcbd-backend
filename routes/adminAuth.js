const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// POST /api/admin/login
router.post("/users-login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const admin = await Admin.findOne({ name });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "mysecret", {
      expiresIn: "1d",
    });

    res.json({
      token,
      admin: { id: admin._id, name: admin.name },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
