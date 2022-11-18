// @desc    get tables
// @route   GET /api/tables
// @access  Private
const getTables = (req, res) => {
  res.status(200).json({ message: "OK!" });
};

// @desc    create a table
// @route   POST /api/tables
// @access  Private
const createTable = (req, res) => {
  res.status(200).json({ message: "Create a table" });
};

// @desc    modify a table
// @route   PUT /api/tables/:id
// @access  Private
const modifyTable = (req, res) => {
  res.status(200).json({ message: `Update table ${req.params.id}` });
};

// @desc    delete a table
// @route   DELETE /api/tables/:id
// @access  Private
const deleteTable = (req, res) => {
  res.status(200).json({ message: `Delete table ${req.params.id}` });
};
module.exports = { getTables, createTable, modifyTable, deleteTable };
