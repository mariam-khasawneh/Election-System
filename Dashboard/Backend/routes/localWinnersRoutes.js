const express = require("express");
const router = express.Router();
const knex = require("../config/knexfile"); // Adjust the path as needed

router.get("/local-list/:listId/winners", async (req, res) => {
  try {
    const { listId } = req.params;
    const seatLimit = parseInt(req.query.seatLimit, 10); // Ensure seatLimit is an integer

    const winners = await knex("LocalListsCandidates")
      .where("local_list_id", listId)
      .orderBy("numOfVotes", "desc")
      .limit(seatLimit);

    res.json(winners);
  } catch (error) {
    console.error("Error fetching winners:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
