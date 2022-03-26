const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const uploadMiddleware = require('../middleware/uploaderMiddleware')
const {postProducts, searchProducts, getProducts, getProductById, updateProductById, deleteProductById} = require("../controllers/productsController");

router.post("/", uploadMiddleware.uploadMulti, [auth.verifyToken, auth.isModerator], postProducts);
router.post("/searchProducts", searchProducts);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId",auth.verifyToken, updateProductById);
router.delete("/:productId",[auth.verifyToken, auth.isModerator], deleteProductById);
 
module.exports = router;
