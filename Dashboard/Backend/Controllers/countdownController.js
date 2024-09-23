const CountdownModel = require('../models/countdownModel');

// إنشاء عداد تنازلي جديد
exports.setCountdown = async (req, res) => {
  const { days, hours, minutes } = req.body;
  try {
    await CountdownModel.createCountdown(days, hours, minutes);
    res.status(200).send('Countdown time saved successfully!');
  } catch (error) {
    console.error('Error saving countdown:', error);
    res.status(500).send('Error saving countdown time.');
  }
};

// جلب العد التنازلي الحالي
exports.getCountdown = async (req, res) => {
  try {
    const countdown = await CountdownModel.getLatestCountdown();
    res.status(200).json(countdown);
  } catch (error) {
    console.error('Error fetching countdown:', error);
    res.status(500).send('Error fetching countdown time.');
  }
};
