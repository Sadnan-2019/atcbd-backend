const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin');
const router = express.Router();

// Register
 





router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    console.log(user)
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });


    
//     res.status(200).json({ message: 'Login successful', user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
 
const jwt = require('jsonwebtoken');


// Ensure you have a secret key in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // ✅ Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1d',
    });

    // ✅ Send token in response
    res.status(200).json({
      message: 'Login successful',
      token, // 🔥 this is what frontend expects
      user: {
        id: user._id,
        email: user.email,
        name: user.name, // customize as per your schema
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






router.post("/users-login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await Admin.findOne({ name });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials (name not found)" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials (wrong password)" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});











module.exports = router;
