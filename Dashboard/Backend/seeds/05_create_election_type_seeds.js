exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("ElectionType")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("ElectionType").insert([
        { id: 325, Election_type: "local list" },
        { id: 326, Election_type: "party list" },
        { id: 327, Election_type: "local list" },
        { id: 328, Election_type: "party list" },
        { id: 329, Election_type: "local list" },
        { id: 330, Election_type: "party list" },
        { id: 331, Election_type: "local list" },
        { id: 332, Election_type: "party list" },
        { id: 333, Election_type: "local list" },
        { id: 334, Election_type: "party list" },
        { id: 335, Election_type: "local list" },
        { id: 336, Election_type: "party list" },
        { id: 337, Election_type: "local list" },
        { id: 338, Election_type: "party list" },
        { id: 339, Election_type: "local list" },
        { id: 340, Election_type: "party list" },
        { id: 341, Election_type: "local list" },
        { id: 342, Election_type: "party list" },
        { id: 343, Election_type: "local list" },
        { id: 344, Election_type: "party list" },
        { id: 345, Election_type: "local list" },
        { id: 346, Election_type: "party list" },
        { id: 347, Election_type: "local list" },
        { id: 348, Election_type: "party list" },
        { id: 349, Election_type: "local list" },
        { id: 350, Election_type: "party list" },
      ]);
    });
};
