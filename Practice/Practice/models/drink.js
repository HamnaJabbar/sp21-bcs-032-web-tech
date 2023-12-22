const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
