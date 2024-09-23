const knex = require("../config/db");

class LocalListCandidateModel {
  // Get all local list candidates
  static getAll() {
    return knex("LocalListsCandidates").select("*");
  }

  // Get local candidate by list id
  static getCandidatesByListId(local_list_id) {
    return knex("LocalListsCandidates").select("N_Id").where({ local_list_id });
  }

  // Get all user data for candidates by list id
  static getUsersByListId(local_list_id) {
    return knex("LocalListsCandidates")
      .join("Users", "LocalListsCandidates.N_Id", "=", "Users.N_Id")
      .select("Users.*")
      .where("LocalListsCandidates.local_list_id", local_list_id);
  }

  //wining lists
  static async getWinningCandidatesByList(localListId, seatsAllocated) {
    return knex("LocalListsCandidates")
      .where({ local_list_id: localListId })
      .orderBy("numOfVotes", "desc")
      .limit(seatsAllocated);
  }

  // top
  static async getTopCandidatesByListId(listId, seatCount) {
    try {
      // Query to get top candidates based on number of votes and the number of seats
      const candidates = await knex("LocalListsCandidates")
        .where({ local_list_id: listId })
        .orderBy("numOfVotes", "desc")
        .limit(seatCount); // Limit to the number of seats
      return candidates;
    } catch (error) {
      throw new Error("Error fetching top candidates: " + error.message);
    }
  }
}
module.exports = LocalListCandidateModel;
