const express = require("express");
const router = express.Router();
const Drink = require("../../models/drink"); 

router.get("/drinks", async function (req, res) {
  try {
    
    const drinks = await Drink.find();

    res.render("drinkList", { drinks });
  } catch (error) {
    console.error('Error fetching drinks from the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
