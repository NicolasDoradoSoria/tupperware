'use strict';
const Files = require("../models/Files");
const MultipleFile = require('../models/multiplefile');
const shortid = require('shortid');
const upload = require("../middleware/uploaderMiddleware")
exports.singleUpload = async (req, res) => {
    const file = new Files(req.body);
    try {
        if (req.file.filename) {

            file.photoURL = req.file.filename
        }

        //guardamos el archivo
        await file.save();
        res.json(file)
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}
exports.multiUpload = async (req, res, next) => {
  
    try {
        let filesArray = [];
        
        req.files.forEach(element => {
            console.log(element)
            const file = {
                _id: shortid.generate(),
                fileName: element.filename,
                filePath: element.path,
            }
            filesArray.push(file);
        });
     

        const multipleFiles = new MultipleFile({
            files: filesArray
        });
        await multipleFiles.save();
        res.status(201).send('Files Upsloaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getallSingleFiles = async (req, res, next) => {

    try {
        const files = await Files.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


exports.getallMultipleFiles = async (req, res, next) => {
    try {
        const files = await MultipleFile.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.deleteFileById = async (req, res, next) => {
    message: "Error! in image upload.";
    if (!req.params.arrayId) {
        message = "Error! in image delete.";
        return res.status(500).json('error in delete');

    } else {
        try {

             await MultipleFile.updateOne({ "_id": req.params.arrayId }, { $pull: { files: { _id: req.params.imageId } } })

            let arrayImages = await MultipleFile.findOne({ "_id": req.params.arrayId })
            if (arrayImages.files.length === 0) {
                await MultipleFile.findByIdAndDelete({ "_id": req.params.arrayId })
            }
            return res.status(200).send('se a eliminado correctamente la imagen');
        } catch (err) {
            // handle the error
            return res.status(400).send(err);
        }
    }

}

exports.uploads = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.file);
    
        if (req.file == undefined) {
          return res.send({
            message: "You must select a file.",
          });
        }
    
        return res.send({
          message: "File has been uploaded.",
        });
      } catch (error) {
        console.log(error);
    
        return res.send({
          message: "Error when trying upload image: ${error}",
        });
      }
  };

