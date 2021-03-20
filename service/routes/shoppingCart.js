const express = require("express");
const router = express.Router();
const shoppingCartController = require("../controllers/shoppingCartController");
const auth = require("../middleware/auth");

router.get("/:productId", shoppingCartController.addToCart);
module.exports = router;
