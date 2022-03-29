const MainImage = require('../models/multiplefile');
const shortid = require('shortid');
const { productImagesModel } = require("../models");
const { deleteImageFunction, createImageFunction } = require('../data/imageFunction');

const createProductItem = async (req, res) => {
    createImageFunction(productImagesModel)(req, res)
    // try {
    //     let files = [];
    //     req.files.forEach(element => {
    //         const image = {
    //             _id: shortid.generate(),
    //             fileName: element.filename,
    //             filePath: element.path,
    //         }
    //         files.push(image);
    //     });
    //     const images = new productImagesModel({ files });
    //     await images.save();
    //     res.status(201).send('Files Upsloaded Successfully');
    // } catch (error) {
    //     res.status(400).send(error);
    // }
}

const deleteProductItem = async (req, res) => {
    deleteImageFunction(productImagesModel)(req, res)

}

const getProductItem = async (req, res) => {
    try {
        const files = await productImagesModel.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).send(error.message)
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


const getAllMultipleImages = async (req, res) => {
    try {
        const files = await MainImage.find()
        res.status(200).send(files)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteFileById = async (req, res) => {
    deleteImageFunction(MainImage)(req, res)

}

module.exports = { deleteFileById, getAllMultipleImages, multiUpload, createProductItem, deleteProductItem, getProductItem }