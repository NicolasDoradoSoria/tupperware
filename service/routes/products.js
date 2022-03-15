const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const auth = require("../middleware/auth");
const uploadMiddleware = require('../middleware/uploaderMiddleware')

router.post("/", uploadMiddleware.uploadMulti, [auth.verifyToken, auth.isModerator], productsController.postProducts);
router.post("/searchProducts", productsController.searchProducts);
router.get("/", productsController.getProducts);
router.get("/:productId", productsController.getProductById);
router.put("/:productId",auth.verifyToken, productsController.updateProductById);
router.delete("/:productId",[auth.verifyToken, auth.isModerator], productsController.deleteProductById);
 
module.exports = router;
