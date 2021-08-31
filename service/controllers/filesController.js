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
    try {
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                _id: shortid.generate(),
                fileName: element.filename,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            files: filesArray
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

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
    try {
        const { imageId } = req.params;

        //si el archivo existe o no
        const files = await MultipleFile.find();
        let file = await files[0].files.filter(file => file._id === imageId);
        if (!file) {
            return res.status(404).json({ msg: "no existe ese archivo" });
        }
        await MultipleFile.findOneAndUpdate(
            { $pull: { files: { _id: imageId } } });
          res.json({ msg: "el producto se a eliminado" })
      
        // await MultipleFile.findByIdAndDelete(imageId);
    } catch (error) {
        res.status(400).send(error.message)
    }
}


