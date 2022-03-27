const express = require("express");
const router = express.Router();
const {verifyToken}= require("../middleware/auth")
const {generateOrder, showAllOrders, showOrder, updateOrder, deleteOrder, deleteProductOrder} = require("../controllers/cartController");
const { validateGenerateOrder } = require("../middleware/validators/cart");

router.post("/", verifyToken, validateGenerateOrder , generateOrder);
router.get("/",verifyToken, showAllOrders);
router.get("/:idUser", verifyToken, showOrder);
router.put("/:idOrder", updateOrder);
router.delete("/:idUser", deleteOrder);
router.delete("/:idUser/:idOrder", deleteProductOrder);
module.exports = router;
