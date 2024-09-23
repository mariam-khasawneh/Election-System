exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("partyList")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("partyList").insert([
        {
          name: "حزب الوحدة الوطنية",
          logo: "https://example.com/logos/national_unity.png",
          count: 0,
          organizer: "أحمد الزعبي",
          numOfVotes: 1200,
        },
        {
          name: "الحزب الديمقراطي الأردني",
          logo: "https://example.com/logos/democratic_party.png",
          count: 0,
          organizer: "سلمى الفايز",
          numOfVotes: 950,
        },
        {
          name: "حزب التقدم والتنمية",
          logo: "https://example.com/logos/progress_development.png",
          count: 0,
          organizer: "يوسف الرواشدة",
          numOfVotes: 700,
        },
      ]);
    });
};
