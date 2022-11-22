const express = require("express");
const router = express.Router();
const {verifyToken}= require("../middleware/auth")
const {generateOrder, getCart, updateCart, deleteOrder, deleteProductCart} = require("../controllers/cartController");
const { validateGenerateOrder } = require("../validators/cart");

router.post("/", verifyToken, validateGenerateOrder , generateOrder);
router.get("/:idUser", verifyToken, getCart);
router.put("/:idCart",verifyToken, updateCart);
router.delete("/:idUser",verifyToken, deleteOrder);
router.delete("/:idUser/:idCart",verifyToken, deleteProductCart);
module.exports = router;
