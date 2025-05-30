const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.post('/add-category', async (req, res) => {
  try {
    const { categoryname, categorydescription } = req.body;

    if (!categoryname || !categorydescription) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCategory = new Category({ categoryname, categorydescription });
    await newCategory.save();

    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
