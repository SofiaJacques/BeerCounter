//here is where we define our schema, fields for this particular resource
const mongoose = require("mongoose");

const tableModel = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
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
      name: { type: String, required: true, unique: true },
      bottles: [{ crateId: String, amount: Number }],
    },
  ],
});

module.exports = mongoose.model("Table", tableModel);
