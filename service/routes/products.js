const express = require("express");
const router = express.Router();
const auth = require("../middleware/utils/auth");
const {postProducts, searchProducts, getProducts, getProductById, updateProductById, deleteProductById} = require("../controllers/productsController");
const { validatePostProducts } = require("../middleware/validators/products");

router.post("/", [auth.verifyToken, auth.isModerator(["admin"])], validatePostProducts, postProducts);
router.post("/searchProducts", searchProducts);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId",auth.verifyToken, updateProductById);
router.delete("/:productId",[auth.verifyToken, auth.isModerator(["admin"])], deleteProductById);
 
module.exports = router;
