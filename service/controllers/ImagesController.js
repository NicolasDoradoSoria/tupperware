'use strict';
const MainImage = require('../models/multiplefile');
const shortid = require('shortid');
const { FilesModels } = require("../models");
const singleUpload = async (req, res) => {
    const file = new FilesModels(req.body);
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
//  ----------------------------------CARROUSEL------------------------------------

const multiUpload = async (req, res) => {
    try {
        let imagesArray = [];

        req.files.forEach(element => {
            const image = {
                _id: shortid.generate(),
                fileName: element.filename,
                filePath: element.path,
            }
            imagesArray.push(image);
        });

        const multipleImages = new MainImage({
            files: imagesArray
        });
        await multipleImages.save();
        res.status(201).send('Files Upsloaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllSingleImages = async (req, res) => {

    try {
        const files = await FilesModels.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllMultipleImages = async (req, res) => {
    try {
        const files = await MainImage.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteFileById = async (req, res) => {
    if (!req.params.arrayId) {
        message = "Error! in image delete.";
        return res.status(500).json('error in delete');

    } else {
        try {

            await MainImage.updateOne({ "_id": req.params.arrayId }, { $pull: { files: { _id: req.params.imageId } } })

            let arrayImages = await MainImage.findOne({ "_id": req.params.arrayId })
            if (arrayImages.files.length === 0) {
                await MainImage.findByIdAndDelete({ "_id": req.params.arrayId })
            }
            return res.status(200).send('se a eliminado correctamente la imagen');
        } catch (err) {
            // handle the error
            return res.status(400).send(err);
        }
    }

}

module.exports = {deleteFileById, getAllMultipleImages, getAllSingleImages, multiUpload, singleUpload}