exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("localList")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("localList").insert([
        {
          //
          N_Id: 1000000100,
          name: "قائمة العزم",
          numOfvotes: 50,
          circle_id: 1,
          status: "pending",
        },
        {
          N_Id: 1000000106,
          name: "قائمة الاتحاد",
          numOfvotes: 8,
          circle_id: 1,
          status: "pending",
        },
        {
          N_Id: 1000000112,
          name: "قائمة العهد",
          numOfvotes: 22,
          circle_id: 1,
          status: "pending",
        },
        // /////////////////////////////////////////
        {
          N_Id: 1000000200,
          name: "قائمة نماء والعمل",
          numOfvotes: 22,
          circle_id: 2,
          status: "pending",
        },
        {
          N_Id: 1000000208,
          name: "قائمة  الوحدة",
          numOfvotes: 22,
          circle_id: 2,
          status: "pending",
        },
      ]);
    });
};
