const knex = require("../config/db");

class CandidateModel {
  // Get all candidate
  static getAll() {
    return knex("Candidates").select("*");
  }

  // Get candidate by list id
  static getCandidatesByListId(ListId) {
    return knex("Candidates").select("N_Id").where({ ListId });
  }

  // Get all user data for candidates by list id
  static getUsersByListId(list_id) {
    return knex("Candidates")
      .join("Users", "Candidates.N_Id", "=", "Users.N_Id")
      .select("Users.*")
      .where("Candidates.ListId", list_id);
  }
}

module.exports = CandidateModel;
