const shortid = require('shortid');
const { carruselImageModel } = require("../models");
const { deleteImageFunction } = require('../data/imageFunction');


//  ----------------------------------CARROUSEL------------------------------------

const multiUpload = async (req, res) => {
        if (!req.files.images) {
            return res.status(404).json({ msg: "el producto no existe" });
        }
    try {
        let files = [];
        req.files.images.forEach(element => {
            const image = {
                _id: shortid.generate(),
                fileName: element.filename,
                filePath: element.path,
            }
            files.push(image);
        });
        const images = new carruselImageModel({ files });
        await images.save();
        return res.status(201).send('image Upsloaded Successfully');
    } catch (error) {
        console.log(error)
    }
}


const getAllMultipleImages = async (req, res) => {
    try {
        const files = await carruselImageModel.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteFileById = async (req, res) => {
    deleteImageFunction(MainImage)(req, res)

}

module.exports = { deleteFileById, getAllMultipleImages, multiUpload }