const express = require("express");
const { createOrder, feedback, getOrders } = require("../controllers/paymentController");
const { verifyToken, isAdmin } = require("../middleware/auth")

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.get("/notification", feedback);
router.get("/", [verifyToken, isAdmin], getOrders);
module.exports = router;