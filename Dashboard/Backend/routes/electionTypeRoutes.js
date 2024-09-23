const express = require("express");
const router = express.Router();
const ElectionTypeController = require("../Controllers/electionTypeController");

// Route to get all lists
router.get("/lists-types", ElectionTypeController.getAllLists);

// Route to get local lists
router.get("/local-lists", ElectionTypeController.localLists);

// Route to get party lists
router.get("/party-lists", ElectionTypeController.partyLists);
