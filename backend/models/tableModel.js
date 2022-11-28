//here is where we define our schema, fields for this particular resource
const mongoose = require("mongoose");

const tableModel = mongoose.Schema({
  name: { type: String, unique: true },
  crates: [
    {
      brand: String,
      owner: String,
      numBottles: Number,
      totalBottles: Number,
      price: Number,
      color: String,
    },
  ],
  people: [
    {
      name: String,
      bottles: [{ crateID: Number, amount: Number }],
    },
  ],
});

module.exports = mongoose.model("Table", tableModel);
