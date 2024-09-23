const knex = require("../config/db");

class ElectionTypeModel {
  // Get all elections
  static getAll() {
    return knex("ElectionType").select("*");
  }

  // Get Local
  static getLocal() {
    return knex("ElectionType")
      .select("id", "Election_type")
      .where("Election_type", "local list")
      .from("ElectionType");
  }

  static getParty() {
    return knex("ElectionType")
      .select("id", "Election_type")
      .where("Election_type", "party list")
      .from("ElectionType");
  }
}

module.exports = ElectionTypeModel;
