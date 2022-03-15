const express = require("express");
const router = express.Router();
const imagesController = require("../controllers/ImagesController");
const uploadMiddleware = require('../middleware/uploaderMiddleware')

router.post("/single-upload", uploadMiddleware.uploadSingle, imagesController.singleUpload);

//---------------------CARROUSEl-----------------------------
router.post("/multi-upload", uploadMiddleware.uploadMulti, imagesController.multiUpload);
router.get("/getSingleFiles", imagesController.getAllSingleImages);
router.get("/getMultipleFiles", imagesController.getAllMultipleImages);
router.delete("/:arrayId/:imageId", imagesController.deleteFileById);


module.exports = router;