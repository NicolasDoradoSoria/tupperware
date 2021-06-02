const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const {verifyToken}= require("../middleware/auth")


router.post("/", verifyToken, cartController.generateOrder);
router.get("/",verifyToken, cartController.showAllOrders);
router.get("/:idUser", verifyToken, cartController.showOrder);
router.put("/:idOrder", cartController.updateOrder);
// router.delete("/:idOrder", cartController.deleteOrder);
router.delete("/:idUser/:idOrder", cartController.deleteProductOrder);
module.exports = router;
