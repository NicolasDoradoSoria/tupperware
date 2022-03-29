const mongoose = require("mongoose");

const productImagesSchema = mongoose.Schema({
    files: [Object]
}, {timestamps: true});

module.exports = mongoose.model("ProductImages", productImagesSchema);