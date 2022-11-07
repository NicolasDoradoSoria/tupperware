const express = require("express");
const { createOrder, notificationOrder, feedback } = require("../controllers/paymentController");
const {verifyToken}= require("../middleware/auth")

const router = express.Router();

router.post("/create-order",verifyToken, createOrder );
router.post("/notificacion", notificationOrder );
router.get("/feedback", feedback );
module.exports = router;