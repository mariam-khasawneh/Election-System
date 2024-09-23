exports.up = function (knex) {
  return knex.schema.createTable("Circles", function (table) {
    table.increments("circle_id").primary();
    table.string("name").notNullable();
    table.string("city").notNullable();
    table.integer("numOfCandidat").defaultTo(0);
    table.integer("count").defaultTo(0);
    table.float("threshold").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Circles");
};
