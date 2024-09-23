exports.up = function (knex) {
  return knex.schema.createTable("Ads", function (table) {
    table.increments("id").primary();
    table
      .integer("candidate_id")
      .unsigned()
      .references("N_Id")
      .inTable("Candidates")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("image_url");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Ads");
};

// .createTable('Ads', function(table) {
//     table.increments('id').primary(); // رقم الطلب (إنشاء تلقائي)
//     table.boolean('request_type').notNullable(); // نوع الطلب (true/false)
//     table.boolean('acceptable').notNullable().defaultTo(false); // مقبول او لا
//     table.string('title'); // العنوان (غير إجباري)
//     table.string('image_url'); // رابط الصورة (غير إجباري)
//     table.text('description').notNullable(); // الوصف (إجباري)
//     table.integer('ad_plan'); // خطة الإعلان (عدد الثواني - غير إجباري)
//     table.string('candidate_one_id'); // الرقم الوطني للمرشح الأول (غير إجباري)
//     table.string('candidate_two_id'); // الرقم الوطني للمرشح الثاني (غير إجباري)
//   })
