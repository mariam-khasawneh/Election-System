const localListCandidatesModel = require("../models/localListsCandidatesModel");

class localListCandidatesController {
  // Get all candidates
  static async getAllCandidates(req, res) {
    try {
      const candidates = await localListCandidatesModel.getAll();
      res.status(200).json(candidates);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  // Get candidates by list id
  static async getCandidatesByList(req, res) {
    const { list_id } = req.params;
    try {
      const candidate = await localListCandidatesModel.getCandidatesByListId(
        list_id
      );
      if (candidate.length > 0) {
        res.status(200).json(candidate);
      } else {
        res.status(404).json({ message: "Candidate not found" });
      }
    } catch {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  // Get all user data for candidates by list id
  static async getUsersByListId(req, res) {
    try {
      const { list_id } = req.params;
      const users = await localListCandidatesModel.getUsersByListId(list_id);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getWinningCandidatesByList(localListId, seatsAllocated) {
    return knex("LocalListsCandidates")
      .where({ local_list_id: localListId })
      .orderBy("numOfVotes", "desc")
      .limit(seatsAllocated);
  }

  static async getTopCandidatesByListId(req, res) {
    const listId = parseInt(req.params.list_id, 10);
    const seatCount = parseInt(req.query.seat_count, 10); // Assuming seat_count is passed as a query parameter

    if (isNaN(listId) || isNaN(seatCount)) {
      return res
        .status(400)
        .json({ error: "Invalid list_id or seat_count parameter" });
    }

    try {
      const candidates = await LocalListCandidates.getTopCandidatesByListId(
        listId,
        seatCount
      );
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = localListCandidatesController;
