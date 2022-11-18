//each resource in API will have its own rout file

//This is common js module syntax (different form ES2015 syntax)
const express = require("express");
const router = express.Router();
const {
  getTables,
  createTable,
  modifyTable,
  deleteTable,
} = require("../controllers/beerController");

router.get("/", getTables);

router.post("/", createTable);

router.put("/:id", modifyTable);

router.delete("/:id", deleteTable);

module.exports = router;
