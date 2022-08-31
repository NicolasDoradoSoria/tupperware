const express = require("express");
const { createCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const router = express.Router();
const { isAdmin, verifyToken } = require("../middleware/utils/auth");
router.post("/", [verifyToken, isAdmin(["admin"])], createCategory);
router.put("/:categoryId", [verifyToken, isAdmin(["admin"])], updateCategory);
router.delete("/:categoryId", [verifyToken, isAdmin(["admin"])], deleteCategory);
router.get("/", getCategories);

module.exports = router;
