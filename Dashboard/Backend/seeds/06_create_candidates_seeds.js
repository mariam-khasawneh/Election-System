exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Candidates")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Candidates").insert([
        { N_Id: 1000000001, Election_id: 335, Circle: 1, ListId: 919 },
        { N_Id: 1000000003, Election_id: 335, Circle: 1, ListId: 919 },
        { N_Id: 1000000005, Election_id: 336, Circle: 2, ListId: 920 },
        { N_Id: 1000000007, Election_id: 336, Circle: 2, ListId: 920 },
        { N_Id: 1000000009, Election_id: 337, Circle: 3, ListId: 921 },
        { N_Id: 1000000011, Election_id: 338, Circle: 3, ListId: 922 },
        { N_Id: 1000000013, Election_id: 338, Circle: 1, ListId: 922 },
        { N_Id: 1000000015, Election_id: 339, Circle: 2, ListId: 920 },
        { N_Id: 1000000017, Election_id: 340, Circle: 1, ListId: 922 },
        { N_Id: 1000000019, Election_id: 340, Circle: 2, ListId: 923 },
        { N_Id: 1000000021, Election_id: 344, Circle: 2, ListId: 923 },
        { N_Id: 1000000023, Election_id: 345, Circle: 1, ListId: 924 },
        { N_Id: 1000000025, Election_id: 346, Circle: 3, ListId: 923 },
        { N_Id: 1000000027, Election_id: 344, Circle: 1, ListId: 924 },
        { N_Id: 1000000029, Election_id: 350, Circle: 3, ListId: 924 },
        { N_Id: 1000000031, Election_id: 343, Circle: 3, ListId: 925 },
        { N_Id: 1000000033, Election_id: 341, Circle: 1, ListId: 921 },
        { N_Id: 1000000035, Election_id: 350, Circle: 1, ListId: 924 },
        { N_Id: 1000000037, Election_id: 349, Circle: 3, ListId: 925 },
        { N_Id: 1000000039, Election_id: 342, Circle: 2, ListId: 925 },
        { N_Id: 1000000041, Election_id: 348, Circle: 2, ListId: 925 },
        { N_Id: 1000000043, Election_id: 341, Circle: 2, ListId: 926 },
        { N_Id: 1000000045, Election_id: 341, Circle: 3, ListId: 926 },
        { N_Id: 1000000047, Election_id: 347, Circle: 1, ListId: 926 },
        { N_Id: 1000000048, Election_id: 344, Circle: 1, ListId: 921 },
        { N_Id: 1000000049, Election_id: 344, Circle: 1, ListId: 921 },
        { N_Id: 1000000050, Election_id: 344, Circle: 1, ListId: 921 },
      ]);
    });
};
