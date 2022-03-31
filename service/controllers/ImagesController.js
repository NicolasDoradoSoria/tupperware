const MainImage = require('../models/multiplefile');
const shortid = require('shortid');
const { productImagesModel } = require("../models");
const { deleteImageFunction, createImageFunction } = require('../data/imageFunction');

const createProductItem = async (req, res) => {
    createImageFunction(productImagesModel)(req, res)
    
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
    createImageFunction(MainImage)(req, res)
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