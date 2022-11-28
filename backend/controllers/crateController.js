const Table = require("../models/tableModel");

// @desc    get tables
// @route   POST /api/crate
// @access  Private
const addCrate = async (req, res) => {
  console.log(req.body.tableName);
  console.log(req.body.crateData);
  if (!req.body || !req.body.tableName || !req.body.crateData) {
    res.status(400).json({ message: "No body in request. Please give a table name and crate data" });
  }
  const table = await Table.find({ name: req.body.tableName });
  table.crates.push(req.body.crate);
  console.log(table);
  console.log(table.crates);
  table.save();
  res.status(200).json({ message: req.body });
};

// @desc    create a table
// @route   POST /api/tables
// @access  Private
const modifyCrate = async (req, res) => {
  console.log("entered");
  res.status(200).json({});
};

const deleteCrate = async (req, res) => {
  res.status(200).json({ message: "Deleted" });
};

module.exports = { addCrate, modifyCrate, deleteCrate };
