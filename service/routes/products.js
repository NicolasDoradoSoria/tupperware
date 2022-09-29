const express = require("express");
const router = express.Router();
const {postProducts, searchProducts, getProducts, getProductById, updateProductById, deleteProductById, filterProductsCategory} = require("../controllers/productsController");
const { isAdmin, verifyToken } = require("../middleware/utils/auth");
const { validatePostProducts } = require("../middleware/validators/products");
const uploadMiddleware = require('../middleware/utils/uploaderMiddleware');

router.post("/", [verifyToken, isAdmin], uploadMiddleware.uploadMulti, validatePostProducts, postProducts);
router.post("/searchProducts", searchProducts);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId",[verifyToken, isAdmin], updateProductById);
router.delete("/:productId",[verifyToken,isAdmin], deleteProductById);
 
module.exports = router;
