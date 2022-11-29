const Table = require("../models/tableModel");
const asyncHandler = require("express-async-handler");

// @desc    get tables
// @route   POST /api/crate
// @access  Private
const addCrate = asyncHandler(async (req, res) => {
  const { tableName, crateData } = req.body;
  if (!tableName || !crateData) {
    res.status(400);
    throw new Error("No body in request. Please give a table name and crate data");
  }
  const table = await Table.findOne({ name: tableName });
  if (!table) {
    res.status(400);
    throw new Error("Table not found");
  }
  table.crates = [...table.crates, { ...crateData, totalBottles: crateData.numBottles }];
  await table.save();
  res.status(200).json({ json: table.crates });
});

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
