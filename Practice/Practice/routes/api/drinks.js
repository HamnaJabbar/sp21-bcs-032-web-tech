const express = require("express");
const router = express.Router();
const Drink = require("../../models/drink");

// Get all drinks
router.get("/api/drinks", async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.send(drinks);
  } catch (error) {
    console.error('Error fetching drinks from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Get a specific drink by ID
router.get("/api/drinks/:id", async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) {
      return res.status(404).send('Drink not found');
    }
    res.send(drink);
  } catch (error) {
    console.error('Error fetching drink from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new drink
router.post("/api/drinks", async (req, res) => {
  try {
    const drink = new Drink(req.body);
    await drink.save();
    return res.send(drink);
  } catch (error) {
    console.error('Error saving drink to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a specific drink by ID
router.put("/api/drinks/:id", async (req, res) => {
  try {
    const drink = await Drink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!drink) {
      return res.status(404).send('Drink not found');
    }
    res.send(drink);
  } catch (error) {
    console.error('Error updating drink in MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a specific drink by ID
router.delete("/api/drinks/:id", async (req, res) => {
  try {
    const drink = await Drink.findByIdAndDelete(req.params.id);
    if (!drink) {
      return res.status(404).send('Drink not found');
    }
    res.send(drink);
  } catch (error) {
    console.error('Error deleting drink from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
