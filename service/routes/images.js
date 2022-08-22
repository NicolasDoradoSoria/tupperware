const express = require("express");
const router = express.Router();
const uploadMiddleware = require('../middleware/utils/uploaderMiddleware')
const {multiUpload, getAllMultipleImages, deleteFileById,} = require("../controllers/ImagesController");

  
//---------------------CARROUSEl-----------------------------
router.post("/multi-upload", uploadMiddleware.uploadMulti, multiUpload);
router.get("/getMultipleFiles", getAllMultipleImages);
router.delete("/:arrayId/:imageId", deleteFileById);


module.exports = router;