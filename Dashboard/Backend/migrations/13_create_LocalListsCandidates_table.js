exports.up = function (knex) {
  return knex.schema.createTable("LocalListsCandidates", function (table) {
    // Primary key
    table.increments("id").primary();

    // Foreign keys
    table
      .integer("N_Id")
      .unsigned()
      .references("N_Id")
      .inTable("Users")
      .onDelete("CASCADE");
    table
      .integer("circle_id")
      .unsigned()
      .references("circle_id")
      .inTable("Circles")
      .onDelete("CASCADE");
    table
      .integer("local_list_id")
      .unsigned()
      .references("id")
      .inTable("localList")
      .onDelete("CASCADE");

    // Additional fields
    table.string("candidate_name").notNullable();
    table.integer("numOfVotes").defaultTo(0); // New column with default value of 0
    table.timestamps(true, true); // Adds created_at and updated_at columns

    // Adding a unique constraint to N_Id
    // table.unique('N_Id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("LocalListsCandidates");
};
