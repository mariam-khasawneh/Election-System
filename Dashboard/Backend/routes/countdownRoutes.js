const express = require('express');
const router = express.Router();
const countdownController = require('../Controllers/countdownController');

// إنشاء عداد تنازلي جديد
router.post('/setCountdown', countdownController.setCountdown);

// جلب العد التنازلي الحالي
router.get('/getCountdown', countdownController.getCountdown);

module.exports = router;
