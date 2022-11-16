const express = require("express");
const router = express.Router();
const {postProducts, searchProducts, getProducts, getProductById, updateProductById, deleteProductById, updateProductsQuantity} = require("../controllers/productsController");
const { isAdmin, verifyToken } = require("../middleware/auth")
const { validatePostProducts } = require("../validators/products");
const uploadMiddleware = require('../middleware/uploaderMiddleware');

router.post("/", [verifyToken, isAdmin], uploadMiddleware.uploadMulti, validatePostProducts, postProducts);
router.post("/searchProducts", searchProducts);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId",[verifyToken, isAdmin], updateProductById);
router.put("/updateProductsQuantity/:userId",[verifyToken], updateProductsQuantity);
router.delete("/:productId",[verifyToken,isAdmin], deleteProductById);
module.exports = router;
