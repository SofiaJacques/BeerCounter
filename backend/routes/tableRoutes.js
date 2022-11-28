//each resource in API will have its own rout file

//This is common js module syntax (different form ES2015 syntax)

const express = require("express");
const router = express.Router();
const { getTables, createTable, modifyTable, deleteTable } = require("../controllers/tableController");

router.route("/").get(getTables).post(createTable);
router.route("/:id").put(modifyTable).delete(deleteTable);

module.exports = router;
