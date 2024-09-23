exports.up = function (knex) {
  return knex.schema.createTable("partyList", function (table) {
    table.increments("party_id").primary(); // Primary key
    table.string("name").notNullable(); // Party name
    table.string("logo"); // Logo image URL or path
    table.integer("count").defaultTo(0); // Count field with default value 0
    table.string("organizer").notNullable(); // Organizer's name
    table.integer("numOfVotes").defaultTo(0); // New column with default value of 0
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("partyList");
};
