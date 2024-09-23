exports.up = function (knex) {
  return knex.schema.createTable("Lists", function (table) {
    table.increments("list_id").primary();
    table.string("list_name").notNullable();
    table.string("list_type").notNullable();
    table.string("logo");
    table
      .integer("candidate_id")
      .unsigned()
      .references("N_Id")
      .inTable("Users")
      .onDelete("CASCADE");
    table.string("file_path");
    table.string("status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Lists");
};
