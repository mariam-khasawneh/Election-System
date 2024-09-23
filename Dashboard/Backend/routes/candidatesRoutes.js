const express = require("express");
const router = express.Router();
const candidatesController = require("../Controllers/candidatesControllre");

// Route to get all candidates
router.get("/candidates", candidatesController.getAllCandidates);

// Route to get id candidates by list_id
router.get("/candidates/:list_id", candidatesController.getCandidatesByList);

// Route to get users by list_id
router.get("/users/:list_id", candidatesController.getUsersByListId);
module.exports = router;
