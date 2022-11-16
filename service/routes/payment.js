const express = require("express");
const { createOrder, feedback } = require("../controllers/paymentController");
const {verifyToken}= require("../middleware/auth")

const router = express.Router();

router.post("/create-order",verifyToken, createOrder );
router.get("/notification", feedback );
module.exports = router;