const express = require("express");
const { createCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const router = express.Router();
const { isAdmin, verifyToken } = require("../middleware/auth")
const { validateCategory } = require("../validators/category");

router.post("/", [verifyToken, isAdmin, validateCategory], createCategory);
router.put("/:categoryId", [verifyToken, isAdmin], updateCategory);
router.delete("/:categoryId", [verifyToken, isAdmin], deleteCategory);
router.get("/", getCategories);

module.exports = router;
