const express = require("express");
const router = express.Router();
const {verifyToken}= require("../middleware/auth")
const {generateOrder, getCart, deleteOrder, deleteProductCart, summary} = require("../controllers/cartController");
const { validateGenerateOrder } = require("../validators/cart");

router.post("/", verifyToken, validateGenerateOrder , generateOrder);
router.post("/summary", verifyToken, summary);
router.get("/:idUser", verifyToken, getCart);
router.delete("/:idUser",verifyToken, deleteOrder);
router.delete("/:idUser/:idCart",verifyToken, deleteProductCart);
module.exports = router;
