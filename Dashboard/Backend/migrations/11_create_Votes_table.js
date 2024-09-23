exports.up = function (knex) {
  return knex.schema.createTable("Votes", function (table) {
    table.increments("Id").primary();
    table
      .integer("candidate_id")
      .unsigned()
      .references("N_Id")
      .inTable("Candidates")
      .onDelete("CASCADE");
    table
      .integer("voter_id")
      .unsigned()
      .references("N_Id")
      .inTable("Voters")
      .onDelete("CASCADE");
    table.boolean("isLocal").defaultTo(false);
    table.boolean("isParty").defaultTo(false);
    table.boolean("isWhite").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Votes");
};
