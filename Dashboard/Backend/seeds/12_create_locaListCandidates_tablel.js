exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("LocalListsCandidates")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("LocalListsCandidates").insert([
        // // دائرة عمان الاولى
        // // قائمة 1 العزم
        {
          N_Id: 1000000100,
          candidate_name: "احمد حمد أبو زيد",
          circle_id: 1,
          local_list_id: 1,
          numOfVotes: 30,
        },
        {
          N_Id: 1000000101,
          candidate_name: "مجدي عبد المعطي الشويكي",
          circle_id: 1,
          local_list_id: 1,
          numOfVotes: 22,
        },
        {
          N_Id: 1000000102,
          candidate_name: "محمد أحمد المحارمة",
          circle_id: 1,
          local_list_id: 1,
          numOfVotes: 52,
        },
        {
          N_Id: 1000000103,
          candidate_name: "مثقال عويمر المشارقة",
          circle_id: 1,
          local_list_id: 1,
          numOfVotes: 33,
        },
        {
          N_Id: 1000000104,
          candidate_name: "ضحى ابو حماد",
          circle_id: 1,
          local_list_id: 1,
          numOfVotes: 98,
        },
        {
          N_Id: 1000000105,
          candidate_name: "محمد حمدان ابو سرحان",
          circle_id: 1,
          local_list_id: 1,
          numOfVotes: 140,
        },
        // ///////////////////////////////////////
        {
          N_Id: 1000000106,
          candidate_name: "مرزوق الهبارنة",
          circle_id: 1,
          local_list_id: 2,
          numOfVotes: 55,
        },
        {
          N_Id: 1000000107,
          candidate_name: "فائق البستنجي ",
          circle_id: 1,
          local_list_id: 2,
          numOfVotes: 99,
        },
        {
          N_Id: 1000000108,
          candidate_name: "سهام الشديفات",
          circle_id: 1,
          local_list_id: 2,
          numOfVotes: 69,
        },
        {
          N_Id: 1000000109,
          candidate_name: "علي فهد الزيود",
          circle_id: 1,
          local_list_id: 2,
          numOfVotes: 51,
        },
        {
          N_Id: 1000000110,
          candidate_name: "اياد القزعة",
          circle_id: 1,
          local_list_id: 2,
          numOfVotes: 62,
        },
        {
          N_Id: 1000000111,
          candidate_name: "عساف الشوابكة ",
          circle_id: 1,
          local_list_id: 2,
          numOfVotes: 25,
        },
        // ///////////////////////////////////////
        {
          N_Id: 1000000112,
          candidate_name: "أحمد الهميسات",
          circle_id: 1,
          local_list_id: 3,
          numOfVotes: 61,
        },
        {
          N_Id: 1000000113,
          candidate_name: "صايل الزعبي",
          circle_id: 1,
          local_list_id: 3,
          numOfVotes: 51,
        },
        {
          N_Id: 1000000114,
          candidate_name: "عبدالله الخصيلات ",
          circle_id: 1,
          local_list_id: 3,
          numOfVotes: 55,
        },
        {
          N_Id: 1000000115,
          candidate_name: "غالب الشلالفة ",
          circle_id: 1,
          local_list_id: 3,
          numOfVotes: 210,
        },
        {
          N_Id: 1000000116,
          candidate_name: " محمد محمود الزيود",
          circle_id: 1,
          local_list_id: 3,
          numOfVotes: 53,
        },
        {
          N_Id: 1000000117,
          candidate_name: " ابتسام عثمان صالح",
          circle_id: 1,
          local_list_id: 3,
          numOfVotes: 26,
        },
        /////////////////////////////////////
        // دائرة عمان الثانية
        // نماء والعمل
        {
          N_Id: 1000000200,
          candidate_name: " بسام عبدالله القطامي",
          circle_id: 2,
          local_list_id: 4,
          numOfVotes: 62,
        },
        {
          N_Id: 1000000201,
          candidate_name: " حاتم عبدالله الرمحي",
          circle_id: 2,
          local_list_id: 4,
          numOfVotes: 51,
        },
        {
          N_Id: 1000000202,
          candidate_name: "معتصم حسن الرمحي",
          circle_id: 2,
          local_list_id: 4,
          numOfVotes: 25,
        },
        {
          N_Id: 1000000203,
          candidate_name: " حمزة الشوابكة",
          circle_id: 2,
          local_list_id: 4,
          numOfVotes: 23,
        },
        {
          N_Id: 1000000204,
          candidate_name: " مي السعود",
          circle_id: 2,
          local_list_id: 4,
          numOfVotes: 14,
        },
        {
          N_Id: 1000000205,
          candidate_name: "مهند الدبابنة ",
          circle_id: 2,
          local_list_id: 4,
          numOfVotes: 27,
        },
        {
          N_Id: 1000000206,
          candidate_name: " جواد الدباس",
          circle_id: 2,
          local_list_id: 4,
          numOfVotes: 25,
        },
        {
          N_Id: 1000000207,
          candidate_name: "  مجدي ابو عدية",
          circle_id: 2,
          local_list_id: 4,
          numOfVotes: 87,
        },
        ///////////////////////////////////////////
        {
          N_Id: 1000000208,
          candidate_name: "عدي عبد الرزاق",
          circle_id: 2,
          local_list_id: 5,
          numOfVotes: 34,
        },
        {
          N_Id: 1000000209,
          candidate_name: " زهير حبش",
          circle_id: 2,
          local_list_id: 5,
          numOfVotes: 52,
        },
        {
          N_Id: 1000000210,
          candidate_name: "  لؤي الرمحي",
          circle_id: 2,
          local_list_id: 5,
          numOfVotes: 15,
        },
        {
          N_Id: 1000000211,
          candidate_name: "  نيفين سمير الشيخ",
          circle_id: 2,
          local_list_id: 5,
          numOfVotes: 92,
        },
        {
          N_Id: 1000000212,
          candidate_name: "  خليل عليان",
          circle_id: 2,
          local_list_id: 5,
          numOfVotes: 62,
        },
        {
          N_Id: 1000000213,
          candidate_name: "امين عرار",
          circle_id: 2,
          local_list_id: 5,
          numOfVotes: 18,
        },
        {
          N_Id: 1000000214,
          candidate_name: "محمد الفرارجة",
          circle_id: 2,
          local_list_id: 5,
          numOfVotes: 62,
        },
      ]);
    });
};
