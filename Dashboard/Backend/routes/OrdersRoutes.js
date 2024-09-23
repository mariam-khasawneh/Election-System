const express = require('express');
const router = express.Router();
const OrdersModel = require('../models/OrdersModel');

router.get('/get-admin-orders', OrdersModel.getAdminOrders);
router.put('/update-order/:id', OrdersModel.UpdateAdminOrders);

module.exports = router;