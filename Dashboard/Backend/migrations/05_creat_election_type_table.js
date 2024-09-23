exports.up = function (knex) {
  return knex.schema.createTable("ElectionType", function (table) {
    table.increments("id").primary();
    table.string("Election_type").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("ElectionType");
};
