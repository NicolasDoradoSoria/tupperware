const express = require("express");
const { createOrder, feedback, getOrders, deleteOrders } = require("../controllers/paymentController");
const { verifyToken, isAdmin } = require("../middleware/auth")

const router = express.Router();

router.post("/create-order", verifyToken, createOrder);
router.get("/notification", feedback);
router.get("/", [verifyToken, isAdmin], getOrders);
router.post("/delete-order", [verifyToken, isAdmin], deleteOrders);
module.exports = router;