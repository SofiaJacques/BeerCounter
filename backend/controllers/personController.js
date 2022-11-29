//with mongoose they return a promise. With async have to use try catch.
const Table = require("../models/tableModel");
const asyncHandler = require("express-async-handler");

// @desc    get people
// @route   GET /api/people
// @access  Private
const getPeople = async (req, res) => {
  const people = await Table.find();
  res.status(200).json({ people });
};

// @desc    create a person
// @route   POST /api/people
// @access  Private
const addPerson = asyncHandler(async (req, res) => {
  const { tableName, personData } = req.body;
  if (!tableName || !personData || !personData.name) {
    res.status(400);
    throw new Error("No body in request. Please give a person name");
  }
  const table = await Table.findOne({ name: tableName });
  if (!table) {
    res.status(400);
    throw new Error("Table not found");
  }
  table.people = [...table.people, personData];
  table.save().then(() => res.status(200).json({ json: personData }));
});

// @desc    modify a person
// @route   PUT /api/people/:id
// @access  Private
const modifyPerson = async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) {
    res.status(400).json({ message: "Person not found" });
  }
  const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ updatedPerson });
};

// @desc    delete a person
// @route   DELETE /api/people/:id
// @access  Private
const deletePerson = async (req, res) => {
  const person = await Person.findById(req.params.id);
  if (!person) {
    res.status(400).json({ message: "Person not found" });
  }
  await person.remove();
  res.status(200).json({ message: `Delete Person ${req.params.id}` });
};

module.exports = { getPeople, addPerson, modifyPerson, deletePerson };
