const express = require("express");
const getOrdenAmaount = require("../data/getOrdenAmaount");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SK)
const paymentsInterntentController = require("../controllers/paymentsInterntentController")
//CREAR INTENTO DE PAGO

router.post("/", paymentsInterntentController.payment );
  
module.exports = router;