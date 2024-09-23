exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("Ads")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("Ads").insert([
        {
          candidate_id: 1000000100,
          title: "إعلان الحملة الانتخابية 1",
          description: "تفاصيل الإعلان الأول لحملة المرشح الانتخابية.",
          image_url: "path/to/image1.jpg",
        },
        {
          candidate_id: 1000000105,
          title: "إعلان الحملة الانتخابية 2",
          description: "تفاصيل الإعلان الثاني لحملة المرشح الانتخابية.",
          image_url: "path/to/image2.jpg",
        },
        {
          candidate_id: 1000000108,
          title: "إعلان الحملة الانتخابية 3",
          description: "تفاصيل الإعلان الثالث لحملة المرشح الانتخابية.",
          image_url: "path/to/image3.jpg",
        },
        {
          candidate_id: 1000000111,
          title: "إعلان الحملة الانتخابية 4",
          description: "تفاصيل الإعلان الرابع لحملة المرشح الانتخابية.",
          image_url: "path/to/image4.jpg",
        },
        {
          candidate_id: 1000000109,
          title: "إعلان الحملة الانتخابية 5",
          description: "تفاصيل الإعلان الخامس لحملة المرشح الانتخابية.",
          image_url: "path/to/image5.jpg",
        },
        {
          candidate_id: 1000000113,
          title: "إعلان الحملة الانتخابية 6",
          description: "تفاصيل الإعلان السادس لحملة المرشح الانتخابية.",
          image_url: "path/to/image6.jpg",
        },
      ]);
    });
};
