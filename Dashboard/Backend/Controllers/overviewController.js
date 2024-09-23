const knex = require("../config/db");

class OverViewController {
  //local voting percentage
  static async getLocalVotingPercentage(req, res) {
    try {
      const totalVotesResult = await knex("localList").sum(
        "numOfVotes as total"
      );
      const totalUsersResult = await knex("Users").count("N_Id as total");

      const totalVotes = totalVotesResult[0].total || 0;
      const totalUsers = totalUsersResult[0].total || 0;

      console.log("Total Votes:", totalVotes);
      console.log("Total Users:", totalUsers);

      if (totalUsers === 0) {
        return res.status(200).json({ votingPercentage: 0 });
      }

      const votingPercentage = (totalVotes / totalUsers) * 100;

      return res
        .status(200)
        .json({ votingPercentage: votingPercentage.toFixed(2) });
    } catch (error) {
      console.error("Error calculating voting percentage:", error);
      return res
        .status(500)
        .json({ message: "Error calculating voting percentage" });
    }
  }

  //party voting percentage
  static async getPartyVotingPercentage(req, res) {
    try {
      const totalVotesResult = await knex("partyList").sum(
        "numOfVotes as total"
      );
      const totalUsersResult = await knex("Users").count("N_Id as total");

      const totalVotes = totalVotesResult[0].total || 0;
      const totalUsers = totalUsersResult[0].total || 0;

      console.log("Total Votes:", totalVotes);
      console.log("Total Users:", totalUsers);

      if (totalUsers === 0) {
        return res.status(200).json({ votingPercentage: 0 });
      }

      const votingPercentage = (totalVotes / totalUsers) * 100;

      return res
        .status(200)
        .json({ votingPercentage: votingPercentage.toFixed(2) });
    } catch (error) {
      console.error("Error calculating voting percentage:", error);
      return res
        .status(500)
        .json({ message: "Error calculating voting percentage" });
    }
  }
  // عدد المنتخبين
  static async canVoted(req, res) {
    try {
      // احسب عدد المستخدمين في جدول Users
      const canVoted = await knex("Users").count("N_Id as total");

      return res.status(200).json({ canVoted: canVoted[0].total });
    } catch (error) {
      console.error("Error counting users:", error.message);
      return res.status(500).json({ message: "Error counting users" });
    }
  }
}

module.exports = OverViewController;
