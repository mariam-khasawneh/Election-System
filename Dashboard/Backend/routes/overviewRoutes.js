const express = require("express");
const router = express.Router();
const overviewController = require("../Controllers/overviewController");

//   نسبة التصويت في القوائم المحلية
router.get(
  "/local-voting-percentage",
  overviewController.getLocalVotingPercentage
);

//   نسبة التصويت في القوائم المحلية
router.get(
  "/party-voting-percentage",
  overviewController.getPartyVotingPercentage
);

// عدد المنتخبين
router.get("/can-voted", overviewController.canVoted);

module.exports = router;
