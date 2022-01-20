'use strict';
const Files = require("../models/Files");
const MultipleFile = require('../models/multiplefile');
const shortid = require('shortid');
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
    // try {
    //     const reqFiles = [];
    //     for (var i = 0; i < req.files.length; i++) {
    //         const file = {
    //             _id: shortid.generate(),
    //             fileName: req.files[i].filename,
    //             filePath: req.files[i].path,
    //         }
    //         reqFiles.push(file)
    //     }

    //     const multipleFiles = new MultipleFile({
    //         files: reqFiles
    //     });
    //     await multipleFiles.save();

    // }
    // catch (error) {
    //     res.status(400).send(error.message);
    // }
    try {
        let filesArray = [];
        const files = await MultipleFile.find();
        req.files.forEach(element => {
            const file = {
                _id: shortid.generate(),
                fileName: element.filename,
                filePath: element.path,
            }
            filesArray.push(file);
        });
        filesArray.forEach(file => {
            files.push(file)
        })

        const multipleFiles = new MultipleFile({
            files: files
        });
        await multipleFiles.save();
        // await MultipleFiles.findOneAndUpdate(
        //     files,
        //     { new: true }
        //   )
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
    message : "Error! in image upload.";
    if (!req.params.arrayId) {
        message = "Error! in image delete.";
        return res.status(500).json('error in delete');
    
      } else {
        try {

            await MultipleFile.updateOne({"_id": req.params.arrayId}, {$pull: {files: {_id: req.params.imageId}}})
            
            let arrayImages =await MultipleFile.findOne({"_id": req.params.arrayId})
           if(arrayImages.files){
               await MultipleFile.findByIdAndDelete({"_id":  req.params.arrayId})
           }
            return res.status(200).send('Successfully! Image has been Deleted');
          } catch (err) {
            // handle the error
            return res.status(400).send(err);
          }
        
      }
   
}


