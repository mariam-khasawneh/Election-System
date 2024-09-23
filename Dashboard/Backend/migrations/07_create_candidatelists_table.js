exports.up = function (knex) {
  return knex.schema.createTable("CandidateLists", function (table) {
    table.increments("id").primary();
    table
      .integer("list_id")
      .unsigned()
      .references("list_id")
      .inTable("Lists")
      .onDelete("CASCADE");
    table
      .integer("candidate_id")
      .unsigned()
      .references("N_Id")
      .inTable("Users")
      .onDelete("CASCADE");
    table.boolean("isApproved").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("CandidateLists");
};
