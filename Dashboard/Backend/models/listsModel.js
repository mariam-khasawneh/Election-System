const knex = require("../config/db");

class ListModel {
  //Get all lists
  static getAll() {
    return knex("Lists").select("*");
  }

  //Get list by id
  static getById(list_id) {
    return knex("Lists").select("*").where({ list_id }).first();
  }

  // Get local
  static getLocal() {
    return knex("Lists").select("*").where("list_type", "local");
  }

  // Get party
  static getParty() {
    return knex("Lists").select("*").where("list_type", "party");
  }

  // Delete list by id
  static deleteById(list_id) {
    return knex("Lists").where({ list_id }).del();
  }

  //Update status
  static async updateStatus(list_id, status) {
    return knex("Lists").where({ list_id }).update({ status }).returning("*"); // Return the updated row
  }
}

module.exports = ListModel;
