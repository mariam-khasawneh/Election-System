exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Circles")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Circles").insert([
        {
          circle_id: 1,
          name: "عمان الأولى",
          city: "عمان",
          numOfCandidat: 8,
          count: 10,
        },
        {
          circle_id: 2,
          name: "عمان الثانية",
          city: "عمان",
          numOfCandidat: 10,
          count: 50,
        },
        {
          circle_id: 3,
          name: "الزرقاء الأولى",
          city: "الزرقاء",
          numOfCandidat: 9,
          count: 70,
        },
      ]);
    });
};
