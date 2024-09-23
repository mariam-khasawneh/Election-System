const ElectionTypeModel = require("../models/electionTypeModel");

class ElectionTypeController {
  // Get all lists
  static async getAllLists(req, res) {
    try {
      const lists = await ElectionTypeModel.getAll();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async localLists(req, res) {
    try {
      const lists = await ElectionTypeModel.getLocal();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  static async partyLists(req, res) {
    try {
      const lists = await ElectionTypeModel.getParty();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }
}

module.exports = ElectionTypeController;
