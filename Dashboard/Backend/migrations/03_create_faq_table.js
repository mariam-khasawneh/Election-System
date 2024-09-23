exports.up = function (knex) {
  return knex.schema.createTable("Faq", function (table) {
    table.increments("id").primary();
    table.text("question").notNullable();
    table.text("answer").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Faq");
};
