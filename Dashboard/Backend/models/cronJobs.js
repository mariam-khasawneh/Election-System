// cronJobs.js
const cron = require('node-cron');
const db = require('../config/db');

const updateCountdowns = async () => {
  try {
    const countdowns = await db('countdown_timer').select('*');

    for (const countdown of countdowns) {
      let { id, days, hours, minutes, Timer } = countdown;
      let totalMinutes = days * 1440 + hours * 60 + minutes;

      if (totalMinutes > 0) {
        totalMinutes -= 1; // نقص دقيقة واحدة فقط

        days = Math.floor(totalMinutes / 1440);
        hours = Math.floor((totalMinutes % 1440) / 60);
        minutes = totalMinutes % 60;

        await db('countdown_timer').where('id', id).update({
          days,
          hours,
          minutes
        });
      } else if (totalMinutes === 0 && Timer === true) {
        // إذا وصل العداد إلى الصفر وكان Timer يساوي true، نقوم بتحديثه إلى false
        await db('countdown_timer').where('id', id).update({
          days: 0,
          hours: 0,
          minutes: 0,
          Timer: false
        });
        console.log(`Countdown ${id} has reached zero. Timer set to false.`);
      }
    }
  } catch (error) {
    console.error('Error updating countdowns:', error);
  }
};

// تشغيل المهمة كل دقيقة
cron.schedule('* * * * *', updateCountdowns);