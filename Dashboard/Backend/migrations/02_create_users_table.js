exports.up = function (knex) {
  return knex.schema.createTable("Users", function (table) {
    table.integer("N_Id").primary();
    table.string("name"); // الاسم الأول
    table.string("email").unique();
    table.enum("gender", ["Male", "Female"]);
    table.integer("age");
    table.string("city");
    table.string("religion");
    table.string("polling_address");
    table.boolean("isOrganizer").defaultTo(false);
    table.string("password");
    table.string("otp");
    table.string("token");
    table
      .integer("circle_id")
      .unsigned()
      .references("circle_id")
      .inTable("Circles")
      .onDelete("SET NULL");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Users");
};
