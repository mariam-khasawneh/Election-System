const express = require("express");
const router = express.Router();
const ListController = require("../Controllers/listsController");

// Route to get all lists
router.get("/lists", ListController.getAllLists);

// Route to get list by id
router.get("/list/:id", ListController.getListById);

// Route to get local listst
router.get("/lists/local", ListController.getLocalList);

// Route to get local lists
router.get("/lists/party", ListController.getPartyList);

// Rote to delete by id
router.delete("/list/:id", ListController.deleteList);

// update status
router.put("/list/status/:list_id", ListController.updateListStatus);

// // Route to get the sum of votes for a specific circle_id
// router.get("/circle/:circleId/votes", ListController.getSumVotesByCircleId);

// // Route to get the sum of votes for a specific circle_id
// router.get("/circle/:id/threshold", ListController.getThreshold);

module.exports = router;
