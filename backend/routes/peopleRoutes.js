const express = require("express");

const router = express.Router();
const { addPerson, modifyPerson, deletePerson } = require("../controllers/personController");

router.route("/").post(addPerson);
router.route("/:id").put(modifyPerson).delete(deletePerson);

module.exports = router;
