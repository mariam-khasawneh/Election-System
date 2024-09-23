const express = require("express");
const router = express.Router();
const circleController = require("../Controllers/circleController");

// Route to get all lists
router.get("/circles", circleController.getAllCircles);

// Roure to get votes by circle id
router.get("/circles/votes/:id", circleController.getVotesCount);

// Roure to get threshold by circle id
router.get("/circles/threshold/:id", circleController.gethTreshold);

module.exports = router;
