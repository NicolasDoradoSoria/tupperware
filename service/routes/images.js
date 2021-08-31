const express = require("express");
const router = express.Router();
const filesController = require("../controllers/filesController");
const uploadMiddleware = require('../middleware/uploaderMiddleware')

router.post("/single-upload", uploadMiddleware.uploadSingle, filesController.singleUpload);
router.post("/multi-upload", uploadMiddleware.uploadMulti, filesController.multiUpload);
router.get("/getSingleFiles", filesController.getallSingleFiles);
router.get("/getMultipleFiles", filesController.getallMultipleFiles);
router.delete("/:imageId", filesController.deleteFileById);
module.exports = router;