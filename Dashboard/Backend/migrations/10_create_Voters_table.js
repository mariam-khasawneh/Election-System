exports.up = function (knex) {
  return knex.schema.createTable("Voters", function (table) {
    table
      .integer("N_Id")
      .unsigned()
      .references("N_Id")
      .inTable("Users")
      .onDelete("CASCADE");
    table.primary("N_Id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Voters");
};
