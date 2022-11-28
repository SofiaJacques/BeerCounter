const express = require("express");

const router = express.Router();
const { addCrate, modifyCrate, deleteCrate } = require("../controllers/crateController");

router.route("/").get(addCrate).post(addCrate);
router.route("/:id").put(modifyCrate).delete(deleteCrate);

module.exports = router;
