const express = require("express");
const router = express.Router();
const {postProducts, searchProducts, getProducts, getProductById, updateProductById, deleteProductById} = require("../controllers/productsController");
const { isAdmin, verifyToken } = require("../middleware/utils/auth");
const { validatePostProducts } = require("../middleware/validators/products");

router.post("/", [verifyToken, isAdmin(["admin"])], validatePostProducts, postProducts);
router.post("/searchProducts", searchProducts);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId",verifyToken, updateProductById);
router.delete("/:productId",[verifyToken, isAdmin(["admin"])], deleteProductById);
 
module.exports = router;
