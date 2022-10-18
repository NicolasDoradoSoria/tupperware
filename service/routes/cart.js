const express = require("express");
const router = express.Router();
const {verifyToken}= require("../middleware/auth")
const {generateOrder, showAllOrders, showOrder, updateOrder, deleteOrder, deleteProductOrder} = require("../controllers/cartController");
const { validateGenerateOrder } = require("../validators/cart");

router.post("/", verifyToken, validateGenerateOrder , generateOrder);
router.get("/",verifyToken, showAllOrders);
router.get("/:idUser", verifyToken, showOrder);
router.put("/:idOrder",verifyToken, updateOrder);
router.delete("/:idUser",verifyToken, deleteOrder);
router.delete("/:idUser/:idOrder",verifyToken, deleteProductOrder);
module.exports = router;
