const LocalListsCandidatesModel = require("../models/localListsCandidatesModel");
const LocalListModel = require("../models/localListModel"); // Assuming you have this model to get lists and votes
const circleModel = require("../models/circleModel"); // Assuming you have this model to get circle details

class ResultsController {
  static async getFinalResults(req, res) {
    const { circleId } = req.params;
    try {
      const circleThresholdPerc = 0.07;
      const localLists = await LocalListModel.getByCircle(circleId);
      const circleVotes = await LocalListModel.sumVotesByCircleId(circleId);
      const totalVotes = circleVotes.totalVotes;
      const circleThreshold = circleThresholdPerc * totalVotes;
      const listsAboveThreshold = localLists.filter((list) => {
        return list.numOfVotes >= circleThreshold;
      });
      const aboveThresholdIds = listsAboveThreshold.map((list) => list.id);
      const sumListsAboveThreshold = listsAboveThreshold.reduce((sum, list) => {
        return sum + list.numOfvotes;
      }, 0);
      const circleSeats = await circleModel.getAllById(circleId);
      const avilableSeats = circleSeats.count;
      const seatWeight = sumListsAboveThreshold / avilableSeats;
      const listSeatsNumber = listsAboveThreshold.map((list) => {
        return {
          listId: list.id,
          seats: list.numOfVotes / seatWeight,
        };
      });
      res.status(200).json({
        totalVotes,
        circleThreshold,
        listsAboveThreshold,
        aboveThresholdIds,
        sumListsAboveThreshold,
        avilableSeats,
        seatWeight,
        listSeatsNumber,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
}

module.exports = ResultsController;
