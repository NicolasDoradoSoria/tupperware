const express = require("express");
const router = express.Router();
const { postFavoriteProduct, getFavoriteProduct } = require("../controllers/favoriteController");
const {verifyToken}= require("../middleware/auth")

router.post("/", verifyToken, postFavoriteProduct);
router.get("/", verifyToken, getFavoriteProduct);

module.exports = router;