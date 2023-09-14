const express = require("express");
const router = express.Router();
const destinationsCtrl = require("../controllers/destinations");

router.get("/:id/new", destinationsCtrl.newDestinationForm);
router.post("/:id", destinationsCtrl.createDestination);

module.exports = router;