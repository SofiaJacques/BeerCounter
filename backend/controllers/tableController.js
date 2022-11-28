const Table = require("../models/tableModel");
const asyncHandler = require("express-async-handler");

// @desc    get tables
// @route   GET /api/tables
// @access  Private
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find(); //get all tables
  console.log(tables);
  res.status(200).json({ tables });
});

// @desc    create a table
// @route   POST /api/tables
// @access  Private
const createTable = asyncHandler(async (req, res) => {
  if (!req.body.tableName) {
    res.status(400);
    throw new Error("Please provide a table name");
  }
  const table = await Table.create({
    name: req.body.tableName,
  });
  res.status(200).json({ table });
});

// @desc    modify a table
// @route   PUT /api/tables/:id
// @access  Private
const modifyTable = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update table ${req.params.id}` });
});

// @desc    delete a table
// @route   DELETE /api/tables/:id
// @access  Private
const deleteTable = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete table ${req.params.id}` });
});

module.exports = { getTables, createTable, modifyTable, deleteTable };
