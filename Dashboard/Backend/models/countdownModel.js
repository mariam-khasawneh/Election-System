const db = require('../config/db'); // تأكد من أن db.js متصل بشكل صحيح بقاعدة البيانات

// إنشاء عداد تنازلي جديد
exports.createCountdown = async (days, hours, minutes) => {
  try {
    await db('countdown_timer').insert({
      days,
      hours,
      minutes,
      created_at: new Date(),
    });
  } catch (error) {
    console.error('Error inserting countdown into database:', error);
    throw error;
  }
};

// جلب أحدث عداد تنازلي
exports.getLatestCountdown = async () => {
  try {
    return await db('countdown_timer').orderBy('created_at', 'desc').first();
  } catch (error) {
    console.error('Error fetching countdown from database:', error);
    throw error;
  }
};
