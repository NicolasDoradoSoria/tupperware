const express = require("express");
const router = express.Router();
const uploadMiddleware = require('../middleware/utils/uploaderMiddleware')
const {multiUpload, getAllMultipleImages, deleteFileById, createProductItem, getProductItem, deleteProductItem} = require("../controllers/ImagesController");


router.post("/createProductItem",uploadMiddleware.uploadMulti, createProductItem);
router.get("/getProductItem", getProductItem);
router.delete("/deleteProductItem/:arrayId/:imageId" , deleteProductItem);

//---------------------CARROUSEl-----------------------------
router.post("/multi-upload", uploadMiddleware.uploadMulti, multiUpload);
router.get("/getMultipleFiles", getAllMultipleImages);
router.delete("/:arrayId/:imageId", deleteFileById);


module.exports = router;