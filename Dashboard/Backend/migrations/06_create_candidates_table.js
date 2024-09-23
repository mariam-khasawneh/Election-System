exports.up = function (knex) {
  return knex.schema.createTable("Candidates", function (table) {
    table
      .integer("N_Id")
      .unsigned()
      .references("N_Id")
      .inTable("Users")
      .onDelete("CASCADE");
    table
      .integer("Election_id")
      .unsigned()
      .references("id")
      .inTable("ElectionType")
      .onDelete("CASCADE");
    table
      .integer("Circle")
      .unsigned()
      .references("circle_id")
      .inTable("Circles")
      .onDelete("CASCADE");
    table
      .integer("ListId")
      .unsigned()
      .references("list_id")
      .inTable("Lists")
      .onDelete("CASCADE");
    table.primary(["N_Id"]);
    table.unique("N_Id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Candidates");
};
