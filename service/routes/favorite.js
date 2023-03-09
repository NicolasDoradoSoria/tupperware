const express = require("express");
const router = express.Router();
const { postFavoriteProduct, getFavoriteProduct, deleteFavoriteProduct, getFavoriteProductById } = require("../controllers/favoriteController");
const {verifyToken}= require("../middleware/auth")

router.post("/", verifyToken, postFavoriteProduct);
router.get("/", verifyToken, getFavoriteProduct);
router.get("/:productId", verifyToken, getFavoriteProductById);
router.delete("/:idUser/:productId", verifyToken, deleteFavoriteProduct);


module.exports = router;