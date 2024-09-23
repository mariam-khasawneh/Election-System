const ListModel = require("../models/listsModel");

class ListController {
  //Get all lists
  static async getAllLists(req, res) {
    try {
      const lists = await ListModel.getAll();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  // Get list by id
  static async getListById(req, res) {
    const { id } = req.params;
    try {
      const list = await ListModel.getById(id);
      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: "List not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  //Get local lists
  static async getLocalList(req, res) {
    try {
      const lists = await ListModel.getLocal();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  //Get party lists
  static async getPartyList(req, res) {
    try {
      const lists = await ListModel.getParty();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }

  //delet by id
  static async deleteList(req, res) {
    const { id } = req.params;
    try {
      const rowsDeleted = await ListModel.deleteById(id);
      if (rowsDeleted) {
        res.status(200).json({ message: "List deleted successfully" });
      } else {
        res.status(404).json({ message: "List not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // update st atus
  static async updateListStatus(req, res) {
    const { list_id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    try {
      const updatedList = await ListModel.updateStatus(list_id, status);
      if (updatedList.length === 0) {
        return res.status(404).json({ message: "List not found" });
      }
      res.status(200).json(updatedList[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  // static async getSumVotesByCircleId(req, res) {
  //   try {
  //     const circleId = parseInt(req.params.circleId, 10);
  //     if (isNaN(circleId)) {
  //       return res.status(400).json({ error: "Invalid circle_id parameter" });
  //     }
  //     const result = await ListModel.sumVotesByCircleId(circleId);
  //     if (result) {
  //       res.json({ totalVotes: result.totalVotes });
  //     } else {
  //       res
  //         .status(404)
  //         .json({ error: "No data found for the given circle_id" });
  //     }
  //   } catch (error) {
  //     console.error("Error details:", error); // Log the error details
  //     res
  //       .status(500)
  //       .json({ error: "Internal Server Error", details: error.message });
  //   }
  // }

  // static async getThreshold(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const result = await ListModel.sumVotesByCircleId(id);
  //     const totalVotes = result.totalVotes || 0; // Handle the case when no votes are found
  //     const threshold = totalVotes * 0.07; // Calculate the threshold as 7% of the votes
  //     res.status(200).json({ threshold }); // Send the threshold value back as a JSON response
  //   } catch (error) {
  //     res.status(500).json({ message: "Server Error", error: error.message });
  //   }
  // }
}

module.exports = ListController;
