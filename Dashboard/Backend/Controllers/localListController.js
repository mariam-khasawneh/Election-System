const knex = require("../config/db");
const LocalListModel = require("../models/localListModel");
const circleModel = require("../models/circleModel");
class LocalListController {
  //Get all lists
  static async getAllLists(req, res) {
    try {
      const lists = await LocalListModel.getAll();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  // Get local list by id
  static async getLocalListById(req, res) {
    const { id } = req.params;
    try {
      const list = await LocalListModel.getById(id);
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: "List not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // Get by circle id
  static async getLocalListByCircleId(req, res) {
    const { id } = req.params; // Corrected typo
    try {
      const list = await LocalListModel.getByCircle(id);
      if (list.length > 0) {
        // Check if list is not empty
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: "List not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  //delet by id
  static async deleteLocalList(req, res) {
    const { id } = req.params;
    try {
      const rowsDeleted = await LocalListModel.deleteById(id);
      if (rowsDeleted) {
        res.status(200).json({ message: "List deleted successfully" });
      } else {
        res.status(404).json({ message: "List not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // update local list status
  static async updateLocalListStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    try {
      const updatedList = await LocalListModel.updateStatus(id, status);
      if (updatedList.length === 0) {
        return res.status(404).json({ message: "List not found" });
      }
      res.status(200).json(updatedList[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  // Get num of votes by list id
  static async getNumOfVotes(req, res) {
    const { id } = req.params;
    try {
      const votes = await LocalListModel.getVotes(id);
      if (votes) {
        res.status(200).json(votes);
      } else {
        res.status(404).json({ message: "List not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  // مجموع كل الاصوات للقوائم في دائرة واحدة
  static async getSumVotesByCircleId(req, res) {
    try {
      const circleId = parseInt(req.params.circleId, 10);
      if (isNaN(circleId)) {
        return res.status(400).json({ error: "Invalid circle_id parameter" });
      }
      const result = await LocalListModel.sumVotesByCircleId(circleId);
      if (result) {
        res.json({ totalVotes: result.totalVotes });
      } else {
        res
          .status(404)
          .json({ error: "No data found for the given circle_id" });
      }
    } catch (error) {
      console.error("Error details:", error); // Log the error details
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }

  static async getThreshold(req, res) {
    const { id } = req.params;
    try {
      const result = await LocalListModel.sumVotesByCircleId(id);
      const totalVotes = result.totalVotes || 0; // Handle the case when no votes are found
      const threshold = totalVotes * 0.07; // Calculate the threshold as 7% of the votes
      res.status(200).json({ threshold }); // Send the threshold value back as a JSON response
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  static async getListsAboveThresholdByCircle(req, res) {
    const { circleId } = req.params;
    try {
      const lists = await LocalListModel.getListsAboveThresholdByCircle(
        circleId
      );
      if (lists.length > 0) {
        res.status(200).json(lists);
      } else {
        res
          .status(404)
          .json({ message: "No lists found above threshold for this circle" });
      }
    } catch (error) {
      console.error("Error details:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  static async getTotalSumOfVotesAboveThresholdByCircle(req, res) {
    const { circleId } = req.params;
    try {
      const sum = await LocalListModel.getTotalSumOfVotesAboveThresholdByCircle(
        circleId
      );
      if (sum.length > 0) {
        res.status(200).json(sum);
      } else {
        res
          .status(404)
          .json({ message: "No lists found above threshold for this circle" });
      }
    } catch (error) {
      console.error("Error details:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  static async seatWeight(req, res) {
    const { circleId } = req.params;
    try {
      const seatWeight = await LocalListModel.seatWeight(circleId);
      if (seatWeight.length > 0) {
        res.status(200).json(seatWeight);
      } else {
        res
          .status(404)
          .json({ message: "No lists found above threshold for this circle" });
      }
    } catch (error) {
      console.error("Error details:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // Controller method to calculate votes to seat weight ratio
  static async getVotesToSeatWeightRatio(req, res) {
    const { circleId } = req.params;
    try {
      const ratioData = await LocalListModel.calculateVotesToSeatWeightRatio(
        circleId
      );
      if (ratioData.length === 0) {
        return res
          .status(404)
          .json({ message: "No lists found above threshold for this circle" });
      }
      return res.status(200).json(ratioData);
    } catch (error) {
      console.error("Error fetching votes to seat weight ratio:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Handle request to get final results for circle
  static async getFinalResults(req, res) {
    const { circleId } = req.params;
    try {
      const circleThresholdPerc = 0.07;
      const localLists = await LocalListModel.getByCircle(circleId);
      const circleVotes = await LocalListModel.sumVotesByCircleId(circleId);
      const totalVotes = circleVotes.totalVotes;
      const circleThreshold = circleThresholdPerc * totalVotes;

      // Filter lists above the threshold
      const listsAboveThreshold = localLists.filter((list) => {
        return list.numOfVotes >= circleThreshold;
      });
      if (listsAboveThreshold.length === 0) {
        return res
          .status(200)
          .json({ message: "No lists found above threshold for this circle" });
      }

      // Sum for list above the threshold
      const sumListsAboveThreshold = listsAboveThreshold.reduce((sum, list) => {
        return sum + list.numOfVotes;
      }, 0);

      const circleSeats = await circleModel.getAllById(circleId);
      const availableSeats = circleSeats.count;
      const seatWeight = sumListsAboveThreshold / availableSeats;

      // Calculate the listSeatsNumber for each list above the threshold
      let listSeatsNumber = listsAboveThreshold.map((list) => {
        const rawSeats = list.numOfVotes / seatWeight;
        return {
          listId: list.id,
          votes: list.numOfVotes,
          rawSeats,
          integerSeats: Math.floor(rawSeats),
          fractionalSeats: rawSeats % 1,
        };
      });

      // Distribute the integer parts first
      let distributedSeats = listSeatsNumber.reduce((sum, list) => {
        return sum + list.integerSeats;
      }, 0);

      // Sort lists by the fractional part of the seat numbers in descending order
      listSeatsNumber.sort((a, b) => b.fractionalSeats - a.fractionalSeats);

      // Distribute remaining seats based on highest fractional values
      let remainingSeats = availableSeats - distributedSeats;
      for (let i = 0; i < remainingSeats; i++) {
        listSeatsNumber[i].integerSeats += 1;
      }

      // Prepare the final result
      const finalDistribution = listSeatsNumber.map((list) => ({
        listId: list.listId,
        seatsAllocated: list.integerSeats,
      }));

      res.status(200).json({
        totalVotes,
        circleThreshold,
        listsAboveThreshold,
        seatWeight,
        sumListsAboveThreshold,
        listSeatsNumber,
        availableSeats,
        seatWeight,
        finalDistribution,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
}

module.exports = LocalListController;
