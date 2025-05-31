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


// Route: GET all category
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
});


// DELETE CATEGORY 
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
});

module.exports = router;
