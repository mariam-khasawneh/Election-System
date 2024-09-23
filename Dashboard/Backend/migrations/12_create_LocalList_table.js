exports.up = function (knex) {
  return knex.schema.createTable("localList", function (table) {
    table.increments("id").primary();
    table
      .integer("N_Id")
      .unsigned()
      .references("N_Id")
      .inTable("Users")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.integer("numOfvotes").defaultTo(0);
    table
      .integer("circle_id")
      .unsigned()
      .references("circle_id")
      .inTable("Circles")
      .onDelete("CASCADE")
      .notNullable();
    table.string("status").defaultTo("pending");
    // table.float("threshold").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("localList").then(function () {});
};
