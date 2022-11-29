const Table = require("../models/tableModel");
const asyncHandler = require("express-async-handler");
var mongoose = require("mongoose");

// @desc    get tables
// @route   GET /api/tables
// @access  Private
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find(); //get all tables
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
  const tableName = req.body.tableName;
  const foundTable = await Table.findOne({ name: tableName });

  if (foundTable) {
    res.status(400);
    throw new Error(`A table named \"${tableName}\" already exists. Please provide a new name.`);
  }

  const table = await Table.create({ name: tableName });

  if (table) {
    res.status(201).json({ message: "Table created" });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

// @desc    modify a table
// @route   PUT /api/tables/:id
// @access  Private
const modifyTable = asyncHandler(async (req, res) => {
  console.log("entered");
  const { crateId, personName, increase } = req.body;
  const tableName = req.params.id;
  if (!crateId || !personName) {
    res.status(400);
    throw new Error("Data missing");
  }
  const foundTable = await Table.findOne({ name: tableName });
  if (!foundTable) {
    res.status(400);
    throw new Error(`Table named \"${req.params.id}\" not found.`);
  }
  const pIx = foundTable.people.findIndex((person) => person.name == personName);
  const cIx = foundTable.crates.findIndex((crate) => crate._id == crateId);
  const bIx = foundTable.people[pIx].bottles.findIndex((bottles) => bottles.crateId == crateId);
  const bottlesLeft = foundTable.crates[cIx].numBottles;
  if (increase && bottlesLeft > 0) {
    foundTable.crates[cIx].numBottles--;
    if (bIx === -1) foundTable.people[pIx].bottles.push({ crateId: crateId, amount: 1 });
    else foundTable.people[pIx].bottles[bIx].amount++;
  } else if (!increase && foundTable.crates[cIx].totalBottles > bottlesLeft) {
    if (bIx === -1 || foundTable.people[pIx].bottles[bIx].amount == 0) return;
    else {
      foundTable.people[pIx].bottles[bIx].amount--;
      foundTable.crates[cIx].numBottles++;
    }
  }

  foundTable
    .save()
    .then(() => res.status(200).json({ json: { people: foundTable.people, crates: foundTable.crates } }));
  // res.status(200).json({ json: { people: foundTable.people, crates: foundTable.crates } });
});

// @desc    delete a table
// @route   DELETE /api/tables/:id
// @access  Private
const deleteTable = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete table ${req.params.id}` });
});

module.exports = { getTables, createTable, modifyTable, deleteTable };
