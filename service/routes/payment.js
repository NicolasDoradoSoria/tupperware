const express = require("express");
const { createOrder, notificationOrder } = require("../controllers/paymentController");
const router = express.Router();

router.post("/create-order", createOrder );
router.post("/notificacion", notificationOrder );
module.exports = router;