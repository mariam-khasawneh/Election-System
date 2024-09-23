const knex = require("../config/db");

class FaqMoel {
  //Get all faqs
  static getAll() {
    return knex("Faq").select("id", "question", "answer");
  }

  //Get faq by id
  static getById(id) {
    return knex("Faq").select("id", "question", "answer").where({ id }).first();
  }

  // Update FAQ by ID
  static updateById(id, data) {
    return knex("Faq").where({ id }).update(data);
  }

  // Delete FAQ by ID
  static deleteById(id) {
    return knex("Faq").where({ id }).del();
  }

  // Add new faq
  static addNew(data) {
    return knex("Faq").insert(data).returning(["id", "question", "answer"]);
  }
}

module.exports = FaqMoel;
