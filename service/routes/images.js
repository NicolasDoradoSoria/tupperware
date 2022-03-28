const express = require("express");
const router = express.Router();
const uploadMiddleware = require('../middleware/utils/uploaderMiddleware')
const {singleUpload, multiUpload, getAllMultipleImages, getAllSingleImages, deleteFileById} = require("../controllers/ImagesController");

router.post("/single-upload", uploadMiddleware.uploadSingle, singleUpload);

//---------------------CARROUSEl-----------------------------
router.post("/multi-upload", uploadMiddleware.uploadMulti, multiUpload);
router.get("/getSingleFiles", getAllSingleImages);
router.get("/getMultipleFiles", getAllMultipleImages);
router.delete("/:arrayId/:imageId", deleteFileById);


module.exports = router;